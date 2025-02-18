import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { publicAxios } from "../../API/AxiosConig";

export default function useSearch(SearchInputText) {
  const queryClient = useQueryClient();

  let getCachedData = queryClient.getQueryData(["allProducts"]);

  async function getSearchProducts() {
    const res = await publicAxios.get(`/products`);
    return res.data.data;
  }

  const { data: allProducts, isLoading, isError, error } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getSearchProducts,
    staleTime: 10 * 1000 * 60, 
    retry: 3,
    retryDelay: 3000,
    enabled: !getCachedData, 
    initialData: getCachedData,
  });

  const filteredBySearchProducts = useMemo(() => {
    if (!SearchInputText) return allProducts || [];
    return allProducts?.filter((product) =>
      product.slug.toLowerCase().includes(SearchInputText.toLowerCase())
    ) || [];
  }, [SearchInputText, allProducts]);

  return { data: filteredBySearchProducts, isLoading, isError, error };
}
