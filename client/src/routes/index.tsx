import Home from "../pages/Home";
import App from "../App";
import { createBrowserRouter } from "react-router-dom";
// import Team from "@/pages/Team";
import Products from "@/pages/Products";
import ProductDetails from "@/components/ProductDetails";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import CartPage from "@/pages/CartPage";

export const router = createBrowserRouter([
    {path: "/", element: <App/>,
        children: [
            {index:true , element: <Home/>},
            {path: "/team", element: <CartPage/>},
            {path: "/products", element: <Products/>},
            {path: "/products/:id", element: <ProductDetails />},
            {path: "/dashboard", element: <Dashboard/>},
            {path: "/login", element: <Login/>},
        ]
    },
]);