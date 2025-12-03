import { useCallback } from "react";
import CalculatorButton from "./CalculatorButton";

const KeyPadGrid = ({ buttons, onButtonClick }) => {
    // Wrapped in a useCallback hook to prevent unnecessary re-rendering
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
        <div className="flex-1 border-3 border-blue-200 p-4 rounded-t-[44px]">
            <div className="grid grid-cols-5 grid-rows-6 gap-1 place-items-center h-full">
                {renderButtons()}
            </div> 
        </div>
    );
}
 
export default KeyPadGrid;