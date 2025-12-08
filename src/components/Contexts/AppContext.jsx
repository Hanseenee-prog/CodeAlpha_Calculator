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
    const [history, setHistory] = useState([{expression: "5+5", result: "10"}, {expression: "10.3+8.8", result: "20"}, {expression: "25-1", result: "24"}]);

    const addHistoryEntry = (expression, result) => {
        const newHistory = {expression, result};

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