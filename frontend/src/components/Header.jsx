import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import incognite from '../assets/icons/incognite.png';
import down_arrow from '../assets/icons/down_arrow.png';
import { useAuth } from "../context/AuthContext";

function Header({ count, clicksPerSecond, timer, formatTime }) {
    const { isAuthenticated, username, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
      logout(); 
      navigate("/Login");
    };

    const divRulesRef = useRef();
    const divUserRef = useRef();

    const managePopup = (popupRef) => {
        if (popupRef.current.classList.contains('hidden')) {
            popupRef.current.classList.remove('hidden');
        } else {
            popupRef.current.classList.add('hidden');
        }
    };

    return (
        <header className="w-full bg-[#202020] flex flex-col py-4 justify-between items-center relative
        sm:flex-row sm:items-center sm:px-10">
            <div className="flex flex-col text-center w-full sm:block sm:w-1/2">
                <div className='absolute group'>
                    <img src={incognite} alt="ayuda" className='bg-gray-200 rounded-full p-1 w-8 ml-5 cursor-pointer' onClick={() => managePopup(divRulesRef)}/>
                    <div ref={divRulesRef} className='absolute bg-white rounded-lg w-80 z-10 ml-4 mt-2 text-black p-4 hidden'>
                        <p className='font-extrabold text-xl'>Bienvenido a Doorbell Clicker!</p>
                        <br />
                        <p>Tu objetivo es molestar a todo el vecindario tocando el timbre de su puerta lo más rápido posible!</p>
                        <br />
                        <p>Gasta algunos de tus timbres comprando ayudantes en la tienda y desbloquea mejoras permanentes al llegar a ciertos hitos!</p>
                        <br />
                        <p>Buena suerte!</p>
                    </div>
                </div>
                <div className='absolute sm:hidden top-2 flex flex-col items-end right-0'>
                    <img src={down_arrow} alt="flecha de login/clasificación" className='w-8 mr-4 mt-2' onClick={() => managePopup(divUserRef)}/>
                    <div ref={divUserRef} className='bg-white rounded-lg w-80 z-10 text-black p-4 hidden flex flex-col gap-4'>
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
                </div>
                <div className=''>
                    <h1 className="text-5xl bubble-text">{count.toFixed(0)} timbres</h1>
                    <span className="text-2xl">Timbres por segundo: {clicksPerSecond.toFixed(0)}</span>
                </div>
                <div className=''>
                    <span className="text-2xl">Tiempo transcurrido: {formatTime(timer)}</span>
                </div>
            </div>

            <div className="flex mr-20 gap-18 text-2xl hidden 
            sm:flex sm:flex-col xl:flex-row xl:gap-20 sm:mr-0 sm:gap-4 sm:h-full sm:justify-center">
                {isAuthenticated ? ( 
                    <>
                        <Link to="/Leaderboard">Clasificación</Link>
                        <p>Usuario: {username}</p>
                        <button onClick={handleLogout} className="sm:flex sm:justify-start text-red-500 cursor-pointer">Cerrar sesión</button>
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