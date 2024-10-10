import axios from "axios";
import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
const Categories = () => {
  const [category, setCategory] = useState([]);
  const [load, setLoad] = useState(false);
  const [subCategory, setSubCategory] = useState([]);
  const [catName, setCatName] = useState(undefined);

  async function getCategories() {
    setLoad(true);
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );

      // console.log(data.data);
      setCategory(data.data);
      setLoad(false);
      return data;
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  }
  useEffect(() => {
    getCategories();
  }, []);

  async function getSubCategory(catId, catName) {
    setLoad(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${catId}/subcategories`
      );
      // console.log(data.data);
      setSubCategory(data.data);
      setCatName(catName);
      setLoad(false);
      return data;
    } catch (error) {
      console.log(error);
      setLoad(false);
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
        <section className="py-5">
          <div className="w-[95%] md:w-[90%] p-10 mx-auto text-center">
            <div className="flex flex-wrap items-center">
              {category.length
                ? category.map((item, idx) => {
                    return (
                      <div
                        onClick={() => getSubCategory(item._id, item.name)}
                        key={idx}
                        className="w-full md:w-1/3 p-3"
                      >
                        <div className="inner border border-slate-200 rounded-md duration-300 hover:shadow-green-600 hover:shadow-md hover:duration-300 cursor-pointer">
                          <img
                            src={item.image}
                            className="w-full rounded-t-md h-[300px]"
                            alt=""
                          />
                          <p className="font-medium text-3xl border-t text-green-600 py-5">
                            {item.name}
                          </p>
                        </div>
                      </div>
                    );
                  })
                : " "}
            </div>
            <div className="flex flex-wrap items-center">
              {catName ? (
                <h2 className="w-full font-medium text-[32px] text-green-600 py-6">
                {catName} SubCategory
              </h2>
              ) : (
                ""
              )}
              {subCategory.length
                ? subCategory.map((item, idx) => {
                    return (
                      <div key={idx} className="w-full md:w-1/3 p-3">
                        <div className="inner border border-slate-200 rounded-md duration-300 hover:shadow-green-600 hover:shadow-md hover:duration-300">
                          <p className="font-medium text-[28px] py-5">
                            {item.name}
                          </p>
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

export default Categories;
