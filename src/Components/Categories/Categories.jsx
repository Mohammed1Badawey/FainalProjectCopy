import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";

export default function Categories() {
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

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-10 col-start-3 col-end-11 grid grid-cols-12 gap-9">
          {data?.data?.data.map((category) => {
            return (
              <div key={category.name} className="col-span-4">
                <figure className="">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-[400px] w-full object-cover"
                  />
                </figure>
                <h4 className="ps-2 pt-2 text-center font-[600]">
                  {category.name}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
