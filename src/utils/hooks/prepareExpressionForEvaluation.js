// import { evaluate, unit } from "mathjs";
// import { formatResult } from "../../helpers/formatResult";

// Helper function to handle robust symbol/function replacements before evaluation
export const prepareExpressionForEvaluation = (expression, lastAns) => {
    let expr = expression;

    // Replace 'Ans' with actual value
    expr = expr.replace(/Ans/g, lastAns.toString());

    expr = expr.replace(/(\d+(\.\d+)?|\((.*?)\))³/g, 'cube($1)');

    // For x²: 
    expr = expr.replace(/(\d+(\.\d+)?|\((.*?)\))²/g, 'square($1)');

    // For √ (back to the symbol approach):
    expr = expr.replace(/√(\d+(\.\d+)?|\((.*?)\))/g, 'sqrt($1)');
    
    return expr;
};
