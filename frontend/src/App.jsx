import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import doorbell from './assets/icons/doorbell.png'

function App() {

  return (
    <>
      <Header />
      <img src={doorbell} alt="Doorbell" className=" h-104 w-auto  absolute" />
    </>
  )
}

export default App
