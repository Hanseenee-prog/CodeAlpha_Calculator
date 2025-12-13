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
                    className="pl-3"
                    ref={displayRef}
                    // tabIndex={0} 
                >
                    {/* Span for calculations display */}
                    <span 
                        className="relative font-semibold text-6xl flex flex-row">
                            {partBeforeCursor}
                        <span className="font-light">|</span> {/* The cursor */}
                            {partAfterCursor}
                    </span>

                    {/* Span for results display */}
                    <span>{result}</span>
                </div>

                {(mode === 'Scientific') && (
                    <div className="cursor-pointer flex gap-1 absolute bottom-0">
                        <button 
                            className={`
                                cursor-pointer p-1 rounded-lg
                                ${angleMode === 'degrees' ? 'bg-blue-200' : ''}
                            `}
                            onClick={() => setAngleMode('degrees')}
                        >DEG</button>
                        <button
                            className={`
                                cursor-pointer p-1 rounded-lg
                                ${angleMode === 'radians' ? 'bg-blue-200' : ''}
                            `}
                            onClick={() => setAngleMode('radians')}
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