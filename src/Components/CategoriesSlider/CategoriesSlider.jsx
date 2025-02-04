import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";

export default function CategoriesSlider() {
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { data, isError, isLoading, isFetching, error } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getCategories,
    staleTime: 30000,
    retry: 5,
    retryDelay: 3000,
    refetchInterval: 20000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    gcTime: 10000,
  });
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

  return (
    <>
      <h2 className="my-2 text-3xl font-[400]"> Shop Popular Categories </h2>
      <Slider {...settings}>
        {data?.data?.data.map((category) => {
          return (
            <div key={category.name} className="mt-4 mb-10">
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
