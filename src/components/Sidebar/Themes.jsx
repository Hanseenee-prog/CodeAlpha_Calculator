import { Sun, Moon, Laptop } from 'lucide-react';
import { useCallback } from 'react';
import { useTheme } from '../../utils/hooks/useTheme';

const themes = [
    { label: 'Light', Icon: <Sun className="w-4 h-4" /> }, 
    { label: 'Dark', Icon: <Moon className="w-4 h-4" /> },
    { label: 'System', Icon: <Laptop className="w-4 h-4" /> }
]

const Themes = () => {
    const { theme, setTheme } = useTheme();

    const renderThemes = useCallback(() => {
        return ( 
            <div className="
                flex flex-row rounded-2xl h-12 
                bg-blue-200 dark:bg-slate-700/50
                items-center w-[95%] cursor-pointer overflow-hidden
                justify-evenly border border-blue-300/50 dark:border-slate-600
                overflow-x-auto [&::-webkit-scrollbar]:hidden
            ">
                {themes.map(({label, Icon}) => {
                    const isActive = theme === label.toLowerCase();
                    return (
                        <div
                            key={label} 
                            className={`
                                flex items-center justify-center h-[80%] px-4 rounded-xl
                                ${isActive 
                                    ? 'bg-amber-400 text-slate-900 shadow-sm' 
                                    : 'text-slate-700 dark:text-slate-300 hover:bg-blue-300/30 dark:hover:bg-slate-600/50'
                                }
                            `}
                            onClick={() => setTheme(label.toLowerCase())}
                        >
                            <div className="flex flex-row items-center gap-2">
                               <span className='flex items-center justify-center'>{Icon}</span>
                                <span className="text-sm font-medium">{label}</span> 
                            </div>
                        </div>
                    )    
                })}
            </div>
        );
    }, [theme, setTheme])

    return renderThemes();
}
 
export default Themes;