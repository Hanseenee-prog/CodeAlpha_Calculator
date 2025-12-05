import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Calculator from './Calculator.jsx'
import { AppProvider } from './components/Contexts/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <Calculator />
    </AppProvider>
  </StrictMode>
)
