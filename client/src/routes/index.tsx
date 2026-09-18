import Home from "../pages/Home";
import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import About from "@/pages/About";
import Products from "@/pages/Products";
import ProductDetails from "@/components/ProductDetails";

export const router = createBrowserRouter([
    {path: "/", element: <App/>,
        children: [
            {index:true , element: <Home/>},
            {path: "/about", element: <About/>},
            {path: "/products", element: <Products/>},
            {path: "/products/:id", element: <ProductDetails />},
        ]
    },
]);