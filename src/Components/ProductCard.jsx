import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const ProductCard = ({
    id,
    name,
    price,

}) => {

    const navigate = useNavigate();
    const [ image, setImage] = useState([]);
    
    function redirectPage() {
        navigate(`/product/${name}`);
    }

    async function fetchImage(id) {
        try {
            const response = await fetch(`http://localhost:8080/api/images/product/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setImage(url);
            }


        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchImage(id);
    })


    return (
        <div class="hover:-translate-y-2 duration-300 justify-center place-self-center" onClick={redirectPage}>
            <div class="bg-pink-400 border border-pink-400 rounded-full p-7 size-80 place-self-center">
                <button type="button">
                    <img src={image} alt={name} class="size-[280px]"/>
                </button>
            </div>
            <div class="text-center">
                <h2 class="text-2xl pt-1 text-pink-600 font-[500]" >{name}</h2>
                <h3 class="text-sm">${price} COP</h3>
            </div>
            
        </div>
    )
}