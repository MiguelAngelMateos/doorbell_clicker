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

  // Recibe las compras de la tienda y aumenta el contador de timbres por segundo
  const calculateClicksPerSecond = (addValue, cost, item, multiplier) => {
    console.log(cost)
    if (cost <= localStorage.getItem('count')) {
      setClicksPerSecond(clicksPerSecond + addValue);
      setCount(count - cost);
      setShopItemCounts(prevCounts => {
        const newCounts = { ...prevCounts, [item]: prevCounts[item] + multiplier };
        localStorage.setItem('shopItemCounts', JSON.stringify(newCounts));
        return newCounts;
      });
    }
  };

  // Mejoras
  const [clickMultiplier, setClickMultiplier] = useState(1);
  const [isBuffActive, setIsBuffActive] = useState(false);
  const [isProductionBoostActive, setIsProductionBoostActive] = useState(false); // Nuevo estado

  const upgrades = (upgradeId) => {
    console.log('entra')
    if (upgradeId === 1) {
      console.log("Mejora 1: Cada click suma 2")
      setClickMultiplier(2);
    }else if (upgradeId === 2){
      console.log("Mejora 2: La producción total aumenta un 20%")
      setIsProductionBoostActive(true); // Activar la mejora    
    }else if (upgradeId === 3){
      console.log("Mejora 3: Por cada minuto que pasa, hay 10 segundos donde tus clicks suman 100");
    
      // Activar el buff inmediatamente
      setClickMultiplier(100);
      setIsBuffActive(true);
    
      // Cortar el buff inicial después de 10 segundos
      setTimeout(() => {
        setClickMultiplier(2);
        setIsBuffActive(false);
      }, 10000);
    
      // Iniciar un intervalo que se repite cada 60s
      const buffInterval = setInterval(() => {
        // Activar buff
        setClickMultiplier(100);
        setIsBuffActive(true);
    
        // Cortar buff después de 10s
        setTimeout(() => {
          setClickMultiplier(1);
          setIsBuffActive(false);
        }, 10000);
    
      }, 60000);
    
      // Devolver función de limpieza si estás en un useEffect
      return () => clearInterval(buffInterval);
    }else if (upgradeId === 4){
      console.log("Mejora 4: Te regalan 100 máquinas picadoras");
    
      const roboticArmBoost = 100;
      const cpsPerRoboticArm = 5; // Ajusta según cuánto aporte cada uno
      const totalAddedCPS = roboticArmBoost * cpsPerRoboticArm;
    
      // Actualizar clicks por segundo
      setClicksPerSecond(prev => {
        const updated = prev + totalAddedCPS;
        localStorage.setItem('clicksPerSecond', updated);
        return updated;
      });
    
      // Actualizar cantidad de roboticarms
      setShopItemCounts(prevCounts => {
        const updatedCounts = {
          ...prevCounts,
          roboticarm: (prevCounts.roboticarm || 0) + roboticArmBoost,
        };
        localStorage.setItem('shopItemCounts', JSON.stringify(updatedCounts));
        return updatedCounts;
      });
    }else if (upgradeId === 5){
      console.log("Mejora 5: Toda la producción se multiplica por 10")
      setClicksPerSecond(prev => prev * 10);
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
      let production = clicksPerSecond / 20; // Producción base
  
      // Si el boost está activo, añade un 20% adicional
      if (isProductionBoostActive) {
        production += production * 0.2; // Incrementar en un 20%
      }
  
      setCount((prevCount) => prevCount + production); // Actualizar el contador
    }, 50);
  
    return () => clearInterval(interval);
  }, [clicksPerSecond, isProductionBoostActive]);

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

  // Manejar el clic en la campana
  const handleClick = (event) => {
    const { clientX, clientY } = event;
  
    const newId = Date.now(); // ID único para cada número
  
    setFloatingNumbers(prev => [
      ...prev,
      {
        id: newId,
        value: `+${clickMultiplier}`,
        x: clientX,
        y: clientY,
      },
    ]);
  
    // Eliminarlo después de 1 segundo
    setTimeout(() => {
      setFloatingNumbers(prev => prev.filter(n => n.id !== newId));
    }, 1000);
  
    // Actualizar contador
    setCount(prev => prev + clickMultiplier);
  };

  
  const [floatingNumbers, setFloatingNumbers] = useState([]);


  return (
    <Router>
      <Routes>
        {/* Ruta principal */}
        <Route
          path="/"
          element={
            <div className="relative h-screen overflow-hidden">
              <img
                src="/images/wallpaper.png"
                alt="Fondo"
                className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
              />
              <div className=''>
                <Header count={count} clicksPerSecond={clicksPerSecond} />
                <img
                  onClick={handleClick}
                  draggable="false"
                  src={doorbell}
                  alt="Doorbell"
                  className="absolute left-[16%] top-[52%] transform -translate-x-1/2 -translate-y-1/2 w-[20%] cursor-pointer"
                />
                {floatingNumbers.map((num) => (
                  <div
                    key={num.id}
                    className="floating-number text-green-500 text-xl font-bold select-none pointer-events-none"
                    style={{
                      position: 'absolute',
                      left: num.x + 5,
                      top: num.y - 20,
                    }}
                  >
                    {num.value}
                  </div>
                ))}
                <div className='fixed top-[10vh] left-[-50px] z-10 w-[1000px]'>
                  <Objective title="Objetivo final" content="Timbra 1000000 de veces!!" />
                </div>
                <div className="flex ml-auto w-[55%] menu_shadow h-screen">
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
