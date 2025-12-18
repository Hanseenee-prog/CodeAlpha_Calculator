import { getCurrentNumberAfterCursor } from '../../helpers/getCurrentNumberAfterCursor';
import { formatResult } from '../../helpers/formatResult';
import { prepareExpressionForEvaluation } from '../../helpers/prepareExpressionForEvaluation';

export const handleReciprocal = (expression, cursorPosition, lastAns, result) => {
    const { startIndex, endIndex, currentNumber } = getCurrentNumberAfterCursor(expression, cursorPosition);
    let numberString = currentNumber;
    let newExpr = '';
    let newCursorPos = 0;

    try {
        let numberToReciprocate = parseFloat(prepareExpressionForEvaluation(numberString, lastAns));
        
        // Check for Percentage and apply conversion
        if (numberString.endsWith('%')) {
            if (isNaN(numberToReciprocate)) {
                throw new Error('Invalid number for percentage calculation');
            }
            numberToReciprocate /= 100;
        }

        // Check current number value for zero/NaN
        if (isNaN(numberToReciprocate) || numberToReciprocate === 0) {
            return {
                ...result,
                newExpr: 'Error(Cannot divide by zero)',
                newCursorPos: 'Error(Cannot divide by zero)'.length,
                isResultDisplayed: true
            }
        }
        
        // The tolerance for floating point comparison
        const tolerance = 1e-10; 
        const beforeNumber = expression.slice(0, startIndex);
        const afterNumber = expression.slice(endIndex);

        // Check if the current number (before formatting) is close to 1 / lastAns
        // This means the user is pressing reciprocal a second time on a reciprocated result.
        if (Math.abs(numberToReciprocate - (1 / lastAns)) < tolerance) {
            // Revert to the high-precision original number (lastAns)
            const revertedNumber = formatResult(lastAns);

            // Crucially, lastAns is NOT updated, preserving the original number for future calculations
            return {
                ...result,
                newExpr: beforeNumber + revertedNumber + afterNumber,
                newCursorPos: (beforeNumber + revertedNumber).length,
                isResultDisplayed: false
            }
        }
    
        // Get the reciprocal of the number (raw number)
        const rawReciprocalValue = 1 / numberToReciprocate;

        // Format the reciprocal before inserting it
        const formattedReciprocal = formatResult(rawReciprocalValue);

        // Insertion back into expression
        newExpr = beforeNumber + formattedReciprocal + afterNumber;
        newCursorPos = (beforeNumber + formattedReciprocal).length;

        // Store the raw, unrounded value for the next toggle press!
        result.lastAns = numberToReciprocate;
    } 
    catch (e) {
        console.log('Error by reciprocal', e);
        newExpr = 'Error';
        newCursorPos = newExpr.length;
        result.isResultDisplayed = true;
    }

    return {
        ...result,
        newExpr,
        newCursorPos,
        isResultDisplayed: false, // It's an insertion, not a final result display
    }
}