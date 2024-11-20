import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Footer () {

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();

    const toastNotification = (message) => {
        toast(message);
    }

    const onSubmit = handleSubmit( async data => {
        try {
            const response = await fetch("http://localhost:8080/api/newsletter/register", {
                method: 'POST',
                body: JSON.stringify(data),
            });

            const res = await response;

            if (res.status === 200) {
                toastNotification("Felicidades, ahora estas registrado en nuestro newsletter!")
            } else {
                setError("root", {
                    message: "Este correo ya esta registrado en nuestro newsletter"
                });
            }

        } catch (e) {
            setError("root", {
                message: "Error del servidor"
            });
        }
    })

    return (

    <div className='bg-pink-600 text-white pt-6' >
        <div className='flex flex-col sm:grid grid-cols-[4fr_1fr_1fr] gap-14 my-10 mt-10 pt-10 px-24 text-sm' >

            <div className='mb-4' >
                <div className='text-white mt-[-8px]' >
                    <p className='text-lg' >Heladeria</p>
                    <p className='text-2xl mt-[-8px]'>Kanitas Dulces</p>
                </div>
                <p className='w-2/3 mt-2' >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>

            <div className='ml-[-40px]' >
                <p className='text-xl font-medium mb-5' >General</p>
                <ul className='flex flex-col gap-1' >
                    <li><Link to='/'>Inicio</Link></li>
                    <li><Link to='/menu'>Menu</Link></li>
                    <li>Sobre Nosotros</li>
                    <li>Politica de Privacidad</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5' >Contactanos</p>
                <ul className='flex flex-col gap-1' >
                    <li>+1-000-000-0000</li>
                    <li>correoficticio@hotmail.com</li>
                    <a href='https://github.com/Starl1ght5/Proyecto-Aula' >Github</a>
                </ul>
            </div>
        </div>
        <div>

        </div>

        <div className='mb-8' >
            <hr className='mx-20'></hr>
            <p className='text-2xl font-medium text-center mt-5' >Subscribete a nuestro newsletter!</p>
            <p className='text-center font-sm mb-4' >Haciendo parte de nuestro newsletter estaras al tanto de las noticias y nuevas promociones de nuestra tienda</p>

            <div>
                <form onSubmit={onSubmit} className='items-center flex flex-col gap-3' >
                    <input className='mt-2 w-1/2 h-[40px] rounded-lg px-4 text-gray-800' placeholder="ejemplo@gmail.com" name="registered_email" type="email" {...register("registered_email", {
                        required: "Es necesario ingresar un correo para registrarse"
                    })} />
                    {errors.registered_email && <div className='pt-1 text-sm'>{errors.registered_email.message}</div>} 

                    <button type="submit" disabled={isSubmitting} className='p-2 px-6 bg-complementary rounded-lg text-pink-600 hover:bg-blue-600 hover:text-white' >Registrarse!</button>
                    {errors.root && <div className='pt-1 text-sm'>{errors.root.message}</div>} 
                </form>
            </div>
        </div>
            
        <div>
            <hr className='mx-20'></hr>
            <p className='py-5 text-sm text-center'>Copyright 2024 Kanitas - Todos los derechos reservados.</p>
        </div>

        <ToastContainer />
    </div>
    )
}