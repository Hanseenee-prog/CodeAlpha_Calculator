import { evaluate } from "mathjs";
import { formatResult } from "./formatResult";

export const handleCalculate = (expression, lastAns, result) => {
    try {
        // Replace 'Ans' with actual value before evaluation
        let expr = expression.replace(/Ans/g, lastAns.toString());

        // Replace '√' with sqrt(text) until the next operator
        if (expr.includes('√')) {
            // This pattern covers basic cases like √25, √3.14, or √(9)
            expr = expr.replace(/√(\d+(\.\d+)?|\((.*?)\))/g, 'sqrt($1)');
            
            // Fallback for cases where maybe just a single character follows √
            expr = expr.replace(/√([^+\-*/\x^])+/g, 'sqrt($1)');
        }

        let evaluatedResult = evaluate(expr);

        // Check for Complex/Invalid Results from mathjs
        if (typeof evaluatedResult === 'object' && 'im' in evaluatedResult && evaluatedResult.im !== 0) {
            throw new Error('Non-real result (Imaginary number)');
        }

        // Format the successful numerical result
        const formattedString = formatResult(evaluatedResult); 

        // Success path
        return {
            ...result, 
            resultValue: formattedString,        
            newExpr: formattedString,            
            lastAns: evaluatedResult,            
            newCursorPos: formattedString.length,
            isResultDisplayed: true,             
            history: {                           
                expr: expr,
                evaluatedResult: String(evaluatedResult)
            }
        };
    } 
    catch {
        return {
            ...result,
            resultValue: 'Error',
            newExpr: 'Error',
            isResultDisplayed: true,
        }
    }
}