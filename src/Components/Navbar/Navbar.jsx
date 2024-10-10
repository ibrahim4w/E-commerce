// import React from 'react'
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";

function Navbar() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(authContext);
  const {numOfItems} = useContext(CartContext);

  function logout() {
    setToken(null);
    localStorage.removeItem("tkn");
    navigate("/login");
  }
  return (
    <nav className="bg-[#f8f9fa] border-gray-200 dark:bg-gray-900 fixed top-0 w-full z-[10000]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-5">
        <NavLink
          to="/home"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <i className="fa-solid fa-cart-shopping fa-2x text-[#4fa74f]" />
          <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white hover:text-[#4fa74f] duration-300 hover:duration-300">
            Fresh Cart
          </span>
        </NavLink>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="md:inline-flex  sm:blockitems-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full lg:block lg:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-[#f8f9fa] lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-[#f8f9fa] dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700 lg:flex-wrap lg:justify-between lg:items-center">
            {token ? (
              <>
                <li>
                  <NavLink
                    to="/home"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-[#4fa74f] hover:text-green-600 hover:bg-green-400 rounded lg:hover:bg-transparent lg:p-0 dark:text-[#4fa74f] lg:dark:text-[#4fa74f]"
                        : "block py-2 px-3 text-[gray-900] hover:text-green-600 hover:bg-green-400 rounded lg:hover:bg-transparent lg:p-0 dark:text-white lg:dark:text-[#4fa74f]"
                    }
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-[#4fa74f] hover:text-green-600 hover:bg-green-400 rounded lg:hover:bg-transparent lg:p-0 dark:text-[#4fa74f] lg:dark:text-[#4fa74f]"
                        : "block py-2 px-3 text-[gray-900] hover:text-green-600 hover:bg-green-400 rounded lg:hover:bg-transparent lg:p-0 dark:text-white lg:dark:text-[#4fa74f]"
                    }
                    aria-current="page"
                  >
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/wishList"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-[#4fa74f] hover:text-green-600 hover:bg-green-400 rounded lg:hover:bg-transparent lg:p-0 dark:text-[#4fa74f] lg:dark:text-[#4fa74f]"
                        : "block py-2 px-3 text-[gray-900] hover:text-green-600 hover:bg-green-400 rounded lg:hover:bg-transparent lg:p-0 dark:text-white lg:dark:text-[#4fa74f]"
                    }
                    aria-current="page"
                  >
                    Wish List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/products"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-[#4fa74f] hover:text-green-600 hover:bg-green-400 rounded lg:hover:bg-transparent lg:p-0 dark:text-[#4fa74f] lg:dark:text-[#4fa74f]"
                        : "block py-2 px-3 text-[gray-900] hover:text-green-600 hover:bg-green-400 rounded lg:hover:bg-transparent lg:p-0 dark:text-white lg:dark:text-[#4fa74f]"
                    }
                    aria-current="page"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/categories"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-[#4fa74f] hover:text-green-600 hover:bg-green-400 rounded lg:hover:bg-transparent lg:p-0 dark:text-[#4fa74f] lg:dark:text-[#4fa74f]"
                        : "block py-2 px-3 text-[gray-900] hover:text-green-600 hover:bg-green-400 rounded lg:hover:bg-transparent lg:p-0 dark:text-white lg:dark:text-[#4fa74f]"
                    }
                    aria-current="page"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/brands"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-[#4fa74f] hover:text-green-600 hover:bg-green-400 rounded lg:hover:bg-transparent lg:p-0 dark:text-[#4fa74f] lg:dark:text-[#4fa74f]"
                        : "block py-2 px-3 text-[gray-900] hover:text-green-600 hover:bg-green-400 rounded lg:hover:bg-transparent lg:p-0 dark:text-white lg:dark:text-[#4fa74f]"
                    }
                    aria-current="page"
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/allorders"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-[#4fa74f] hover:text-green-600 hover:bg-green-400 rounded lg:hover:bg-transparent lg:p-0 dark:text-[#4fa74f] lg:dark:text-[#4fa74f]"
                        : "block py-2 px-3 text-[gray-900] hover:text-green-600 hover:bg-green-400 rounded lg:hover:bg-transparent lg:p-0 dark:text-white lg:dark:text-[#4fa74f]"
                    }
                    aria-current="page"
                  >
                    All Orders
                  </NavLink>
                </li>
                <div className="sign text-center lg:flex justify-center items-center sm:hidden">
                  {token ? (
                    <>
                      <NavLink to="/cart">
                        <div className="relative mx-3 inline">
                          <i className="fa-solid fa-cart-shopping text-2xl me-3 hover:text-green-600" />
                          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-600 border-2 border-white rounded-full -top-4 -end-1 dark:border-gray-900">
                            {numOfItems}
                          </div>
                        </div>
                      </NavLink>
                      <span className="flex justify-center items-center lg:flex-none">
                        <button
                          onClick={logout}
                          className="xl:inline-block sm:block py-2 px-3 me-3 text-[gray-900] hover:text-green-600 hover:bg-green-400 rounded lg:hover:bg-transparent lg:border-0 lg:hover:text-[#4fa74f] lg:p-0 dark:text-white lg:dark:hover:text-[#4fa74f]dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                        >
                          Log out
                        </button>
                      </span>
                    </>
                  ) : (
                    <>
                      <NavLink
                        to="/login"
                        className="xl:inline-block sm:block py-2 px-3 me-3 text-[gray-900] hover:text-green-600 hover:bg-green-400 rounded lg:hover:bg-transparent lg:border-0 lg:hover:text-[#4fa74f] lg:p-0 dark:text-white lg:dark:hover:text-[#4fa74f]dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                      >
                        Login
                      </NavLink>
                      <NavLink
                        to="/register"
                        className="xl:inline-block sm:block py-2 px-3 me-3 text-[gray-900] hover:text-green-600 hover:bg-green-400 rounded lg:hover:bg-transparent lg:border-0 lg:hover:text-[#4fa74f] lg:p-0 dark:text-white lg:dark:hover:text-[#4fa74f]dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                      >
                        Register
                      </NavLink>
                    </>
                  )}
                </div>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
