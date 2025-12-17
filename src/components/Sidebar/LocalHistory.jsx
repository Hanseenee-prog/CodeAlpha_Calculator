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
    
    const isEmptyHistory = (history && Object.keys(history).length === 0);

    useEffect(() => {
        localStorage.setItem('calc-history', JSON.stringify(history));
    }, [history])

    const renderHistoryContent = useCallback(() => {
        const clearHistory = () => {
            setHistory([]);
        }   

        return ( 
            <div className="flex flex-col h-[92%] relative w-full pl-3 pr-3 text-slate-900 dark:text-slate-100">
                <div className="text-sm text-gray-500 dark:text-slate-400 pb-1.5 font-medium shrink-0">
                    History Log
                </div>

                {!(isEmptyHistory) ? (
                    <div className="overflow-y-auto [&::-webkit-scrollbar]:hidden flex flex-col gap-2 min-h-0 h-[80%]">
                        {history.map(({displayExpression, result}, index) => {
                            return (
                                <button
                                    key={index}
                                    className="
                                        min-h-14 w-full cursor-pointer flex rounded-xl shrink-0
                                        items-center bg-blue-100 dark:bg-slate-700/50 
                                        hover:bg-blue-200 dark:hover:bg-slate-600/50
                                        border border-transparent dark:border-slate-600/30
                                    "
                                >
                                    <div 
                                        className="flex flex-col w-full justify-end pr-3"
                                        onClick={() => {
                                            setExpression(result);
                                            setCursorPosition(result.length);
                                            setIsOpen(false);
                                            setIsResultDisplayed(false);
                                        }}
                                    >
                                        <span className="text-xs text-gray-600 dark:text-slate-400 w-full text-right">{`${displayExpression}=`}</span>
                                        <span className="font-semibold text-right w-full dark:text-blue-300">{result}</span>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center p-2 text-gray-500 dark:text-slate-500 italic">
                        <p>No calculations in history yet...</p>
                    </div>
                )}

                {!(isEmptyHistory) && (
                    <div className="pt-2 pb-2 w-full">
                        <button 
                            className="
                                w-full h-12 flex items-center justify-center cursor-pointer rounded-xl
                                bg-blue-400 hover:bg-blue-500 text-white
                                dark:bg-red-900/40 dark:hover:bg-red-800/60 dark:text-red-300
                                transition-all border border-transparent dark:border-red-800/50 shadow-lg"
                                onClick={() => clearHistory()}
                        >
                            <Trash2 className="w-5 h-5 mr-2" />
                            <span className="font-semibold">Clear History</span>
                        </button>
                    </div>
                )}
            </div>
        );
    }, [history, setCursorPosition, setExpression, setIsOpen, setIsResultDisplayed, isEmptyHistory, setHistory]);

    return renderHistoryContent();
}
 
export default LocalHistory;