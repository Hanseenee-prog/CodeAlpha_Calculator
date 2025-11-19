export const getCurrentNumberAfterCursor = (expression, cursorPosition) => {
    const expr = expression.toString();
    const operators = /[+\-*/\x]/;

    let startIndex = cursorPosition;
    while (startIndex > 0 && !operators.test(expr[startIndex - 1])) {
        startIndex--;
    }

    let endIndex = cursorPosition;
    while (endIndex < expr.length && !operators.test(expr[endIndex])) {
        endIndex++;
    }

    const currentNumber = expression.slice(startIndex, endIndex).trim();

    return { startIndex, endIndex, currentNumber };
}