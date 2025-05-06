import { useState, useEffect } from 'react';
import arrow from '../assets/icons/arrow.png';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"; 
import RankingUser from '../components/RankingUser';


function Leaderboard() {
    const { isAuthenticated } = useAuth();
    const pepe = "pepe";
    const time1 = "20:34:09";
    const juan = "Juan";
    const time2 = "21:34:09";
    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
        <img
            src="/images/wallpaper.png"
            alt="Fondo"
            className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50"
        />
        
        <div className="w-200 h-200 space-y-8 bg-gray-800 bg-opacity-80 p-10 rounded-2xl border-2 border-yellow-400 shadow-2xl relative z-10">
            <Link to="/" className="absolute top-4 left-18">
                <img src={arrow} alt="Flecha para volver" className="w-14 h-14" />
            </Link>
            {!isAuthenticated && (
                <Link to="/login" className="absolute top-4 right-10 text-xl">
                    Iniciar sesión / Registrarte
                </Link>
            )}
            <div className="mt-24 h-100 flex flex-col items-center"> {/* Div para añadir la clasificación */ }
                <h1 className="flex justify-center items-center text-4xl mb-10">Clasificación</h1>
                <RankingUser username={pepe} time={time1} position={1}></RankingUser>
                <RankingUser username={juan} time={time2} position={2}></RankingUser>

            </div>
            <div className="w-full text-center"> {/* Div pegado abajo */}
                <h2 className="text-4xl mb-10">Tu posición</h2>
                {!isAuthenticated ? (
                    <p className="text-2xl opacity-70">Inicia sesión para ver tu posición</p>
                ) : (
                    <RankingUser username={pepe} time={time1} position={1}></RankingUser>
                )}
            </div>
        </div>
    </div>
    );
}

export default Leaderboard;