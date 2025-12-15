import { useCallback } from 'react'
import { useAppContext } from '../Contexts/AppContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Modes = ({ onModeChange, setDropdownOpenId }) => {
    const { setIsOpen, mode } = useAppContext();

    // Wrapped in a useCallback hook to prevent unnecessary re-rendering
    const renderModes = useCallback(() => {
        const modes = ['Standard', 'Scientific', 'Programmer', 'Converter'];

        return (
            <div className='w-full'>
                <ul className="mt-2 relative w-full">
                    {modes.map(modeOption => {
                        return (
                            <li key={modeOption}
                                className={`
                                    m-2 p-2.5 border-b border-l-4
                                    hover:bg-blue-50 cursor-pointer
                                    ${modeOption === mode ? 'border-l-blue-500 border-tl-none' : 'border-l-blue-100 rounded-t-2xl'}
                                `}
                                onClick={() => {
                                    setIsOpen(false)
                                    setDropdownOpenId(null);
                                    onModeChange(modeOption)
                                }}
                            >
                                {/* If mode is Converter, add dropdown arrow */}
                                {modeOption !== 'Converter' ? modeOption : (
                                    <span className="w-full flex justify-between items-center">
                                        {modeOption}
                                        <ChevronDown className="w-4 h-4" />
                                    </span>
                                )}
                            </li>                        
                        )
                    })}
                </ul>
            </div>
        )   
    }, [setIsOpen, onModeChange, setDropdownOpenId, mode]);

    return renderModes();
}
 
export default Modes;