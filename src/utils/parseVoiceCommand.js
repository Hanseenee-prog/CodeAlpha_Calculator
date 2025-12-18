export const parseVoiceCommand = (text) => {
    let commandText = text.toLowerCase().trim();

    // 1. Regex to split the sentence by command keywords
    const actionRegex = /\b(equals?|equal to|calculate|result|is|clear|clean|delete|backspace|negate|plus minus|reciprocal|1 over x|inverse of|move left|move right|left|right|memory store|store|memory recall|recall|memory plus|memory add|memory clear|memory minus|absolute|absolute value|factorial|random|rand|sine|sin|cosine|cos|tangent|tan|logarithm|log|natural log|ln|pi|squared|cubed|power of|to the power|open bracket|parenthesis|close bracket|close parenthesis)\b/;

    const parts = commandText.split(actionRegex);
    const commands = [];

    for (let part of parts) {
        if (!part) continue;
        part = part.trim();

        // Basic Action Commands
        if (['equals', 'equal', 'calculate', 'result', 'is'].includes(part)) commands.push({ type: 'calculate' });
        else if (['clear', 'clean'].includes(part)) commands.push({ type: 'clear' });
        else if (['delete', 'backspace'].includes(part)) commands.push({ type: 'delete' });
        else if (['negate', 'plus minus'].includes(part)) commands.push({ type: 'negate' });
        else if (['reciprocal', '1 over x', 'inverse of'].includes(part)) commands.push({ type: 'reciprocal' });
        else if (['move left', 'left'].includes(part)) commands.push({ type: 'left' });
        else if (['move right', 'right'].includes(part)) commands.push({ type: 'right' });
        
        // Memory Commands
        else if (['memory store', 'store'].includes(part)) commands.push({ type: 'memory-store' });
        else if (['memory recall', 'recall'].includes(part)) commands.push({ type: 'memory-recall' });
        else if (['memory plus', 'memory add'].includes(part)) commands.push({ type: 'memory-add' });
        else if (['memory minus'].includes(part)) commands.push({ type: 'memory-subtract' });
        else if (['memory clear'].includes(part)) commands.push({ type: 'memory-clear' });
        
        // Scientific Function Commands (Explicit Push)
        else if (['absolute', 'absolute value'].includes(part)) commands.push({ type: 'insert_text', value: 'abs(' });
        else if (['factorial'].includes(part)) commands.push({ type: 'insert_text', value: '!' });
        else if (['random', 'rand'].includes(part)) commands.push({ type: 'insert_text', value: 'Rand' });
        else if (['sine', 'sin'].includes(part)) commands.push({ type: 'insert_text', value: 'sin(' });
        else if (['cosine', 'cos'].includes(part)) commands.push({ type: 'insert_text', value: 'cos(' });
        else if (['tangent', 'tan'].includes(part)) commands.push({ type: 'insert_text', value: 'tan(' });
        else if (['logarithm', 'log'].includes(part)) commands.push({ type: 'insert_text', value: 'log(' });
        else if (['natural log', 'ln'].includes(part)) commands.push({ type: 'insert_text', value: 'ln(' });
        else if (['exponential', 'exp'].includes(part)) commands.push({ type: 'insert_text', value: 'exp(' });
        else if (['ten raised to the power'].includes(part)) commands.push({ type: 'insert_text', value: '10^(' });
        else if (['pi', 'pie', 'by', 'buy', 'p'].includes(part)) commands.push({ type: 'insert_text', value: 'π' });
        else if (['squared', 'raised to the power of 2'].includes(part)) commands.push({ type: 'insert_text', value: '²' });
        else if (['cubed', 'raised to the power of 3'].includes(part)) commands.push({ type: 'insert_text', value: '³' });
        else if (['square root', 'root', 'square roots', 'roots'].includes(part)) commands.push({ type: 'insert_text', value: '√' });
        else if (['cube root', 'raised to the power of 1/3', 'third'].includes(part)) commands.push({ type: 'insert_text', value: '∛' });
        else if (['nth root', 'y root', 'n root', 'radical', 'n'].includes(part)) commands.push({ type: 'insert_text', value: 'ʸ√(' });
        else if (['power of', 'to the power'].includes(part)) commands.push({ type: 'insert_text', value: '^' });
        else if (['open bracket', 'parenthesis'].includes(part)) commands.push({ type: 'insert_text', value: '(' });
        else if (['close bracket', 'close parenthesis'].includes(part)) commands.push({ type: 'insert_text', value: ')' });
        else if (['permutation'].includes(part)) commands.push({ type: 'insert_text', value: 'P' });
        else if (['combination'].includes(part)) commands.push({ type: 'insert_text', value: 'C' });

        else {
            // This block handles Numbers and Basic Operators only
            let cleanedPart = part;

            const numberWords = {
                'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4',
                'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'
            };

            Object.keys(numberWords).forEach(word => {
                const regex = new RegExp(`\\b${word}\\b`, 'g');
                cleanedPart = cleanedPart.replace(regex, numberWords[word]);
            });

            // Operator Replacements
            cleanedPart = cleanedPart.replace(/times|multiply|multiplied by/g, '×');
            cleanedPart = cleanedPart.replace(/divide|divided by/g, '÷');
            cleanedPart = cleanedPart.replace(/add|plus/g, '+');
            cleanedPart = cleanedPart.replace(/minus|subtract/g, '-');
            cleanedPart = cleanedPart.replace(/\bx\b/gi, '×');
            cleanedPart = cleanedPart.replace(/square roots?|root/g, '√');
            cleanedPart = cleanedPart.replace(/point|dot/g, '.');
            cleanedPart = cleanedPart.replace(/percent/g, '%');
            cleanedPart = cleanedPart.replace(/answer/g, 'Ans');

            // Cleanup symbols
            cleanedPart = cleanedPart.replace(/[,!?;]/g, '');
            cleanedPart = cleanedPart.replace(/\s+/g, '');

            // STRICT VALIDATION: Only numbers and basic operators allowed here
            if (/^[\d+\-÷×%.√Ans]+$/.test(cleanedPart)) {
                commands.push({ type: 'insert_text', value: cleanedPart });
            }
        }
    }

    // Outside the for loop to prevent duplication bugs
    if (commands.length === 0) return null;
    return commands.length === 1 ? commands[0] : commands;
};