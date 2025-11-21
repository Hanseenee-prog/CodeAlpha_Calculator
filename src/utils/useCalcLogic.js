import { useState, useCallback } from "react";
import { handleButtonClick } from './buttonHandler';
import { handleCalculationAction } from "./calculatorService";
import { useKeyboardSupport } from "./useKeyboardSupport";

export const useCalcLogic = () => {
    const [expression, setExpression] = useState('0');
    const [result, setResult] = useState('0');
    const [lastAns, setLastAns] = useState('0'); // For controlling the 'Ans' button
    const [isResultDisplayed, setIsResultDisplayed] = useState(false);

    // Add cursor position state
    const [cursorPosition, setCursorPosition] = useState(1) // Start after the first number '0'

    // Function to move the cursor
    const moveCursor = useCallback(direction => {
        setCursorPosition(prevPosition => {
            if (direction === 'left') return Math.max(0, prevPosition - 1); // Cursor never goes beyond 0
            else if (direction === 'right') return Math.min(expression.length, prevPosition + 1); // Cursor never goes beyond expression's length

            return prevPosition;
        })
    }, [expression.length]);

    const handleAction = useCallback((actionType, value) => {
        const updates = handleCalculationAction(actionType, expression, isResultDisplayed, lastAns, cursorPosition, value);

        setExpression(updates.newExpr);
        setCursorPosition(updates.newCursorPos);
        setLastAns(updates.lastAns);
        setResult(updates.resultValue);
        setIsResultDisplayed(updates.isResultDisplayed);
        
    }, [cursorPosition, isResultDisplayed, expression, lastAns]);

    useKeyboardSupport(handleAction, moveCursor);

    const onButtonClick = (button) => {
        const state = { expression, result, lastAns };
        
        const actions = { 
            setExpression, 
            setResult, 
            moveCursor,
            handleAction,
            setIsResultDisplayed 
        };

        handleButtonClick(button, state, actions);
    };

    const clear = () => {
        setExpression('0');
        setResult('0');
        setCursorPosition(1);
    };

    return {
        expression,
        result,
        onButtonClick,
        clear,
        cursorPosition,
        isResultDisplayed,
        setIsResultDisplayed
    };
};