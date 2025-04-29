import { useEffect, useState } from 'react';
import upgrade1 from '../assets/icons/upgrade1.png';
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
                <span className="mt-auto">Siguiente mejora: {count.toFixed(0)}/{nextUpgrade}</span>
            </div>
            <div className="flex mt-4 justify-between">
                <div
                    className={`button_upgrades w-26 h-26 ${
                        hasUpgraded[0] ? '' : 'button_upgrades_unlocked'
                    }`}
                >
                    <img
                        src={hasUpgraded[0] ? upgrade1 : incognite}
                        className="button_top_upgrades w-full h-full object-contain"
                    ></img>
                </div>
                <div
                    className={`button_upgrades w-26 h-26 ${
                        hasUpgraded[1] ? '' : 'button_upgrades_unlocked'
                    }`}
                >  
                    <img
                        src={hasUpgraded[1] ? upgrade1 : incognite}
                        className="button_top_upgrades w-full h-full object-contain"
                    ></img>
                </div>
                <div className={`button_upgrades w-26 h-26 ${
                        hasUpgraded[2] ? '' : 'button_upgrades_unlocked'
                    }`}
                >
                    <img
                        src={hasUpgraded[2] ? upgrade1 : incognite}
                        className="button_top_upgrades w-full h-full object-contain"
                    ></img>
                </div>
                <div className={`button_upgrades w-26 h-26 ${
                        hasUpgraded[3] ? '' : 'button_upgrades_unlocked'
                    }`}
                >
                    <img
                        src={hasUpgraded[3] ? upgrade1 : incognite}
                        className="button_top_upgrades w-full h-full object-contain"
                    ></img>
                </div>
                <div className={`button_upgrades w-26 h-26 ${
                        hasUpgraded[4] ? '' : 'button_upgrades_unlocked'
                    }`}
                >
                    <img
                        src={hasUpgraded[4] ? upgrade1 : incognite}
                        className="button_top_upgrades w-full h-full object-contain"
                    ></img>
                </div>
            </div>
        </div>
    );
}

export default Upgrades;