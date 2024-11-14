import { useNavigate } from 'react-router-dom';
import '../index.css';
import icon from '../temp/helado.png';
import { useContext } from 'react';
import { StateContext } from '../Context/StateContext';
import UserDropdown from './UserDropdown';
import { FaCartShopping } from "react-icons/fa6";
import { IconButton } from '@mui/material';


export default function Navbar () {

    const navigate = useNavigate();
    const { user } = useContext(StateContext);

    function redirectLogin() {
        navigate("/login")
    };

    
    return (
        <nav class="bg-pink-500 w-full border-b border-pink-500 fixed top-0 z-10">

            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={icon} class="h-[48px]" alt="logo" />
                    <span class="self-center text-[28px] font-semibold whitespace-nowrap text-white">Heladeria</span>
                </a>

                {!user && 
                <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button type="button" class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center" onClick={redirectLogin}>Iniciar Sesion</button>
                </div> 
                }
                {user &&
                <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse text-white gap-6 items-center justify-between">
                    <IconButton href="/cart">
                        <FaCartShopping class="size-6 text-white fill-current"/>
                    </IconButton>
                    <h2 class="text-white text-center text-[18px] pl-1">{user.username}</h2>
                    <UserDropdown />
                </div> 
                }
                

                <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                    <ul class="flex flex-col p-4 md:p-0 mt-4 text-xl font-bold md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 text-white font-montserrat">
                        <li>
                            <a href="/" class="py-2 px-3 md:hover:text-complementary md:p-0">Inicio</a>
                        </li>
                        <li>
                            <a href="/menu" class="py-2 px-3 md:hover:text-complementary md:p-0">Menu</a>
                        </li>
                        <li>
                            <a href="/register" class="py-2 px-3 md:hover:text-complementary md:p-0">Services</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
