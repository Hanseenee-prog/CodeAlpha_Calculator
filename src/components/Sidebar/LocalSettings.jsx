import { useCallback } from "react";
import { useAppContext } from "../Contexts/AppContext";

const LocalSettings = () => {
    const { settings, setSettings } = useAppContext();

    const renderSettings = useCallback(() => {
        // Toggle handler for booleans
        const toggleSetting = (key) => {
            setSettings(prev => ({ ...prev, [key]: !prev[key] }));
        };

        // Handler for numeric values (Precision)
        const updatePrecision = (e) => {
            setSettings(prev => ({ ...prev, precision: parseInt(e.target.value) }));
        };

        return (
            <div className="flex flex-col h-full w-full p-3 text-slate-900 dark:text-slate-100">
                <div className="text-sm text-gray-500 dark:text-slate-400 pb-4 font-medium shrink-0">
                    Preferences
                </div>

                <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden flex flex-col gap-6">
                    
                    {/* Vibration Setting */}
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold">Haptic Feedback</p>
                            <p className="text-xs text-gray-500 dark:text-slate-400">Vibrate on key press</p>
                        </div>
                        <button 
                            onClick={() => toggleSetting('vibration')}
                            className={`w-12 h-6 rounded-full transition-colors relative ${settings.vibration ? 'bg-blue-500' : 'bg-gray-300 dark:bg-slate-600'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.vibration ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>

                    {/* Decimal Precision Setting */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold">Decimal Places</p>
                            <span className="text-blue-600 dark:text-blue-400 font-bold">{settings.precision}</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" max="10" 
                            value={settings.precision} 
                            onChange={updatePrecision}
                            className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <div className="flex justify-between text-[10px] text-gray-400">
                            <span>0</span>
                            <span>5</span>
                            <span>10</span>
                        </div>
                    </div>

                    {/* Thousand Separator Setting */}
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold">Thousands Separator</p>
                            <p className="text-xs text-gray-500 dark:text-slate-400">Example: 1,234,567</p>
                        </div>
                        <button 
                            onClick={() => toggleSetting('separators')}
                            className={`w-12 h-6 rounded-full transition-colors relative ${settings.separators ? 'bg-blue-500' : 'bg-gray-300 dark:bg-slate-600'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.separators ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>

                </div>
            </div>
        );
    }, [settings, setSettings]);

    return renderSettings();
};

export default LocalSettings;