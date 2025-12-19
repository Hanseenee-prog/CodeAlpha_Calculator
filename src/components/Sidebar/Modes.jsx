import { useCallback } from 'react'
import { useAppContext } from '../Contexts/AppContext';
import { ChevronDown } from 'lucide-react';

const Modes = ({ onModeChange, setDropdownOpenId }) => {
    const { setIsOpen, mode } = useAppContext();

    // Wrapped in a useCallback hook to prevent unnecessary re-rendering
    const renderModes = useCallback(() => {
        const modes = ['Standard', 'Scientific', 'Programmer', 'Converter'];

        return (
            <div className='w-full'>
                <ul className="mt-2 relative w-full">
                    {modes.map(modeOption => {
                        const isActive = modeOption === mode;
                        return (
                            <li key={modeOption}
                                className={`
                                    m-2 p-2.5 border-b border-l-4 transition-colors
                                    cursor-pointer flex items-center
                                    hover:bg-blue-50 text-slate-900 border-blue-100
                                    
                                    dark:text-slate-100 dark:hover:bg-slate-700/50 
                                    dark:border-b-slate-700/50
                                    
                                    ${isActive 
                                        ? 'border-l-blue-500 bg-blue-50/50 dark:bg-slate-700 dark:border-l-blue-400' 
                                        : 'dark:border-l-slate-800 rounded-t-2xl'
                                    }
                                `}
                                onClick={() => {
                                    setIsOpen(false)
                                    setDropdownOpenId(null);
                                    onModeChange(modeOption)
                                }}
                            >
                                {(modeOption !== 'Converter' && modeOption !== 'Programmer') ? modeOption : (
                                    <span className="w-full flex flex-row justify-between items-center">
                                        {modeOption}
                                        <span className="text-[12px] text-blue-500 dark:text-blue-300">[Coming soon..]</span>
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