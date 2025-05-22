import { useState, useEffect } from 'react';

function RankingUser({ player }) {
    const colorClasses = {
        1: {
            border: 'border-amarillo',
            text: 'text-amarillo',
        },
        2: {
            border: 'border-plata',
            text: 'text-plata',
        },
        3: {
            border: 'border-bronce',
            text: 'text-bronce',
        },
        default: {
            border: 'border-black',
            text: 'text-black',
        },
    };
      
    const { border, text } = colorClasses[player.position] || colorClasses.default;
    
    return (
        player.position === 0 ? (
            <p className="text-2xl opacity-70">Completa una partida para ver tu posición</p>
        ) : (
            <div className={`flex items-center justify-between p-3 bg-blanco border-10 ${border} rounded-4xl shadow-md mb-4 w-150`}>
                <div className="flex items-center gap-8">
                    <span className={`text-5xl bubble-text ${text}`}>#{player.position}</span>
                    <span className="text-black text-4xl">{player.username}</span>
                </div>
                <div>
                    <span className="text-black text-2xl opacity-70">Tiempo: {player.record}</span>
                </div>
            </div>
        )
    );
}

export default RankingUser;