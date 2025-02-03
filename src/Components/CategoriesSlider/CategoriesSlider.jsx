import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [allCategories, setAllCategories] = useState([]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 7,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    slidesToScroll: 1,
    accessibility: true,
    autoplay: true,
  };
  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        console.log(res.data.data);
        setAllCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
    <h2 className="font-[400] text-3xl my-2"> Shop Popular Categories </h2>
      <Slider {...settings}>
        {allCategories.map((category) => {
          return (
            <div className="mt-4 mb-10">
              <figure className="">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-[200px] w-full object-cover"
                />
              </figure>
              <h4 className="ps-2 pt-1 font-[500]">{category.name}</h4>
            </div>
          );
        })}
      </Slider>
    </>
  );
}
