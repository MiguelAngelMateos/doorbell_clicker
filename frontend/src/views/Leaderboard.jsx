import { useState, useEffect } from 'react';
import arrow from '../assets/icons/arrow.png';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"; 
import RankingUser from '../components/RankingUser';


function Leaderboard() {
    const { isAuthenticated } = useAuth();
    // array donde meter el top 100 players
    const players = [];

    // ejemplo de variable donde meter el jugador logueado en ese momento
    const actualPlayer = {
        username: "pepe",
        record: "20:00",
        position: 1
    }

    // Ejemplo de como deberia ser un player con los campos que debe tener
    players[0] = {
        username: "pepe",
        record: "20:00",
        position: 1
    }

    players[1] = {
        username: "maria",
        record: "21:35",
        position: 2
    };
    
    players[2] = {
        username: "lucas",
        record: "22:10",
        position: 3
    };
    
    players[3] = {
        username: "ana",
        record: "23:45",
        position: 4
    };
    
    players[4] = {
        username: "carlos",
        record: "25:00",
        position: 5
    };


    // Creo una variable con un componente RankingUser por cada player
    const listPlayers = players.map((player, index) => 
        <RankingUser key={`${player.username}-${index}`} player={player}></RankingUser>
    )

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
            <div className="mt-12 h-120 max-h-120 flex flex-col items-center overflow-auto no-scrollbar">
                <div className="flex w-full justify-center items-center text-4xl pb-4 sticky top-0 z-10 bg-gray-800 bg-opacity-80">
                    <h1>Clasificación</h1>
                </div>
                {listPlayers}
            </div>
            <div className="w-full text-center flex flex-col items-center">
                <h2 className="text-4xl mb-4">Tu posición</h2>
                {!isAuthenticated ? (
                    <p className="text-2xl opacity-70">Inicia sesión para ver tu posición</p>
                ) : (
                    <RankingUser key={100} player={actualPlayer}></RankingUser>
                )}
            </div>
        </div>
    </div>
    );
}

export default Leaderboard;