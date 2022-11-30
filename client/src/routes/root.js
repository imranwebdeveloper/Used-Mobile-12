import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layouts/Dashboard";
import Main from "../layouts/Main";
import Blog from "../pages/Blog";
import Checkout from "../pages/Checkout";
import AddProduct from "../pages/dashboard/AddProduct";
import AllBuyers from "../pages/dashboard/AllBuyers";
import AllSellers from "../pages/dashboard/AllSellers";
import MyOrders from "../pages/dashboard/MyOrders";
import MyProducts from "../pages/dashboard/MyProducts";
import MyWishList from "../pages/dashboard/MyWishList";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Products from "../pages/Products";
import Register from "../pages/Register";
import Protect from "./Protect";

const router = createBrowserRouter([
  // Publics routes
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "blog", element: <Blog /> },
      {
        path: "category/:id",
        element: (
          <Protect>
            <Products />
          </Protect>
        ),
      },
      {
        path: "pay/:id",
        element: <Checkout />,
        loader: ({ params }) =>
          fetch(`https://server-imranwebdeveloper.vercel.app/pay/${params.id}`),
      },
    ],
  },
  { path: "register", element: <Register /> },
  { path: "login", element: <Login /> },

  // Dashboard routes
  {
    path: "dashboard",
    element: (
      <Protect>
        <Dashboard />
      </Protect>
    ),
    children: [
      // Admin Routes
      { path: "all-buyers", element: <AllBuyers /> },
      { path: "all-sellers", element: <AllSellers /> },

      // Buyer routers
      { path: "add-product", element: <AddProduct /> },
      { path: "my-products", element: <MyProducts /> },

      // Sellers Routes
      { path: "my-orders", element: <MyOrders /> },
      { path: "my-wishList", element: <MyWishList /> },
    ],
  },
]);

export default router;
