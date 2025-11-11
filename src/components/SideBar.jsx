import { standardButtons, scientificButtons, programmerButtons } from "../data/buttons";

const SideBar = ({isOpen, setButtons, setIsOpen}) => {
    const modes = ['Scientific', 'Standard', 'Programmer', 'Converter'];
    
    // Send Array to KeyPadGrid
    function sendButtonsArray(mode) {
        switch (mode) {
            case 'Standard':
                setButtons(standardButtons)
                break;
        
            case 'Scientific':
                setButtons(scientificButtons)
                break;

            case 'Programmer':
                setButtons(programmerButtons)
                break;

            default:
                setButtons(standardButtons)
                break;
        }
    }

    return (
        <div className={`
            side-bar absolute bg-emerald-900 top-0 
            opacity-100 h-full z-30 rounded-2xl 
            transition-all duration-300 overflow-hidden 
            ${ isOpen ? 'w-3/4 sm:w-1/2 md:w-1/3' : 'w-0' }
        `}>
            <ul className="mt-12 relative w-full">
                {modes.map(mode => {
                    return (
                        <li key={mode}
                            className="m-2 p-3 border-black border-2 rounded-2xl
                                    hover:bg-emerald-700"
                            onClick={() => {
                                sendButtonsArray(mode)
                                setIsOpen(false)
                            }}
                        >
                            {/* If mode is Converter, add dropdown arrow */}
                            {mode !== 'Converter' ? mode : (
                                <span className="w-full flex justify-between">
                                    {mode}
                                    <svg xmlns='http://www.w3.org/200/svg' 
                                        fill='none' 
                                        viewBox='0 0 24 24' 
                                        stroke='currentColor'
                                        strokeWidth={2}
                                        className='w-7 h-7 hover:scale-110'>
                                        <path strokeLinecap='round' strokeLinejoin='round' d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </span>
                            )}
                        </li>                        
                    )
                })}
            </ul>
        </div>
     );
}
 
export default SideBar;