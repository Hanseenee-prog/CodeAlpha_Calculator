import { useState, useEffect } from "react";

export const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'system';
    });

    useEffect(() => {
        const root = window.document.documentElement;

        // Logic to determine if 'dark' class should be applied
        const applyTheme = () => {
            const isDark = 
                (theme === 'dark') || 
                (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
            
            root.classList.toggle('dark', isDark);
            console.log('Dark Theme applied')
        }

        applyTheme();

        if (theme === 'system') localStorage.removeItem('theme');
        else localStorage.setItem('theme', theme);

        // Listen for system theme changes (only matters if theme is 'system')
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (theme === 'System') applyTheme();
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);    
    }, [theme])

    return { theme, setTheme }
}