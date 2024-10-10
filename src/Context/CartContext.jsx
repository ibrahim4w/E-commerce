import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authContext } from "./AuthContext";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [numOfItems, setNumOfItems] = useState(0);
  const [products, setProducts] = useState(null);
  const [cartId, setCartId] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [spin, setSpin] = useState(false);
  const { token } = useContext(authContext);

  async function addProductToCart(productId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: productId,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      getUserCart();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserCart() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setNumOfItems(data.numOfCartItems);
      setProducts(data.data.products);
      setTotalPrice(data.data.totalCartPrice);
      // console.log(data.cartId);
      setCartId(data.cartId);
      return data;
    } catch (error) {
      console.log(error, "Get User Cart Context");
      toast.error(error);
    }
  }

  async function updateProductCount(id , count) {
    try {
      const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: count  ,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          }
        }
      )
      // console.log(data);
      setNumOfItems(data.numOfCartItems);
      setProducts(data.data.products);
      setTotalPrice(data.data.totalCartPrice);
      setCartId(data.cartId);
      return data;
    } catch (error) {
      console.log(error);
      
    }
  }

  async function deleteProductCart(id) {
    setSpin(true);
    try {
      const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          }
        }
      );
      setNumOfItems(data.numOfCartItems);
      setProducts(data.data.products);
      setTotalPrice(data.data.totalCartPrice);
      setCartId(data.cartId);
      toast.success("Your Product Is Deleted From Cart");
      setSpin(false);
    } catch (error) {
      console.log(error);
      setSpin(false);
    }
  }

  async function clearCart() {
    try {
      const {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("tkn"),
          }
        }
      );
      toast.success(data.message);
      getUserCart();
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (token != null) {
      getUserCart();
    }
  }, [token]);

  return (
    <CartContext.Provider
      value={{ addProductToCart, numOfItems, products, totalPrice , updateProductCount , deleteProductCart ,clearCart , spin , cartId , setNumOfItems,setProducts,setTotalPrice}}

    >
      {children}
    </CartContext.Provider>
  );
};