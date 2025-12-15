const Header = ({isOpen, setIsOpen}) => {
    // Function to open sidebar
    function openSidebar() {
        isOpen ? setIsOpen(false) : setIsOpen(true);
    }

    return ( 
        <div className="shrink-0 flex items-center">

            {/* Calc Header content */}
            <div className="w-full flex justify-center items-center relative h-7">
                <span className="absolute left-1 cursor-pointer z-50 p-1"
                        onClick={openSidebar}
                >
                    {!isOpen ? (
                        // Hamburger Icon
                        <svg xmlns='http://www.w3.org/200/svg' 
                            fill='none' 
                            viewBox='0 0 24 24' 
                            stroke='currentColor'
                            strokeWidth={2}
                            className='w-5 h-5 hover:scale-110'>
                            <path strokeLinecap='round' strokeLinejoin='round' d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    ) : (
                        // Close Icon
                        <svg xmlns='http://www.w3.org/200/svg' 
                            fill='none' 
                            viewBox='0 0 24 24' 
                            stroke='currentColor'
                            strokeWidth={2}
                            className='w-5 h-5 hover:scale-110'>
                            <path strokeLinecap='round' strokeLinejoin='round' d="M6 18L18 6" />
                            <path strokeLinecap='round' strokeLinejoin='round' d="M6 6L18 18" />
                        </svg>
                    )}
                </span>
                <span className="flex items-center gap-2">
                    <hr className='border-2 w-1.5 rounded-full' />
                    <p className="font-semibold">SmartCalcX</p>
                    <hr className='border-2 w-1.5 rounded-full' />
                </span>
            </div> 
        </div>
    );
}
 
export default Header;