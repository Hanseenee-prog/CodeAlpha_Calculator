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
            <div className="h-full border-2 w-full p-2 overflow-y-auto">
                <div className="text-sm text-gray-500">Memory Log</div>

                {(!isEmptyMemory) 
                ? (
                    <div className="h-full border-2 border-red-200 w-full">
                        {memoryLog.map((entry, index) => {
                            return (
                                <div key={index} className="flex justify-between p-2 border-b border-gray-200">
                                    <span>{entry}</span>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <span className="p-2">
                        Nothing in memory for now....
                    </span>
                )}
            </div>
        )
    }, [memoryLog, isEmptyMemory]);

    return renderMemoryLog();
}
 
export default LocalMemory;