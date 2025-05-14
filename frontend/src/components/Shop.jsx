import { useEffect, useState } from 'react';
import kid from '../assets/icons/kid.png';
import stick from '../assets/icons/stick.png';
import gum from '../assets/icons/gum.png';
import roboticarm from '../assets/icons/roboticarm.png';
import ShopItem from './ShopItem';

function Shop({ calculateClicksPerSecond, shopItemCounts, count }) {
    const [multiplier, setMultiplier] = useState(1); // Estado para el multiplicador
    const [unlocked, setUnlocked] = useState([false, false, false, false]);

    useEffect(() => {
        console.log(unlocked)
        if (count >= 25 / 2 && !unlocked[0]) {
            const newUnlocked = [...unlocked];
            newUnlocked[0] = true;
            setUnlocked(newUnlocked);
        } else if (count >= 500 / 2 && !unlocked[1]){
            const newUnlocked = [...unlocked];
            newUnlocked[1] = true;
            setUnlocked(newUnlocked);
        } else if (count >= 4000 / 2 && !unlocked[2]){
            const newUnlocked = [...unlocked];
            newUnlocked[2] = true;
            setUnlocked(newUnlocked);
        } else if (count >= 40000 / 2 && !unlocked[3]){
            const newUnlocked = [...unlocked];
            newUnlocked[3] = true;
            setUnlocked(newUnlocked);
        }
    }, [count, unlocked]);

    return (
        <div className='flex items-center justify-center flex-col'>
            <h2 className="text-6xl bubble-text mb-2">Tienda</h2> {/* Menos margen superior */}

            {/* Contenedor de los botones para seleccionar el multiplicador */}
            <div className="flex gap-4 mb-4">
                <button
                    onClick={() => setMultiplier(1)}
                    className={`px-4 py-2 text-white cursor-pointer ${multiplier === 1 ? 'text-bold text-2xl' : 'opacity-80 text-semibold text-xl'}`}
                >
                    x1
                </button>
                <button
                    onClick={() => setMultiplier(10)}
                    className={`px-4 py-2 text-white cursor-pointer ${multiplier === 10 ? 'text-white text-bold text-2xl' : 'opacity-80 text-white text-semibold text-xl'}`}
                >
                    x10
                </button>
                <button
                    onClick={() => setMultiplier(100)}
                    className={`px-4 py-2 text-white cursor-pointer ${multiplier === 100 ? 'text-white text-bold text-2xl' : 'opacity-80 text-white text-semibold text-xl'}`}
                >
                    x100
                </button>
            </div>
            {/* Lista de objetos de la tienda */}
            <div className="h-[200px] 2xl:h-[460px] overflow-y-auto p-2">
                <ul className='flex flex-col gap-2'>
                    <li onClick={() => calculateClicksPerSecond(1 * multiplier, 25 * multiplier, 'kid', multiplier)} className='relative group'>
                        <ShopItem name="Niño travieso" price={25 * multiplier} image={kid} itemCount={shopItemCounts.kid} unlocked={unlocked[0]}/>
                        <div className={`${(unlocked[0] || shopItemCounts.kid !== 0) ? "" : "hidden"} fixed left-[55%] top-[52.5%] transform -translate-x-1/2 w-[300px] p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-10`}>
                            <p className='font-extrabold text-xl'>Niño travieso</p>
                            <br />
                            <p>Este niño se aburre y no tiene nada mejor que hacer que ayudarte en tu malevolo objetivo.</p>
                            <br />
                            <p>Suma 1 timbre por segundo</p>
                            <br />
                            <p className='font-extrabold text-lg'>Produccion actual: {shopItemCounts.kid * 1}/s</p>
                        </div>
                    </li>
                    <li onClick={() => calculateClicksPerSecond(25 * multiplier, 500 * multiplier, 'stick', multiplier)} className='relative group'>
                        <ShopItem name="Palillo" price={500 * multiplier} image={stick} itemCount={shopItemCounts.stick} unlocked={unlocked[1]}/>
                        <div className={`${(unlocked[1] || shopItemCounts.stick !== 0) ? "" : "hidden"} fixed left-[55%] top-[64%] transform -translate-x-1/2 w-[300px] p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-10`}>
                            <p className='font-extrabold text-xl'>Palillo</p>
                            <br />
                            <p>Engancha este palillo a un timbre y dejalo sonando hasta el infinito!</p>
                            <br />
                            <p>Suma 25 timbres por segundo</p>
                            <br />
                            <p className='font-extrabold text-lg'>Produccion actual: {shopItemCounts.stick * 25}/s</p>
                        </div>
                    </li>
                    <li onClick={() => calculateClicksPerSecond(150 * multiplier, 3000 * multiplier, 'gum', multiplier)} className='relative group'>
                        <ShopItem name="Chicle" price={4000 * multiplier} image={gum} itemCount={shopItemCounts.gum} unlocked={unlocked[2]}/>
                        <div className={`${(unlocked[2] || shopItemCounts.gum !== 0) ? "" : "hidden"} fixed left-[55%] top-[64%] transform -translate-x-1/2 w-[300px] p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-10`}>
                            <p className='font-extrabold text-xl'>Chicle</p>
                            <br />
                            <p>Moderniza tus palillos con un buen chicle mascado y maximiza tus ganancias! Tus vecinos y odiarán!</p>
                            <br />
                            <p>Suma 150 timbres por segundo</p>
                            <br />
                            <p className='font-extrabold text-lg'>Produccion actual: {shopItemCounts.gum * 150}/s</p>
                        </div>
                    </li>
                    <li onClick={() => calculateClicksPerSecond(500 * multiplier, 30000 * multiplier, 'roboticarm', multiplier)} className='relative group'>
                        <ShopItem name="Robot" price={40000 * multiplier} image={roboticarm} itemCount={shopItemCounts.roboticarm} unlocked={unlocked[3]}/>
                        <div className={`${(unlocked[3] || shopItemCounts.roboticarm !== 0) ? "" : "hidden"} fixed left-[55%] top-[75%] transform -translate-x-1/2 w-[300px] p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-10`}>
                            <p className='font-extrabold text-xl'>Robot</p>
                            <br />
                            <p>El futuro esta aqui... pon a los robots de tu lado y no te atacarán en la revolución! Nadie toca más.. timbres... que un robot!</p>
                            <br />
                            <p>Suma 500 timbres por segundo</p>
                            <br />
                            <p className='font-extrabold text-lg'>Produccion actual: {shopItemCounts.roboticarm * 500}/s</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Shop;