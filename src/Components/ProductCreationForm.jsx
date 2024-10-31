import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


export default function ProductCreationForm () {

    const [categories, setCategories ] = useState([]);

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = handleSubmit( async data => {
        try {

            console.log(data);
            const response = await fetch("http://localhost:8080/api/product/add", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const res = await response;
            console.log(res);


        } catch (errors) {
            setError("root", {
                message: "Error del servidor"
            });
        }
    })

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch("http://localhost:8080/api/category/listAll", {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            response.json().then(json => {
                setCategories(json);
            })
        }

        fetchCategories();
    }, [categories]);


    return ( 
        <section>

            <form onSubmit={onSubmit}>

                <label>Nombre</label>
                <input type="text" {...register("name", {
                    required: "Nombre del producto requerido" })} />
                {errors.username && <div class="text-white pt-1 text-sm">{errors.name.message}</div>} 

                <label>Descripcion</label>
                <input type="text" {...register("description", {
                    required: "Descripcion requerida" })} />
                {errors.description && <div class="text-white pt-1 text-sm">{errors.description.message}</div>} 

                <label>Precio</label>
                <input type="number" {...register("price", {
                    required: "Precio del producto requerido" })} />
                {errors.price && <div class="text-white pt-1 text-sm">{errors.price.message}</div>} 

                <label>Categoria</label>
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
                {errors.category_id && <div class="text-white pt-1 text-sm">{errors.category_id.message}</div>} 
                    
                

                <label>Imagen</label>
                <input type="file" {...register("image", {
                    required: "Imagen requerida" })} />
                {errors.image && <div class="text-white pt-1 text-sm">{errors.image.message}</div>} 

                <button disabled={isSubmitting} >Crear</button>
                {errors.root && <div class="text-white pt-1 text-sm">{errors.root.message}</div>} 
            </form>
        </section>
    )
}