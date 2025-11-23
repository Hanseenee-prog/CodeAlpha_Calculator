import './App.css'
import { useCallback, useState } from "react";
import Header from './components/Header';
import SideBar from './components/SideBar';
import CalcDisplay from './components/CalcDisplay';
import KeyPadGrid from './components/KeyPadGrid';
import { standardButtons, scientificButtons, programmerButtons } from './data/buttons';
import { useCalcLogic } from './utils/useCalcLogic';

function App() {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ buttons, setButtons ] = useState(standardButtons);
  const { expression, result, onButtonClick, clear, cursorPosition, handleAction, moveCursor } = useCalcLogic();
  const [ mode, setMode ] = useState('Standard');

  // Handle mode change - like scientific, standard, etc
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

  const handleVoiceCommand = useCallback(async (command) => {
    // Process the voice command here
    console.log('Voice Command Received in App:', command, command.type, command.value);

    if (command.type === 'insert_text' && command.value) {
      // For insert_text, we pass the value
      // const characters = command.value.split('');

      // for (const char of characters) {
        handleAction('insert_text', command.value);
        // await delay(15);
      // }

      console.log('Text Command recieved', command.type)
      return;
    } 
    else if (command.type === 'left' || command.type === 'right') {
      console.log('Command received', command.type)
      moveCursor(command.type);
      return;
    } 
    else {
      handleAction(command.type);
    }
  }, [handleAction, moveCursor]);

  return (
    <div className='
      w-[90vw] h-[90vw] max-w-3xl md:h-[80vh] 
      md:max-w-[80vw] lg:max-h-[80vh] lg:max-w-[60vw] 
      bg-gray-100 rounded-2xl shadow-lg mx-auto p-4'
    >
                      
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
          onTranscript={handleVoiceCommand}
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