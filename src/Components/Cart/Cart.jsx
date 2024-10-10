import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const {
    products,
    totalPrice,
    numOfItems,
    updateProductCount,
    deleteProductCart,
    clearCart,
    spin,
    cartId,
  } = useContext(CartContext);


  return (
    <>
      <section className="py-20">
        <div className="w-[95%] md:w-[80%] p-10 mx-auto bg-slate-100 rounded-md shadow-md text-center">
          <div className="flex flex-wrap justify-between items-center pt-5 mb-8">
            <h2 className="font-medium text-[32px]">Cart Shop</h2>
            <NavLink to={`/payment/${cartId}`}>
              <button
                type="button"
                className="text-white text-[20px] bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm p-3 dark:bg-blue-600 dark:hover:bg-blue-800 focus:outline-none dark:focus:ring-blue-800"
              >
                Check Out
              </button>
            </NavLink>
          </div>
          <div className="flex flex-wrap justify-between items-center">
            <h5 className="font-medium text-[20px]">
              Total Price : <span className="text-green-400">{totalPrice}</span>
            </h5>
            <h5 className="font-medium text-[20px]">
              Total Number Of Items :{" "}
              <span className="text-green-400">{numOfItems}</span>
            </h5>
          </div>
          <hr className="my-4 border-gray-300 w-full" />
          {products?.map((product, idx) => {
            return (
              <div
                key={idx}
                className="flex flex-wrap justify-between items-center"
              >
                <div className="w-full md:w-1/2 flex flex-wrap md:justify-center justify-start items-center">
                  <div className="w-full md:w-1/2">
                    <img
                      src={product.product.imageCover}
                      className="w-full"
                      alt=""
                    />
                  </div>
                  <div className="w-1/2 text-start p-0 md:px-5">
                    <h5 className="text-nowrap py-2 text-[20px] font-medium">
                      {product.product.title}
                    </h5>
                    <h6 className="font-medium">{product.price} EGP</h6>
                    <button
                      onClick={() => deleteProductCart(product.product.id)}
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
                    onClick={() =>
                      updateProductCount(product.product.id, product.count + 1)
                    }
                    type="button"
                    className="border px-3 py-2 border-green-400 rounded-md duration-300 hover:bg-green-400 hover:duration-300"
                  >
                    +
                  </button>
                  <span className="mx-3">{product.count}</span>
                  <button
                    onClick={() =>
                      updateProductCount(product.product.id, product.count - 1)
                    }
                    type="button"
                    disabled={product.count == 1 ? true : false}
                    className="disabled:opacity-45 border px-[14px] py-2 border-green-400 rounded-md duration-300 hover:bg-green-400 hover:duration-300"
                  >
                    -
                  </button>
                </div>
                <hr className="my-4 border-gray-300 w-full" />
              </div>
            );
          })}
          <button
            type="button"
            onClick={clearCart}
            className="mt-3 text-[20px] px-3 py-2 bg-transparent border border-green-400 rounded-md duration-300 hover:duration-300 hover:bg-green-500 hover:text-white"
          >
            Clear Your Cart
          </button>
        </div>
      </section>
      
    </>
  );
};

export default Cart ;
