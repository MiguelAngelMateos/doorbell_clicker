import { useState, useEffect } from 'react';

function RankingUser({ username, time, position }) {
    const color = position === 1 ? 'amarillo' : position === 2 ? 'plata' : position === 3 ? 'bronce' : 'black';
    return (
        <div className={`flex items-center justify-between p-3 bg-blanco border-10 border-${color} rounded-4xl shadow-md mb-4 w-150`}>
            <div className="flex items-center gap-8">
                <span className="text-5xl bubble-text text-amarillo">#{position}</span>
                <span className="text-black text-4xl">{username}</span>
            </div>
            <div>
                <span className="text-black text-2xl opacity-70" >Tiempo: {time}</span>
            </div>
        </div>
    );
}

export default RankingUser;