import React from "react";
import { useAppContext } from "../Contexts/AppContext";

const CalculatorButton = React.memo(({ button, onButtonClick, isAccent, isMemory }) => {
    const { memory, mode } = useAppContext();
    const { isMemoryActive } = memory;
    
    const baseStyle = `
        w-full h-full flex items-center justify-center 
        font-semibold cursor-pointer shadow-sm
        active:scale-95 select-none
    `;

    // Standard styling for non-accent buttons
    const standardColors = "bg-white text-gray-800 hover:bg-gray-100 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600";
    
    // Accent styling (Operators like +, -, =, etc)
    const accentColors = "bg-blue-300 text-blue-900 hover:bg-blue-400 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500 shadow-blue-500/20";
    
    // Memory styling (MR, MC, etc)
    const memoryColors = `bg-gray-100 dark:bg-slate-800/50 font-extrabold
        ${(!isMemoryActive && (button.label === 'MR' || button.label === 'MC')) 
            ? 'text-gray-400 dark:text-slate-600 cursor-not-allowed' 
            : 'text-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-slate-600'}`;

    // Determine specific padding/rounding based on mode
    const layoutStyle = mode === 'Standard' ? 'p-2 rounded-[12px]' : 'p-1.5 rounded-[8px] text-lg';

    // Combine styles
    const getFinalStyles = () => {
        if (isAccent) return `${accentColors} ${layoutStyle}`;
        if (isMemory) return `${memoryColors} ${layoutStyle} text-sm`;
        return `${standardColors} ${layoutStyle}`;
    };

    return ( 
        <button 
            className={`${baseStyle} ${getFinalStyles()}`}
            onClick={() => onButtonClick(button)}
            disabled={!isMemoryActive && (button.label === 'MR' || button.label === 'MC')}    
        >
            {button.label}
        </button>
    );
});

export default CalculatorButton;
