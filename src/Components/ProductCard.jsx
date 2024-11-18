import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export const ProductCard = ({
    id,
    name,
    price
}) => {

    const [ image, setImage] = useState([]);

    useEffect(() => {
        const fetchImage = async (id) => {
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


        fetchImage(id);
        
    }, [])


    return (
        <Link className='cursor-pointer border p-4 rounded-xl shadow-lg' to={`/product/${name}`} >
            <div className='overflow-hidden' >
                <img src={image} alt={name} className='hover:scale-110 ease-in-out duration-300' />
            </div>
            <p className='pt-3 pb-1 test-sm' >{name}</p>
            <p className='text-sm font-medium' >{price.toLocaleString('es-CO')} COP</p>
        </Link>
    )
}