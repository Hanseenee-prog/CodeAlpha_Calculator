const CalcDisplay = ({ expression, result }) => {
    return ( 
        <div className="">
            <div 
                id="calcDisplay"
                className="h-40 border-[3px] w-full rounded-2xl" 
            >
                {/* Span for calculations display */}
                <span 
                    className="relative font-semibold text-6xl
                        bottom-0 right-0 w-full float-right">
                            {expression}
                </span>

                {/* Span for results display */}
                <span>{result}</span>
            </div>
        </div>
    );
}
 
export default CalcDisplay;