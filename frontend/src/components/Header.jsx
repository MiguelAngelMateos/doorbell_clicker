function Header() {
    return (
        <header className="bg-[#202020] flex flex-row py-4 justify-between items-center">
            <div className="flex flex-col gap-2 text-center ml-60">
                <h1 className="text-5xl bubble-text">6 timbres</h1>
                <span className="text-2xl">Timbres por segundo: 2.3</span>
            </div>
            <div className="flex mr-20 gap-18 text-2xl">
                <a href="#">Clasificación</a>
                <button>Iniciar sesión/Registrarte</button>
            </div>
        </header>
    )
}
  
export default Header;