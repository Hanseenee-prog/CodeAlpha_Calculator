import { evaluate } from 'mathjs';

export const handleButtonClick = (button, state, actions) => {
    const { expression, result } = state;
    const { setExpression, setResult } = actions;

    const { type, value, label, func } = button;

    switch (type) {
      case 'number':
        if (expression === '0' || expression === 0) {
            setExpression(value);
        } else {
            setExpression(expression + value);
        }
        break;

      case 'operator':
        setExpression(expression + ' ' + value + ' ');
        break;

      case 'decimal':
        if (!expression.toString().split(' ').pop().includes('.')) {
            setExpression(expression + '.');
        }
        break;

      case 'equals':
        try {
            const calculatedResult = evaluate(expression.toString());
            setResult(calculatedResult);
            setExpression(calculatedResult.toString());
        } catch (error) {
            setResult('Error');
        }
        break;

      case 'clear':
        setExpression('0');
        setResult('0');
        break;

      default:
        console.warn(`Unknown button type: ${type}`);
    }
}