import { evaluate } from 'mathjs';
import { getCurrentNumberAfterCursor } from './getCurrentNumberAfterCursor';

const formatResult = (resultValue) => {
    // Define the boundaries for switching to scientific notation
    const EXPONENTIAL_THRESHOLD = 1e12; // Numbers larger than 1 trillion
    const DECIMAL_THRESHOLD = 1e-10; // Numbers smaller than 0.0000000001
    const DECIMAL_PLACES = 10; // Number of decimal places to round to

    // Skip formatting for the result '0' or non-numbers
    if (typeof resultValue !== 'number' || isNaN(resultValue) || resultValue === 0) {
        return String(resultValue);
    }

    const absValue = Math.abs(resultValue);

    // Check for Scientific Notation (Exponential)
    if (absValue >= EXPONENTIAL_THRESHOLD || (absValue < DECIMAL_THRESHOLD && absValue !== 0)) {
        // Use toExponential(N) to show N digits after the decimal point
        return resultValue.toExponential(DECIMAL_PLACES).toString();
    } 

    // Standard Rounding (Rounded Down)
    else {
        // To round down, we use Math.floor on the scaled number
        const scale = Math.pow(10, DECIMAL_PLACES);
        
        // This rounds the number down to the specified decimal places
        let roundedValue = Math.floor(resultValue * scale) / scale; 
        
        // Convert to string and ensure it has necessary zeros/no trailing dot
        let rounded = roundedValue.toFixed(DECIMAL_PLACES);
        
        // Remove trailing zeros and the decimal point if it's an integer
        return rounded.replace(/\.?0+$/, '');
    }
};

const validateInput = (expression, cursorPosition, newText) => {
    const { currentNumber } = getCurrentNumberAfterCursor(expression, cursorPosition);

    const checks = {
        isNumber: /[0-9√]/.test(newText),
        isDecimal: newText === '.',
        isPercent: newText === '%',
        isOperator: /[+\-*/\x]/.test(newText),

        hasPercent: currentNumber.includes('%'),
        hasDecimal: currentNumber.includes('.'),
        hasErrorMsg: expression.includes('Error'),
        isEmpty: currentNumber === '' || currentNumber === '0',
        isZero: expression === '0',
    }

    const VALIDATION_RULES = {
        // Can't add percent twice
        blockNumberAfterPercent: checks.isNumber && checks.hasPercent,

        // Can't add decimal twice or after percent
        blockDecimal: checks.hasDecimal && (checks.hasPercent || checks.isDecimal),

        // Can't add start with % or add % to empty number
        blockPercentAtStart: checks.isPercent && checks.isEmpty,

        // Can't add start with % or add % to empty number
        blockDuplicatePercent: checks.isPercent && checks.hasPercent,

        // Can't add anything to error msg
        blockInputAfterErrorMsg: checks.hasErrorMsg && (checks.isNumber || checks.isDecimal || checks.isOperator || checks.isOperator)
    }

    // Check if any rule blocks the input
    const isBlocked = Object.values(VALIDATION_RULES).some(rule => rule);

    return { isBlocked, checks }
}

const insertAtCursor = (expression, cursorPosition, newText, isResultDisplayed) => {
    let newExpr = expression;
    let newCursorPos = cursorPosition;
    let updatedIsResultDisplayed = isResultDisplayed;

    const { isBlocked, checks } = validateInput(expression, cursorPosition, newText);

    // If an input is blocked, don't update expression 
    if (isBlocked) {
        return { newExpr, newCursorPos, isResultDisplayed: updatedIsResultDisplayed };
    }

    // If an operator is clicked after the result is displayed, let the expression be Ans{then new operator}
    if (isResultDisplayed && !checks.hasErrorMsg) {
        if (checks.isOperator) newExpr = `Ans${newText}`;
        else newExpr = newText;

        newCursorPos = newExpr.length;
        updatedIsResultDisplayed = false;
        return { newExpr, newCursorPos, isResultDisplayed: updatedIsResultDisplayed };
    }

    if (checks.isZero) {
        updatedIsResultDisplayed = false;
        // Handle '0' to '0.'
        if (checks.isDecimal) {
            newExpr = '0.';
            newCursorPos = 2;
        } 
        // Handle initial '0' replacement
        else if (checks.isNumber || newText === 'Ans') {
            newExpr = newText;
            newCursorPos = newText.length;
        } else {
            // If operator, fall through to normal insertion logic: '0' + '+' = '0+'
             newExpr = newExpr.slice(0, cursorPosition) + newText + newExpr.slice(cursorPosition);
             newCursorPos = cursorPosition + newText.length;
        }

        return { newExpr, newCursorPos, isResultDisplayed: updatedIsResultDisplayed };
    }

    // Normal insertion at cursor position
    newExpr = newExpr.slice(0, cursorPosition) + newText + newExpr.slice(cursorPosition);
    newCursorPos = cursorPosition + newText.length;

    return { newExpr, newCursorPos, isResultDisplayed: updatedIsResultDisplayed };
}

