import { useEffect, useRef } from "react";
import SoundRecorder from "./SoundRecorder";

const CalcDisplay = ({ expression, result, cursorPosition, onTranscript }) => {
    const displayRef = useRef(null);

    useEffect(() => {
        // Focus display when expression updates
        if (displayRef.current) displayRef.current.focus();
    }, [expression]);

    const partBeforeCursor = expression.slice(0, cursorPosition);
    const partAfterCursor = expression.slice(cursorPosition);

    return ( 
        <div className="
            h-40 border-[3px] w-full rounded-2xl relative
            flex flex-row items-stretch
        ">
            <div 
                id="calcDisplay"
                className=""
                ref={displayRef}
                tabIndex={0} 
            >
                {/* Span for calculations display */}
                <span 
                    className="relative font-semibold text-6xl">
                        {partBeforeCursor}
                    <span className="">|</span> {/* The cursor */}
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
}
 
export default CalcDisplay;