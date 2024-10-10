import { Toaster } from "react-hot-toast";
import "./App.css";
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import WishList from "./Components/WishList/WishList";
import Products from "./Components/Products/Products";
import Category from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import { AuthContextProvider } from "./Context/AuthContext";
import { Protected } from "./Components/ProtectedRoute/Protected";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductDetails } from "./Components/ProductDetails/ProductDetails";
import { CartContextProvider } from "./Context/CartContext";
import WishListContextProvider from "./Context/WishListContext";
import Payment from "./Components/Payment/Payment";
import AllOrders from "./Components/AllOrders/AllOrders";
import NotFound from "./Components/NotFoundPage/NotFound";

function App() {
  const i = new QueryClient();

  const routers = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        {
          path: "/home",
          element: (
            <Protected>
              <Home />
            </Protected>
          ),
        },
        {
          path: "/",
          index: true,
          element: (
            <Protected>
              <Home />
            </Protected>
          ),
        },
        {
          path: "/cart",
          element: (
            <Protected>
              <Cart />
            </Protected>
          ),
        },
        {
          path: "/wishList",
          element: (
            <Protected>
              <WishList />
            </Protected>
          ),
        },
        {
          path: "/products",
          element: (
            <Protected>
              <Products />
            </Protected>
          ),
        },
        {
          path: "/productDetails/:id",
          element: (
            <Protected>
              <ProductDetails />
            </Protected>
          ),
        },
        {
          path: "/categories",
          element: (
            <Protected>
              <Category />
            </Protected>
          ),
        },
        {
          path: "/brands",
          element: (
            <Protected>
              <Brands />
            </Protected>
          ),
        },
        {
          path: "/allorders",
          element: (
            <Protected>
              <AllOrders />
            </Protected>
          ),
        },
        {
          path: "/payment/:id",
          element: (
            <Protected>
              <Payment />
            </Protected>
          ),
        },
        {
          path: "*",
          element: (
            <Protected>
              <NotFound />
            </Protected>
          ),
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={i}>
      <AuthContextProvider>
        <CartContextProvider>
          <WishListContextProvider>
            <Toaster
              containerStyle={{
                margin: "4rem",
              }}
            />
            <RouterProvider router={routers} />
          </WishListContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
