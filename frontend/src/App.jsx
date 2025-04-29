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

  // Guardar el estado de los contadores de los ShopItems
  const [shopItemCounts, setShopItemCounts] = useState(() => {
    const savedCounts = localStorage.getItem('shopItemCounts');
    return savedCounts ? JSON.parse(savedCounts) : { kid: 0, stick: 0, gum: 0, roboticarm: 0 };
  });

  // Recibe las compras de la tienda y aunmenta el contador de timbres por segundo
  const calculateClicksPerSecond = (addValue, cost, item) => {
    if (cost <= localStorage.getItem('count')) {
      setClicksPerSecond(clicksPerSecond + addValue);
      setCount(count - cost);
      setShopItemCounts(prevCounts => {
        const newCounts = { ...prevCounts, [item]: prevCounts[item] + 1 };
        localStorage.setItem('shopItemCounts', JSON.stringify(newCounts));
        return newCounts;
      });
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

  // Actualiza el contador de timbres
  useEffect(() => {
    localStorage.setItem('shopItemCounts', JSON.stringify(shopItemCounts));
  }, [shopItemCounts]);

  // Actualiza automaticamente los timbres totales cada 0.10 segundos segun los timbres por segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => prevCount + clicksPerSecond / 20);
    }, 50);
  
    return () => clearInterval(interval);
  }, [clicksPerSecond]);

  // Win condition
  useEffect(() => {
    if (count >= 1000000) {
      alert("¡Has ganado!");
      setCount(0);
      setClicksPerSecond(0);
      setShopItemCounts({ kid: 0, stick: 0, gum: 0, roboticarm: 0 });
    }
  }, [count]);

  // Trucos de desarrollador
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'r' || event.key === 'R') {
        setCount(0);
        setClicksPerSecond(0);
        setShopItemCounts({ kid: 0, stick: 0, gum: 0, roboticarm: 0 });
      }
      if (event.key === 't' || event.key === 'T') {
        setClicksPerSecond(prev => prev + 1);
      }
      if (event.key === 'w' || event.key === 'W') {
        setCount(prev => prev + 1000000);
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
            <div className=" relative h-screen overflow-hidden">
              <img
                src="/images/wallpaper.png"
                alt="Fondo"
                className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
              />
              <div className=''>
                <Header count={count} clicksPerSecond={clicksPerSecond} />
                <img
                  onClick={() => setCount(count + clickMultiplier)}
                  src={doorbell}
                  alt="Doorbell"
                  className="absolute left-[16%] top-[52%] transform -translate-x-1/2 -translate-y-1/2 w-[20%] cursor-pointer"
                />
                <div className='absolute left-[22%] top-[15%] transform -translate-x-1/2 -translate-y-1/2 w-[1000px]'>
                  <Objective title="Objetivo final" content="Timbra 1000000 de veces!!" />
                </div>
                <div className="flex ml-auto w-[55%] menu_shadow h-[5000px]">
                  <div className="flex flex-col gap-12 w-4/6 ml-auto mr-20 mt-10">
                    <Upgrades count={count} upgrades={upgrades} />
                    <Shop calculateClicksPerSecond={calculateClicksPerSecond} shopItemCounts={shopItemCounts} />
                  </div>
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
