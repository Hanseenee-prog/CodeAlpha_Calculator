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
        <div className="flex flex-col justify-center items-center flex-1 p-4 shadow-lg">
            <hr className="w-full rounded-full" />
            <div className="grid grid-cols-5 grid-rows-6 gap-1 place-items-center self-stretch h-full">
                {renderButtons()}
            </div> 
        </div>
    );
}
 
export default KeyPadGrid;