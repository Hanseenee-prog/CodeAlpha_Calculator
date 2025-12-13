export const prepareExpressionForEvaluation = (expression, lastAns) => {
    let expr = expression;

    expr = expr.replace(/Ans/g, lastAns.toString());
    expr = expr.replace(/π/g, Math.PI.toString());

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
