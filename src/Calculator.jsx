import './App.css'
import { useCallback, useRef, useState } from "react";
import Header from './components/Header';
import SideBar from './components/SideBar';
import CalcDisplay from './components/CalcDisplay';
import KeyPadGrid from './components/KeyPadGrid';
import { standardButtons, scientificButtons, programmerButtons } from './data/buttons';
import { useCalcLogic } from './utils/useCalcLogic';
import delay from './utils/delay';

function Calculator() {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ buttons, setButtons ] = useState(standardButtons);
  const { expression, result, onButtonClick, clear, cursorPosition, handleAction, moveCursor } = useCalcLogic();
  const [ mode, setMode ] = useState('Standard');
  const isProcessingVoice = useRef(false);

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
    console.log('Voice Command Received in Calculator:', command);
    if (!command) return;

    while (isProcessingVoice.current) {
      await delay(50);
    }
    isProcessingVoice.current = true;

    try {
      // Handle action commands
      if (command.type !== 'insert_text') {
        if (command.type === 'left' || command.type === 'right') {
          moveCursor(command.type);
        }
        else if (command.type === 'calculate') {
          await delay(200);
          handleAction('calculate');
          console.log('waited')
        }
        else handleAction(command.type); 
        return;
      }

      // Handle insert commands
      if (command.type === 'insert_text' && command.value) {
        const characters = command.value.split('');

        for (const char of characters) {
          handleAction('insert_text', char);
          console.log(char);
          await delay(100);
        }
      }
    } 
    finally {
      isProcessingVoice.current = false;
    }
  }, [moveCursor, handleAction]);

  return (
    <div className='
      w-[90vw] h-[90vh] min-w-[320px] min-h-[480px]
      md:h-[80vh] md:max-w-[80vw] 
      lg:max-h-[80vh] lg:max-w-[60vw] 
      bg-gray-100 rounded-4xl shadow-lg mx-auto'
    >
                      
      <div className="h-full flex items-stretch flex-col w-full relative overflow-hidden">
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
        <KeyPadGrid 
          buttons={buttons}
          onButtonClick={onButtonClick}
          mode={mode}
        />
      </div>
    </div>
  )
}

export default Calculator;