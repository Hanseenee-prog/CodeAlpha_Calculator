import { insertAtCursor } from './insertionService';
import { handleDelete } from './actionHandlers/handleDelete';
import { handleReciprocal } from './actionHandlers/handleRecipocal';
import { handleNegate } from './actionHandlers/handleNegate';
import { handleCalculate } from './actionHandlers/handleCalculate';

export const handleCalculationAction = (actionType, expression, isResultDisplayed, lastAns, cursorPosition, resultValue, value, cursorMode) => {
    let result = {
        newExpr: expression,
        newCursorPos: cursorPosition,
        isResultDisplayed: isResultDisplayed,
        resultValue: resultValue,
        lastAns: lastAns,
        history: {}
    }

    switch (actionType) {
        case 'insert_text': {
            let updates = insertAtCursor(expression, cursorPosition, value, isResultDisplayed, cursorMode);

            result.newExpr = updates.newExpr;
            result.newCursorPos = updates.newCursorPos;
            result.isResultDisplayed = updates.isResultDisplayed;
            return result;
        }

        case 'delete': 
            return handleDelete(expression, cursorPosition, result);

        case 'reciprocal': 
            return handleReciprocal(expression, cursorPosition, lastAns, result);

        case 'negate': 
            return handleNegate(expression, cursorPosition, result);

        case 'calculate':
            return handleCalculate(expression, lastAns, result);

        case 'clear':
            result.newExpr ='0';
            result.resultValue = '0';
            result.newCursorPos = 1;
            result.isResultDisplayed = false;
            return result;

        default:
            return result;
    }

}
