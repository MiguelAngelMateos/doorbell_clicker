import { useState } from 'react';
import kid from '../assets/icons/kid.png';
import stick from '../assets/icons/stick.png';
import gum from '../assets/icons/gum.png';
import roboticarm from '../assets/icons/roboticarm.png';
import ShopItem from './ShopItem';

function Shop({ calculateClicksPerSecond, shopItemCounts }) {
    const [multiplier, setMultiplier] = useState(1); // Estado para el multiplicador

    return (
        <div className='flex items-center justify-center flex-col'>
            <h2 className="text-6xl bubble-text mb-2">Tienda</h2> {/* Menos margen superior */}

            {/* Contenedor de los botones para seleccionar el multiplicador */}
            <div className="flex gap-4 mb-4">
                <button
                    onClick={() => setMultiplier(1)}
                    className={`px-4 py-2 ${multiplier === 1 ? 'text-white bg-gray-700' : 'text-gray-400 bg-gray-300'}`}
                >
                    x1
                </button>
                <button
                    onClick={() => setMultiplier(10)}
                    className={`px-4 py-2 ${multiplier === 10 ? 'text-white bg-gray-700' : 'text-gray-400 bg-gray-300'}`}
                >
                    x10
                </button>
                <button
                    onClick={() => setMultiplier(100)}
                    className={`px-4 py-2 ${multiplier === 100 ? 'text-white bg-gray-700' : 'text-gray-400 bg-gray-300'}`}
                >
                    x100
                </button>
            </div>

            <ul className='flex flex-col gap-2'>
                <li onClick={() => calculateClicksPerSecond(0.5 * multiplier, 100 * multiplier, 'kid')}>
                    <ShopItem name="Niño travieso" price={100 * multiplier} image={kid} itemCount={shopItemCounts.kid} />
                </li>
                <li onClick={() => calculateClicksPerSecond(1.5 * multiplier, 1000 * multiplier, 'stick')}>
                    <ShopItem name="Palillo" price={1000 * multiplier} image={stick} itemCount={shopItemCounts.stick} />
                </li>
                <li onClick={() => calculateClicksPerSecond(5.0 * multiplier, 2000 * multiplier, 'gum')}>
                    <ShopItem name="Chicle" price={2000 * multiplier} image={gum} itemCount={shopItemCounts.gum} />
                </li>
                <li onClick={() => calculateClicksPerSecond(25.0 * multiplier, 10000 * multiplier, 'roboticarm')}>
                    <ShopItem name="Robot" price={10000 * multiplier} image={roboticarm} itemCount={shopItemCounts.roboticarm} />
                </li>
            </ul>
        </div>
    );
}

export default Shop;