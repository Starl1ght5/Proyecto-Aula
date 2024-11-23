import { MdCancel } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { IoMdClose } from "react-icons/io";


export default function DeclinedPage () {

    return (
        <div className='bg-login-background bg-cover' >
             <Helmet><title>Pago Rechazado</title></Helmet>
            <div className='flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0 text-white shadow-lg  backdrop-blur-sm backdrop-filter'>
                <div className='w-full bg-pink-600 shadow-xl md:mt-0 sm:max-w-md xl:p-0'>
                    <div className='p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col items-center'>
                        <MdCancel className='size-64 fill-current'/>
                        <h1 className='text-center text-2xl' >Transaccion Rechazada</h1>
                        <p className='text-lg' >Lo sentimos, ha ocurrido un error a la hora de procesar su pago, en breve sera redigirido a la pagina principal</p>
                        <NavLink to='/'><IoMdClose className='size-8 text-white fill-current mt-1' /></NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}