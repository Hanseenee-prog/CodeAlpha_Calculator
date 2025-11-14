import { useEffect, useRef } from "react";

const CalcDisplay = ({ expression, result, cursorPosition }) => {
    const displayRef = useRef(null);

    useEffect(() => {
        // Focus display when expression updates
        if (displayRef.current) displayRef.current.focus();
    }, [expression]);

    const partBeforeCursor = expression.slice(0, cursorPosition);
    const partAfterCursor = expression.slice(cursorPosition);

    return ( 
        <div className="">
            <div 
                id="calcDisplay"
                className="h-40 border-[3px] w-full rounded-2xl"
                ref={displayRef}
                tabIndex={0} 
            >
                {/* Span for calculations display */}
                <span 
                    className="relative font-semibold text-6xl float-left inline-block">
                        {partBeforeCursor}
                    <span className="font-">|</span> {/* The cursor */}
                        {partAfterCursor}
                </span>

                {/* Span for results display */}
                <span>{result}</span>
            </div>
        </div>
    );
}
 
export default CalcDisplay;