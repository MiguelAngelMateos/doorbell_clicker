import kid from '../assets/icons/kid.png';
import stick from '../assets/icons/stick.png';
import gum from '../assets/icons/gum.png';
import roboticarm from '../assets/icons/roboticarm.png';
import ShopItem from './ShopItem';

function Shop() {
    return (
        <div className='flex items-center justify-center flex-col'>
            <h2 className="text-6xl bubble-text mb-10">Tienda</h2>
            <ul className='flex flex-col gap-2'>
                <li>
                    <ShopItem name="Niño travieso" price="100" image={kid}/>
                </li>
                <li>
                    <ShopItem name="Palillo" price="1000" image={stick}/>
                </li>
                <li>
                    <ShopItem name="Chicle" price="2000" image={gum}/>
                </li>
                <li>
                    <ShopItem name="Robot" price="10000" image={roboticarm}/>
                </li>
            </ul>
        </div>
    )
}
  
export default Shop;