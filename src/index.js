import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import AdminHomePage from './Pages/Admin/AdminHomePage';
import MenuPage from './Pages/MenuPage';
import DeclinedPage from './Pages/DeclinedPage';
import AcceptedPage from './Pages/AcceptedPage';
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
    path: "/decline",
    element: <DeclinedPage />,
  },
  {
    path: "/success",
    element: <AcceptedPage />,
  },
  {
    path: "/admin",
    element: <AdminHomePage />,
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