import { evaluate } from 'mathjs';

let isResultDisplayed = false;

export const handleButtonClick = (button, state, actions) => {
    const { expression, result, lastAns } = state;
    const { setExpression, setResult, setLastAns } = actions;

    const { type, value, label, func } = button;

    switch (type) {
        case 'number':
            // If expression is zero, replace it with value
            if (expression === '0' || expression === 0) {
                setExpression(value);
                isResultDisplayed = false;
            } else if (isResultDisplayed) {
                setExpression(value);
                isResultDisplayed = false;
            } else {
                setExpression(expression + value);
            }
            break;

        case 'operator':
            if (isResultDisplayed) {
                setExpression('Ans' + value); 
            } else {
                setExpression(expression + value);
            }

            isResultDisplayed = false;
            break;

        case 'decimal': {
            // Get the last number being typed after the last operator
            const lastNumber  = expression.toString().split(/[+\-*/\x]/).pop();
            console.log(lastNumber)

            // Only add decimal if current number doesnt have one
            if (!lastNumber.includes('.')) {
                if (expression === '0' || expression === 0) setExpression('0.');
                else setExpression(expression + '.');
            }
            break;
        }

        case 'equals':
            try {
                // Replace 'Ans' with actual value before evaluation
                const expr = expression.replace(/Ans/g, lastAns.toString())
                const calculatedResult = evaluate(expr);

                setResult(calculatedResult);
                setExpression(calculatedResult.toString());
                setLastAns(calculatedResult);

                isResultDisplayed = true;
            } catch (error) {
                setResult('Error', error);
            }
            break;

        case 'answer':
            // If expression is zero, replace it with ans
            // Else add it to the current expression
            setExpression(expression === '0' ? 'Ans' : expression + 'Ans');
            break;

        // case 'DEL': {
        //     let expressionString = expression.toString().split('').splice(0, -1).join();
        //     console.log(expressionString);
        //     setExpression(expressionString)
        //     break;
        // }

        case 'clear':
            setExpression('0');
            setResult('0');
            break;

        default:
            console.warn(`Unknown button type: ${type}`);
    }
}