import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


export default function UserRegistrationForm () {

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();

    const navigate = useNavigate();

    const onSubmit = handleSubmit ( async data => {
        try {

            const response = await fetch("http://localhost:8080/api/user/add", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const res = await response;

            if (res.status === 200) {
                setError("root", {
                    message: "Usuario creado correctamente, redirigiendo a inicio de sesion"
                });
                await new Promise((resolve) => setTimeout(resolve, 1500));
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
        <section class="bg-login-background bg-cover">

            <div class="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0 shadow-lg">

                <div class="w-full bg-pink-500 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">

                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">

                        <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white font-opensans">Crea una nueva cuenta</h1>

                        <form class="space-y-2 md:space-y-4" onSubmit={onSubmit}>

                            <div>
                                <label class="block mb-2 text-md font-medium text-white">Correo electronico</label>
                                <input type="email" name="email" placeholder="Ejemplo@hotmail.com..." class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"  {...register("email", {
                                    required: "Correo Electronico Requerido"})} /> 
                                {errors.email && <div class="text-complementary pt-1 text-sm">{errors.email.message}</div>} 
                            </div>

                            <div>
                                <label class="block mb-2 text-md font-medium text-white">Nombre de usuario</label>
                                <input type="text" name="username" placeholder="Usuario..." class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" {...register("username", {
                                    required: "Usuario Requerido"})} />
                                {errors.username && <div class="text-white pt-1 text-sm">{errors.username.message}</div>}
                            </div>

                            <div>
                                <label class="block mb-2 text-md font-medium text-white">Contraseña</label>
                                <input type="text" name="password" placeholder="Contraseña..." class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" {...register("password", {
                                    required: "Contraseña Requerida"})} />
                                {errors.password && <div class="text-white pt-1 text-sm">{errors.password.message}</div>}
                            </div>

                            <div class="flex flex-col items-center py-1">
                                <button type="submit" class="text-pink-500 bg-complementary font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:shadow-lg" disabled={isSubmitting} >Crear Cuenta</button>
                                {errors.root && <div class="text-white">{errors.root.message}</div>}
                            </div>

                            <p class="text-sm font-light text-white">Ya tienes una cuenta? <a href="/login" class="font-medium text-white hover:underline hover:text-complementary">Inicia Sesion</a></p>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}