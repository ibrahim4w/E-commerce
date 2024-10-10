import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";

function WishList() {
  const [wishList, setWishList] = useState([]);
  const { addProductToCart } = useContext(CartContext);
  const [load, setLoad] = useState(false);
  const [spin, setSpin] = useState(false);

  async function getProductWishList() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      console.log(data.data);
      setWishList(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addProductCart(id) {
    setLoad(true);
    const data = await addProductToCart(id);
    // console.log(data);
    if (data) {
      toast.success(data.message);
      setLoad(false);
    } else {
      toast.error("Error...Something Went Wrong");
      setLoad(false);
    }
  }

  useEffect(() => {
    getProductWishList();
  }, []);

  async function deleteProductFromWishList(id) {
    setSpin(true);
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      getProductWishList();
      toast.success(data.message);
      setSpin(false);
    } catch (error) {
      console.log(error);
      setSpin(false);
    }
  }
  return (
    <section className="py-20">
      <div className="w-[95%] md:w-[80%] p-10 mx-auto bg-slate-100 rounded-md shadow-md">
        <h2 className="font-medium text-[32px] mb-8">My Wish List</h2>
        <hr className="my-4 border-gray-300 w-full" />
        {wishList.length > 0 ? (
          wishList.map((product, idx) => {
            return (
              <div
                key={idx}
                className="flex flex-wrap justify-between items-center"
              >
                <div className="w-full md:w-1/2 flex flex-wrap md:justify-center justify-start items-center">
                  <div className="w-full md:w-1/2">
                    <img src={product.imageCover} className="w-full" alt="" />
                  </div>
                  <div className="w-1/2 text-start p-0 md:px-5">
                    <h5 className="text-nowrap py-2 text-[20px] font-medium">
                      {product.title}
                    </h5>
                    <h6 className="font-medium">{product.price} EGP</h6>
                    <button
                      onClick={() => deleteProductFromWishList(product.id)}
                      className="text-red-600 text-[14px] px-2 py-1 my-3 border border-red-500 rounded-md hover:bg-red-600 hover:text-white duration-300 hover:duration-300"
                    >
                      {spin ? (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        <i className="fa-solid fa-trash me-1">
                          <span className="text-[14px] font-normal ms-1 font-sans">
                            Remove
                          </span>
                        </i>
                      )}
                    </button>
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-wrap justify-end items-center">
                  <button
                    onClick={() => addProductCart(product.id)}
                    type="button"
                    className="mt-3 text-[20px] px-3 py-2 bg-transparent border border-green-400 rounded-md duration-300 hover:duration-300 hover:bg-green-500 hover:text-white"
                  >
                    {load ? (
                      <i className="fa-solid fa-spinner fa-spin text-white"></i>
                    ) : (
                      "Add To Crat"
                    )}
                  </button>
                </div>
                <hr className="my-4 border-gray-300 w-full" />
              </div>
            );
          })
        ) : (
          <h3 className="font-medium text-2xl">Empty Wish List</h3>
        )}
      </div>
    </section>
  );
}

export default WishList;
