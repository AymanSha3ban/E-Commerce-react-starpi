import Home from "../pages/Home";
import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import Team from "@/pages/About";
import Products from "@/pages/Products";
import ProductDetails from "@/components/ProductDetails";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import CartPage from "@/pages/CartPage";
import Checkout from "@/pages/Checkout";

export const router = createBrowserRouter([
    {path: "/", element: <App/>,
        children: [
            {index:true , element: <Home/>},
            {path: "/about", element: <Team/>},
            {path: "/cart", element: <CartPage/>},
            {path: "/products", element: <Products/>},
            {path: "/checkout", element: <Checkout/>},
            {path: "/products/:id", element: <ProductDetails />},
            {path: "/dashboard", element: <Dashboard/>},
            {path: "/login", element: <Login/>},
        ]
    },
]);