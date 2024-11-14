import ProductCreationForm from "../../Components/ProductCreationForm";
import CategoryCreationForm from "../../Components/CategoryCreationForm";


export default function AdminProductManagementPage () {


    return (
        <div>
            <h2>Creacion de productos</h2>
            <ProductCreationForm />

            <h2>Creacion de categorias</h2>
            <CategoryCreationForm />
        </div>
    )
}