export const handleCalculationAction = (actionType, expression, isResultDisplayed, lastAns, cursorPosition, value) => {
    let result = {
        newExpr: expression,
        newCursorPos: cursorPosition,
        isResultDisplayed: isResultDisplayed,
        resultValue: 0,
        lastAns: lastAns,
    }

    switch (actionType) {
        case 'insert_text': {
            let updates = insertAtCursor(expression, cursorPosition, value, isResultDisplayed);

            result.newExpr = updates.newExpr;
            result.newCursorPos = updates.newCursorPos;
            result.isResultDisplayed = updates.isResultDisplayed;
            return result;
        }

        case 'delete':
            if (expression === '0') return result;

            if (cursorPosition > 0) {
                let newExpr = expression.slice(0, cursorPosition - 1) + expression.slice(cursorPosition);
                let newCursorPos = cursorPosition - 1;

                // Handle deletion of 'Ans' as a single token
                if (expression.substring(cursorPosition - 3, cursorPosition) === 'Ans') {
                    newExpr = expression.slice(0, cursorPosition - 3) + expression.slice(cursorPosition);
                    newCursorPos = cursorPosition - 3;
                }

                // Handle final '0' and cursor position
                if (newExpr === '') {
                    result.newExpr = '0';
                    result.newCursorPos = 1;
                } else {
                    result.newExpr = newExpr;
                    result.newCursorPos = newCursorPos;
                }
            }
            return result;

        case 'reciprocal': {
            const { startIndex, endIndex, currentNumber } = getCurrentNumberAfterCursor(expression, cursorPosition);
            let numberString = currentNumber;
            let newExpr = '';
            let newCursorPos = 0;

            try {
                let numberToReciprocate = parseFloat(numberString);
                
                // Check for Percentage and apply conversion
                if (numberString.endsWith('%')) {
                    if (isNaN(numberToReciprocate)) {
                        throw new Error('Invalid number for percentage calculation');
                    }
                    numberToReciprocate /= 100;
                }

                // Check current number value for zero/NaN
                if (isNaN(numberToReciprocate) || numberToReciprocate === 0) {
                    result.newExpr = 'Error(Cannot divide by zero)';
                    result.newCursorPos = result.newExpr.length;
                    result.isResultDisplayed = true;
                    return result;
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
                     
                     result.newExpr = beforeNumber + revertedNumber + afterNumber;
                     result.newCursorPos = (beforeNumber + revertedNumber).length;
                     result.isResultDisplayed = false;
                     // Crucially, lastAns is NOT updated, preserving the original number for future calculations
                     return result;
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

            result.newExpr = newExpr;
            result.newCursorPos = newCursorPos;
            result.isResultDisplayed = false; // It's an insertion, not a final result display
            return result;
        }

        case 'negate': {
            const { startIndex, endIndex, currentNumber } = getCurrentNumberAfterCursor(expression, cursorPosition);

            // If the current number is 0 or empty, don't negate
            if (currentNumber === '0' || currentNumber === '') return result;

            const beforeNumber = expression.slice(0, startIndex);
            const afterNumber = expression.slice(endIndex);

            // Check if the current Number is already negated(or inside (-... )
            const isNegated = (startIndex >= 2 && expression.substring(startIndex - 2, startIndex) === '(-');

            if (isNegated) {
                // Check if the negated number ends with a closing parentheses
                const isFollowedByParen = afterNumber.startsWith(')');

                const unnegatedBefore = beforeNumber.slice(0, -2);
                const unnegatedAfter = isFollowedByParen ? afterNumber.slice(1) : afterNumber;

                result.newExpr = unnegatedBefore + currentNumber + unnegatedAfter;
                result.newCursorPos = unnegatedBefore.length + currentNumber.length;
            } else {
                const negatedStr = `(-${currentNumber})`;

                result.newExpr = beforeNumber + negatedStr + afterNumber;
                result.newCursorPos = beforeNumber.length + negatedStr.length;
            }
            return result;
        }

        case 'calculate':
            try {
                // Replace 'Ans' with actual value before evaluation
                let expr = expression.replace(/Ans/g, lastAns.toString());

                // Replace '√' with sqrt(text) until the next operator
                if (expr.includes('√')) {
                    expr = expr.replace(/√([^+\-*/\x^])+/g, "sqrt($1)");
                }

                // 1. Evaluate the expression (returns number or complex object)
                let evaluatedResult = evaluate(expr);

                // 2. Check for Complex/Invalid Results from mathjs
                if (typeof evaluatedResult === 'object' && 'im' in evaluatedResult && evaluatedResult.im !== 0) {
                    throw new Error('Non-real result (Imaginary number)');
                }

                // Format the successful numerical result
                const formattedString = formatResult(evaluatedResult); 

                // Success path
                result.resultValue = formattedString; // Use formatted string for display
                result.newExpr = formattedString;
                result.lastAns = evaluatedResult; // Store the original, high-precision number for 'Ans' use
                result.newCursorPos = result.newExpr.length;
                result.isResultDisplayed = true;

                return result;
            } catch (err) {
                result.resultValue = 'Error';
                result.newExpr = 'Error';
                result.isResultDisplayed = true;
                console.log('Error', err);
                return result;
            }

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
