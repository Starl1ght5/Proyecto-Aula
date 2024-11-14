import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { StateContext } from '../Context/StateContext';

export default function ProductPage () {

    const params = useParams();
    const [ product, setProduct ] = useState([]);
    const { user } = useContext(StateContext);
    const [ image, setImage ] = useState([]);


    const fetchProductInfo = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/product/search/${params.product_name}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            response.json().then(json => {
                setProduct(json);
            })

        } catch (e) {
            console.log(e);
        }
    }

    const fetchProductImage = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/images/product/${product.product_id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setImage(url);
            }

        } catch (e) {
            console.log(e);
        }
    }

    const addToCart = async () => {
        try {

            const send = {
                requested_product: product.product_id,
                user_id: user.user_id,
                quantity: 1
            }
            console.log(send)

            const response = await fetch("http://localhost:8080/api/cart/add", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(send),
            });

            const res = await response;

            console.log(res);

        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchProductInfo();
        fetchProductImage();
    })


    return (
        <div>
            <Navbar />

                <div class="py-10 pt-20 px-32 flex gap-10">
                    <div>
                        <img src={image} alt={product.name} class="size-96"/>
                    </div>

                    <div class="gap-y-4 flex flex-col max-w-[500px] pl-10 pt-6">
                        <div>
                            <h1 class="text-2xl font-bold">{product.name}</h1>
                        </div>
                        <div class="h-52">
                            <p>{product.description}</p>
                        </div>
                        <div>
                            <h2>${product.price} COP</h2>
                        </div>
                        
                        {user && <div class="flex justify-center"><button class="text-white bg-pink-600 hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm py-4 px-6 text-center" onClick={addToCart}>Añadir Al Carrito</button></div>}
                    </div>  

                </div>

            <Footer class="pt-2" />
        </div>
    )
}