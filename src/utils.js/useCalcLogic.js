import { useState, useCallback } from "react";
import { handleButtonClick } from './buttonHandler';
import { handleCalculationAction } from "./calculatorService";

export const useCalcLogic = () => {
    const [expression, setExpression] = useState('0');
    const [result, setResult] = useState('0');
    const [lastAns, setLastAns] = useState('0'); // For controlling the 'Ans' button
    const [isResultDisplayed, setIsResultDisplayed] = useState(false);

    // Add cursor position state
    const [cursorPosition, setCursorPosition] = useState(1) // Start after the first number '0'

    // Function to update expression respecting the cursor position
    // const updateExpressionAtCursor = useCallback((newText) => {
    //     // If an operator is clicked after the result is display, let the expression be Ans{then new operator}
    //     if (/[+\-*/\x]/.test(newText) && isResultDisplayed) {
    //         setExpression('Ans' + newText);
    //         setCursorPosition(4);
    //         setIsResultDisplayed(false);
    //         return;
    //     } 
        
    //     // Handle initial '0' replacement
    //     if ((expression === '0' || expression === 0) && newText !== '.') {
    //         setExpression(newText);
    //         setCursorPosition(newText.length);
    //         return;
    //     }

    //     // Condition for decimal behaviour
    //     if (newText === '.') {
    //         const parts = expression.slice(0, cursorPosition).split(/[+\-*/\x]/);
    //         const lastNumber = parts[parts.length - 1];

    //         if (!lastNumber.includes('.')) {
    //             // If the current expression is 0, replace it with 0.
    //             if (expression === '0' || expression === 0) {
    //                 setExpression('0.');
    //             } else {
    //                 setExpression(expression + '.');
    //             }
    //         };

    //         setIsResultDisplayed(false);
    //         setCursorPosition(newText.length + cursorPosition);
    //         return;
    //     }

    //     if (isResultDisplayed) {
    //         setExpression(newText);
    //         setCursorPosition(newText.length);
    //         setIsResultDisplayed(false);
    //         return;
    //     }

    //     // If no condition was met above, this would then run
    //     setExpression(prevExpr => {
    //         const newExpr = 
    //                 prevExpr.slice(0, cursorPosition) + 
    //                 newText +
    //                 prevExpr.slice(cursorPosition);

    //         setCursorPosition(newText.length + cursorPosition);
    //         return newExpr;
    //     })
    // }, [expression, cursorPosition, isResultDisplayed]);

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
        console.log('Ran')

        setExpression(updates.newExpr);
        console.log('Ran again', updates.newExpr)

        setCursorPosition(updates.newCursorPos);
        setLastAns(updates.lastAns);
        setResult(updates.resultValue);
        setIsResultDisplayed(updates.isResultDisplayed);
    }, [cursorPosition, isResultDisplayed, expression, lastAns])

    const onButtonClick = (button) => {
        const state = { expression, result, lastAns };
        
        const actions = { 
            setExpression, 
            setResult, 
            // setLastAns, 
            // setCursorPosition,
            // updateExpressionAtCursor,
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