import { create, all } from "mathjs";
import { formatResult } from "../../helpers/formatResult";
import { prepareExpressionForEvaluation } from "../../helpers/prepareExpressionForEvaluation";

const math = create(all);

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

export const handleCalculate = (expression, lastAns, result, angleMode, settings) => {
    try {
        let expr = prepareExpressionForEvaluation(expression, lastAns);

        const evaluatedResult = math.evaluate(expr, {
            sin: (x) => angleMode === 'degrees' ? Math.sin(x * DEG_TO_RAD) : Math.sin(x),
            cos: (x) => angleMode === 'degrees' ? Math.cos(x * DEG_TO_RAD) : Math.cos(x),
            tan: (x) => angleMode === 'degrees' ? Math.tan(x * DEG_TO_RAD) : Math.tan(x),

            asin: (x) => angleMode === 'degrees' ? Math.asin(x) * RAD_TO_DEG : Math.asin(x),
            acos: (x) => angleMode === 'degrees' ? Math.acos(x) * RAD_TO_DEG : Math.acos(x),
            atan: (x) => angleMode === 'degrees' ? Math.atan(x) * RAD_TO_DEG : Math.atan(x),
            permutations: math.permutations,
            combinations: math.combinations,
        });

        // Check for Complex/Invalid Results from mathjs
        if (typeof evaluatedResult === 'object' && 'im' in evaluatedResult && evaluatedResult.im !== 0) {
            throw new Error('Non-real result (Imaginary number)');
        }

        // Format the successful numerical result
        const formattedString = formatResult(evaluatedResult, settings); 

        // Success path
        return {
            ...result, 
            resultValue: formattedString,        
            newExpr: formattedString,            
            lastAns: evaluatedResult,            
            newCursorPos: formattedString.length,
            isResultDisplayed: true,             
            history: {                           
                expr: expression,
                evaluatedResult: String(evaluatedResult)
            }
        };
    } 
    catch {
        return {
            ...result,
            resultValue: 'Error',
            newExpr: 'Error',
            newCursorPos: 'Error'.length,
            isResultDisplayed: true,
        }
    }
}