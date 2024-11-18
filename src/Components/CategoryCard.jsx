import { useEffect, useState } from "react";


export const CategoryCard = ({
    id,
    title
}) => {

    const [ image, setImage ] = useState([]);

    useEffect(() => {
        const fetchImage = async (id) => {
            try {
                const response = await fetch(`http://localhost:8080/api/images/category/${id}`, {
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

        fetchImage(id);
    }, [])

    return (
        <div class="hover:-translate-y-2 duration-300">
            <a href="/menu">
                <div class="bg-pink-400 border border-pink-400 rounded-full p-7 size-60">
                    <img src={image} alt={title} class="size-52"/>   
                </div>
                <h2 class="text-center text-[28px] pt-2 text-pink-600 font-[500]" >{title}</h2>
            </a>
        </div>
    )
}