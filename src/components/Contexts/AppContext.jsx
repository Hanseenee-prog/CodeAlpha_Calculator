import { createContext, useState, useContext, useMemo, useCallback } from 'react';

const AppContext = createContext();

{/* eslint-disable-next-line react-refresh/only-export-components */}
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [mode, setMode] = useState('Standard');
    const [angleMode, setAngleMode] = useState('radians');
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState('Light');
    const [expression, setExpression] = useState('0');
    const [cursorPosition, setCursorPosition] = useState(1);
    const [isResultDisplayed, setIsResultDisplayed] = useState(false);
    const [memoryLog, setMemoryLog] = useState(() => JSON.parse(localStorage.getItem('calc-memory-log') || '[]'));

    // Get saved history from local storage
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('calc-history');
        return saved ? JSON.parse(saved) : [];
    });

    const addHistoryEntry = (expression, result) => {
        // Replace sqrt(number) to √(number)
        const displayExpression = expression.replace(/sqrt\(([^)]+)\)/g, '√($1)');

        const newHistory = {displayExpression, result};

        setHistory(prevHistory => [newHistory, ...prevHistory]);
    }

    const isMemoryActive = useMemo(() => (memoryLog.length > 0 || memoryLog[0] === 0), [memoryLog]);

    // --- Action Handlers (Memory) ---
    // To store a value in the memory
    const handleStore = useCallback((valueToStore) => {
        const value = parseFloat(valueToStore);

        if (valueToStore === 0 || isNaN(valueToStore)) return;

        setMemoryLog(prevLog => [value, ...prevLog]);
    }, []);

    // To add to Memory
    const handleAdd = useCallback((valueToAdd) => {
        if (memoryLog.length === '0') return;
        if (valueToAdd === 0) return;

        const current = parseFloat(valueToAdd);
        const latestValue = (memoryLog[0] || 0);

        const updated = latestValue + current;

        setMemoryLog(prevLog => {
            const updatedArr = [...prevLog];
            updatedArr[0] = updated;
            return updatedArr;
        })
    }, [memoryLog]);

    // To subtract from memory
    const handleSubtract = useCallback((valueToSubtract) => {
        if (memoryLog.length === '0') return;
        if (valueToSubtract === 0) return;

        const current = parseFloat(valueToSubtract);
        const latestValue = (memoryLog[0] || 0);

        const updated = latestValue - current;

        setMemoryLog(prevLog => {
            const updatedArr = [...prevLog];
            updatedArr[0] = updated;
            return updatedArr;
        })
    }, [memoryLog]);

    // To clear the memory
    const handleClear = useCallback(() => {
        setMemoryLog([]);
    }, []);

    // To recall memory value
    const handleRecall = useCallback(() => {
        if (memoryLog.length === '0') return;

        const latestValue = memoryLog[0];
        return latestValue;
    }, [memoryLog]);

    const memory = {
        memoryLog, isMemoryActive,
        handleStore, handleAdd, handleSubtract, handleClear, handleRecall
    }

    const value = {
        mode, setMode,
        angleMode, setAngleMode,
        isOpen, setIsOpen,
        theme, setTheme,
        expression, setExpression,
        cursorPosition, setCursorPosition,
        isResultDisplayed, setIsResultDisplayed,
        history, setHistory, addHistoryEntry,
        memory
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
} 