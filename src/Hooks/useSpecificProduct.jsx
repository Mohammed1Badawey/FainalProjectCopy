import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { publicAxios } from "../../API/AxiosConig";
import Products from './../Components/Products/Products';
export default function useSpecificProduct() {
  let { id } = useParams();

  async function getProduct(id) {
    const response = await publicAxios.get(`/products/${id}`);
    return response.data.data }

  const queryClient = useQueryClient();
  const getCachedData = queryClient.getQueryData(["allProducts", { "pageNum": 1 }]);
  const filteredProducts = queryClient.getQueryData(["allProducts"]);

  const allProducts = [
    ...(getCachedData?.data || []),
    ...(filteredProducts?.data || [])
  ];

  let cachedProduct = allProducts?.find((product) => product.id == id);
  

  let specificProduct = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    staleTime: 30000,
    retry: 5,
    retryDelay: 3000,
    refetchInterval: 20000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    gcTime: 20000,
    enabled: !cachedProduct,
    select: (productData) => productData,
    initialData: cachedProduct,
  });

  return {specificProduct};
}
