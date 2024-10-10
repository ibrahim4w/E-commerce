import axios from "axios";
import { createContext } from "react";
import toast from "react-hot-toast";

export const WishListContext = createContext();
export const WishListContextProvider = ({ children }) => {


  async function addToWishList(id) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: id,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
    //   console.log(data);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <WishListContext.Provider value={{ addToWishList }}>
      {children}
    </WishListContext.Provider>
  );
};

export default WishListContextProvider;
