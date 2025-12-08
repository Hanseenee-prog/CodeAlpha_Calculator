import { useCallback } from "react";
import { useAppContext } from "../Contexts/AppContext";

const LocalHistory = () => {
    const { 
        history, setIsOpen, 
        setExpression, setCursorPosition,
        setIsResultDisplayed
    } = useAppContext();

    const renderHistoryContent = useCallback(() => {
        return ( 
            <div className="p-2 border-2 h-full">
                {history.map(({expression, result}, index) => {
                    return (
                        <div
                            key={index}
                            className="
                                h-12 border-2 w-full cursor-pointer flex
                                items-center bg-blue-100 hover:bg-blue-200
                            "
                        >
                            <div 
                                className="
                                    flex flex-col w-full justify-end pr-2
                                "
                                onClick={() => {
                                    setExpression(result);
                                    setCursorPosition(result.length);
                                    setIsOpen(false);
                                    setIsResultDisplayed(false);
                                }}
                            >
                                <span className="text-sm right-1 w-full text-right">{`${expression}=`}</span>
                                <span className="font-semibold text-right w-full">{result}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }, [history, setCursorPosition, setExpression, setIsOpen, setIsResultDisplayed]);

    return renderHistoryContent();
}
 
export default LocalHistory;