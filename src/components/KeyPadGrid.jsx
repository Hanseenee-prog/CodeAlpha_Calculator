const KeyPadGrid = ({buttons, setDisplay}) => {
    return (
        <div className="border-2 border-red-400 h-full">
            <div className="grid grid-cols-4 grid-rows-4 gap-2 bg-amber-600 place-items-center h-full">
                {
                    buttons.map((button, index) => {
                        return <span key={index}
                                    className="rounded-[10px] w-10 h-7 bg-red-300 grid place-items-center
                                                font-semibold cursor-pointer hover:bg-red-400"
                                    onClick={() => setDisplay(prev => prev + button)}>
                                        {button}
                                        {console.log(typeof button)}
                            </span>
                    })
                }
            </div> 
        </div>
    );
}
 
export default KeyPadGrid;