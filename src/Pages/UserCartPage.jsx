import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { CartItemCard } from '../Components/CartItemCard';
import { useState, useContext, useEffect } from 'react';
import { StateContext } from '../Context/StateContext';
import { Helmet } from 'react-helmet';
import { loadStripe } from '@stripe/stripe-js';


export default function UserCartPage () {
    
    const [ cart, setCart ] = useState([]);
    const { user } = useContext(StateContext);


    const createPayment = async () => {
        const stripe = await loadStripe("pk_test_51OEkaAAZPRRqn7nghZ3JdSkVsMS64xrdnTxyqlnPoJjjDZEiuUbJ7cEGgWgbU8MzE6RMtK8sTtLHdKl4c3Myf8LE007tm0JPdo");

        let added_value = parseInt(cart.total_cart_price + "00");
        console.log(cart)

        const payload = {
            client: cart.client,
            amount_paid: added_value,
            currency: "COP",
            items_brought: cart.cart_contents
        }

        const response = await fetch("http://localhost:4242/create-checkout-session", {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json' }
        });

        const test = await response.json()

        const result = stripe.redirectToCheckout({
            sessionId: test.id
        });

    }

    useEffect(() => {
        const getCart = async () => {
            try {

                const response = await fetch(`http://localhost:8080/api/cart/search/${user.user_id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                })
                response.json().then(json => {
                    setCart(json);
                })
            } catch (e) {
                console.log(e)
            }
        }

        getCart();

        const intervalId = setInterval(getCart, 1500);
        return () => clearInterval(intervalId);
    }, [user.user_id])


    return (
        <div>
            <Helmet><title>Tu Carrito</title></Helmet>
            <Navbar />

            <div className='border-t pt-14 px-20' >

                <div className='text-2xl mb-3' >
                    <div className='inline-flex gap-2 items-center mb-3' >
                        <p>Tu Carrito</p>
                    </div>
                </div>

                <div>
                    {cart && cart.cart_contents?.map( element => {

                        const { name, product_id, price, quantity } = element;

                        return (
                            <CartItemCard name={name} id={product_id} price={price} quantity={quantity} />
                        )
                    })}
                </div>

                <div className='flex justify-end my-20 mr-10' >
                    <div className='w-full sm:w-[450px]'>

                        <div className='w-full text-2xl' >
                            <div className='inline-flex items-center mb-3 gap-2' >
                                <p>Valor del Carrito</p>
                                <p className='w-12 sm:w-8 h-[1px] sm:h-[2px] mt-1 bg-pink-600' ></p>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 mt-2 text-sm' >

                            <div>
                                {cart && cart.cart_contents?.map( element => {
                                    const { name, price, quantity } = element;

                                    return (
                                        <div>
                                            <div className='flex justify-between pb-2 mt-2' >
                                                <p>{quantity}x {name}</p>
                                                <p>${price.toLocaleString('es-CO')} COP</p>
                                            </div>
                                            <hr />
                                        </div>
                                    )
                                })}
                            </div>

                            <div className='flex justify-between mt-1 font-normal' >
                                <p className='font-medium text-lg' >Valor Total:</p>
                                <p>${cart.total_cart_price?.toLocaleString('es-CO')} COP</p>
                            </div>
                            <div className='w-full text-end'>
                                <button className='my-8 px-8 py-4 text-white bg-pink-600 text-sm' onClick={createPayment} >Continuar a la pasarela de pago</button>
                            </div>
  
                        </div>

                    </div>
                </div>

            </div>

            <Footer />
        </div>
    )
}