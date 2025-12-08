import { useEffect, useRef, useCallback } from "react";
import SoundRecorder from "./SoundRecorder";

const CalcDisplay = ({ expression, result, cursorPosition, onTranscript }) => {
    const displayRef = useRef(null);

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

                <SoundRecorder 
                    onTranscript={onTranscript}
                />
            </div>
        );
    },[onTranscript, partAfterCursor, partBeforeCursor, result]); // Update dependencies to use the parts

    return displayContent();
}
 
export default CalcDisplay;