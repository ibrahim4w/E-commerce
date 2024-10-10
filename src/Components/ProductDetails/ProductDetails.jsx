import Slider from "react-slick";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FallingLines } from "react-loader-spinner";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
export const ProductDetails = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const {addProductToCart} = useContext(CartContext);
  const [load, setLoad] = useState(false);

  async function addProduct(){
    setLoad(true);
    const data = await addProductToCart(id);
    console.log(data); 
    if(data){
      toast.success(data.message);
      setLoad(false);
    }else{
      toast.error("Error...Something Went Wrong");
      setLoad(false);
    }
  }

  const { id } = useParams();

  async function getProductDetails() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }

  const { data, isLoading } = useQuery({
    queryKey: [`product${id}`],
    queryFn: getProductDetails,
  });

  //   console.log(data);

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
      <section>
        <div className="container p-5 mx-auto">
          <div className="flex flex-wrap justify-center items-center">
            <div className="w-full md:w-1/4">
              <div className="slider-container">
                <Slider {...settings}>
                  <div className="">
                    <img
                      src={data?.data.data.imageCover}
                      className="w-full"
                      alt=""
                    />
                  </div>
                  {data?.data.data.images.map((img, idx) => {
                    return (
                      <div key={idx} className="w-full">
                        <img src={img} alt={`product image ${idx + 1}`} />
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
            <div className="w-full md:w-3/4 px-10 text-start">
              <h2 className="my-3 font-medium text-[32px]">
                {data?.data.data.title}
              </h2>
              <p>{data?.data.data.description}</p>
              <div className="flex flex-wrap justify-between items-center py-5">
                <span className="my-2">{data?.data.data.price} EGP</span>
                <span>
                  <i className="fa-solid fa-star text-yellow-500 me-1"></i>
                  {data?.data.data.ratingsAverage}
                </span>
              </div>
              <div className="flex flex-wrap justify-between items-center">
                <button
                onClick={addProduct}
                  type="button"
                  className="w-[70%] text-center  duration-300 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                >
                  {load ? <i className="fa-solid fa-spinner fa-spin text-white"></i> : " + Add"}
                </button>
                <span>
                  <i className="fa-solid fa-heart fa-xl duration-300 hover:text-green-600 hover:duration-300 cursor-pointer" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
