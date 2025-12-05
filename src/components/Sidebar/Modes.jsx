import { useCallback } from 'react'
import { useAppContext } from '../Contexts/AppContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Modes = ({ onModeChange, setDropdownOpenId }) => {
    const { setIsOpen } = useAppContext();

    // Wrapped in a useCallback hook to prevent unnecessary re-rendering
    const renderModes = useCallback(() => {
        const modes = ['Standard', 'Scientific', 'Programmer', 'Converter'];

        return (
            <div className={``}>
                <ul className="mt-2 relative w-full">
                    {modes.map(mode => {
                        return (
                            <li key={mode}
                                className="m-2 p-3 border-black border-2 rounded-2xl
                                        hover:bg-emerald-700"
                                onClick={() => {
                                    setIsOpen(false)
                                    setDropdownOpenId(null);
                                    onModeChange(mode)
                                }}
                            >
                                {/* If mode is Converter, add dropdown arrow */}
                                {mode !== 'Converter' ? mode : (
                                    <span className="w-full flex justify-between">
                                        {mode}
                                        <ChevronDown className="w-4 h-4" />
                                    </span>
                                )}
                            </li>                        
                        )
                    })}
                </ul>
            </div>
        )   
    }, [setIsOpen, onModeChange, setDropdownOpenId]);

    return renderModes();
}
 
export default Modes;