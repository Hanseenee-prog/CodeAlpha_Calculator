import { useCallback } from "react";
import { useAppContext } from "../Contexts/AppContext";
import { Trash2 } from 'lucide-react';
import { useEffect } from "react";

const LocalHistory = () => {
    const { 
        history, setHistory, setIsOpen, 
        setExpression, setCursorPosition,
        setIsResultDisplayed
    } = useAppContext();
    
    // Check if history is empty
    const isEmptyHistory = (history && Object.keys(history).length === 0);

    // Add local history to local storage
    useEffect(() => {
        localStorage.setItem('calc-history', JSON.stringify(history));
    }, [history])

    const renderHistoryContent = useCallback(() => {
        const clearHistory = () => {
            setHistory([]);
        }   

        return ( 
            <div className="
                relative overflow-hidden h-full pl-3 pr-3
            ">
                <div className="text-sm text-gray-500 pb-1.5">History Log</div>

                {!(isEmptyHistory) ? (
                    <div className="h-full overflow-y-scroll [&::-webkit-scrollbar]:hidden flex flex-col gap-1.5">
                        {history.map(({displayExpression, result}, index) => {
                            return (
                                <button
                                    key={index}
                                    className="
                                        h-12 w-full cursor-pointer flex
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
                                        <span className="text-sm right-1 w-full text-right">{`${displayExpression}=`}</span>
                                        <span className="font-semibold text-right w-full">{result}</span>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                ) : (
                    <div className="w-full text-center border-2 font-semibold text-[20px]">
                        <p>No calculations in history yet...</p>
                    </div>
                )}

                {!(isEmptyHistory) && (
                    <button 
                        className="
                            w-full h-12 flex items-center justify-center cursor-pointer
                            relative bottom-[74px] shadow-lg bg-blue-400 hover:bg-blue-500"
                            onClick={() => clearHistory()}
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>)
                }
            </div>
        );
    }, [history, setCursorPosition, setExpression, setIsOpen, setIsResultDisplayed, isEmptyHistory, setHistory]);

    return renderHistoryContent();
}
 
export default LocalHistory;