import './App.css'
import Header from './components/Header';

function App() {
  return (
    <div className='w-full h-full max-w-3xl md:h-[80vh] md:max-w-[80vw] lg:max-h-[80vh] lg:max-w-[60vw] bg-gray-100 rounded-2xl shadow-lg mx-auto p-4'>
      <Header />
    </div>
  )
}

export default App;