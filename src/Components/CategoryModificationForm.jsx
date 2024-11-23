import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const CategoryModificationForm = ({
    id,
    name
}) => {

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();

    const toastNotification = (message) => {
        toast(message);
    }

    const onSubmit = handleSubmit( async data => {
        try {

            const formData = new FormData();

            formData.append("category_id", id);
            formData.append("name", data.name);
            formData.append("image", data.image[0]);

            const response = await fetch("http://localhost:8080/api/category/update", {
                method: 'PUT',
                body: formData,
            });

            const res = await response;

            if (res.status === 200) {
                toastNotification("Categoria Actualizada Exitosamente!")
            } else {
                toastNotification("Ha ocurrido un error inesperado")
            }


        } catch (errors) {
            setError("root", {
                message: "Error del servidor"
            });
        }
    }) 

    return (
        <section className='border p-5 bg-blue-600'>
            
            <form onSubmit={onSubmit} className='flex flex-col gap-2 px-4' >
            <label className='text-white text-2xl' >Modificar Categoria</label>
                
                <label className='text-white' >Nombre</label>
                <input type="text" defaultValue={name} {...register("name", {
                    require: "Nombre de la categoria requerido"
                })} />
                {errors.name && <div class="pt-1 text-sm">{errors.name.message}</div>} 

                <label className='text-white' >Imagen</label>
                <input type="file" {...register("image", {
                    required: "Imagen de la categoria requerida"
                })} />
                {errors.image && <div class="pt-1 text-sm">{errors.image.message}</div>} 

                <div className='flex justify-center mt-3' >
                    <button disabled={isSubmitting} className='p-2 text-white bg-pink-600 hover:bg-blue-600 rounded-lg w-44' >Crear</button>
                    {errors.root && <div class="pt-1 text-sm">{errors.root.message}</div>}
                </div>
                

            </form>

            <ToastContainer />

        </section>
    )
}