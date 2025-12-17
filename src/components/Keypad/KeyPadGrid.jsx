import { useCallback } from "react";
import CalculatorButton from "./CalculatorButton";

const KeyPadGrid = ({ buttons, onButtonClick }) => {
    const renderButtons = useCallback(() => {
        return buttons.map((button, index) => {
            return (
                <CalculatorButton 
                    key={index}
                    button={button}
                    onButtonClick={onButtonClick}
                    isMemory={button.style === 'memory'}
                    isAccent={button.style === 'accent'}
                />
            )
        })
    }, [buttons, onButtonClick])

    return (
        <div className="
            flex flex-col flex-1 p-3 md:p-4 
            bg-white dark:bg-slate-800/80 
            transition-colors duration-300
            overflow-hidden
        ">
            <hr className="w-full rounded-full border-gray-200 dark:border-slate-700/50 mb-1" />
            
            <div className="
                grid grid-cols-5 grid-rows-6 auto-rows-fr gap-1.5 md:gap-2 
                place-items-stretch self-stretch flex-1 min-h-0
            ">
                {renderButtons()}
            </div> 
        </div>
    );
}
 
export default KeyPadGrid;