const KeyPadGrid = ({buttons}) => {
    return (
        <div className="btn-grid h-full w-full grid grid-cols-4 gap-2 mt-4 bg-amber-600">
            {
                buttons.map((button, index) => {
                    return <span key={index}
                                 className="rounded-full w-10 h-10 bg-red-300 grid place-items-center
                                            font-semibold cursor-pointer hover:bg-red-400">
                                    {button}
                           </span>
                })
            }
        </div> 
     );
}
 
export default KeyPadGrid;