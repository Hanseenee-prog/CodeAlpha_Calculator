import { useCallback } from "react";
import Modes from './Modes'
import History from './History'
import Memory from './Memory'
import Themes from './Themes'
import Settings from './Settings'
import About from './About'
import {} from 'lucide-react'

const SideBar = ({isOpen, setIsOpen }) => {
    // Wrapped in a useCallback hook to prevent unnecessary re-rendering
    const renderModes = useCallback(() => {
        const menuItems = [
            {label: 'Modes', component: <Modes />, icon: 'modes.svg'},
            {label: 'History', component: <History />, icon: 'history.svg'},
            {label: 'Memory', component: <Memory />, icon: 'memory.svg'},
            {label: 'Themes', component: <Themes />, icon: 'themes.svg'},
            {label: 'Settings', component: <Settings />, icon: 'settings.svg'},
            {label: 'About', component: <About />, icon: 'about.svg'},
        ]

        return <div className={`
                    side-bar absolute bg-blue-200 top-0 left-0
                    opacity-100 h-full z-30 rounded-tr-3xl rounded-br-3xl
                    transition-all duration-300 overflow-hidden 
                    ${ isOpen ? 'w-3/4 sm:w-1/2 md:w-1/3' : 'w-0' }
                `}>
                    <ul className="mt-12 relative w-full">
                        {menuItems.map(item => {
                            return (
                                <li key={item.label}
                                    className="m-2 p-3 border-black border-2 rounded-2xl
                                            hover:bg-emerald-700"
                                    onClick={() => {
                                        setIsOpen(false)
                                        // onModeChange(mode)
                                    }}
                                >
                                    {item.label}
                                </li>                        
                            )
                        })}
                    </ul>
                </div>
    }, [isOpen, setIsOpen]);

    return renderModes();
}
 
export default SideBar;