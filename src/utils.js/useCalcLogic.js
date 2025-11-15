import { useState, useCallback } from "react";
import { handleButtonClick } from './buttonHandler';

export const useCalcLogic = () => {
    const [expression, setExpression] = useState('0');
    const [result, setResult] = useState('0');
    const [lastAns, setLastAns] = useState('0'); // For controlling the 'Ans' button
    const [isResultDisplayed, setIsResultDisplayed] = useState(false);

    // Add cursor position state
    const [cursorPosition, setCursorPosition] = useState(1) // Start after the first number '0'

    // Function to update expression respecting the cursor position
    const updateExpressionAtCursor = useCallback((newText) => {
        // If an operator is clicked after the result is display, let the expression be Ans{then new operator}
        if (/[+\-*/\x]/.test(newText) && isResultDisplayed) {
            setExpression('Ans' + newText);
            setCursorPosition(4);
            setIsResultDisplayed(false);
            return;
        } 
        
        // Handle initial '0' replacement
        if ((expression === '0' || expression === 0) && newText !== '.') {
            setExpression(newText);
            setCursorPosition(newText.length);
            return;
        }

        if (newText === '.') {
            const parts = expression.slice(0, cursorPosition).split(/[+\-*/\x]/);
            const lastNumber = parts[parts.length - 1];

            if (!lastNumber.includes('.')) {
                // If the current expression is 0, replace it with 0.
                if (expression === '0' || expression === 0) {
                    setExpression('0.');
                } else {
                    setExpression(expression + '.');
                }
            };

            setIsResultDisplayed(false);
            setCursorPosition(newText.length + cursorPosition);
            return;
        }

        if (isResultDisplayed) {
            setExpression(newText);
            setCursorPosition(newText.length);
            setIsResultDisplayed(false);
            return;
        }

        setExpression(prevExpr => {
            const newExpr = 
                    prevExpr.slice(0, cursorPosition) + 
                    newText +
                    prevExpr.slice(cursorPosition);

            setCursorPosition(newText.length + cursorPosition);
            return newExpr;
        })
    }, [expression, cursorPosition, isResultDisplayed]);

    // Function to move the cursor
    const moveCursor = useCallback(direction => {
        setCursorPosition(prevPosition => {
            if (direction === 'left') return Math.max(0, prevPosition - 1); // Cursor never goes beyond 0
            else if (direction === 'right') return Math.min(expression.length, prevPosition + 1); // Cursor never goes beyond expression's length

            return prevPosition;
        })
    }, [expression.length]);

    // Function to handle delete at cursor
    const handleDeleteAtCursor = useCallback(() => {
        setExpression(prevExpr => {
            if (cursorPosition > 0) {
                const newExpr = prevExpr.slice(0, cursorPosition - 1) + prevExpr.slice(cursorPosition);
                
                // If the display is empty replace it with 0
                if (newExpr === '') {
                    setCursorPosition(1);
                    return '0';
                } else {
                    setCursorPosition(cursorPosition - 1);
                    return newExpr;
                }
            }
            return prevExpr;
        })

        setIsResultDisplayed(false);
    }, [cursorPosition]);

    const onButtonClick = (button) => {
        const state = { expression, result, lastAns };
        
        const actions = { 
            setExpression, 
            setResult, 
            setLastAns, 
            setCursorPosition,
            updateExpressionAtCursor, 
            moveCursor,
            handleDeleteAtCursor,
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