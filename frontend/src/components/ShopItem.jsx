function ShopItem({ name, price, image }) {
    return (
        <button className="button w-[500px]">
            <span className="button_top h-[100px]">
                <div className="text-xl flex flex-row gap-20 text-black mt-[-25px]">
                    <div className='flex flex-row gap-10'>
                        <div className="h-20 w-20 overflow-hidden relative">
                            <img src={image} alt={name} className="object-cover w-full h-full absolute top-0 left-0"/>
                        </div>
                        <div className="text-start mt-[5px]">
                            <p className='text-3xl'>{name}</p>
                            <p>{price} timbres</p>
                        </div>
                    </div>
                    <b className='text-5xl text-gray-500 ml-auto mt-3'>0</b>
                </div>
            </span>
        </button>
    );
}

export default ShopItem;