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


        fetchProductInfo();
        fetchProductImage();
    })


    return (
        <div>
            <Navbar />

                <div className='border-t-2 pl-32 transition-opacity ease-in duration-500 opacity-100 py-14 font-outfit' >

                    <div className='flex flex-col gap-12 sm:gap-12 sm:flex-row' >

                        <div className='flex flex-1 flex-col-reverse gap-3 sm:flex-row' >
                            <div className='w-full sm:w-[80%] p-6 bg-pink-600 rounded-full' >
                                <img src={image} alt={product.name} className='w-full h-auto' />
                            </div>
                        </div>

                        <div className='flex-1'>
                            <h1 className='font-medium text-2xl mt-2' >{product.name}</h1>
                            <p className='mt-5 text-3xl font-medium' >{product.price?.toLocaleString('es-CO')} COP</p>

                            <div className='mt-5' >
                                <p className='text-xl' >Contiene:</p>
                                <p className='mt-4 mb-6 text-gray-500 md:w-4/5' >{product.description}</p>
                            </div>
                            <button className='text-white bg-pink-600 px-8 py-3 text-sm hover:bg-blue-600' onClick={addToCart} >Añadir al carrito </button>
                        </div>

                    </div>
                    
                </div>

            <Footer />
        </div>
    )
}