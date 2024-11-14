import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import AdminProductManagementPage from './Pages/Admin/AdminProductManagementPage';
import AdminHomePage from './Pages/Admin/AdminHomePage';
import MenuPage from './Pages/MenuPage';
import UserCartPage from './Pages/UserCartPage';
import ProductPage from './Pages/ProductPage';
import StateComponent from './Context/StateComponent';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegistrationPage />,
  },
  {
    path: "/menu",
    element: <MenuPage />,
  },
  {
    path: "/cart",
    element: <UserCartPage />,
  },
  {
    path: "/product/:product_name",
    element: <ProductPage />,
  },
  {
    path: "/admin/home",
    element: <AdminHomePage />,
  },
  {
    path: "/admin/product",
    element: <AdminProductManagementPage />,
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <StateComponent>
        <RouterProvider router={router} />
      </StateComponent>
    </React.StrictMode>
  
);