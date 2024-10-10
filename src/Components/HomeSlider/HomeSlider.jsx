import Slider from "react-slick";
import slider1 from "./../../assets/images/41nN4nvKaAL._AC_SY200_.jpg";
import slider2 from "./../../assets/images/61cSNgtEISL._AC_SY200_.jpg";
import slider3 from "./../../assets/images/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg";
import slider4 from "./../../assets/images/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg";
import slider5 from "./../../assets/images/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg";

export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <>
      <section id="homeSlider" className="pb-3">
        <div className="container p-5 text-center">
          <div className="flex flex-wrap justify-center items-centr">
            <div className="md:w-1/4 md:m-0 w-full mb-10 cursor-pointer">
              <Slider {...settings}>
                <div className=""> 
                  <img src={slider1} className="w-full" alt="Slider 1" />
                </div>
                <div className="">
                  <img src={slider2} className="w-full" alt="Slider 2" />
                </div>
                <div className="">
                  <img src={slider3} className="w-full" alt="Slider 3" />
                </div>
              </Slider>
            </div>
            <div className="md:w-1/4 w-full">
              <div>
                <img src={slider4} className="w-full" alt="Slider 4" />
              </div>
              <div>
                <img src={slider5} className="w-full" alt="Slider 5" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
