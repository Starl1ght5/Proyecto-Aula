import { NavLink, Link } from 'react-router-dom';
import '../index.css';
import icon from '../temp/helado.png';
import { useContext } from 'react';
import { StateContext } from '../Context/StateContext';
import { FaCartShopping } from "react-icons/fa6";
import { FaAddressCard } from "react-icons/fa";


export default function Navbar () {

    const { user } = useContext(StateContext);

    return (
        <div className='flex items-center justify-between py-5 font-medium bg-pink-600 px-14' >
            <img src={icon} alt="" className='h-[48px]' />

            <ul className='hidden sm:flex gap-5 text-[22px] text-white' >
                
                <NavLink to='/' className='flex flex-col items-center gap-1' >
                    <p>Inicio</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-white hidden' ></hr>  
                </NavLink>

                <NavLink to='/menu' className='flex flex-col items-center gap-1' >
                    <p>Menu</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-white hidden' ></hr>  
                </NavLink>

            </ul>

            <div className='flex items-center gap-6' >
                <Link to='/cart' className='relative' >
                    <FaCartShopping className="w-5 min-w-5 size-8 text-white fill-current" />
                </Link>

                {user && <FaAddressCard className='w-5 cursor-pointer size-8 text-white fill-current' />}

            </div>
        </div>
    )
}
