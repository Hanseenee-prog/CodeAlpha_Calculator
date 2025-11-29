export const parseVoiceCommand = (text) => {
    let command = text.toLowerCase().trim();

    // Split by action words first
    const parts = command.split(/\b(equals?|equal to|calculate|clear|delete|backspace|negate|plus minus|reciprocal|1 over x|inverse of|move left|move right|left|right)\b/)
    
    const commands = [];

    for (let part of parts) {
        part = part.trim();
        if (!part) continue;

        // Check if it's an action command
        if (part === 'equals' || part === 'equal' || part === 'calculate') commands.push({ type: 'calculate' });
        else if (part === 'clear' || part === 'clean') commands.push({ type: 'clear' });
        else if (part === 'delete' || part === 'backspace') commands.push({ type: 'delete' });
        else if (part === 'negate' || part === 'plus minus') commands.push({ type: 'negate' });
        else if (part === 'reciprocal' || part === '1 over x' || part === 'inverse of x') commands.push({ type: 'reciprocal' });
        else if (part === 'move left' || part === 'left') commands.push({ type: 'left' });
        else if (part === 'move right' || part === 'right') commands.push({ type: 'right' });

        else {
            // It's a number/expression - clean and convert
            let cleanedPart = part;

            const numberWords = {
                'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4',
                'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'
            };

            Object.keys(numberWords).forEach(word => {
                // Use a global regular expression to replace ALL instances of the word
                // The \b ensures we only match whole words (e.g., prevents changing "lone" to "l1")
                const regex = new RegExp(`\\b${word}\\b`, 'g');
                command = command.replace(regex, numberWords[word]);
            });            

            // Replace Operators
            cleanedPart = cleanedPart.replace(/times|multiply/g, '*');
            cleanedPart = cleanedPart.replace(/divide|divided by/g, '/');
            cleanedPart = cleanedPart.replace(/add|plus/g, '+');
            cleanedPart = cleanedPart.replace(/minus|subtract/g, '-');
            cleanedPart = cleanedPart.replace(/x/gi, '*');
            cleanedPart = cleanedPart.replace(/square root|root/g, '√');
            cleanedPart = cleanedPart.replace(/answer/, 'Ans');  
            cleanedPart = cleanedPart.replace(/point/g, '.'); 
            cleanedPart = cleanedPart.replace(/percent/g, '%'); 

            // Remove spaces and punctuation marks
            cleanedPart = cleanedPart.replace(/[,!?;]/g, ''); 
            cleanedPart = cleanedPart.replace(/\s+/g, '');
            
            // If valid expression, add it
            if (/^[\d+\-*/%.√()Ans]+$/.test(cleanedPart)) {
                commands.push({ type: 'insert_text', value: cleanedPart })
            }
        }

        // Return array of comments or single command
        return commands.length === 1 ? commands[0] : commands.length > 1 ? commands : null;
    }
}