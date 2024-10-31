import React from 'react';
import Navbar from '../Components/Navbar';
import { CategoryCard } from '../Components/CategoryCard';


export default function LoginPage () {
  return (
    <div class="bg-complementary">
        <Navbar />
        
        <section class="h-[300px] py-[100px] px-14 bg-purple-900">
          <h2>Test</h2>
        </section>

        <section>

          <div class="w-full p-8 flex justify-center">
				    <h1 class="font-bold text-pink-600 text-5xl">Nuestros Productos</h1>
			    </div>
          
          <div class="flex justify-center gap-8">
            <CategoryCard title="Copas" />
            <CategoryCard title="test1" />
          </div>

          <div></div>
          
        </section>
    </div>
  )
}