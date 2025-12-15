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
            <div className="h-[85%] w-full p-2">
                <div className="text-sm text-gray-500 pb-1.5">Memory Log</div>

                {(!isEmptyMemory) 
                ? (
                    <div className="h-full w-full overflow-y-scroll [&::-webkit-scrollbar]:hidden flex flex-col gap-2">
                        {memoryLog.map((entry, index) => {
                            return (
                                <div 
                                    key={index} 
                                    className="
                                        flex justify-between p-2
                                        h-12 w-full cursor-pointer
                                        items-center bg-blue-100
                                ">
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