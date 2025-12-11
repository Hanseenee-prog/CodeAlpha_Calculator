export const handleButtonClick = (button, state, actions) => {
    // const { expression, result, lastAns } = state;
    const { 
        moveCursor, 
        handleAction, 
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
        
        case 'negate':
            handleAction('negate');
            break;

        case 'clear':
            handleAction('clear');
            break;

        case 'memory-store':
            handleAction('memory-store');
            break;

        case 'memory-add':
            handleAction('memory-add');
            break;

        case 'memory-subtract': 
            handleAction('memory-subtract');
            break;

        case 'memory-clear':
            handleAction('memory-clear');
            break;

        case 'memory-recall':
            handleAction('memory-recall');
            break;

        default:
            console.warn(`Unknown button type: ${type}`);
    }
}