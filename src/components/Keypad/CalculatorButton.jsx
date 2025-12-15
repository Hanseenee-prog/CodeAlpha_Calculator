import React from "react";
import { useAppContext } from "../Contexts/AppContext";

const CalculatorButton = React.memo(({ button, onButtonClick, isAccent, isMemory }) => {
    const { memory, mode } = useAppContext();
    const { isMemoryActive } = memory;
    
    const baseStyle = `
        w-full grid place-items-center 
        font-semibold cursor-pointer shadow-md
    `;

    const colorStyle = isAccent
        ? (`bg-blue-300 text-blue-900 hover:bg-blue-400 text-xl
            ${mode === 'Standard' ? 'p-1.5 rounded-[10px]' : 'p-1.3 rounded-[8px]'}
            `)
        : (
            isMemory 
            ? (`bg-gray-100 p-0.7 rounded-[8px] font-extrabold
                ${(!isMemoryActive && (button.label === 'MR' || button.label === 'MC')) 
                    ? 'text-black disabled:cursor-not-allowed opacity-50' : 'text-blue-900 hover:bg-blue-400'}
            `)
            : (`bg-white text-gray-800 hover:bg-gray-100 text-xl
                ${mode === 'Standard' ? 'p-1.5 rounded-[10px]' : 'p-1.3 rounded-[8px]'}
            `)
        );

    return ( 
        <button 
            className={`${baseStyle} ${colorStyle}`}
            onClick={() => onButtonClick(button)}
            disabled={!isMemoryActive && (button.label === 'MR' || button.label === 'MC')}    
        >
            {button.label}
        </button>
    );
})
 
export default CalculatorButton;