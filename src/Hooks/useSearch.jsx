import {  useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

export default function useSearch(SearchInputText) {
  const queryClient = useQueryClient();

  
  const getCachedPageOneProducts = queryClient.getQueryData([
    "products",
    { pageNum: 1 },
  ]) || [];
  const getCachedPageTwoProducts = queryClient.getQueryData([
    "products",
    { pageNum: 2 },
  ]) || [];


  const allProducts = [...(getCachedPageOneProducts) , ...(getCachedPageTwoProducts) ] || [];



  const filteredBySearchProducts = useMemo(() => {
    if (!SearchInputText) return allProducts || [];
    return allProducts?.filter((product) =>
      product.slug.toLowerCase().includes(SearchInputText.toLowerCase())
    ) || [];
  }, [SearchInputText, allProducts]);

  return { data: filteredBySearchProducts };
}
