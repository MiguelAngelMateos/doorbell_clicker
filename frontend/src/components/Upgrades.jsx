import { useEffect, useState } from 'react';
import upgrade1 from '../assets/icons/upgrade1.png';
import upgrade2 from '../assets/icons/upgrade2.png';
import upgrade3 from '../assets/icons/upgrade3.png';
import upgrade4 from '../assets/icons/upgrade4.png';
import upgrade5 from '../assets/icons/upgrade5.png';
import incognite from '../assets/icons/incognite.png';

function Upgrades({ count, upgrades }) {
    const [numUpgrade, setNumUpgrade] = useState(0);
    const [nextUpgrade, setNextUpgrade] = useState(100);
    const [hasUpgraded, setHasUpgraded] = useState([false, false, false, false, false]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'r' || event.key === 'R') {
                setNumUpgrade(0);
                setNextUpgrade(100);
                for (const hasUpgradedIndex in hasUpgraded) {
                    hasUpgraded[hasUpgradedIndex] = false;
                }
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    useEffect(() => {
        if (count >= 100 && !hasUpgraded[0]) {
            setNumUpgrade(1)
        }
        if (count >= 100 && numUpgrade === 1 && !hasUpgraded[0]) {
            setNumUpgrade(2);
            upgrades(1);
            setHasUpgraded((prev) => {
                const newUpgrades = [...prev];
                newUpgrades[0] = true;
                return newUpgrades;
            });
            setNextUpgrade(2000);
        } else if (count >= 2000 && numUpgrade === 2 && !hasUpgraded[1]) {
            setNumUpgrade(3);
            upgrades(2);
            setHasUpgraded((prev) => {
                const newUpgrades = [...prev];
                newUpgrades[1] = true;
                return newUpgrades;
            });
            setNextUpgrade(10000);
        } else if (count >= 10000 && numUpgrade === 3 && !hasUpgraded[2]) {
            setNumUpgrade(4);
            upgrades(3);
            setHasUpgraded((prev) => {
                const newUpgrades = [...prev];
                newUpgrades[2] = true;
                return newUpgrades;
            });
            setNextUpgrade(100000);
        } else if (count >= 100000 && numUpgrade === 4 && !hasUpgraded[3]) {
            setNumUpgrade(5);
            upgrades(4);
            setHasUpgraded((prev) => {
                const newUpgrades = [...prev];
                newUpgrades[3] = true;
                return newUpgrades;
            });
            setNextUpgrade(300000);
        } else if (count >= 300000 && numUpgrade === 5 && !hasUpgraded[4]) {
            setNumUpgrade(6);
            upgrades(5);
            setHasUpgraded((prev) => {
                const newUpgrades = [...prev];
                newUpgrades[4] = true;
                return newUpgrades;
            });
            setNextUpgrade("No hay más mejoras");
        }
    }, [count, upgrades]);

    return (
        <div className="flex w-full flex-col">
            <div className="flex justify-between w-full">
                <h2 className="bubble-text text-6xl">Mejoras</h2>
                <span className="mt-auto">
                {nextUpgrade === "No hay más mejoras"
                    ? nextUpgrade
                    : `Siguiente mejora: ${count.toFixed(0)}/${nextUpgrade}`}
                </span>
            </div>
            <div className="flex mt-4 justify-between">
                {/* Mejora 1 */}
                <div className='relative group w-fit'>
                    <div
                    className={`button_upgrades w-26 h-26 ${
                        hasUpgraded[0] ? '' : 'button_upgrades_unlocked'
                    }`}
                    >
                    <img
                        src={hasUpgraded[0] ? upgrade1 : incognite}
                        className="button_top_upgrades w-full h-full object-contain"
                        alt="Mejora 1"
                    />
                    </div>
                    {/* Tooltip Mejora 1 */}
                    {hasUpgraded[0] && (
                    <div className='absolute left-1/2 transform -translate-x-1/2 mt-4 w-[280px] p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-10'>
                        <p className='font-bold text-lg'>Mejora 1: Doble Click</p>
                        <p>Descubres un bug en el timbre.</p>
                        <p>Cada clic del ratón suma el doble de timbres.</p>
                    </div>
                    )}
                </div>

                {/* Mejora 2 */}
                <div className='relative group w-fit'>
                    <div
                    className={`button_upgrades w-26 h-26 ${
                        hasUpgraded[1] ? '' : 'button_upgrades_unlocked'
                    }`}
                    >
                    <img
                        src={hasUpgraded[1] ? upgrade2 : incognite}
                        className="button_top_upgrades w-full h-full object-contain"
                        alt="Mejora 2"
                    />
                    </div>
                    {/* Tooltip Mejora 2 */}
                    {hasUpgraded[1] && (
                    <div className='absolute left-1/2 transform -translate-x-1/2 mt-4 w-[280px] p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-10'>
                        <p className='font-bold text-lg'>Mejora 2: Producción a tope</p>
                        <p>Dejas todo de lado y dedicas tu vida a mejorar la producción.</p>
                        <p>Toda la producción de tu tienda genera un 20% mas de timbres</p>
                    </div>
                    )}
                </div>

                {/* Mejora 3 */}
                <div className='relative group w-fit'>
                    <div
                    className={`button_upgrades w-26 h-26 ${
                        hasUpgraded[2] ? '' : 'button_upgrades_unlocked'
                    }`}
                    >
                    <img
                        src={hasUpgraded[2] ? upgrade3 : incognite}
                        className="button_top_upgrades w-full h-full object-contain"
                        alt="Mejora 3"
                    />
                    </div>
                    {/* Tooltip Mejora 3 */}
                    {hasUpgraded[2] && (
                    <div className='absolute left-1/2 transform -translate-x-1/2 mt-4 w-[280px] p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-10'>
                        <p className='font-bold text-lg'>Mejora 3: Segundos de gloria</p>
                        <p>Tienes momentos de euforia donde exprimes al maximo la capacidad del timbre.</p>
                        <p>Una vez por minuto los clicks te otorgan 100 timbres durante 10 segundos.</p>
                    </div>
                    )}
                </div>

                {/* Mejora 4 */}
                <div className='relative group w-fit'>
                    <div
                    className={`button_upgrades w-26 h-26 ${
                        hasUpgraded[3] ? '' : 'button_upgrades_unlocked'
                    }`}
                    >
                    <img
                        src={hasUpgraded[3] ? upgrade4 : incognite}
                        className="button_top_upgrades w-full h-full object-contain"
                        alt="Mejora 4"
                    />
                    </div>
                    {/* Tooltip Mejora 4 */}
                    {hasUpgraded[3] && (
                    <div className='absolute left-1/2 transform -translate-x-1/2 mt-4 w-[280px] p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-10'>
                        <p className='font-bold text-lg'>Mejora 4: Golpe de suerte</p>
                        <p>Compras un billete de loteria y te toca el premio gordo!</p>
                        <p>Añade 100 Brazos roboticos a tu tienda</p>
                    </div>
                    )}
                </div>

                {/* Mejora 5 */}
                <div className='relative group w-fit'>
                    <div
                    className={`button_upgrades w-26 h-26 ${
                        hasUpgraded[4] ? '' : 'button_upgrades_unlocked'
                    }`}
                    >
                    <img
                        src={hasUpgraded[4] ? upgrade5 : incognite}
                        className="button_top_upgrades w-full h-full object-contain"
                        alt="Mejora 5"
                    />
                    </div>
                    {/* Tooltip Mejora 5 */}
                    {hasUpgraded[4] && (
                    <div className='absolute left-1/2 transform -translate-x-1/2 mt-4 w-[280px] p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-10'>
                        <p className='font-bold text-lg'>Mejora 5: Acción divina</p>
                        <p>Jesucrito baja del cielo y te vendice con una mejora divina.</p>
                        <p>Toda tu producción se multiplica x10</p>
                    </div>
                    )}
                </div>
                </div>

        </div>
    );
}

export default Upgrades;