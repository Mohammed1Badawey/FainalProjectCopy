import { useQuery } from "@tanstack/react-query";
import React from "react";
import { publicAxios } from "../../../API/AxiosConfig";

export default function useCategoriesSllider() {
  function getCategories() {
    return publicAxios.get(`/categories`);
  }

  let categoriesSlider = useQuery({
    queryKey: ["allCategories"],
    queryFn: getCategories,
    staleTime: Infinity,
    retry: 5,
    retryDelay: 2000,
    refetchInterval: Infinity,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    gcTime: 10000,
  });
  return categoriesSlider;
}
