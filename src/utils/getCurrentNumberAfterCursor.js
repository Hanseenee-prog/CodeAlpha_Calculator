export const getCurrentNumberAfterCursor = (expression, cursorPosition) => {
    const expr = expression.toString();
    const operators = /[+\-*/\x]/;

    let searchStart = cursorPosition;

    // If character before the cursor is a closing parentheses, start searching before it
    if (searchStart > 0 && expr[searchStart - 1] === ')') searchStart--;

    let startIndex = searchStart;

    // As long as no operator is found, keeping looping behind and update the startIndex
    while (startIndex > 0 && !operators.test(expr[startIndex - 1])) {
        if (expr[startIndex - 1] === '(') break;
        startIndex--;
    }

    let endIndex = searchStart;
    // As long as no operator is found, keeping looping forward and update the endIndex
    while (endIndex < expr.length && !operators.test(expr[endIndex])) {
        // If character before the cursor is a closing parentheses, stop the loop
        if (expr[endIndex] === ')') break;
        endIndex++;
    }

    const currentNumber = expression.slice(startIndex, endIndex).trim();

    return { startIndex, endIndex, currentNumber };
}