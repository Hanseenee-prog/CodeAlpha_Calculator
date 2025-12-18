export const prepareExpressionForEvaluation = (expression, lastAns) => {
    let expr = expression.replace(/,/g, '');
    
    expr = expr.replace(/(π|×|÷)/g, (match) => {
        if (match === 'π') return Math.PI.toString();
        if (match === '×') return '*';
        if (match === '÷') return '/';
    });

    // Permutations and Combinations
    expr = expr.replace(/(\d+(?:\.\d+)?|\([^()]+\))P(\d+(?:\.\d+)?|\([^()]+\))/g, 'permutations($1, $2)');
    expr = expr.replace(/(\d+(?:\.\d+)?|\([^()]+\))C(\d+(?:\.\d+)?|\([^()]+\))/g, 'combinations($1, $2)');

    // Replace 'Rand' with a random number or 'Ans' with last answer
    expr = expr.replace(/(\d+(\.\d+)?|\))?(Ans|Rand)/g, (match, prev) => {
        let value;
        if (match.includes('Ans')) value = lastAns.toString();
        else if (match.includes('Rand')) value = Math.random();

        return prev ? `${prev}*${value}` : `${value}`;
    });

    const basePatternSource = '(\\d+(?:\\.\\d+)?|\\((?:.*?)\\)|[a-zA-Z]+)';

    // Handle Nthroot (Dual-Argument) Replacement: [index]ʸ√[base] -> nthroot(base, index)
    const nthRootPattern = new RegExp(`(${basePatternSource})ʸ√(${basePatternSource})`, 'g');
   
    expr = expr.replace(
        nthRootPattern,
        (match, index, _a, base) => {
            return `nthRoot(${base}, ${index})`;
        }
    );


    // Handle Superscript Replacements (² and ³)
    expr = expr.replace(new RegExp(`${basePatternSource}³`, 'g'), 'cube($1)');
    expr = expr.replace(new RegExp(`${basePatternSource}²`, 'g'), 'square($1)');

    // Handle Single-Argument Function/Symbol Replacements (√, sin, log, etc.)
    const singleArgSymbols = ['√', '∛', 'sin', 'cos', 'tan', 'ln', 'log', 'abs'];

    singleArgSymbols.forEach(symbol => {
        const pattern = new RegExp(`${symbol}${basePatternSource}`, 'g');
        const funcName = (symbol === 'ln' ? 'log' : symbol === 'log' ? 'log10' : symbol === '√' ? 'sqrt' : symbol === '∛' ? 'cbrt' : symbol);
        expr = expr.replace(pattern, `${funcName}($1)`);
    });
    
    return expr;
};
