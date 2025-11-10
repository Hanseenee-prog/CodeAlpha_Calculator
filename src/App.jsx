import './App.css'
import { useState } from "react";
import Header from './components/Header';
import SideBar from './components/SideBar';
import CalcInput from './components/CalcInput';
import KeyPadGrid from './components/KeyPadGrid';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [buttons, setButtons] = useState(['+', "-", "1"])

  return (
    <div className='w-[90vw] h-[90vw] max-w-3xl md:h-[80vh] 
                    md:max-w-[80vw] lg:max-h-[80vh] lg:max-w-[60vw] 
                    bg-gray-100 rounded-2xl shadow-lg mx-auto p-4'>
                      
      <div className="calc-contents relative h-full overflow-hidden">
        <Header 
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <SideBar 
          isOpen={isOpen}
        />
        <CalcInput />
        <KeyPadGrid 
          buttons={buttons}
          setButtons={setButtons}
        />
      </div>
    </div>
  )
}

export default App;