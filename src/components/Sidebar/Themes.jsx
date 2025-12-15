import { MoonIcon } from 'lucide-react';
import { Sun, Moon } from 'lucide-react';
import { useCallback } from 'react';
import { useAppContext } from '../Contexts/AppContext';

const themes = [
    { label: 'Light', Icon: <Sun /> }, 
    { label: 'Dark', Icon: <Moon /> }
]

const Themes = () => {
    const {theme, setTheme} = useAppContext();

    const renderThemes = useCallback(() => {
        return ( 
            <div className="
                flex flex-row rounded-2xl h-12 bg-emerald-200
                items-center w-4/5 cursor-pointer
            ">
                {themes.map(({label, Icon}) => {
                    return (
                        <div
                            key={label} 
                            className={`
                                flex items-center justify-center w-1/2 h-full rounded-2xl
                                ${theme === label ? 'bg-amber-400' : ''}
                            `}
                            onClick={() => setTheme(label)}
                        >
                            <div className="flex flex-row gap-4">
                               <span className='w-3 h-3'>{Icon}</span>
                                <span>{label}</span> 
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