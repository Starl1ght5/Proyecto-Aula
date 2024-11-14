import { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { ProductCard } from '../Components/ProductCard';
import { Helmet } from 'react-helmet';


export default function MenuPage () {

    const [ product, setProduct ] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/product/listAll", {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            response.json().then(json => {
                setProduct(json);
            })
  
        } catch (e) {
            console.log(e);
        }
    }
    
    getProducts();
    })


    return (
        <div>
            <Helmet><title>Menu</title></Helmet>

            <Navbar/>

            <section class="py-10 pt-28 mx-auto">

                <div class="w-full p-2 pb-4 flex justify-center">
				    <h1 class="font-bold text-pink-600 text-5xl">Nuestros Productos</h1>
			    </div>

                <hr class="h-[4px] bg-pink-600 border-pink-600 w-96 place-self-center"/>
          
                <div class="gap-8 py-10 grid grid-cols-3 px-20">
                    {product.map( element => {
                        const { product_id, name, price } = element;

                        return (
                            <ProductCard name={name} id={product_id} price={price} />
                        );
                    })}
                </div>
          
            </section>

            <Footer />

        </div>
    )
}