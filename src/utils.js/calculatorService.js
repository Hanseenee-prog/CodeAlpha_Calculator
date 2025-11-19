import { evaluate } from 'mathjs';

const validateInput = (expression, cursorPosition, newText) => {
    const beforeCursor = expression.slice(0, cursorPosition);
    const parts = beforeCursor.split(/[+\-*/\x]/);
    const currentNumber = parts[parts.length - 1].trim();
    
    const checks = {
        isNumber: /[0-9]/.test(newText),
        isDecimal: newText === '.',
        isPercent: newText === '%',
        isOperator: /[+\-*/\x]/.test(newText),

        hasPercent: currentNumber.includes('%'),
        hasDecimal: currentNumber.includes('.'),
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
    if (isResultDisplayed) {
        if (checks.isOperator) {
            newExpr = `Ans${newText}`;
        } else {
            newExpr = newText;
        }

        newCursorPos = newExpr.length;
        updatedIsResultDisplayed = false;
        return { newExpr, newCursorPos, isResultDisplayed: updatedIsResultDisplayed };
    }

    // Handle '0' to '0.'
    if (checks.isDecimal && (checks.isZero || checks.isEmpty)) {
        newExpr = `0.`;
        newCursorPos = 2;
        updatedIsResultDisplayed = false;
        return { newExpr, newCursorPos, isResultDisplayed: updatedIsResultDisplayed };
    }

    // Handle initial '0' replacement
    if (checks.isZero && checks.isNumber) {
        newExpr = newText;
        newCursorPos = newText.length;
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
        
        case 'calculate':
            try {
                // Replace 'Ans' with actual value before evaluation
                const expr = expression.replace(/Ans/g, lastAns.toString())

                result.resultValue = evaluate(expr);
                result.newExpr = String(result.resultValue);
                result.lastAns = (result.resultValue);
                result.newCursorPos = result.newExpr.length;
                result.isResultDisplayed = true
                console.log(result.newExpr)

                return result;
            } catch {
                result.resultValue = 'Error';
                result.isResultDisplayed = true
                console.log(result.newExpr)

                return result;
            }

        default:
            return result;
    }
}