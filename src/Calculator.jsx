import './App.css'
import { useCallback, useEffect, useRef, useState } from "react";
import Header from './components/Header';
import SideBar from './components/Sidebar/SideBar';
import CalcDisplay from './components/CalcDisplay';
import KeyPadGrid from './components/Keypad/KeyPadGrid';
import { standardButtons, scientificButtons, programmerButtons } from './data/buttons';
import { useCalcLogic } from './utils/hooks/useCalcLogic';
import delay from './utils/helpers/delay';
import { useAppContext } from './components/Contexts/AppContext';

function Calculator() {
  const [ buttons, setButtons ] = useState(() => {
    const savedMode = localStorage.getItem('calculatorMode');

    switch (savedMode) {
      case 'Scientific': return scientificButtons;
      case 'Programmer': return programmerButtons;
      default: return standardButtons;
    }
  });

  const { expression, result, onButtonClick, clear, cursorPosition, handleAction, moveCursor } = useCalcLogic();
  const { setMode, isOpen, setIsOpen } = useAppContext();
  const isProcessingVoice = useRef(false);
  const sideBarRef = useRef(null);

  useEffect(() => {
    const savedMode = localStorage.getItem('calculatorMode');
    if (savedMode) handleModeChange(savedMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    localStorage.setItem('calculatorMode', newMode);

    switch (newMode) {
      case 'Standard': setButtons(standardButtons); break;
      case 'Scientific': setButtons(scientificButtons); break;
      case 'Programmer': setButtons(programmerButtons); break;
      default: setButtons(standardButtons);
    }
    clear();
  };

  const handleVoiceCommand = useCallback(async (command) => {
    console.log('Voice Command Received in Calculator:', command);
    if (!command) return;

    while (isProcessingVoice.current) {
      await delay(50);
    }
    isProcessingVoice.current = true;

    try {
      const commands = Array.isArray(command) ? command : [command];
      
      for (const cmd of commands) {
        if (cmd.type !== 'insert_text') {
          if (cmd.type === 'left' || cmd.type === 'right') {
            moveCursor(cmd.type);
          } else if (cmd.type === 'calculate') {
            await delay(200);
            handleAction('calculate');
          } else {
            handleAction(cmd.type); 
          }
        } else if (cmd.type === 'insert_text' && cmd.value) {
          // Typing effect for all devices
          const characters = cmd.value.split('');
          for (const char of characters) {
            handleAction('insert_text', char);
            await delay(100);
          }
        }
      }
    } finally {
      isProcessingVoice.current = false;
    }
  }, [moveCursor, handleAction]);

  const handleBodyClick = (e) => {
    if (!isOpen) return;
    if (sideBarRef.current?.contains(e.target)) return;
    setIsOpen(false);
  }

  return (
    <div className='
      w-[95vw] h-[95dvh] min-w-[320px] min-h-[500px]
      md:h-[85vh] md:max-w-[420px] 
      lg:h-[90vh] lg:max-w-[560px] 
      bg-gray-100 dark:bg-slate-800 
      shadow-2xl mx-auto
      rounded-3xl border border-gray-200 dark:border-slate-700
      overflow-hidden'
    >

      <div className="h-full flex items-stretch flex-col w-full relative overflow-hidden bg-transparent"
        onClick={handleBodyClick}
      >
        <Header 
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        <SideBar 
          ref={sideBarRef}
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
        />
      </div>
    </div>
  )
}

export default Calculator;