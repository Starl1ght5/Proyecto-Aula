import { IoIosCheckmarkCircle } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { IoMdClose } from "react-icons/io";


export default function AcceptedPage () {

    return (
        <div className='bg-login-background bg-cover' >
            <Helmet><title>Pago Aceptado</title></Helmet>
            <div className='flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0 text-white shadow-lg  backdrop-blur-sm backdrop-filter'>
                <div className='w-full bg-pink-600 shadow-xl md:mt-0 sm:max-w-md xl:p-0'>
                    <div className='p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col items-center'>
                        <IoIosCheckmarkCircle className='size-64 fill-current'/>
                        <h1 className='text-center text-2xl' >Transaccion Exitosa!</h1>
                        <p className='text-lg' >Su pago ha sido realizado con exito, su pedido llegara en aproximadamente 1 año habil!</p>
                        <NavLink to='/'><IoMdClose className='size-8 text-white fill-current mt-1' /></NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}