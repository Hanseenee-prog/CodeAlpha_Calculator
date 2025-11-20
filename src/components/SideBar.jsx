import { useCallback } from "react";

const SideBar = ({isOpen, setIsOpen, onModeChange }) => {
    // Wrapped in a useCallback hook to prevent unnecessary re-rendering
    const renderModes = useCallback(() => {
        const modes = ['Standard', 'Scientific', 'Programmer', 'Converter'];

        return <div className={`
                    side-bar absolute bg-emerald-900 top-0 left-0
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
                                        setIsOpen(false)
                                        onModeChange(mode)
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
    }, [isOpen, setIsOpen, onModeChange]);

    return renderModes();
}
 
export default SideBar;