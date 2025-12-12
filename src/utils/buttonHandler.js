export const handleButtonClick = (button, state, actions) => {
    // const { expression, result, lastAns } = state;
    const { 
        moveCursor, 
        handleAction, 
    } = actions;

    const { type, value, label, func } = button;

    const trigRegex = /(tan|cos|sin|ln|log)/;
    const powerRegex = /(³|²)/;
    const rootAndConstantRegex = /(√|∛|π)/;

    let valueToInsert;

    if (trigRegex.test(func) || rootAndConstantRegex.test(func)) valueToInsert = `${func}(`; 
    else if (powerRegex.test(func)) valueToInsert = func; 
    else valueToInsert = ''; 

    switch (type) {
        case 'number':
        case 'operator':
        case 'decimal':
        case 'percent':
        case 'sqrt':
        case 'answer':
        case 'bracket':
        case 'constant':
            handleAction('insert_text', value);
            break; 

        case 'function': 
            handleAction('insert_text', valueToInsert); 
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
        case 'memory-add':
        case 'memory-subtract':
        case 'memory-clear':
        case 'memory-recall':
            handleAction(type);
            break;

        default:
            console.warn(`Unknown button type: ${type}`);
    }
}