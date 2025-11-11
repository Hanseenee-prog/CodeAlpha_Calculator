import { evaluate } from 'mathjs';
import { useCalcLogic } from './useCalcLogic';

export const handleButtonClick = () => {
    const { expression, result, updateExpression, evaluateCurrentExpression, clearEntry, clear } = useCalcLogic();

    switch (button) {
      case 'C':
        clear();
        break;

      case 'CE':
        clearEntry();
        break;

      case '=':
        evaluateCurrentExpression();
        break;

      case '←':
        setExpression(prev => prev.slice(0, -1));
        break;

      case '√':
        try {
          const res = Math.sqrt(evaluate(expression));
          setResult(res);
        } catch {
          setResult('Error');
        }
        break;

      default:
        updateExpression(button);
        break;
    }
}