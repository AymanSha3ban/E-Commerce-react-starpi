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
import Register from "@/pages/Register";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminRoute from "@/components/AdminRoute";
import OrderDetails from "@/pages/OrderDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/about", element: <Team /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:id", element: <ProductDetails /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "/checkout", element: <Checkout /> },
          { path: "/cart", element: <CartPage /> },
        ]
      },
      {
        element: <AdminRoute />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/dashboard/orders/:id",
            element: <OrderDetails />,
          },
        ],
      },

      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);