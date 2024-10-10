import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

const Payment = () => {
  const [details, setDetails] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const { id } = useParams();
  const { setNumOfItems, setProducts, setTotalPrice } = useContext(CartContext);
  const [spin, setSpin] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  async function cashPayment() {
    const x = {
      shippingAddress: {
        details,
        phone,
        city,
      },
    };
    setSpin(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${id}`,
        x,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setNumOfItems(0);
      setProducts([]);
      setTotalPrice(0);
      toast.success("Successful Cash Payment");
      setDetails("");
      setCity("");
      setPhone("");
      // console.log(data);
      setSpin(false);
      return data;
    } catch (error) {
      console.log(error);
      toast.error("Error From Payment");
      setSpin(false);
    }
  }
  async function onlinePayment() {
    const x = {
      shippingAddress: {
        details,
        phone,
        city,
      },
    };
    setSpin(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:5173`,
        x,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      toast.success(data.status);
      // window.open(data.session.url);
      window.location.href = data.session.url;
      setDetails("");
      setCity("");
      setPhone("");
      console.log(data);
      setSpin(false);
      return data;
    } catch (error) {
      console.log(error);
      toast.error("Error From Payment");
      setSpin(false);
    }
  }

  const handleValidation = (value, setError) => {
    if (value.trim() === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <section>
      <div className="w-[90%] md:w-[80%] mx-auto text-center p-5">
        <h2 className="text-3xl font-bold text-green-600">Payment</h2>
        <div className="flex flex-wrap justify-center items-center mt-5">
          {/* Details Input */}
          <div className="w-full pb-5">
            <label
              htmlFor="details"
              className="block text-start mb-2 text-gray-900 dark:text-white"
            >
              Details
            </label>
            <input
              onChange={(e) => setDetails(e.target.value)}
              onBlur={() => handleValidation(details, setDetailsError)}
              value={details}
              type="text"
              id="details"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none"
              required
            />
            {detailsError && (
              <div className="bg-red-200 text-red-400 p-3 border border-red-400 rounded-md my-3 text-start">
                Details Is Required.
              </div>
            )}
          </div>

          {/* Phone Input */}
          <div className="w-full pb-5">
            <label
              htmlFor="phone"
              className="block text-start mb-2 text-gray-900 dark:text-white"
            >
              Phone
            </label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => handleValidation(phone, setPhoneError)}
              value={phone}
              type="tel"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none"
              required
            />
            {phoneError && (
              <div className="bg-red-200 text-red-400 p-3 border border-red-400 rounded-md my-3 text-start">
                Phone Is Required.
              </div>
            )}
          </div>
          {/* City Input */}
          <div className="w-full pb-5">
            <label
              htmlFor="city"
              className="block text-start mb-2 text-gray-900 dark:text-white"
            >
              City
            </label>
            <input
              onChange={(e) => setCity(e.target.value)}
              onBlur={() => handleValidation(city, setCityError)}
              value={city}
              type="text"
              id="city"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none"
              required
            />
            {cityError && (
              <div className="bg-red-200 text-red-400 p-3 border border-red-400 rounded-md my-3 text-start">
                City Is Required.
              </div>
            )}
          </div>

          <div className="w-full py-5">
            <button
              onClick={cashPayment}
              required
              disabled={(details.trim() === "" ||
                city.trim() === "" ||
                phone.trim() === "") ? true : false}
              type="button"
              className={"w-full bg-transparent text-green-600 border border-green-600 duration-300 hover:bg-green-600 hover:text-white hover:duration-300 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 disabled:opacity-50 disabled:cursor-not-allowed"}
            >
              {spin ? (
                <i className="fa-solid fa-spinner fa-spin text-white"></i>
              ) : (
                "Pay Now"
              )}
            </button>

            <button
              onClick={onlinePayment}
              required
              disabled={(details.trim() === "" ||
                city.trim() === "" ||
                phone.trim() === "") ? true : false}
              type="button"
              className={"w-full my-3 bg-transparent text-green-600 border border-green-600 duration-300 hover:bg-green-600 hover:text-white hover:duration-300 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 disabled:opacity-50 disabled:cursor-not-allowed"}
            >
              {spin ? (
                <i className="fa-solid fa-spinner fa-spin text-white"></i>
              ) : (
                "Online Payment"
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
