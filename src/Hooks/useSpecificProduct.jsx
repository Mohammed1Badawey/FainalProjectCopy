import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { publicAxios } from "../../API/AxiosConfig";
export default function useSpecificProduct() {
  let { id } = useParams();

  async function getProduct(id) {
    const response = await publicAxios.get(`/products/${id}`);
    return response.data.data;
  }

  const queryClient = useQueryClient();
  const getCachedDataPageOne =
    queryClient.getQueryData(["products", { pageNum: 1 }]) || [];
  const getCachedDataPageTwo =
    queryClient.getQueryData(["products", { pageNum: 2 }]) || [];

  const allProducts = [
    ...(getCachedDataPageOne?.data || []),
    ...(getCachedDataPageTwo?.data || []),
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

  return { specificProduct };
}
