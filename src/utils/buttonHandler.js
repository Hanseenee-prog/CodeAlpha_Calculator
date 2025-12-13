export const handleButtonClick = (button, state, actions) => {
    const { 
        moveCursor, 
        handleAction, 
        setAngleMode
    } = actions;

    const { type, value, func, label } = button;

    // Logic for function/constant buttons that need special handling
    let valueToInsert = func;

    if (type === 'function') {
        const needsParenthesis = ['sin', 'cos', 'tan', 'ln', 'log', 'sqrt', 'cbrt', 'abs', 'ʸ√', 'factorial', 'exp'].includes(func);

        if (needsParenthesis) valueToInsert = `${func}(`; 
    }

    switch (type) {
        // --- Insert Text Actions (General) ---
        case 'number':
        case 'operator': 
        case 'decimal': 
        case 'percent': 
        case 'answer':  
        case 'bracket':
        case 'constant':
            handleAction('insert_text', value);
            break; 
            
        // --- Insert Text Actions (Functions) ---
        case 'function': 
            handleAction('insert_text', valueToInsert); 
            break;

        // --- Operational Actions (No text insertion) ---
        case 'equals':
            handleAction('calculate');
            break;

        case 'clear':
            handleAction('clear');
            break;

        case 'DEL': 
            handleAction('delete');
            break;

        case 'move_left': 
            moveCursor('left');
            break;

        case 'move_right': 
            moveCursor('right');
            break;
        
        case 'reciprocal':
            handleAction('reciprocal');
            break;
        
        case 'negate':
            handleAction('negate');
            break;

        // --- Memory Actions (Action type matches the button type string) ---
        case 'memory-store':
        case 'memory-add':
        case 'memory-subtract':
        case 'memory-clear':
        case 'memory-recall':
            handleAction(type);
            break;

        // --- Mode Toggles ---
        case 'angle-mode':
            if (setAngleMode) setAngleMode(label); 
            break;

        case 'secondary':
            console.log("Toggle secondary functions UI state here");
            break;

        default:
            console.warn(`Unknown button type: ${type}`);
    }
}
