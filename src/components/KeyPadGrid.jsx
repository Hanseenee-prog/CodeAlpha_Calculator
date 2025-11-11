import { handleButtonClick } from "../utils.js/buttonHandler";

const KeyPadGrid = ({buttons}) => {
    return (
        <div className="border-2 border-red-400 h-full">
            <div className="grid grid-cols-5 gap-2 bg-amber-600 place-items-center h-full">
                {
                    buttons.map((button, index) => {
                        return <span key={index}
                                    className={`
                                        rounded-[10px] w-full h-10 bg-red-300 grid place-items-center
                                        font-semibold cursor-pointer hover:bg-red-400
                                    `}
                                    onClick={() => handleButtonClick(button)}>
                                        {button.label}
                            </span>
                    })
                }
            </div> 
        </div>
    );
}
 
export default KeyPadGrid;