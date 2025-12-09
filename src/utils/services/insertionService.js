import { validateInput } from './validationService';

export const insertAtCursor = (expression, cursorPosition, newText, isResultDisplayed) => {
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