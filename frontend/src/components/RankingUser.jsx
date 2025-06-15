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
            <div className={`flex items-center justify-between p-3 bg-blanco border-10 ${border} rounded-4xl shadow-md mb-4 w-full`}>
                <div className="flex items-center gap-2 w-full">
                    <span className={`text-2xl bubble-text ${text} flex-shrink-0`}>#{player.position}</span>
                    <span className="text-black text-1xl w-1/3 truncate flex-shrink-0">
                        {player.username}
                    </span>
                    <span className="text-black text-1xl opacity-70 flex-1 min-w-0">
                        Tiempo: {player.record}
                    </span>
                </div>
            </div>
        )
    );
}

export default RankingUser;