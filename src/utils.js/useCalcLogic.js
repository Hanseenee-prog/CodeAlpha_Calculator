import { useState } from "react";
import { handleButtonClick } from './buttonHandler';

export const useCalcLogic = () => {
    const [expression, setExpression] = useState('0');
    const [result, setResult] = useState('0');
    const [lastAns, setLastAns] = useState('0');

    const onButtonClick = (button) => {
        const state = { expression, result, lastAns };
        const actions = { setExpression, setResult, setLastAns };
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