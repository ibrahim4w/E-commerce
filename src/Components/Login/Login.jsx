import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authContext } from "../../Context/AuthContext";

function Login() {
  const { setToken } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  async function signIn(value) {
    console.log(value);
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        value
      );
      console.log(res);
      toast.success(res.data.message);
      setIsLoading(false);
      navigate("/home");
      console.log(res.data);
      setToken(res.data.token);
      localStorage.setItem("tkn", res.data.token);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  const validation = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Za-z][a-z0-9]{3,10}$/, "Invaild Password"),
  });

  function togglePassword() {
    setShowPass(!showPass);
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: signIn,
    validationSchema: validation,
  });

  return (
    <div className="container mx-auto py-20 px-5">
      <div className="md:w-[60%] mx-auto my-10">
        <h1 className="text-3xl font-bold mb-10 text-green-500 text-center">
          Login Form
        </h1>

        <form onSubmit={formik.handleSubmit}>
          {/* Input Email */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Your Email
            </label>
          </div>

          {/* Error Email */}
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800     dark:text-red-400"
              role="alert"
            >
              {" "}
              Error !<span className="font-medium"></span>
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}

          {/* Input Password */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              id="password"
              className="relative block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span onClick={togglePassword} className="absolute right-2 top-2">
              {showPass ? <i className="fa-solid fa-eye-slash" /> : <i className="fa-solid fa-eye" /> }
            </span>
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Your Password
            </label>
          </div>

          {/* Error Password */}
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800     dark:text-red-400"
              role="alert"
            >
              {" "}
              Error !<span className="font-medium"></span>
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}

          {/* Sign Button */}
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
          >
            {isLoading == true ? (
              <i className="fa-solid fa-spinner fa-spin text-white"></i>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
