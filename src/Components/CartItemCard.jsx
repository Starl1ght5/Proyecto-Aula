import { useState, useEffect } from "react"


export const CartItemCard = ({
    id,
    name,
    price

}) => {

    const [ image, setImage ] = useState([]);


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
        <div>
            <div class="flex gap-6 py-6 px-4">
                <img src={image} alt={name} class="size-32" />
                <h2>{name}</h2>
                <h2>{price}</h2>
            </div>
            
        </div>
    )
}