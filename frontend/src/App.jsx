import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Header, Objective } from './components';

import doorbell from './assets/icons/doorbell.png'

function App() {
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('count');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('count', count);
  }, [count]); 

  return (
    <>
      <Header count={count} />
      <button onClick={() => setCount(count + 1)}>
        <img src={doorbell} alt="Doorbell" className=" h-104 w-auto absolute mt-36 ml-30" />
      </button>
      <Objective 
        title="Objetivo final"
        content="Timbra 1000000 de veces!!"
      />
    </>
  )
}

export default App
