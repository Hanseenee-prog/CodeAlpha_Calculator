import './App.css'
import { useState } from "react";
import Header from './components/Header';
import SideBar from './components/SideBar';
import CalcDisplay from './components/CalcDisplay';
import KeyPadGrid from './components/KeyPadGrid';
import { standardButtons } from './data/buttons';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [buttons, setButtons] = useState(standardButtons);
  const [display, setDisplay] = useState(0);

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
          setButtons={setButtons}
          setIsOpen={setIsOpen}
        />
        <CalcDisplay 
          display={display}
          setDisplay={setDisplay}
        />
        < KeyPadGrid 
          buttons={buttons}
          setDisplay={setDisplay}
        />
      </div>
    </div>
  )
}

export default App;