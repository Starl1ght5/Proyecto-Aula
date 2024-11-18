import { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { ProductCard } from '../Components/ProductCard';
import { Helmet } from 'react-helmet';


export default function MenuPage () {

    const [ products, setProducts ] = useState([]);
    const [ categories, setCategories ] = useState([]);
    const [ selectedCategory, setSelectedCategory ] = useState(null);


    const onChange = async (event) => {
        const value = event.target.value;
        setSelectedCategory(value);
        await fetchNewProducts(value);
    }


    const clearSelection = async () => {
        setSelectedCategory(null);
        await fetchAllProducts();
    }


    const fetchNewProducts = async (category) => {
        try {
            const response = await fetch(`http://localhost:8080/api/product/category/search/${category}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            response.json().then(json => {
                setProducts(json);
            })
        } catch (e) {
            console.log(e);
        }
    }


    const fetchAllProducts = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/product/listAll", {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            response.json().then(json => {
                setProducts(json);
            })

        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/category/listAll", {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                })
                response.json().then(json => {
                    setCategories(json);
                })
                    
            } catch (e) {
                console.log(e);
            }
        }
    

        fetchAllProducts();  
        fetchCategories();
    }, [])


    return (
        <div>
            <Helmet><title>Menu</title></Helmet>

            <Navbar/>

            <div className='flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 border-t px-20' >

                <div className='min-w-60' >

                    <p className='my-2 text-2xl flex items-center cursor-pointer gap-2' >Filtrar por</p>

                    <div className='flex flex-col gap-2 text-md font-light' >

                        <div className='border border-gray-300 pl-5 py-3 mt-3 sm:block shadow-lg' >

                            <p className='mb-3 text-lg font-medium' >Categorias</p>
                            <div className='flex flex-col gap-2 text-sm font-light text-gray-700' >
                            {categories.map(element => {
                                const { category_id, name } = element;

                                return (
                                    <p className='flex gap-2 text-md' >
                                        <input className='w-3' name='category' type="radio" value={category_id} onChange={onChange} checked={selectedCategory === String(category_id)} />
                                        {name}
                                    </p>
                                )
                            })}
                            <button onClick={clearSelection} className='mt-2' >Limpiar Filtros</button>
                            </div>

                        </div>

                    </div>
                </div>

                <div className='flex-1' >

                    <div className='flex justify-between text-base sm:text-2xl mb-4' >
                        <div className='inline-flex gap-2 items-center mb-6' >
                            <p className='text-gray-500 text-3xl' >Nuestros <span className='text-pink-600 font-medium' >Productos</span></p>
                            <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] mt-1 bg-gray-700' ></p>
                        </div>
                    </div>

                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 mb-6' >
                        {products.map(element => {
                            const {product_id, name, price } = element;

                            return (
                                <ProductCard name={name} price={price} id={product_id} />
                            ) 
                        })}
                    </div>

                </div>

            </div>

            <Footer />

        </div>
    )
}