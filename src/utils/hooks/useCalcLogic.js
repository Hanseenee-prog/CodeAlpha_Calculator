import { useState, useEffect, useCallback, useRef } from "react";
import { handleButtonClick } from '../buttonHandler';
import { handleCalculationAction } from "../services/calculatorService";
import { useKeyboardSupport } from "./useKeyboardSupport";
import { useAppContext } from "../../components/Contexts/AppContext";

export const useCalcLogic = () => {
    const { 
        expression, setExpression,
        cursorPosition, setCursorPosition,
        isResultDisplayed, setIsResultDisplayed,
        addHistoryEntry, memory, 
    } = useAppContext();
    
    const [result, setResult] = useState('0');
    const [lastAns, setLastAns] = useState('0'); // For controlling the 'Ans' button

    // Ref to hold latest state for voice commands
    const stateRef = useRef({
        expression: '0',
        result: '0',
        cursorPosition: 1,
        lastAns: '0',
        isResultDisplayed: false,
    });
    
    useEffect(() => {
        stateRef.current = {
            expression,
            result,
            cursorPosition,
            lastAns,
            isResultDisplayed,
        }
    }, [expression, result, cursorPosition, lastAns, isResultDisplayed]);

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
    }, [setCursorPosition]);

    const handleAction = useCallback((actionType, value) => {
        switch (actionType) {
            case 'memory-store': {
                const valueToStore = parseFloat(stateRef.current.expression);
                memory.handleStore(valueToStore); 
                break;
            }

            case 'memory-add': {
                const valueToAdd = parseFloat(stateRef.current.expression);
                memory.handleAdd(valueToAdd);
                console.log('added')
                break;
            }

            case 'memory-subtract': {
                const valueToSubtract = parseFloat(stateRef.current.expression);
                memory.handleSubtract(valueToSubtract);
                console.log('subtracted')
                break;
            }

            case 'memory-clear': 
                memory.handleClear();
                console.log('cleared')
                return;

            case 'memory-recall': {
                const recalledValue = memory.handleRecall();

                setExpression(recalledValue.toString());
                setCursorPosition(recalledValue.toString().length);
                setIsResultDisplayed(false);
                break;
            }

            default: {
                // Get current state from ref
                const currentState = stateRef.current;

                // Get the updates to the state
                const updates = handleCalculationAction(
                    actionType,
                    currentState.expression,
                    currentState.isResultDisplayed,
                    currentState.lastAns,
                    currentState.cursorPosition,
                    currentState.result,
                    value,
                )

                // Check if the updates object returned history data
                if (updates.history && Object.keys(updates.history).length > 0) {
                    addHistoryEntry(updates.history.expr, updates.history.evaluatedResult);
                }

                // Update Ref immediately 
                stateRef.current = {
                    expression: updates.newExpr,
                    cursorPosition: updates.newCursorPos,
                    lastAns: updates.lastAns,
                    isResultDisplayed: updates.isResultDisplayed,
                    resultValue: updates.resultValue,
                    cursorMode: updates.cursorMode
                }

                // Update other states
                setExpression(stateRef.current.expression);
                setCursorPosition(stateRef.current.cursorPosition);
                setLastAns(stateRef.current.lastAns);
                setResult(stateRef.current.resultValue);
                setIsResultDisplayed(stateRef.current.isResultDisplayed);

                break;
            }
        }
    }, [setCursorPosition, setIsResultDisplayed, setExpression, addHistoryEntry, memory]);

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