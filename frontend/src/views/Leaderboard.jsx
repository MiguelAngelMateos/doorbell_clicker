import arrow from '../assets/icons/arrow.png';
import { Link } from 'react-router-dom';

function Leaderboard() {
    return (
    <div className="h-screen flex items-center justify-center">
        <div className="w-200 h-200 bg-[#202020] border-6 border-[#FFCC26] rounded-4xl relative">
            <Link to="/" className="absolute top-4 left-18">
                <img src={arrow} alt="Flecha para volver" className="w-14 h-14" />
            </Link>
            <span className="absolute top-4 right-10 text-xl">Iniciar sesión/Registrarte</span>
            <div className="mt-24"> {/* Div para añadir la clasificación */ }
                <h1 className="flex justify-center items-center text-4xl border-1">Clasificación</h1>
            </div>
            <div className="absolute bottom-34 w-full text-center border-1"> {/* Div pegado abajo */}
                <h2 className="text-4xl">Tu posición</h2>
            </div>
        </div>
    </div>
    );
}

export default Leaderboard;