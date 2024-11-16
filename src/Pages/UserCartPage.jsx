import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { CartItemCard } from '../Components/CartItemCard';
import { useState, useContext, useEffect } from 'react';
import { StateContext } from '../Context/StateContext';


export default function UserCartPage () {
    
    const [ cart, setCart ] = useState([]);
    const { user } = useContext(StateContext);


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
    })


    return (
        <div>
            <Navbar />

            <div>

                <div class="flex px-10">

                    <div>
                        {cart.map(element => {
                        
                        })}
                    </div>
                
                    <div class="position-">
                        <p>lo que sea lo aoskdaposd</p>
                    </div>

                </div>

            </div>

            <Footer />
        </div>
    )
}