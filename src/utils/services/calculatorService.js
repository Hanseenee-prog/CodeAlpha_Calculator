import { insertAtCursor } from './insertionService';
import { formatExpressionLive } from '../helpers/formatExpressionLive';
import { handleDelete } from './actionHandlers/handleDelete';
import { handleReciprocal } from './actionHandlers/handleRecipocal';
import { handleNegate } from './actionHandlers/handleNegate';
import { handleCalculate } from './actionHandlers/handleCalculate';

/**
 * Service to orchestrate calculator actions and apply live formatting.
 * Updated for 2025 SmartCalcX features.
 */
export const handleCalculationAction = (actionType, expression, isResultDisplayed, lastAns, cursorPosition, resultValue, angleMode, value, settings) => {
    // Initial state object
    let result = {
        newExpr: expression,
        newCursorPos: cursorPosition,
        isResultDisplayed: isResultDisplayed,
        resultValue: resultValue,
        lastAns: lastAns,
        history: {}
    };

    let updates;

    // 1. Determine the raw mathematical update based on actionType
    switch (actionType) {
        case 'insert_text':
            updates = insertAtCursor(expression, cursorPosition, value, isResultDisplayed);
            break;

        case 'delete':
            updates = handleDelete(expression, cursorPosition, result);
            break;

        case 'reciprocal':
            updates = handleReciprocal(expression, cursorPosition, lastAns, result);
            break;

        case 'negate':
            updates = handleNegate(expression, cursorPosition, result);
            break;

        case 'calculate':
            // Calculate handles its own internal formatting via formatResult utility
            return handleCalculate(expression, lastAns, result, angleMode, settings);

        case 'clear':
            return {
                newExpr: '0',
                resultValue: '0',
                newCursorPos: 1,
                isResultDisplayed: false,
                lastAns: lastAns,
                history: {}
            };

        default:
            return result;
    }

    // Apply LIVE thousands separators if the action modified the expression text
    // This logic ensures the display stays pretty while the user types
    if (updates && (actionType === 'insert_text' || actionType === 'delete' || actionType === 'negate' || actionType === 'reciprocal')) {
        const rawExpr = updates.newExpr;
        
        // Format the entire expression string based on user settings
        const formattedExpr = formatExpressionLive(rawExpr, settings);

        // CURSOR SHIFT LOGIC:
        // Because commas are added/removed, the length of the string changes.
        // We calculate how many commas exist in the "prefix" (everything left of the cursor)
        // before and after formatting to adjust the cursor position accordingly.
        
        const oldPrefix = rawExpr.slice(0, updates.newCursorPos);
        const newPrefix = formatExpressionLive(oldPrefix, settings);
        
        const oldCommaCount = (oldPrefix.match(/,/g) || []).length;
        const newCommaCount = (newPrefix.match(/,/g) || []).length;
        const commaDifference = newCommaCount - oldCommaCount;

        return {
            ...result,
            newExpr: formattedExpr,
            newCursorPos: updates.newCursorPos + commaDifference,
            isResultDisplayed: updates.isResultDisplayed,
            resultValue: updates.resultValue || result.resultValue,
            lastAns: updates.lastAns || result.lastAns
        };
    }

    // Fallback for actions that don't require live formatting (like memory operations)
    return updates || result;
};