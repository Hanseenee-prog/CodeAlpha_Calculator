import { useCallback } from "react";

const KeyPadGrid = ({ buttons, onButtonClick }) => {
    // Wrapped in a useCallback hook to prevent unnecessary re-rendering
    const renderButtons = useCallback(() => {
        return buttons.map((button, index) => {
                        return <span key={index}
                                    className={`
                                        rounded-[10px] w-full h-10 bg-red-300 grid place-items-center
                                        font-semibold cursor-pointer hover:bg-red-400
                                    `}
                                    onClick={() => onButtonClick(button)}>
                                        {button.label}
                            </span>
                    })
    }, [buttons, onButtonClick])

    return (
        <div className="h-full">
            <div className="grid grid-cols-5 gap-2 place-items-center h-full">
                {renderButtons()}
            </div> 
        </div>
    );
}
 
export default KeyPadGrid;