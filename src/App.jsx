import './App.css'
import { useState } from "react";
import Header from './components/Header';
import SideBar from './components/SideBar';
import CalcDisplay from './components/CalcDisplay';
import KeyPadGrid from './components/KeyPadGrid';
import { standardButtons, scientificButtons, programmerButtons } from './data/buttons';
import { useCalcLogic } from './utils.js/useCalcLogic';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [buttons, setButtons] = useState(standardButtons);
  const { expression, result, onButtonClick, clear, cursorPosition } = useCalcLogic();
  const [mode, setMode] = useState('Standard');

  const handleModeChange = (newMode) => {
    setMode(newMode);
    switch (newMode) {
      case 'Standard': setButtons(standardButtons); break;
      case 'Scientific': setButtons(scientificButtons); break;
      case 'Programmer': setButtons(programmerButtons); break;
      default: setButtons(standardButtons);
    }
    clear();
  };

  return (
    <div className='w-[90vw] h-[90vw] max-w-3xl md:h-[80vh] 
                    md:max-w-[80vw] lg:max-h-[80vh] lg:max-w-[60vw] 
                    bg-gray-100 rounded-2xl shadow-lg mx-auto p-4'>
                      
      <div className="calc-contents h-full flex items-stretch flex-col w-full relative">
        <Header 
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        <SideBar 
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onModeChange={handleModeChange}
        />

        <CalcDisplay 
          expression={expression}
          result={result}
          cursorPosition={cursorPosition}
        />

        < KeyPadGrid 
          buttons={buttons}
          onButtonClick={onButtonClick}
          mode={mode}
        />
      </div>
    </div>
  )
}

export default App;