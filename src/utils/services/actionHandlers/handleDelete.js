export const handleDelete = (expression, cursorPosition, result) => {
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
            return {
                ...result,
                newExpr: '0',
                newCursorPos: 1,
            }
        } else {
            return {
                ...result,
                newExpr: newExpr,
                newCursorPos: newCursorPos,
            }
        }
    }
    return result; 
};