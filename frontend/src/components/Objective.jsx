import simplebell from '../assets/icons/simplebell.png'

function Objective({ title, content, onRestart }) {
    return (
        <div className='w-full max-w-56 h-full max-h-35 bg-[#38BAF2] rounded-4xl p-3 border-[#20417E] border-4 min-w-0 xl:max-w-70 xl:max-h-60'>
            <div className="h-full p-2 bubble-text text-[#fbca1f] flex flex-col items-center border-2 border-[#1B5A82] rounded-xl min-h-0">
                {/* Título - se adapta al ancho disponible */}
                <div className="w-full flex-shrink-0">
                    <span className="text-[clamp(0.75rem,4vw,1.2rem)] lg:text-2xl leading-tight text-center block">
                        {title}
                    </span>
                </div>
                
                {/* Contenido principal - ocupa el espacio restante */}
                <div className="flex items-center h-full w-full flex-1 min-h-0 mt-[2%]">
                    {/* Icono - se adapta proporcionalmente */}
                    <div className="basis-1/3 flex justify-center items-center min-w-0">
                        <img 
                            src={simplebell} 
                            alt="Card doorbell" 
                            className="w-[60%] h-auto max-h-full object-contain xl:w-20" 
                        />
                    </div>
                    
                    {/* Texto del contenido - se adapta al espacio restante */}
                    <div className="basis-2/3 min-w-0 px-[2%]">
                        <p className="text-center text-[clamp(0.6rem,3vw,0.9rem)] xl:text-xl leading-tight break-words">
                            {content}
                        </p>
                    </div>
                </div>
                
                {/* Botón - se adapta al contenedor */}
                <div className="flex-shrink-0 mt-[2%]">
                    <button
                        className={`${title === "Has ganado!" ? "win-button text-gray-800 w-full py-[4%] px-[6%] text-[clamp(0.6rem,2.5vw,0.8rem)] xl:text-[clamp(0.65rem,2vw,0.75rem)] md:text-[clamp(0.7rem,1.5vw,0.7rem)] rounded-lg" : "hidden"}`}
                        onClick={onRestart}
                    >
                        Volver a jugar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Objective;