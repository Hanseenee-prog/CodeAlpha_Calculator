import { useCallback, useEffect } from "react";
import { useAppContext } from "../Contexts/AppContext";

const LocalMemory = () => {
    const { memory } = useAppContext();
    const { memoryLog } = memory;

    useEffect(() => {
        localStorage.setItem('calc-memory-log', JSON.stringify(memoryLog));
    }, [memoryLog])

    const isEmptyMemory = (memoryLog.length === 0 || memoryLog[0] === 0);

    const renderMemoryLog = useCallback(() => {
        return (
            /* FIXED: Use flex-col and flex-1 to ensure scrolling works in the sidebar */
            <div className="flex flex-col h-full w-full p-2 text-slate-900 dark:text-slate-100">
                <div className="text-sm text-gray-500 dark:text-slate-400 pb-1.5 font-medium shrink-0">
                    Memory Log
                </div>

                {(!isEmptyMemory) 
                ? (
                    <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden flex flex-col gap-2 min-h-0">
                        {memoryLog.map((entry, index) => {
                            return (
                                <div 
                                    key={index} 
                                    className="
                                        flex justify-end p-3 rounded-xl shrink-0
                                        h-12 w-full cursor-pointer transition-colors
                                        items-center bg-blue-100 dark:bg-slate-700/50 
                                        hover:bg-blue-200 dark:hover:bg-slate-600/50
                                        border border-transparent dark:border-slate-600/30
                                ">
                                    <span className="font-semibold dark:text-blue-300">{entry}</span>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center p-2 text-gray-500 dark:text-slate-500 italic">
                        <span>Nothing in memory for now....</span>
                    </div>
                )}
            </div>
        )
    }, [memoryLog, isEmptyMemory]);

    return renderMemoryLog();
}
 
export default LocalMemory;
