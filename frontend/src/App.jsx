import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react'
import './App.css'
import { Leaderboard, Login, Register } from './views';
import { Header, Objective, Upgrades, Shop } from './components';
import { click, win, unlock } from './assets/sounds';
import { AuthProvider, useAuth } from "./context/AuthContext";
import doorbell from './assets/icons/doorbell.png'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  // Win condition
  const [hasWon, setHasWon] = useState(false);
  const { isAuthenticated, username } = useAuth();
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
      new Audio(click).play();
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
    
  
    // Ejecutar la mejora
    if (upgradeId === 1) {
      console.log("Mejora 1: Cada click suma 5");
      new Audio(unlock).play();
      setClickMultiplier(5);
  
    } else if (upgradeId === 2) {
      console.log("Mejora 2: La producción total aumenta un 20%");
      new Audio(unlock).play();
      setIsProductionBoostActive(true);
  
    } else if (upgradeId === 3) {
      console.log("Mejora 3: Buff de 10 segundos cada minuto");
      new Audio(unlock).play();
  
      setClickMultiplier(10000);
      setIsBuffActive(true);
  
      setTimeout(() => {
        setClickMultiplier(5);
        setIsBuffActive(false);
      }, 10000);
  
      const buffInterval = setInterval(() => {
        setClickMultiplier(10000);
        setIsBuffActive(true);
  
        setTimeout(() => {
          setClickMultiplier(5);
          setIsBuffActive(false);
        }, 10000);
  
      }, 60000);
  
      return () => clearInterval(buffInterval);
  
    } else if (upgradeId === 4) {
      console.log("Mejora 4: Te regalan 10 robots");
      new Audio(unlock).play();
  
      const roboticArmBoost = 100;
      const cpsPerRoboticArm = 250;
      const totalAddedCPS = roboticArmBoost * cpsPerRoboticArm;
  
      setClicksPerSecond(prev => {
        const updated = prev + totalAddedCPS;
        localStorage.setItem('clicksPerSecond', updated);
        return updated;
      });
  
      setShopItemCounts(prevCounts => {
        const updatedCounts = {
          ...prevCounts,
          roboticarm: (prevCounts.roboticarm || 0) + roboticArmBoost,
        };
        localStorage.setItem('shopItemCounts', JSON.stringify(updatedCounts));
        return updatedCounts;
      });
  
    } else if (upgradeId === 5) {
      console.log("Mejora 5: Toda la producción se multiplica por 10");
      new Audio(unlock).play();
      setClicksPerSecond(prev => {
        const updated = prev * 10;
        localStorage.setItem('clicksPerSecond', updated);
        return updated;
      });
    }
  };
  


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
    if (hasWon) {
      setCount(100000000);
      return;
    }
  
    const interval = setInterval(() => {
      let production = clicksPerSecond / 20;
  
      if (isProductionBoostActive) {
        production += production * 0.2;
      }
  
      setCount((prevCount) => prevCount + production);
    }, 50);
  
    return () => clearInterval(interval);
  }, [clicksPerSecond, isProductionBoostActive, hasWon])

  //Timer
  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem('time');
    return savedTime ? parseInt(savedTime) : 0;
  }); // en milisegundos
  
  // Guarda tiempo actual en localstorage
  useEffect(() => {
    localStorage.setItem('time', JSON.stringify(time))
  }, [time]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (hasWon) {
      clearInterval(intervalRef.current);
      return;
    }
  
    intervalRef.current = setInterval(() => {
      setTime(prev => prev + 10);
    }, 10);
  
    return () => clearInterval(intervalRef.current);
  }, [hasWon]);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = (ms % 1000) / 10; // dos dígitos
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const token = localStorage.getItem("token");

  // Llamada a la API para guardar resultado
  const saveResult = async () => {
    try {
      const res = await fetch(`${API_URL}/api/leaderboards/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          username,
          time,
        }),
      });
  
      const data = await res.json();
  
      if (!data.success) {
        console.log("Error al guardar resultado:", data.message);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log("Error de red al guardar resultado:", error.message);
      return false;
    }
  };

  useEffect(() => {
    if (count >= 100000000 && !hasWon) {
      setHasWon(true);
      clearInterval(intervalRef.current);
      new Audio(win).play();
  
      const handleWin = async () => {
        const result = await saveResult();
        if (result) {
          console.log("Resultado guardado exitosamente.");
          // Ejecutar script de python para enviar correo
          const resEmail = await axios.get(`${API_URL}/api/users/sendEmail`, {
            headers: {
              Authorization: token,
            },
          });          
          console.log(resEmail.data);
        } else {
          console.log("No es un nuevo récord:", result.message);
        }
      };
  
      handleWin();
    }
  }, [count]);

  const handleRestart = () => {
    setHasWon(false);
    setCount(0);
    setTime(0);
    setClicksPerSecond(0);
    setShopItemCounts({ kid: 0, stick: 0, gum: 0, roboticarm: 0 });
    window.location.reload();
  };

  // Trucos de desarrollador
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'F1') {
        setClicksPerSecond(prev => prev + 10); // Aumenta los clicks por segundo para ganar mas rapido
      }
      if (event.key === 'F2') {
        setCount(prev => prev + 100000000); // Gana automaticamente
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
    new Audio(click).play();
  };

  
  const [floatingNumbers, setFloatingNumbers] = useState([]);


  return (
    <Router>
      <Routes>
        {/* Ruta principal */}
        <Route
          path="/"
          element={
            <div 
              className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('/images/wallpaper.png')`
              }}
            >
              <div className='max-w-screen'>
                <Header count={count} clicksPerSecond={clicksPerSecond} timer={time} formatTime={formatTime} />
                
                {/* Layout responsive: Mobile (vertical) vs Desktop/Tablet (horizontal) */}
                <div className="flex flex-col sm:flex-row">
                  
                  {/* Sección de la campana - Mobile: arriba, Desktop: izquierda */}
                  <div className="relative flex flex-col items-center justify-center p-4 pt-10">
                      <img
                        onClick={handleClick}
                        draggable="false"
                        src={doorbell}
                        alt="Doorbell"
                        className="cursor-pointer h-50"
                      />
                    
                      
                  </div>

                  {/* Sección de menús - Mobile: abajo, Desktop: derecha */}
                  <div className="flex-1 menu_shadow_mobile">
                    <div className='flex flex-col p-5 gap-10'>
                      <div className='w-full overflow-hidden'>
                        <Upgrades count={count} upgrades={upgrades} />
                      </div>
                      <div className='w-full overflow-hidden'>
                        <Shop 
                          calculateClicksPerSecond={calculateClicksPerSecond} 
                          shopItemCounts={shopItemCounts} 
                          count={count} 
                        />
                      </div>
                    </div>
                    <div className='flex w-full justify-center items-center flex-col gap-4 p-5'>
                      {hasWon ? (
                        <Objective 
                          title="Has ganado!" 
                          content="Has alcanzado 100 millones de timbres." 
                          className="hasWon" 
                          onRestart={handleRestart}
                        />
                      ) : (
                        <Objective 
                          title="Objetivo final" 
                          content="Timbra 100 millones de veces!!" 
                        />
                      )}
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          }
        />
      
        <Route path="/Leaderboard" element={<Leaderboard />} />
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Register" element={<Register />}></Route>
      </Routes>
    </Router>
  );
}

export default App
