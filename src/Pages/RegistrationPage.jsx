import { useForm } from "react-hook-form";
import { useNavigate, NavLink } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoMdClose } from "react-icons/io";


export default function UserRegistrationPage () {
    
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();

    const navigate = useNavigate();

    const toastNotification = (message) => {
        toast(message);
    }

    const onSubmit = handleSubmit ( async data => {
        try {

            const response = await fetch("http://localhost:8080/api/user/add", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const res = await response;

            if (res.status === 200) {
                toastNotification("Usuario creado correctamente, redirigiendo a inicio de sesion")
                await new Promise((resolve) => setTimeout(resolve, 2000));
                navigate("/login");

            }  else if (res.status === 400) {
                setError("email", {
                    message: "Este correo ya esta en uso"
                });

            } else if (res.status === 404) {
                setError("username", {
                    message: "Este usuario ya esta en uso"
                });
            } 

        } catch (errors) {
            setError("root", {
                message: "Error del servidor"
            });
        }
    })


    return (
        <div className='bg-login-background bg-cover'>
            <Helmet><title>Registrarse</title></Helmet>

            <div className='flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0 backdrop-blur-sm backdrop-filter' >

                <div className='w-full bg-pink-600 shadow-xl md:mt-0 sm:max-w-md xl:p-0' >

                    <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>

                        <div className='flex justify-between' >
                        <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl text-white' >Crea una nueva cuenta</h1>
                            <NavLink to='/' ><IoMdClose className='size-8 text-white fill-current mt-1' /></NavLink>
                        </div>

                        <form className='space-y-2 md:space-y-4' onSubmit={onSubmit}>

                            <div>
                                <label className='block mb-2 text-md font-medium text-white' >Correo electronico</label>
                                <input type="email" name="email" placeholder="Ejemplo@hotmail.com..." className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'  {...register("email", {
                                    required: "Correo Electronico Requerido"})} /> 
                                {errors.email && <div class="text-complementary pt-1 text-sm">{errors.email.message}</div>} 
                            </div>

                            <div>
                                <label className='block mb-2 text-md font-medium text-white' >Nombre de usuario</label>
                                <input type="text" name="username" placeholder="Usuario..." className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' {...register("username", {
                                    required: "Usuario Requerido",
                                    minLength: {
                                        value: 4,
                                        message : "El usuario debe tener minimo 4 caracteres"
                                    },
                                    maxLength: {
                                        value: 10,
                                        message : "El usuario debe tener maximo 10 caracteres"
                                    }})} />
                                {errors.username && <div class="text-white pt-1 text-sm">{errors.username.message}</div>}
                            </div>

                            <div>
                                <label className='block mb-2 text-md font-medium text-white' >Contraseña</label>
                                <input type="text" name="password" placeholder="Contraseña..." className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' {...register("password", {
                                    required: "Contraseña Requerida"})} />
                                {errors.password && <div class="text-white pt-1 text-sm">{errors.password.message}</div>}
                            </div>

                            <p className='text-white text-sm' >
                                <input type="checkbox" className='w-3 mr-2 mt-1' name="register_for_newsletter" {...register("register_for_newsletter")}/>
                                Deseo recibir novedades y ofertas por medio de mi correo electronico
                            </p>

                            <div className='flex flex-col items-center py-1'>
                                <button type="submit" className='text-pink-500 bg-complementary font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:shadow-lg' disabled={isSubmitting} >Crear Cuenta</button>
                                {errors.root && <div class="text-white">{errors.root.message}</div>}
                            </div>

                            <p className='text-sm font-light text-white' >Ya tienes una cuenta? <a href="/login" class="font-medium text-white hover:underline hover:text-complementary">Inicia Sesion</a></p>

                        </form>
                    </div>
                </div>

                <ToastContainer autoClose={1500} />
            </div>
        </div>
    )
}