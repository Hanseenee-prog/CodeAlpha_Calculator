const Header = ({isOpen, setIsOpen}) => {
    // Function to open sidebar
    function openSidebar() {
        setIsOpen(!isOpen);
    }

    return ( 
        <div className="shrink-0 flex items-center bg-white dark:bg-slate-800 border-b border-transparent dark:border-slate-700/50 transition-colors duration-300">

            {/* Calc Header content */}
            <div className="w-full flex justify-center items-center relative h-10 text-slate-900 dark:text-slate-100">
                <span className="absolute left-2 cursor-pointer z-50 p-1"
                        onClick={openSidebar}
                >
                    {!isOpen ? (
                        // Hamburger Icon
                        <svg xmlns='www.w3.org' 
                            fill='none' 
                            viewBox='0 0 24 24' 
                            stroke='currentColor'
                            strokeWidth={2}
                            className='w-5 h-5 hover:scale-110 text-slate-700 dark:text-slate-300 transition-colors'>
                            <path strokeLinecap='round' strokeLinejoin='round' d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    ) : (
                        // Close Icon
                        <svg xmlns='www.w3.org' 
                            fill='none' 
                            viewBox='0 0 24 24' 
                            stroke='currentColor'
                            strokeWidth={2}
                            className='w-5 h-5 hover:scale-110 text-slate-700 dark:text-slate-300 transition-colors'>
                            <path strokeLinecap='round' strokeLinejoin='round' d="M6 18L18 6" />
                            <path strokeLinecap='round' strokeLinejoin='round' d="M6 6L18 18" />
                        </svg>
                    )}
                </span>
                
                <span className="flex items-center gap-2">
                    <hr className='border-2 w-1.5 rounded-full border-slate-400 dark:border-blue-400' />
                    <p className="font-semibold tracking-wide">SmartCalcX</p>
                    <hr className='border-2 w-1.5 rounded-full border-slate-400 dark:border-blue-400' />
                </span>
            </div> 
        </div>
    );
}
 
export default Header;