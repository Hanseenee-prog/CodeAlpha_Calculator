import './../index.css';
import { useEffect, useRef, useCallback } from "react";
import SoundRecorder from "./SoundRecorder";
import { useAppContext } from "./Contexts/AppContext";

const CalcDisplay = ({ expression, result, cursorPosition, onTranscript }) => {
    const displayRef = useRef(null);
    const { mode, angleMode, setAngleMode } = useAppContext();

    useEffect(() => {
        if (displayRef.current) displayRef.current.focus();
    }, [expression]);

    const expressionString = String(expression || ''); 
    const partBeforeCursor = expressionString.slice(0, cursorPosition);
    const partAfterCursor = expressionString.slice(cursorPosition);

    const displayContent = useCallback(() => {
        return ( 
            <div className="
                h-40 w-full relative
                flex flex-row items-stretch
                bg-gray-50 dark:bg-slate-900/50
                transition-colors duration-300
            ">
                <div 
                    className="pl-3 pr-3 w-full flex flex-col justify-center"
                    ref={displayRef}
                >
                    {/* Span for calculations display */}
                    <span 
                        className="
                            relative text-4xl flex flex-row
                            items-center justify-end truncate
                            text-slate-600 dark:text-slate-400
                            mt-4
                        ">
                            {partBeforeCursor}
                        <span className="font-light text-3xl text-blue-500 dark:text-blue-400 animate-[cursor-blink_1s_steps(1)_infinite]">|</span>
                            {partAfterCursor}
                    </span>

                    {/* Span for results display */}
                    <span className="
                        w-full flex flex-row items-center justify-end
                        text-5xl font-semibold mt-2
                        text-slate-900 dark:text-white
                        dark:drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]
                    ">
                        {result}
                    </span>
                </div>

                {(mode === 'Scientific') && (
                    <div className="text-[12px] font-bold flex gap-2 absolute top-2 left-3">
                        <button 
                            className={`
                                cursor-pointer px-2 py-0.5 rounded-md transition-all
                                ${angleMode === 'degrees' 
                                    ? 'bg-blue-200 text-blue-800 dark:bg-blue-600 dark:text-white' 
                                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}
                            `}
                            onClick={() => {
                                    setAngleMode('degrees')
                                    localStorage.setItem('angle-mode', 'degrees')
                                }
                            }
                        >DEG</button>
                        <button
                            className={`
                                cursor-pointer px-2 py-0.5 rounded-md transition-all
                                ${angleMode === 'radians' 
                                    ? 'bg-blue-200 text-blue-800 dark:bg-blue-600 dark:text-white' 
                                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}
                            `}
                            onClick={() => {
                                setAngleMode('radians')
                                localStorage.setItem('angle-mode', 'radians')
                            }}
                        >RAD</button>
                    </div>
                )}

                <SoundRecorder onTranscript={onTranscript} />
            </div>
        );
    },[onTranscript, partAfterCursor, partBeforeCursor, result, setAngleMode, mode, angleMode]);

    return displayContent();
}
 
export default CalcDisplay;