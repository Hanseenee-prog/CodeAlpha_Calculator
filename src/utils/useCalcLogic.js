import { useState, useEffect, useCallback, useRef } from "react";
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

    // Ref to hold latest state for voice commands
    const stateRef = useRef({
        expression: '0',
        result: '0',
        cursorPosition: 1,
        lastAns: '0',
        isResultDisplayed: false
    })

    useEffect(() => {
        stateRef.current = {
            expression,
            result,
            cursorPosition,
            lastAns,
            isResultDisplayed,
        }
    }, [expression, result, cursorPosition, lastAns, isResultDisplayed])

    // Function to move the cursor
    const moveCursor = useCallback(direction => {
        console.log('Command to move', direction)
        setCursorPosition(prevPosition => {
            const expr = stateRef.current.expression;
            if (expr === '0') return prevPosition;

            let newPosition = prevPosition;

            if (direction === 'left') {
                newPosition = Math.max(0, prevPosition - 1); // Cursor never goes beyond 0
                if (prevPosition >= 3 && expr.substring(prevPosition - 3, prevPosition) === 'Ans') return prevPosition - 3;
            }
            else if (direction === 'right') {
                newPosition = Math.min(expr.length, prevPosition + 1); // Cursor never goes beyond expression's length
                if (expr.substring(prevPosition, prevPosition + 3) === 'Ans') return prevPosition + 3;
            }

            stateRef.current.cursorPosition = newPosition;
            return newPosition;
        })
    }, []);

    const handleAction = useCallback((actionType, value) => {
        // Get current state from ref
        const currentState = stateRef.current;

        // Get the updates to the state
        const updates = handleCalculationAction(
            actionType,
            currentState.expression,
            currentState.isResultDisplayed,
            currentState.lastAns,
            currentState.cursorPosition,
            value
        )

        // Update Ref immediately 
        stateRef.current = {
            expression: updates.newExpr,
            cursorPosition: updates.newCursorPos,
            lastAns: updates.lastAns,
            isResultDisplayed: updates.isResultDisplayed,
            resultValue: updates.result
        }

        // Update other states
        setExpression(stateRef.current.expression);
        setCursorPosition(stateRef.current.cursorPosition);
        setLastAns(stateRef.current.lastAns);
        setResult(stateRef.current.resultValue);
        setIsResultDisplayed(stateRef.current.isResultDisplayed);
    }, []);

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
        setIsResultDisplayed,
        handleAction,
        moveCursor
    };
};