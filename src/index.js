import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import UserRegistrationPage from './Pages/UserRegistrationPage';
import AdminProductManagementPage from './Pages/Admin/AdminProductManagementPage';
import AdminHomePage from './Pages/Admin/AdminHomePage';


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
    element: <UserRegistrationPage />,
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
    <RouterProvider router={router} />
  </React.StrictMode>
);