import { useQuery } from "@tanstack/react-query";
import React from "react";
import { publicAxios } from "../../API/AxiosConig";

export default function useBrands() {
  function getBrands() {
    return publicAxios.get(`/brands`);
  }

  let allBrands = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    staleTime: Infinity,
    retry: 5,
    retryDelay: 3000,
    refetchInterval: Infinity,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    gcTime: 30000,
    select: (data) => data.data.data,
  });

  return allBrands;
}
