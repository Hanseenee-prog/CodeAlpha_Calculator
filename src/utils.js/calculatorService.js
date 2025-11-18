import { evaluate } from 'mathjs';

const insertAtCursor = (expression, cursorPosition, newText, isResultDisplayed) => {
    let newExpr = expression;
    let newCursorPos = cursorPosition;
    let updatedIsResultDisplayed = isResultDisplayed;
    
    // If an operator is clicked after the result is displayed, let the expression be Ans{then new operator}
    if (/[+\-*/\x]/.test(newText) && isResultDisplayed) {
        expression = `Ans${newText}`;
        cursorPosition = 4;
        isResultDisplayed = false;
        console.log('for operator')
    }
    
    // Handle initial '0' replacement
    if ((expression === '0' || expression === 0) && newText !== '.') {
        expression = newText.toString();
        cursorPosition = newText.length;
        isResultDisplayed = false;
        console.log('for number')
    }

    // Condition for decimal behaviour
    if (newText === '.') {
        const parts = expression.slice(0, cursorPosition).split(/[+\-*/\x]/);
        const lastNumber = parts[parts.length - 1];

        if (!lastNumber.includes('.')) {
            // If the current expression is 0, replace it with 0.
            if (expression === '0' || expression === 0) {
                expression = '0.';
            }
        };

        console.log('for decimal')
        isResultDisplayed = false;
    }

    const newExpr = 
        expression.slice(0, cursorPosition) +
        newText +
        expression.slice(cursorPosition)

    const newCursorPos = cursorPosition + newText.length;
    return { newExpr, newCursorPos, isResultDisplayed }
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