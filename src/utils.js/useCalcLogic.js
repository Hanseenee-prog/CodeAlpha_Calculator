import { useState } from "react";
import { handleButtonClick } from './buttonHandler';

export const useCalcLogic = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const onButtonClick = (button) => {
    const state = { expression, result };
    const actions = { setExpression, setResult };
    handleButtonClick(button, state, actions);
  };

  const clear = () => {
    setExpression('0');
    setResult('0');
  };

  return {
    expression,
    result,
    onButtonClick,
    clear
  };
};