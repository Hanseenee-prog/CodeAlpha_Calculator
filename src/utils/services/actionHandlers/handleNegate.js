import { getCurrentNumberAfterCursor } from './../../getCurrentNumberAfterCursor';

export const handleNegate = (expression, cursorPosition, result) => {
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