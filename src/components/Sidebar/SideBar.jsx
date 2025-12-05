import { useCallback, useState } from "react";
import Modes from './Modes'
import LocalHistory from './LocalHistory'
import LocalMemory from './LocalMemory'
import Themes from './Themes'
import LocalSettings from './LocalSettings'
import About from './About'
import { Calculator, History, Settings, MemoryStick, Palette, Info, ArrowLeft } from 'lucide-react'

const SideBar = ({ isOpen }) => {
    // State to track the active view/component (null means main menu)
    const [activeView, setActiveView] = useState(null); 

    const renderMenuItems = useCallback(() => {
        const navigateToView = (viewName) => {
            setActiveView(viewName);
        };

        const goBack = () => {
            setActiveView(null);
        };
        
        const menuItems = [
            { label: 'Modes', component: <Modes />, Icon: Calculator },
            { label: 'History', component: <LocalHistory />, Icon: History },
            { label: 'Memory', component: <LocalMemory />, Icon: MemoryStick },
            { label: 'Themes', component: <Themes />, Icon: Palette },
            { label: 'Settings', component: <LocalSettings />, Icon: Settings },
            { label: 'About', component: <About />, Icon: Info },
        ];

        let contentToRender;

        if (activeView === 'History') {
            contentToRender = (
                <div className="p-4 h-full flex flex-col"> 
                    <button onClick={goBack} className="flex items-center text-blue-600 mb-4 p-2"> 
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Menu
                    </button>
                    <LocalHistory />
                </div>
            );
        } 
        else if (activeView === 'Modes') {
            contentToRender = (
                <div className="p-4 h-full flex flex-col">
                    <button onClick={goBack} className="flex items-center text-blue-600 mb-4 p-2">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Menu
                    </button>
                    <Modes /> 
                </div>
            );
        } 
        else {
            // Default view: the main menu list
            contentToRender = (
                <ul className="mt-12 relative w-full">
                    {/* eslint-disable-next-line no-unused-vars */}
                    {menuItems.map(({label, Icon}) => {
                        return (
                            <li key={label}
                                className="
                                    m-2 p-3 border-black border-2 rounded-2xl
                                        hover:bg-emerald-700 flex items-center 
                                        space-x-3 cursor-pointer
                                "
                                onClick={() => navigateToView(label)}
                            >
                                <Icon className="w-5 h-5" /> 
                                <span>{label}</span>
                            </li>                        
                        )
                    })}
                </ul>
            );
        }

        // The main return wraps the dynamic content
        return (
            <div className={`
                side-bar absolute bg-blue-200 top-0 left-0
                opacity-100 h-full z-30 rounded-tr-3xl rounded-br-3xl
                transition-all duration-300 overflow-hidden 
                ${ isOpen ? 'w-3/4 sm:w-1/2 md:w-1/3' : 'w-0' }
            `}> 
                {contentToRender}
            </div>
        );
    }, [isOpen, activeView]);

    return renderMenuItems();
}
 
export default SideBar;