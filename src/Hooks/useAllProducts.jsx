import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo } from "react";
import { publicAxios } from "../../API/AxiosConfig";

export default function useAllProducts(selectedCategory, pageNum,SearchInputText) {
  async function getAllProducts(pageNum) {
    const res = await publicAxios.get(`/products`, {
      params: { page: pageNum },
    });
    return res.data.data;
  }

  const queryClient = useQueryClient();

  useEffect(() => {
    if (pageNum == 1 && isStale) {
      const nextPage = pageNum + 1;
      queryClient.prefetchQuery({
        queryKey: ["products", { pageNum: nextPage }],
        queryFn: () => getAllProducts(nextPage),
      });
    } else {
      return;
    }
  }, [pageNum, queryClient]);

  let {
    data: products,
    isLoading,
    isError,
    error,
    isStale,
  } = useQuery({
    queryKey: ["products", { pageNum }],
    queryFn: () => getAllProducts(pageNum),
    staleTime: 30 * 1000 * 60,
    retry: 3,
    retryDelay: 3000,
  });

  let allProducts;

if (selectedCategory||SearchInputText) {
  const pageOneCachedData =
  queryClient.getQueryData(["products", { pageNum: 1 }]) || [];
  const pageTwoCachedData =
  queryClient.getQueryData(["products", { pageNum: 2 }]) || [];
  allProducts = [...pageOneCachedData, ...pageTwoCachedData];
} else {

  allProducts = products;

};

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return allProducts || [];
    return (
      allProducts?.filter(
        (product) => product.category.slug === selectedCategory,
      ) || []
    );
  }, [selectedCategory, allProducts, pageNum]);
  return { data: filteredProducts, isLoading, isError, error };
}
