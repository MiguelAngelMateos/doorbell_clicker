import incognite from '../assets/icons/incognite.png';

function ShopItem({ name, price, image, itemCount, unlocked }) {
    return (
        <button className="button w-full">
            <span className={`button_top py-4 px-4 w-full ${(localStorage.getItem('count') >= price) ? "bg-gray-200" : "bg-gray-500"}`}>
                <div className="text-xl flex flex-row text-black relative sm:min-w-100">
                    <div className='flex flex-row gap-4'>
                        <div className="h-12 w-12 overflow-hidden relative flex items-center h-full">
                            <img src={`${(unlocked || itemCount !== 0) ? image : incognite}`} alt={name} className="w-full h-auto"/>
                        </div>
                        <div className="text-start">
                            <p className='text-3xl'>{(unlocked || itemCount !== 0) ? name : "Desconocido"}</p>
                            <p>{(unlocked || itemCount !== 0) ? price : "???"} timbres</p>
                        </div>
                    </div>
                    <b className='text-5xl text-gray-800 right-0 absolute'>{itemCount}</b>
                </div>
            </span>
        </button>
    );
}

export default ShopItem;