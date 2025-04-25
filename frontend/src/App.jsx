import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'
import './App.css'
import Leaderboard from './views/Leaderboard';
import { Header, Objective, Upgrades, Shop } from './components';

import doorbell from './assets/icons/doorbell.png'

function App() {
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('count');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  const [production, setProduction] = useState(0);

  useEffect(() => {
    localStorage.setItem('count', count);
  }, [count]); 

  return (
    <Router>
      <Routes>
        {/* Ruta principal */}
        <Route
          path="/"
          element={
            <div className="h-screen overflow-hidden">
              <Header count={count} production={production} />
              <img
                onClick={() => setCount(count + 1)}
                src={doorbell}
                alt="Doorbell"
                className="h-104 w-auto absolute mt-36 ml-30 cursor-pointer"
              />
              <Objective title="Objetivo final" content="Timbra 1000000 de veces!!" />
              <div className="flex ml-auto w-[55%] menu_shadow h-full">
                <div className="flex flex-col gap-12 w-4/6 ml-auto mr-20 mt-10">
                  <Upgrades />
                  <Shop setProduction={setProduction} />
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
