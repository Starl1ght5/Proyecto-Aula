import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function Navbar () {

    const navigate = useNavigate();

    function login () {
        navigate("/login");
    };

    return (
        <nav class="bg-pink-500 w-full z-20 top-0 start-0 border-b border-gray-200">

            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
                    <span class="self-center text-2xl font-semibold whitespace-nowrap">Flowbite</span>
                </a>

                <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={login} >Iniciar Sesion</button>
                </div>

                <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                    <ul class="flex flex-col p-4 md:p-0 mt-4 text-lg font-mono font-bold md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                        <li>
                            <a href="/" class="py-2 px-3 text-complementary md:hover:text-white md:p-0">Home</a>
                        </li>
                        <li>
                            <a href="/login" class="py-2 px-3 text-complementary md:hover:text-white md:p-0">About</a>
                        </li>
                        <li>
                            <a href="/register" class="py-2 px-3 text-complementary md:hover:text-white md:p-0">Services</a>
                        </li>
                        <li>
                            <a href="#" class="py-2 px-3 text-complementary md:hover:text-white md:p-0">Contact</a>
                        </li>
                    </ul>
                    
                </div>
            </div>
        </nav>
    )
}
