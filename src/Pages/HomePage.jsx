import Navbar from '../Components/Navbar';
import { CategoryCard } from '../Components/CategoryCard';
import Footer from '../Components/Footer';
import { Helmet } from 'react-helmet';
import template from '../temp/26-06.jpg'
import { ProductCard } from '../Components/ProductCard';
import { useEffect, useState } from 'react';


export default function LoginPage () {

  const [ categories, setCategories ] = useState([]);
  const [ randomProducts, setRandomProducts ] = useState([]);


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

    const fetchRandom = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/product/search/random", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          })
          response.json().then(json => {
              setRandomProducts(json);
          })

      } catch(e) {
        console.log(e);
      }
    }


    fetchCategories();
    fetchRandom();
  }, [])


  return (
    <div>
        <Helmet><title>Heladeria</title></Helmet>
        <Navbar />
        
          <div className='px-20 mb-14 py-5' >
            
            <div className='flex flex-col sm:flex-row border border-pink-600 mt-4 shadow-xl' >
              
              <div className='w-full sm:w-1/2 flex items-center justify-center py-4 sm:py-0' >

                <div className='text-gray-600' >
                  <div className='flex items-center gap-2' >
                    <p className='font-medium text-2xl md:text-base' >Promocion 2x1!</p>
                  </div>

                  <h1 className='text-3xl sm:py-3 lG:text-5xl leading-relaxed' >2 Paletas por el precio de una!</h1>

                  <div className='flex items-center gap-2' >
                    <p className='w-8 md:w-11 h-[1px] bg-complementary' ></p>
                    <p className='font-semibold text-xl md:text-base text-pink-600' >Compra Ahora!</p>
                    <p className='w-8 md:w-11 h-[1px] bg-complementary' ></p>
                  </div>
                </div>

              </div>

              <img className='w-full sm:w-1/2 p-14' src={template} alt="alt" />

            </div>
            

            <div className='my-10' >
              <div className='text-center py-8 text-3xl' >
              <div className='inline-flex gap-2 items-center mb-3 flex-col' >
                  <p className=''>En nuestra tienda te <span className='font-bold text-pink-600' >ofrecemos</span>:</p>
                  <hr className='w-[120%] border-none h-[1.5px] bg-black' ></hr>
                </div>
              </div>
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 justify-items-center' >
                {categories?.map( element => {
                  const { category_id, name} = element;

                  return (
                    <CategoryCard id={category_id} title={name} />
                  )
                })}
              </div>
            </div>


            <div className='my-10' >
              <div className='text-center py-8 text-3xl' >
                <div className='inline-flex gap-2 items-center mb-3' >
                  <p className=''>Conoce algunos de nuestros productos</p>
                </div>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600' >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              </div>
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6' >
                {randomProducts?.map( element => {
                  const { product_id, name, price } = element;

                  return (
                    <ProductCard id={product_id} name={name} price={price} />
                  )
                })}
              </div>
            </div>

          </div>

        <Footer />
    </div>
  )
}