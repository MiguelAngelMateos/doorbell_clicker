import upgrade1 from '../assets/icons/upgrade1.png';
import incognite from '../assets/icons/incognite.png';

function Upgrades() {
    return(
        <div className="flex w-full flex-col">
            <div className="flex justify-between w-full">
                <h2 className="bubble-text text-6xl">Mejoras</h2>
                <span className="mt-auto">Siguiente mejora: 6/1000</span>
            </div>
            <div className="flex mt-4 justify-between">
                <div className="button_upgrades w-26 h-26">
                    <img src={upgrade1} className="button_top_upgrades w-full h-full object-contain"></img>
                </div>
                <div className="button_upgrades w-26 h-26">
                    <img src={incognite} className="button_top_upgrades w-full h-full object-contain"></img>
                </div>
                <div className="button_upgrades w-26 h-26">
                    <img src={incognite} className="button_top_upgrades w-full h-full object-contain"></img>
                </div>
                <div className="button_upgrades w-26 h-26">
                    <img src={incognite} className="button_top_upgrades w-full h-full object-contain"></img>
                </div>
                <div className="button_upgrades w-26 h-26">
                    <img src={incognite} className="button_top_upgrades w-full h-full object-contain"></img>
                </div>
            </div>
        </div>
    )
}

export default Upgrades;