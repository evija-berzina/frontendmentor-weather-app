import { useState } from 'react';
import {Header} from './components/Header'
import {Home} from './pages/Home'
import './App.css'

function App() {

  const [unit, setUnit] = useState({
    temperature: 'c',
    windSpeed: 'km/h',
    precipitation: 'mm',
  });
  const [showUnits, setShowUnits] = useState(false);

  return (
    <>
      <Header
        unit={unit}
        setUnit={setUnit}
        showUnits={showUnits}
        setShowUnits={setShowUnits}
      />
      <main>
        <Home
          unit={unit}
          showUnits={showUnits}
          setShowUnits={setShowUnits}
        />
      </main>
    </>
  )
}

export default App
