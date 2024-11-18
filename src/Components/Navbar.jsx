import { NavLink, Link } from 'react-router-dom';
import '../index.css';
import icon from '../temp/helado.png';
import { useContext } from 'react';
import { StateContext } from '../Context/StateContext';
import { FaCartShopping } from "react-icons/fa6";
import UserDropdown from './UserDropdown';


export default function Navbar () {

    const { user } = useContext(StateContext);

    return (
        <div className='flex items-center justify-between py-5 font-medium bg-pink-600 px-14' >
        
            <div className='flex justify-between gap-2' >
                <img src={icon} alt="" className='h-[48px]' />
                <div className='text-white' >
                    <p>Heladeria</p>
                    <p className='text-2xl mt-[-8px]'>Kanitas Dulces</p>
                </div>
            </div>

            <ul className='hidden sm:flex gap-5 text-[22px] text-white md:mr-10 lg:mr-10' >
                
                <NavLink to='/' className='flex flex-col items-center gap-1' >
                    <p>Inicio</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-white hidden' ></hr>  
                </NavLink>

                <NavLink to='/menu' className='flex flex-col items-center gap-1' >
                    <p>Menu</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-white hidden' ></hr>  
                </NavLink>

            </ul>

            {!user && 
                <div class="flex items-center gap-6">
                    <Link to='/login' className='text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center' >
                        <p>Iniciar Sesion</p>
                    </Link>
                </div>
            }

            {user && 
                <div className='flex items-center gap-6' >
                    <NavLink to='/cart' className='relative' >
                        <FaCartShopping className="w-5 min-w-5 size-8 text-white fill-current" />
                        <hr className='w-auto ml-[3px] border-none h-[1.5px] bg-white hidden' ></hr>  
                    </NavLink>
                    <UserDropdown />
                </div>
            }
            
        </div>
    )
}
