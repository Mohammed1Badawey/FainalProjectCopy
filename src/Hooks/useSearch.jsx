import { useMemo } from "react";
import useAllProducts from "./useAllProducts";

export default function useSearch(SearchInputText,selectedCategory) {
const {data:filteredProducts} = useAllProducts(selectedCategory);  

  const filteredBySearchProducts = useMemo(() => {
    if (!SearchInputText) return filteredProducts || [];
    return filteredProducts?.filter((product) =>
      product.slug.toLowerCase().includes(SearchInputText.toLowerCase())
    ) || [];
  }, [SearchInputText, filteredProducts]);
  return { data: filteredBySearchProducts };
}