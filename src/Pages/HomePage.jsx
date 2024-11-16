import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { CategoryCard } from '../Components/CategoryCard';
import Footer from '../Components/Footer';
import { Helmet } from 'react-helmet';


export default function LoginPage () {

  const [category, setCategory] = useState([]);


  useEffect(() => {
    
    const fetchCategories = async () => {
      try {
          const response = await fetch("http://localhost:8080/api/category/listAll", {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
          })
          response.json().then(json => {
              setCategory(json);
          })

      } catch (e) {
          console.log(e);
      }
    }

    fetchCategories();

  })


  return (
    <div class="">
        <Helmet><title>Heladeria</title></Helmet>


        <Navbar />
        
        <div class="bg-test-background bg-cover px-14 h-[450px]">
        </div>

        <section class="h-auto px-14 pt-12">
          <h2></h2>
        </section>

        <section class="py-8 mx-auto">

          <div class="w-full p-2 pb-6 flex justify-center">
				    <h1 class="font-bold text-pink-600 text-5xl">Ofrecemos</h1>
			    </div>

          <hr class="h-[4px] bg-pink-600 border-pink-600 w-96 place-self-center"/>
          
          <div class="flex justify-center gap-8 pt-10">

            {category.map( element => {

              const { name, category_id } = element;

              return (
                <CategoryCard title={name} id={category_id}/>
              );
            })}
          </div>
          
        </section>

        <Footer />
    </div>
  )
}