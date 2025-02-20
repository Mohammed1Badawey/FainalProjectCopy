import React from "react";
import { authAxios } from "../../../API/AxiosConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  async function addToCart(productId) {
    const res = await authAxios.post(`/cart`, { productId });
    return res.data;
  }
  const addProduct = useMutation({
    mutationFn: addToCart,

    onMutate: (productId) => {
      const cartData = queryClient.getQueryData(["cartItems"]);
      const oldCart = Array.isArray(cartData?.data?.products) ? cartData.data.products : [];      
      const countItems = (cartData?.numOfCartItems) ? cartData?.numOfCartItems : 0;
      const pageOneCachedData = 
        queryClient.getQueryData(["products", { "pageNum": 1 }]) || [];
      const pageTwoCachedData =
        queryClient.getQueryData(["products", { "pageNum": 2 }]) || [];
      const allProducts = [...(pageOneCachedData), ...(pageTwoCachedData)];
      const addedProduct = allProducts.find((item) => item.id === productId);
      const isProductInCart = oldCart.some((item) => item.product.id === productId);
      const newCount = isProductInCart ? countItems : countItems + 1;
      const newCart = [addedProduct, ...(oldCart)];
      queryClient.setQueryData(["cartItems"], { numOfCartItems: newCount, data: newCart });
      return () => queryClient.setQueryData(["cartItems"], { data: oldCart });
    },
    onSuccess: () => {
      toast.success("Product Added Successfully");
      queryClient.invalidateQueries(["cartItems"]);
    },
    onError: (error, variables, rollback) => {
      toast.error("Something went wrong");
      console.error(error);
      if (rollback) rollback();
    },
  });
  return addProduct;
};
