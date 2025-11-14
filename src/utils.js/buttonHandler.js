import { evaluate } from 'mathjs';

let isResultDisplayed = false;

export const handleButtonClick = (button, state, actions) => {
    const { expression, result, lastAns } = state;
    const { 
        setExpression, 
        setResult, 
        setLastAns, 
        setCursorPosition, 
        updateExpressionAtCursor, 
        moveCursor, 
        handleDeleteAtCursor, 
        setIsResultDisplayed
    } = actions;

    const { type, value, label, func } = button;

    switch (type) {
        case 'number':
        case 'operator':
        case 'decimal':
        case 'answer':
            // If expression is zero, replace it with ans
            // Else add it to the current expression
            updateExpressionAtCursor(value);
            break; 

        case 'equals':
            try {
                // Replace 'Ans' with actual value before evaluation
                const expr = expression.replace(/Ans/g, lastAns.toString())
                const calculatedResult = evaluate(expr);

                setResult(calculatedResult);
                setExpression(calculatedResult.toString());
                setLastAns(calculatedResult);
                setIsResultDisplayed(true);
                setCursorPosition(calculatedResult.toString().length);

                isResultDisplayed = true;
            } catch (error) {
                setResult('Error', error);
                setIsResultDisplayed(true);
            }
            break;

        case 'move_left':
            moveCursor('left');
            break;

        case 'move_right':
            moveCursor('right');
            break;

        case 'DEL': 
            handleDeleteAtCursor();
            break;

        case 'clear':
            setExpression('0');
            setResult('0');
            setIsResultDisplayed(false);
            break;

        default:
            console.warn(`Unknown button type: ${type}`);
    }
}