import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FallingLines } from "react-loader-spinner";
import Slider from "react-slick";

const AllOrders = () => {
  const { id } = jwtDecode(localStorage.getItem("tkn"));
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  var settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  async function getAllOrders() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      setOrders(data);
      setLoading(false);
      // console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Error From Get All Orders");
      setLoading(false);
    }
  }  

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      {loading ? (
        <div className="h-screen flex flex-wrap justify-center items-center bg-green-600 overflow-hidden">
          <FallingLines
            color="#fff"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </div>
      ) : (
        <section>
          <div className="w-[95%] md:w-[90%] p-5 mx-auto">
            <h1 className="text-green-600 pb-5 text-center font-medium text-4xl font-mono">
              All Your Orders
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 p-5">
              {orders
                ? orders.map((order, idx) => {
                    return (
                      <div
                        key={idx}
                        className="border rounded-md duration-300 hover:duration-300 hover:shadow-green-600 hover:shadow-md "
                      >
                        <div className="w-full mb-5">
                          <Slider {...settings}>
                            {order.cartItems?.map((item, idx) => (
                              <div key={idx} className="w-full">
                                <img
                                  src={item.product.imageCover}
                                  className="w-full rounded-t-md"
                                  alt=""
                                />
                              </div>
                            ))}
                          </Slider>
                        </div>
                        <div className="p-3">
                          <h2 className="font-medium text-xl pb-3">
                            ID:{" "}
                            <span className="text-green-600">{order.id}</span>
                          </h2>
                          <h2 className="font-medium text-xl pb-3">
                            Total Order Price:{" "}
                            <span className="text-green-600">
                              {order.totalOrderPrice} EGP
                            </span>{" "}
                          </h2>
                          <h2 className="font-medium text-xl pb-3">
                            Payment Type:{" "}
                            <span className="text-green-600">
                              {order.paymentMethodType}
                            </span>
                          </h2>
                          <h2 className="font-medium text-xl text-nowrap">
                            Created At:{" "}
                            <span className="text-green-600">
                              {order.createdAt}
                            </span>
                          </h2>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AllOrders;
