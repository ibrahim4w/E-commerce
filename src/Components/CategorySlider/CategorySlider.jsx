import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Slider from "react-slick";

function CategorySlider() {
  async function getAllCategory() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data } = useQuery({
    queryKey: ["categorySlider"],
    queryFn: getAllCategory,
  });
  //   console.log(data);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    swipe: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <section className="py-2">
        <Slider {...settings} className="mb-14">
          {data?.data.data.map((item, idx) => {
            return (
              <div key={idx}>
                <img src={item.image} className="w-full h-[250px]" alt="" />
                <h3 className="font-medium text-[28px] text-nowrap">
                  {item.name}
                </h3>
              </div>
            );
          })}
        </Slider>
      </section>
    </>
  );
}

export default CategorySlider;
