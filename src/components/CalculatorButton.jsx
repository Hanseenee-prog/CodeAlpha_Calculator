import React from "react";

const CalculatorButton = React.memo(({ button, onButtonClick, isAccent, isMemory }) => {
    const baseStyle = `
        w-full grid place-items-center 
        font-semibold cursor-pointer shadow-md
    `;

    const colorStyle = isAccent
        ? 'bg-blue-300 text-blue-900 hover:bg-blue-400 p-1.5 rounded-[10px]'
        : (
            isMemory 
            ? 'bg-gray-100 text-blue-900 hover:bg-blue-400 p-0.7 rounded-[8px]'
            : 'bg-white text-gray-800 hover:bg-gray-100 text-xl p-1.5 rounded-[10px]'
        );

    return ( 
        <button 
            className={`${baseStyle} ${colorStyle}`}
            onClick={() => onButtonClick(button)}>
                {button.label}
        </button>
    );
})
 
export default CalculatorButton;