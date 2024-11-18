import { IconButton } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { StateContext } from '../Context/StateContext';


export const CartItemCard = ({
    id,
    name,
    price,
    quantity

}) => {

    const [ image, setImage ] = useState([]);
    const { user } = useContext(StateContext);
    const [ currentQuantity, setCurrentQuantity ] = useState(quantity);

    const deleteProduct = async () => {

        let request = {
            user_id: user.user_id,
            requested_product: id
        }

        try {
            const response = await fetch(`http://localhost:8080/api/cart/delete`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(request)
                });

        } catch (e) {
            console.log(e);
        }
    }


    const updateQuantity = async (newQuantity) => {
        setCurrentQuantity(newQuantity);

        try {
            const request = {
                quantity: newQuantity,
                user_id: user.user_id,
                requested_product: id,
            };

            const response = await fetch(`http://localhost:8080/api/cart/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request),

            });

            const res = await response;
            console.log(res);

        } catch (e) {
            console.log(e);
        }
    };

    const handleInputChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        if (!isNaN(newQuantity) && newQuantity > 0) {
            updateQuantity(newQuantity);
        }
    };


    useEffect(() => {
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

        fetchImage(id);
    }, [id])


    return (
        <div className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4' >
            <div className='flex items-start gap-6 px-20' >
                <img className='w-16 sm:w-20' src={image} alt={name} />
                <div>
                    <p className='text-sm sm:text-lg gap-5 mt-2' >{name}</p>
                    <div className='flex items-center gap-5 mt-2' >
                        <p>${price.toLocaleString('es-CO')} COP</p>
                    </div>
                </div>
            </div>
            <input className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center' type="number" min="1" value={currentQuantity} onChange={handleInputChange} />
            <IconButton className='mr-20' >
                <FaTrashAlt className='text-black fill-current size-8' onClick={deleteProduct} />
            </IconButton>
        </div>
    )
}