import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


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
    }, [id])


    return (
        <Link className='cursor-pointer border p-4 rounded-full hover:scale-110 ease-in-out duration-300 bg-pink-400 shadow-2xl' to="/menu" >
            <div className='overflow-hidden' >
                <img src={image} alt={title}/>
            </div>
            <p className='pt-3 pb-1 text-lg text-center text-white' >{title}</p>
        </Link>
    )
}