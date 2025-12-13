import { evaluate } from "mathjs";
import { formatResult } from "../../helpers/formatResult";
import { prepareExpressionForEvaluation } from "../../hooks/prepareExpressionForEvaluation";

export const handleCalculate = (expression, lastAns, result) => {
    try {
        let expr = prepareExpressionForEvaluation(expression, lastAns);

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