import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

{/* eslint-disable-next-line react-refresh/only-export-components */}
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [mode, setMode] = useState('Standard');
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState('Light');

    const value = {
        mode,
        setMode,
        isOpen,
        setIsOpen,
        theme,
        setTheme
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
} 