import incognite from '../assets/icons/incognite.png';

function ShopItem({ name, price, image, itemCount }) {
    return (
        <button className="button w-[500px]">
            <span className={`button_top h-[100px] ${(localStorage.getItem('count') >= price) ? "bg-gray-200" : "bg-gray-500"}`}>
                <div className="text-xl flex flex-row gap-20 text-black mt-[-25px] relative">
                    <div className='flex flex-row gap-10'>
                        <div className="h-20 w-20 overflow-hidden relative">
                            <img src={`${(localStorage.getItem('count') >= price / 2 || itemCount !== 0) ? image : incognite}`} alt={name} className="object-cover w-full h-full absolute top-0 left-0"/>
                        </div>
                        <div className="text-start mt-[5px]">
                            <p className='text-3xl'>{(localStorage.getItem('count') >= price / 2 || itemCount !== 0) ? name : "Desconocido"}</p>
                            <p>{(localStorage.getItem('count') >= price / 2 || itemCount !== 0) ? price : "???"} timbres</p>
                        </div>
                    </div>
                    <b className='text-5xl text-gray-800 right-0 mt-3 absolute'>{itemCount}</b>
                </div>
            </span>
        </button>
    );
}

export default ShopItem;