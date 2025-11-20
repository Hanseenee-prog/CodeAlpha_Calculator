export const handleButtonClick = (button, state, actions) => {
    // const { expression, result, lastAns } = state;
    const { 
        setExpression, 
        setResult, 
        moveCursor, 
        handleAction, 
        setIsResultDisplayed
    } = actions;

    const { type, value, /*label, func*/ } = button;

    switch (type) {
        case 'number':
        case 'operator':
        case 'decimal':
        case 'percent':
        case 'sqrt':
        case 'answer':
            // If expression is zero, replace it with ans
            // Else add it to the current expression
            handleAction('insert_text', value);
            break; 

        case 'equals':
            handleAction('calculate')
            break;

        case 'move_left':
            moveCursor('left');
            break;

        case 'move_right':
            moveCursor('right');
            break;

        case 'DEL': 
            handleAction('delete');
            break;
        
        case 'reciprocal':
            handleAction('reciprocal')
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