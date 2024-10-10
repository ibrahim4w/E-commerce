import axios from "axios";
import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
import { FallingLines } from "react-loader-spinner";
// import { Alert } from 'flowbite-react';

function Brands() {
  const [brands, setBrands] = useState([]);
  const [specificBrand, setSpecificBrand] = useState(null);
  const [load, setLoad] = useState(false);

  async function getAllBrands() {
    setLoad(true);
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      // console.log(data.data);
      setBrands(data.data);
      setLoad(false);
      return data;
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  }
  useEffect(() => {
    getAllBrands();
  }, []);

  async function getSpecificBrand(brandId) {
    // setLoad(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`
      );
      console.log(data.data);
      setSpecificBrand(data.data);
      // setLoad(false);
      return data;
    } catch (error) {
      console.log(error);
      // setLoad(false);
    }
  }

  return (
    <>
      {load ? (
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
          <div className="w-[95%] md:w-[90%] p-10 mx-auto text-center">
            <h2 className="font-medium text-[40px] text-green-600 mb-8">
              All Brands
            </h2>
            <div className="flex flex-wrap items-center">
              {brands.length
                ? brands.map((item, idx) => {
                    return (
                      <div key={idx} className="w-full md:w-1/4 p-3">
                        <div
                          onClick={() =>  getSpecificBrand(item._id)}

                          className="inner border border-slate-200 rounded-md duration-300 hover:shadow-green-600 hover:shadow-md hover:duration-300 cursor-pointer"
                        >
                          <img
                            src={item.image}
                            className="w-full rounded-t-sm"
                            alt=""
                          />
                          <p className="p-5">{item.name}</p>
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
}

export default Brands;
