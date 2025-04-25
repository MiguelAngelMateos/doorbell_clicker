import kid from '../assets/icons/kid.png';
import stick from '../assets/icons/stick.png';
import gum from '../assets/icons/gum.png';
import roboticarm from '../assets/icons/roboticarm.png';
import ShopItem from './ShopItem';

function Shop({ calculateClicksPerSecond }) {
    return (
        <div className='flex items-center justify-center flex-col'>
            <h2 className="text-6xl bubble-text mb-10">Tienda</h2>
            <ul className='flex flex-col gap-2'>
                <li onClick={() => calculateClicksPerSecond(0.5, 100)}>
                    <ShopItem name="Niño travieso" price="100" image={kid}/>
                </li>
                <li onClick={() => calculateClicksPerSecond(1.5, 1000)}>
                    <ShopItem name="Palillo" price="1000" image={stick}/>
                </li>
                <li onClick={() => calculateClicksPerSecond(5.0, 2000)}>
                    <ShopItem name="Chicle" price="2000" image={gum}/>
                </li>
                <li onClick={() => calculateClicksPerSecond(25.0, 10000)}>
                    <ShopItem name="Robot" price="10000" image={roboticarm}/>
                </li>
            </ul>
        </div>
    )
}
  
export default Shop;