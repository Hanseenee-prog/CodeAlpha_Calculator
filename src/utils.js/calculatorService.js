import { evaluate } from 'mathjs';

const insertAtCursor = (expression, cursorPosition, newText, isResultDisplayed) => {
    let newExpr = expression;
    let newCursorPos = cursorPosition;
    let updatedIsResultDisplayed = isResultDisplayed;

    // If an operator is clicked after the result is displayed, let the expression be Ans{then new operator}
    if (/[+\-*/\x]/.test(newText) && isResultDisplayed) {
        newExpr = `Ans${newText}`;
        newCursorPos = newExpr.length;
        updatedIsResultDisplayed = false;
        console.log('for operator')
        return { newExpr, newCursorPos, isResultDisplayed: updatedIsResultDisplayed };
    }
    
    // If result is displayed and user types anything else, replace expression
    if (isResultDisplayed && !/[+\-*/\x]/.test(newText)) {
        if (newText === '.') {
            newExpr = '0.'
            newCursorPos = 2;
        }
        else {
            newExpr = newText;
            newCursorPos = newText.length;
        }

        updatedIsResultDisplayed = false;
        return { newExpr, newCursorPos, isResultDisplayed: updatedIsResultDisplayed };
    }

    // Handle initial '0' replacement
    if ((newExpr === '0' || newExpr === 0) && newText !== '.') {
        newExpr = newText;
        newCursorPos = newText.length;
        updatedIsResultDisplayed = false;
        return { newExpr, newCursorPos, isResultDisplayed: updatedIsResultDisplayed };
    }

    // Handle decimal - check if current number already has one
    if (newText === '.') {
        const beforeCursor = newExpr.slice(0, cursorPosition);
        const parts = beforeCursor.split(/[+\-*/\x]/);
        const lastNumber = parts[parts.length - 1];

        if (lastNumber.includes('.')) {
            // Already has decimal, don't add
            return { newExpr, newCursorPos, isResultDisplayed: updatedIsResultDisplayed };
        };

        // Handle '0' to '0.'
        if (newExpr === '0' || newExpr === '') {
            newExpr = '0.';
            newCursorPos = 2;
            return { newExpr, newCursorPos, isResultDisplayed: updatedIsResultDisplayed };
        }
    }

    // Normal insertion at cursor position
    newExpr = 
        newExpr.slice(0, cursorPosition) +
        newText +
        newExpr.slice(cursorPosition)

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