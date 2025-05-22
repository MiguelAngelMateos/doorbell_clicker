import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import incognite from '../assets/icons/incognite.png';
import { useAuth } from "../context/AuthContext";

function Header({ count, clicksPerSecond, timer, formatTime }) {
    const { isAuthenticated, username, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
      logout(); 
      navigate("/Login");
    };
    
    return (
        <header className="bg-[#202020] flex flex-row py-4 justify-between items-center">
            <div className="flex flex-row gap-2 text-center ml-16">
                <div className='relative group'>
                    <img src={incognite} alt="ayuda" className='bg-gray-200 rounded-full p-1 w-[40px] mt-5 cursor-pointer' />
                    <div className='absolute left-1/2 transform -translate-x-1/2 mt-4 ml-32 w-[300px] p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-10'>
                        <p className='font-extrabold text-xl'>Bienvenido a Doorbell Clicker!</p>
                        <br />
                        <p>Tu objetivo es molestar a todo el vecindario tocando el timbre de su puerta lo más rápido posible!</p>
                        <br />
                        <p>Gasta algunos de tus timbres comprando ayudantes en la tienda y desbloquea mejoras permanentes al llegar a ciertos hitos!</p>
                        <br />
                        <p>Buena suerte!</p>
                    </div>
                </div>
                <div className='ml-20 w-[500px]'>
                    <h1 className="text-5xl bubble-text">{count.toFixed(0)} timbres</h1>
                    <span className="text-2xl">Timbres por segundo: {clicksPerSecond.toFixed(0)}</span>
                </div>
                <div className='ml-10 w-[400px] mt-7'>
                    <span className="text-2xl">Tiempo transcurrido: {formatTime(timer)}</span>
                </div>
            </div>
            <div className="flex mr-20 gap-18 text-2xl">
                {isAuthenticated ? ( 
                    <>
                        <Link to="/Leaderboard">Clasificación</Link>
                        <p>Usuario: {username}</p>
                        <button onClick={handleLogout} className="text-red-500 cursor-pointer">Cerrar sesión</button>
                    </>
                ) : ( 
                    <>
                        <Link to="/Leaderboard">Clasificación</Link>
                        <Link to="/Login">Iniciar sesión/Registrarte</Link>
                    </>
                )}
            </div>
        </header>
    )
}
  
export default Header;