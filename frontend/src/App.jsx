import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'
import './App.css'
import Leaderboard from './views/Leaderboard';
import { Header, Objective, Upgrades, Shop } from './components';

import doorbell from './assets/icons/doorbell.png'

function App() {
  // Declarar variables y localstorage del contador principal de timbres
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('count');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  const [production, setProduction] = useState(0);

  // Declarar variables y localstorage del contador de timbres por segundos
  const [clicksPerSecond, setClicksPerSecond] = useState(() => {
    const savedCPS = localStorage.getItem('clicksPerSecond');
    return savedCPS ? parseFloat(savedCPS) : 0;
  });

  // Recibe las compras de la tienda y aunmenta el contador de timbres por segundo
  const calculateClicksPerSecond = (addValue, cost) => {
    if (cost <= localStorage.getItem('count')) {
      setClicksPerSecond(clicksPerSecond + addValue);
      setCount(count - cost);
    }
  };

  // Mejoras
  const [clickMultiplier, setClickMultiplier] = useState(1);

  const upgrades = (upgradeId) => {
    console.log('entra')
    if (upgradeId === 1) {
      console.log("mejora 1")
      setClickMultiplier(2);
    }else if (upgradeId === 2){
      console.log("mejora 2")
    }else if (upgradeId === 3){
      console.log("mejora 3")
    }else if (upgradeId === 4){
      console.log("mejora 4") 
    }else if (upgradeId === 5){
      console.log("mejora 5")
    }
  }

  // Actualiza el contador de timbres
  useEffect(() => {
    localStorage.setItem('count', count);
  }, [count]);

  // Actualiza el contador de timbres por segundo
  useEffect(() => {
    localStorage.setItem('clicksPerSecond', clicksPerSecond);
  }, [clicksPerSecond]);

  // Actualiza automaticamente los timbres totales cada 0.10 segundos segun los timbres por segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => prevCount + clicksPerSecond / 20);
    }, 50);
  
    return () => clearInterval(interval);
  }, [clicksPerSecond]);

  // Reinicia la partida al clickar la tecla R
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'r' || event.key === 'R') {
        setCount(0);
        setClicksPerSecond(0);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Ruta principal */}
        <Route
          path="/"
          element={
            <div className="h-screen overflow-hidden">
              <Header count={count} clicksPerSecond={clicksPerSecond} />
              <img
                onClick={() => setCount(count + clickMultiplier)}
                src={doorbell}
                alt="Doorbell"
                className="h-104 w-auto absolute mt-36 ml-30 cursor-pointer"
              />
              <Objective title="Objetivo final" content="Timbra 1000000 de veces!!" />
              <div className="flex ml-auto w-[55%] menu_shadow h-full">
                <div className="flex flex-col gap-12 w-4/6 ml-auto mr-20 mt-10">
                  <Upgrades count={count} upgrades={upgrades} />
                  <Shop calculateClicksPerSecond={calculateClicksPerSecond} />
                </div>
              </div>
            </div>
          }
        />
      
        <Route path="/Leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App
