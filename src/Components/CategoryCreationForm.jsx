import { useForm } from "react-hook-form";


export default function CategoryCreationForm () {

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = handleSubmit( async data => {
        try {

            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("image", data.image[0]);

            const response = await fetch("http://localhost:8080/api/category/add", {
                method: 'POST',
                body: formData,
            });

            const res = await response;

            if (res.status === 200) {
                window.alert("Categoria creada exitosamente");
            }


        } catch (errors) {
            setError("root", {
                message: "Error del servidor"
            });
        }
    })

    return (
        <section>
            
            <form onSubmit={onSubmit}>
                
                <label>Nombre</label>
                <input type="text" {...register("name", {
                    require: "Nombre de la categoria requerido"
                })} />
                {errors.name && <div class="pt-1 text-sm">{errors.name.message}</div>} 

                <label>Imagen</label>
                <input type="file" {...register("image", {
                    required: "Imagen de la categoria requerida"
                })} />
                {errors.image && <div class="pt-1 text-sm">{errors.image.message}</div>} 

                <button disabled={isSubmitting}>Crear</button>
                {errors.root && <div class="pt-1 text-sm">{errors.root.message}</div>}

            </form>

        </section>
    )
}