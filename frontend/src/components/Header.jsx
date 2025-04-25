import { Link } from 'react-router-dom';

function Header({ count, production }) {
    return (
        <header className="bg-[#202020] flex flex-row py-4 justify-between items-center">
            <div className="flex flex-col gap-2 text-center ml-68">
                <h1 className="text-5xl bubble-text">{count} timbres</h1>
                <span className="text-2xl">Timbres por segundo: {production}</span>
            </div>
            <div className="flex mr-20 gap-18 text-2xl">
                <Link to="/Leaderboard">Clasificación</Link>
                <button>Iniciar sesión/Registrarte</button>
            </div>
        </header>
    )
}
  
export default Header;