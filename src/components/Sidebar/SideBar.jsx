import { useCallback, useState, useEffect, useRef } from "react";
import Modes from './Modes';
import LocalHistory from './LocalHistory';
import LocalMemory from './LocalMemory';
import Themes from './Themes';
import LocalSettings from './LocalSettings';
import About from './About';

import { 
    Calculator, History, Settings, 
    MemoryStick, Palette, Info, ArrowLeft,
    ChevronDown, ChevronUp 
} from 'lucide-react';

import { useAppContext } from "../Contexts/AppContext";

const FULL_SCREEN_IDS = ['History', 'Memory', 'Settings'];
const DROP_DOWN_IDS = ['Modes', 'Themes', 'About'];

const SideBar = ({ isOpen, onModeChange }) => {
    // State to track the active view/component or dropdown view/component (null means main menu)
    const [activeViewId, setActiveViewId] = useState(null);
    const [dropdownOpenId, setDropdownOpenId] = useState(null);
    const { mode } = useAppContext();

    const aboutRef = useRef(null);
    const menuListRef = useRef(null); 

    // Close all dropdowns or full views if sideBar is closed
    useEffect(() => {
        if (!isOpen) {
            setActiveViewId(null);
            setDropdownOpenId(null)
        }
    }, [isOpen])

    useEffect(() => {
        const scrollDelay = 400;

        if (dropdownOpenId === 'Modes') {
            if (menuListRef.current) {
                menuListRef.current.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }

        if (dropdownOpenId === 'About' && aboutRef.current && menuListRef.current) {
            
            setTimeout(() => {
                const aboutOffsetTop = aboutRef.current.offsetTop;

                menuListRef.current.scrollTo({
                    top: aboutOffsetTop,
                    behavior: 'smooth'
                });
            }, scrollDelay); 
        }
    }, [dropdownOpenId]);

    const renderMenuItems = useCallback(() => {
        const navigateToView = (viewName) => {
            setActiveViewId(viewName);
        };

        const toggleDropdown = (dropdownName) => {
            setDropdownOpenId(prevId => prevId === dropdownName ? null : dropdownName);
        }

        const goBack = () => {
            setActiveViewId(null);
        };
        
        const menuItems = [
            { label: 'Modes', component: <Modes onModeChange={onModeChange} setDropdownOpenId={setDropdownOpenId} />, Icon: Calculator },
            { label: 'History', component: <LocalHistory />, Icon: History },
            { label: 'Memory', component: <LocalMemory />, Icon: MemoryStick },
            { label: 'Themes', component: <Themes />, Icon: Palette },
            { label: 'Settings', component: <LocalSettings />, Icon: Settings },
            { label: 'About', component: <About />, Icon: Info },
        ];

        let contentToRender;

        if (activeViewId && FULL_SCREEN_IDS.includes(activeViewId)) {
            const activeView = menuItems.find(item => item.label === activeViewId);

            contentToRender = (
                <div className="pl-3.5 pr-3.5 h-full flex flex-col"> 
                    <button onClick={goBack} className="flex items-center text-blue-600 mb-3 p-2"> 
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Menu
                    </button>

                    {activeView.component}
                </div>
            );
        } 
        else {
            // Default view: the main menu list
            contentToRender = (
                <ul 
                    ref={menuListRef}
                    className="
                        mt-5 relative w-full h-[86%] overflow-y-scroll 
                        [&::-webkit-scrollbar]:hidden 
                ">
                    {/* eslint-disable-next-line no-unused-vars */}
                    {menuItems.map(({label, component, Icon}) => {
                        const isDropdown = DROP_DOWN_IDS.includes(label);
                        const isOpenDropdown = dropdownOpenId === label;
                        const NavIcon = isDropdown ? (isOpenDropdown ? ChevronUp : ChevronDown) : null;

                        const handleClick = () => {
                            if (FULL_SCREEN_IDS.includes(label)) navigateToView(label);
                            else if (isDropdown)  toggleDropdown(label);
                        };

                        const itemRef = (label === 'About') ? aboutRef : null;

                        return (
                            <div 
                                ref={itemRef}
                                key={label}
                                className="flex flex-col items-stretch mb-5"
                            >
                                <li 
                                    className="
                                        p-3 border-black border-2 rounded-2xl
                                      hover:bg-emerald-700 flex items-center justify-between
                                        space-x-3 cursor-pointer w-full
                                    "
                                    onClick={handleClick}
                                >
                                    <span className="flex items-center space-x-3">
                                        <Icon className="w-5 h-5" /> 
                                        <span>
                                            {label}
                                        </span>
                                    </span>

                                    {/* Always show the current mode */}
                                    {label === 'Modes' && (
                                        <span className="relative -right-12 text-sm font-bold">[{mode}]</span>
                                    )}

                                    {NavIcon && <NavIcon className="w-4 h-4" />}
                                </li>

                                {/* The dropdown div */}
                                <div className={`
                                    transition-all duration-500 ease-in-out overflow-hidden
                                    ${isOpenDropdown ? 'max-h-screen' : 'max-h-0'}
                                `}>
                                    <div className="p-4 bg-blue-100 m-2 rounded-lg shadow-inner flex items-center justify-center">
                                        {component}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ul>
            );
        }

        // The main return wraps the dynamic content in the sidebar
        return (
            <div className={`
                absolute bg-blue-200 top-0 left-0
                opacity-100 h-full z-30 rounded-tr-3xl rounded-br-3xl
                transition-all duration-300 overflow-hidden 
                ${ isOpen ? 'w-3/4 sm:w-1/2 md:w-1/3' : 'w-0' }
            `}> 
                <div className="mt-13 h-[87%]">
                    {contentToRender}
                </div>
            </div>
        );
    }, [isOpen, activeViewId, dropdownOpenId, onModeChange, mode]);

    return renderMenuItems();
}
 
export default SideBar;