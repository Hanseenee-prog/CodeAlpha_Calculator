import { evaluate } from 'mathjs';
import { getCurrentNumberAfterCursor } from './getCurrentNumberAfterCursor';

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
    if (!newText) return { newExpr, newCursorPos, isResultDisplayed: updatedIsResultDisplayed };

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
        // Handle '0' to '0.'
        if (checks.isDecimal) {
            newExpr = '0.';
            newCursorPos = 2;
        } 
        // Handle initial '0' replacement
        else if (checks.isNumber) {
            newExpr = newText;
            newCursorPos = newText.length;
        }

        updatedIsResultDisplayed = false;
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
            if (cursorPosition > 0) {
                const newExpr = expression.slice(0, cursorPosition - 1) + expression.slice(cursorPosition);
                
                // If the display is empty replace it with 0
                result.newExpr = (newExpr === '' ? '0' : newExpr);
                result.newCursorPos = cursorPosition - 1;
                console.log(result.newExpr)
            }
            return result;
        
        case 'reciprocal': {
            const { startIndex, endIndex, currentNumber } = getCurrentNumberAfterCursor(expression, cursorPosition);
            let number = currentNumber;
            let newExpr = 0;
            let newCursorPos = 0;

            try {
                // If number has percent '%' replace it with the number divided by 100
                if (number.endsWith('%')) {
                    const numValue = parseFloat(number) / 100;
                    number = String(numValue);
                }

                // if number is zero or not a number, show an error
                if (isNaN(expression) || expression === '0') {
                    result.newExpr = 'Error(Cannot divide by zero)';
                    result.newCursorPos = result.newExpr.length;
                    result.isResultDisplayed = true;
                    return result;
                }

                // Get the reciprocal of the number
                const reciprocal = String(1 / number);

                // Get the other numbers before and after the current one
                const beforeNumber = expression.slice(0, startIndex);
                const afterNumber = expression.slice(endIndex);

                newExpr = beforeNumber + reciprocal + afterNumber;
                newCursorPos = (beforeNumber + reciprocal).length;
            } 
            catch {
                console.log('Error by reciprocal');
                newExpr = 'Error';
                newCursorPos = newExpr.length;
            }

            result.newExpr = newExpr;
            result.newCursorPos = newCursorPos;
            result.isResultDisplayed = true;
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

                let evaluatedResult = evaluate(expr).toString();
                console.log(typeof evaluatedResult);

                // Throws an error if the result is an object
                if (typeof evaluatedResult === 'object' && 'im' in evaluatedResult && evaluatedResult.im !== 0) {
                    throw new Error('Non-real result(Imaginary number)')
                }

                result.resultValue = evaluate(evaluatedResult);
                result.newExpr = String(evaluatedResult);
                result.lastAns = evaluatedResult;
                result.newCursorPos = result.newExpr.length;
                result.isResultDisplayed = true;

                return result;
            } catch (err) {
                result.resultValue = 'Error';
                result.isResultDisplayed = true;
                console.log('Error', err);
                return result;
            }

        default:
            return result;
    }
    
}