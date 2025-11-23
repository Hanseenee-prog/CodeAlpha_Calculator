export const parseVoiceCommand = (text) => {
    let command = text.toLowerCase().trim();

    // Commands for functions
    if (command.includes('negate') || command.includes('plus minus')) return {type: 'negate'};
    if (command.includes('reciprocal') || command.includes('1 over x') || command.includes('inverse of x')) return {type: 'reciprocal'};

    // Commands without additional data
    if (command.includes('equals') || command.includes('equal to')) return {type: 'equals'};
    if (command.includes('clear')) return {type: 'clear'};
    if (command.includes('delete') || command.includes('backspace')) return {type: 'delete'};
    if (command.includes('move left') || command.includes('left')) return {type: 'left'};
    if (command.includes('move right') || command.includes('right')) return {type: 'right'};

    // Clean up command text
    command = command.replace(/\s+/g, ''); // Remove extra spaces
    command = command.replace(/answer/, 'Ans'); // Remove leading verbs
    command = command.replace(/[.,!?;]/g, ''); // Remove punctuation
    command = command.replace(/sqrt/g, '√'); // Replace sqrt with √
    command = command.replace(/root/g, '√'); // Replace sqrt with √
    command = command.replace(/x/gi, '*'); // Replace x with *
    command = command.replace(/point/g, '.'); // Replace point with .
    command = command.replace(/percent/g, '%'); // Replace percent with %

    // If the command is now a valid expression, return it
    if (/^[\d+\-*/%.√()Ans]+$/.test(command)) {
        console.log('Type added:', command)
        return {type: 'insert_text', value: command};
    }

    return null; // Default return for unhandled cases
}