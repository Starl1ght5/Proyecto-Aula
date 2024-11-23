import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const ProductModificationForm = ({
    id,
    name,
    price,
    desc
}) => {

    const [ categories, setCategories ] = useState([]);
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();

    const toastNotification = (message) => {
        toast(message);
    }

    const onSubmit = handleSubmit( async data => {
        try {

            const formData = new FormData();

            formData.append("product_id", id)
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("price", data.price);
            formData.append("category_id", data.category_id);
            formData.append("image", data.image[0]);

            const response = await fetch("http://localhost:8080/api/product/update", {
                method: 'PUT',
                body: formData,
            });

            const res = await response;

            if (res.status === 200) {
                toastNotification("Producto Actualizado Exitosamente!")
            } else {
                toastNotification("Ha ocurrido un error inesperado")
            }


        } catch (errors) {
            setError("root", {
                message: "Error del servidor"
            });
        }
    }, [])


    useEffect(() => {
        
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/category/listAll", {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                })
                response.json().then(json => {
                    setCategories(json);
                })

            } catch (e) {
                console.log(e);
            }
        }

        fetchCategories();
    }, [categories]);


    return ( 
        <section className='border p-5 bg-blue-600' >

            <form onSubmit={onSubmit} className='flex flex-col gap-2 px-4' >
                <label className='text-white text-2xl' >Modificar Producto</label>

                <label className='text-white mt-2' >Nombre</label>
                <input type="text" defaultValue={name} className='px-2 pt-1' {...register("name", {
                    required: "Nombre del producto requerido" })} />
                {errors.name && <div className='pt-1 text-sm'>{errors.name.message}</div>} 

                <label className='text-white' >Descripcion</label>
                <input type="textarea" defaultValue={desc} className='px-2 pt-1' {...register("description", {
                    required: "Descripcion requerida" })} />
                {errors.description && <div className='pt-1 text-sm' >{errors.description.message}</div>} 

                <label className='text-white' >Precio</label>
                <input type="number" defaultValue={price} className='px-2 pt-1' {...register("price", {
                    required: "Precio del producto requerido" })} />
                {errors.price && <div className='pt-1 text-sm'>{errors.price.message}</div>} 

                <label className='text-white' >Categoria</label>
                <select {...register("category_id", {
                    required: "Categoria del Producto requerida"
                })}>
                    {categories.map(element => {
                        const { category_id , name } = element;

                    return (
                        <option value={category_id}>{name}</option>
                    )
                })} 
                </select>
                {errors.category_id && <div className='pt-1 text-sm' >{errors.category_id.message}</div>} 

                <label className='text-white' >Imagen</label>
                <input type="file" {...register("image", {
                    required: "Imagen requerida" })} />
                {errors.image && <div className='pt-1 text-sm' >{errors.image.message}</div>} 

                <div className='flex justify-center mt-3' >
                    <button disabled={isSubmitting} className='p-2 text-white bg-pink-600 hover:bg-blue-600 rounded-lg w-44' >Crear</button>
                    {errors.root && <div className='pt-1 text-sm' >{errors.root.message}</div>}     
                </div>

            </form>

            <ToastContainer />
        </section>
    )
}