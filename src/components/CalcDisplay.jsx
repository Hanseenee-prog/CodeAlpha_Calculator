import './../index.css';
import { useEffect, useRef, useCallback } from "react";
import SoundRecorder from "./SoundRecorder";
import { useAppContext } from "./Contexts/AppContext";

const CalcDisplay = ({ expression, result, cursorPosition, onTranscript }) => {
    const displayRef = useRef(null);
    const { mode, angleMode, setAngleMode } = useAppContext();

    useEffect(() => {
        // Focus display when expression updates
        if (displayRef.current) displayRef.current.focus();
    }, [expression]);

    // Convert expression to a string defensively before slicing
    const expressionString = String(expression || ''); 

    const partBeforeCursor = expressionString.slice(0, cursorPosition);
    const partAfterCursor = expressionString.slice(cursorPosition);

    const displayContent = useCallback(() => {
        return ( 
            <div className="
                h-40 w-full relative
                flex flex-row items-stretch
            ">
                <div 
                    className="pl-3 pr-3 w-full"
                    ref={displayRef}
                >
                    {/* Span for calculations display */}
                    <span 
                        className="
                            relative text-4xl flex flex-row -bottom-9
                            items-center justify-end truncate
                        ">
                            {partBeforeCursor}
                        <span className="font-light text-3xl animate-[cursor-blink_1s_steps(1)_infinite]">|</span> {/* The cursor */}
                            {partAfterCursor}
                    </span>

                    {/* Span for results display */}
                    <span className="
                        w-full relative right-0 flex flex-row items-center justify-end
                        text-5xl font-semibold -bottom-10
                    ">{result}</span>
                </div>

                {(mode === 'Scientific') && (
                    <div className="cursor-pointer text-[14px] font-semibold flex gap-1 absolute top-1 left-3">
                        <button 
                            className={`
                                cursor-pointer p-0.5 rounded-lg
                                ${angleMode === 'degrees' ? 'bg-blue-200' : ''}
                            `}
                            onClick={() => {
                                    setAngleMode('degrees')
                                    localStorage.setItem('angle-mode', angleMode)
                                }
                            }
                        >DEG</button>
                        <button
                            className={`
                                cursor-pointer p-0.5 rounded-lg
                                ${angleMode === 'radians' ? 'bg-blue-200' : ''}
                            `}
                            onClick={() => {
                                setAngleMode('radians')
                                localStorage.setItem('angle-mode', angleMode)
                            }}
                        >RAD</button>
                    </div>
                )}

                <SoundRecorder 
                    onTranscript={onTranscript}
                />
            </div>
        );
    },[onTranscript, partAfterCursor, partBeforeCursor, result, setAngleMode, mode, angleMode]); // Update dependencies to use the parts

    return displayContent();
}
 
export default CalcDisplay;