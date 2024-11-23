import CategoryCreationForm from '../../Components/CategoryCreationForm';
import ProductCreationForm from '../../Components/ProductCreationForm';
import { CategoryModificationForm } from '../../Components/CategoryModificationForm';
import { ProductModificationForm } from '../../Components/ProductModificationForm';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserDropdown from '../../Components/UserDropdown';
import '../../index.css';
import icon from '../../temp/helado.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';


export default function AdminHomePage() {

    const [ NewsletterUsers, setNewsletterUsers ] = useState([]);
    const [ products, setProducts ] = useState([]);
    const [ productToChange, setProductToChange ] = useState([]);
    const [ categories, setCategories ] = useState([]);
    const [ categoryToChange, setCategoryToChange ] = useState([]);
    const [ current, setCurrent ] = useState(0);


    const toastNotification = (message) => {
        toast(message)
    }


    const onDeleteProduct = async (id) => {
        deleteProduct(id);
    }


    const onDeleteCategory = async (id) => {
        deleteCategory(id);
    }


    const changeCurrent = (value) => {
        if (value === current) {
            setCurrent(0);
        } else {
            setCurrent(value);
        }
    }


    const changeCategory = (element) => {
        setCategoryToChange(element);
        changeCurrent(4);
    }


    const changeProduct = (element) => {
        setProductToChange(element);
        changeCurrent(3);
    }


    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/product/delete/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })
            const res = await response;

            if (res.status === 200) {
                toastNotification("Producto eliminado correctamente!")
            }
        } catch(e) {
            console.log(e)
        }
    }

    const deleteCategory = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/category/delete/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            const res = await response;

            if (res.status === 200) {
                toastNotification("Categoria eliminada correctamente!")
            }
        } catch(e) {
            console.log(e)
        }
    }


    useEffect(() => {

        const fetchNewsletterUsers = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/newsletter/listAll", {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                })
                response.json().then(json => {
                    setNewsletterUsers(json);
                })
            } catch(e) {
                console.log(e)
            } 
        }

        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/product/listAll", {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                })
                response.json().then(json => {
                    setProducts(json);
                })
            } catch(e) {
                console.log(e)
            } 
        }

        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/category/listAll", {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                })
                response.json().then(json => {
                    setCategories(json);
                })
            } catch(e) {
                console.log(e)
            } 
        }


        fetchNewsletterUsers();
        fetchCategories();
        fetchProducts();
    }, [])


    return (
        <div>
            <Helmet><title>Administrador</title></Helmet>

            <div className='flex items-center justify-between py-5 font-medium bg-pink-600 px-14' >
        
                <Link to="/" className='flex justify-between gap-2' >
                    <img src={icon} alt="" className='h-[48px]' />
                    <div className='text-white' >
                        <p>Heladeria</p>
                        <p className='text-2xl mt-[-8px]'>Kanitas Dulces</p>
                    </div>
                </Link>

                <div>
                    <h1 className='text-white text-2xl' >Panel de Administradores</h1>
                </div>

                <div className='flex items-center gap-6' >
                    <UserDropdown />
                </div>
            </div>

        
            <div className='flex p-6 gap-4' >

                <div className='justify-self-center p-4' >
                    {current === 1 &&
                        <ProductCreationForm />
                    }
                    {current === 2 &&
                        <CategoryCreationForm />
                    }
                    {current === 3 &&
                        <ProductModificationForm id={productToChange.product_category} name={productToChange.name} desc={productToChange.description} price={productToChange.price} />
                    }
                    {current === 4 &&
                        <CategoryModificationForm id={categoryToChange.category_id} name={categoryToChange.name} />
                    }
                </div>

                <div>
                    <div className='flex gap-2' >
                        <p className='text-xl' >Listado de Productos</p>
                        {current !== 1 &&
                        <button onClick={() => changeCurrent(1)} className='text-xs bg-pink-600 rounded-lg hover:blue-600 text-white px-2 py-1 ml-2'  >Crear Producto</button>
                        }
                    </div>
                    <hr className='w-[80%] text-black mt-2' ></hr>
                    <ul className='p-3' > 
                        {products?.map(element => {
                            const { name, product_id } = element;

                            return (
                                <div className='flex gap-4 overflow-hidden mt-1' >
                                    <li className='mr-2 text-center' >{name}</li>
                                    <button onClick={() => changeProduct(element)} className='py-1 px-2 text-xs text-white bg-blue-600 rounded-lg' >Modificar</button>
                                    <button onClick={() => onDeleteProduct(product_id)} className='py-1 px-2 text-xs text-white bg-red-600 rounded-lg' >Eliminar</button>
                                </div>
                            )
                        })}
                    </ul>
                </div>

                <div>
                    <div className='flex gap-2' >
                        <p className='text-xl' >Listado de Categorias</p>
                        {current !== 2 &&
                        <button onClick={() => changeCurrent(2)} className='text-xs bg-pink-600 rounded-lg hover:blue-600 text-white px-2 py-1 ml-2' >Crear Categoria</button>
                        }
                    </div>
                    <hr className='w-[80%] mt-2' ></hr>
                    <ul className='p-3' > 
                        {categories?.map(element => {
                            const { name, category_id } = element;

                            return (
                                <div className='flex gap-4 overflow-hidden mt-1' >
                                    <li className='pr-2 text-center' >{name}</li>
                                    <button onClick={() => changeCategory(element)} className='py-1 px-2 text-xs text-white bg-blue-600 rounded-lg' >Modificar</button>
                                    <button onClick={() => onDeleteCategory(category_id)} className='py-1 px-2 text-xs text-white bg-red-600 rounded-lg' >Eliminar</button>
                                </div>
                            )
                        })}
                    </ul>
                </div>

            </div>

            <div className='px-14' >
                <p className='text-xl' >Listado de usuarios del newsletter</p>
                <hr className='w-[80%] mt-2' ></hr>
                <ul className='p-3' >
                    {NewsletterUsers?.map( element => {
                        const { email } = element;

                        return (
                            <li>{email}</li>
                        )
                    })}
                </ul>
            </div>

            <ToastContainer />
        </div>
    )
}