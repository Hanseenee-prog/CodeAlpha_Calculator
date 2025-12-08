import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

{/* eslint-disable-next-line react-refresh/only-export-components */}
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [mode, setMode] = useState('Standard');
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState('Light');
    const [expression, setExpression] = useState('0');
    const [cursorPosition, setCursorPosition] = useState(1);
    const [isResultDisplayed, setIsResultDisplayed] = useState(false);

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

    const value = {
        mode, setMode,
        isOpen, setIsOpen,
        theme, setTheme,
        expression, setExpression,
        cursorPosition, setCursorPosition,
        isResultDisplayed, setIsResultDisplayed,
        history, setHistory, addHistoryEntry
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
} 