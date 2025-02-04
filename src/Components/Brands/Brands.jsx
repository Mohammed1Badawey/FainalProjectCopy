import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function Brands() {
  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let { data, isError, isLoading, isFetching, error } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    staleTime: Infinity,
    retry: 5,
    retryDelay: 3000,
    refetchInterval: 20000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    gcTime: 10000,
    select: (data) => data.data.data,
  });

  if (isError) {
    return (
      <h3 className="my-12 text-center text-4xl font-[600] text-red-600">
        {error.message}
      </h3>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-18 flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <div className="mt-18 grid grid-cols-12 justify-items-center gap-x-4 gap-y-12">
        {data?.map((brand) => (
          <div key={brand._id} className="group col-span-3 px-5">
            <div className="product productBorder">
              <figure className="overflow-hidden">
                <img className="w-full object-cover" src={brand.image} alt="" />
              </figure>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
