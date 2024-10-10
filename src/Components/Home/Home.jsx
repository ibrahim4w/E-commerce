import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { FallingLines } from "react-loader-spinner";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { SearchProduct } from "../SearchProduct/SearchProduct";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";

function Home() {
  const { addProductToCart } = useContext(CartContext);
  const [load, setLoad] = useState(false);
  const { addToWishList } = useContext(WishListContext);

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

  async function getAllProduct() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["product"],
    queryFn: getAllProduct,
  });

  // Handle Error
  if (error) {
    return toast.error(`Error: ${error.message || "Something went wrong!"}`);
  }
  // Handle Loading
  if (isLoading) {
    return (
      <div className="h-screen flex flex-wrap justify-center items-center bg-green-600 overflow-hidden">
        <FallingLines
          color="#fff"
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );
  }

  return (
    <>
      <section className="py-5">
        <div className="container mx-auto px-5">
          <HomeSlider />
          <CategorySlider />
          <SearchProduct />
          <div className="flex flex-wrap justify-center mt-12">
            {data?.data.data.map((product, idx) => {
              const newTitle = product.title.split(" ").slice(0, 2).join(" ");
              return (
                <>
                  <div
                    key={idx}
                    className="w-full  md:w-1/2 lg:w-1/4 p-4 cursor-pointer"
                  >
                    <div className="inner rounded-md p-4 duration-300 hover:shadow-green-600 hover:shadow-md hover:duration-300 group">
                      <NavLink to={`/productDetails/${product.id}`}>
                        <div>
                          <img
                            src={product.imageCover}
                            className="w-full h-[300px]"
                            alt="image"
                          />
                          <p className="mb-3 text-green-600">
                            {product.category.name}
                          </p>
                          <h2 className="my-2 font-medium">{newTitle}</h2>
                          <div className="flex flex-wrap justify-between items-center">
                            <span className="my-2">{product.price} EGP</span>
                            <span>
                              <i className="fa-solid fa-star text-yellow-500"></i>
                              {product.ratingsAverage}
                            </span>
                          </div>
                        </div>
                      </NavLink>
                      <div className="py-6 flex justify-between items-center relative mt-5">
                        <div className="absolute right-0">
                          <i
                            onClick={() => addToWishList(product.id)}
                            className={`fa-solid fa-heart text-[28px] md:text-[20px] lg:text-[28px] font-extrabold duration-300 hover:text-green-600 hover:duration-300`}
                          />
                        </div>
                        <button
                          onClick={() => addProductCart(product.id)}
                          type="button"
                          className="w-[80%] text-center absolute opacity-0 top-32 duration-300 group-hover:top-0 group-hover:opacity-100  text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                        >
                          {load ? (
                            <i className="fa-solid fa-spinner fa-spin text-white"></i>
                          ) : (
                            " + Add"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
