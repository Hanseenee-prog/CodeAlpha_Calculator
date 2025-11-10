import { useState } from "react";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Function to open sidebar
    function openSidebar() {
        isOpen ? setIsOpen(false) : setIsOpen(true);
    }

    return ( 
        <div className="calc-header bg-amber-50">

        {/* Calc Header content */}
        <div className="calc-header-content bg-amber-500 w-full flex justify-center relative p-3">
          <span className="hamburger-menu bg-blue-400 absolute left-3"
                onClick={openSidebar}
          >
            {isOpen ? (
                // Hamburger Icon
                <svg xmlns='http://www.w3.org/200/svg' 
                    fill='none' 
                    viewBox='0 0 24 24' 
                    stroke='currentColor'
                    strokeWidth={2}
                    className='w-7 h-7 hover:scale-110'>
                    <path strokeLinecap='round' strokeLinejoin='round' d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            ) : (
                // Close Icon
                <svg xmlns='http://www.w3.org/200/svg' 
                    fill='none' 
                    viewBox='0 0 24 24' 
                    stroke='currentColor'
                    strokeWidth={2}
                    className='w-7 h-7 hover:scale-110'>
                    <path strokeLinecap='round' strokeLinejoin='round' d="M6 18L18 6" />
                    <path strokeLinecap='round' strokeLinejoin='round' d="M6 6L18 18" />
                </svg>
            )}
          </span>
          <p>SmartCalcX</p>  
        </div> 
      </div>
    );
}
 
export default Header;