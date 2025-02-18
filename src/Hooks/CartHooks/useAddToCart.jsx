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
      const oldCart = Array.isArray(cartData?.data) ? cartData.data : [];

      const pageOneCachedData =
        queryClient.getQueryData(["products", { pageNum: 1 }]) || [];
      const pageTwoCachedData =
        queryClient.getQueryData(["products", { pageNum: 2 }]) || [];
      const allProducts = [...pageOneCachedData, ...pageTwoCachedData];
      const addedProduct = allProducts.find((item) => item.id === productId);
      const newCart = [addedProduct, ...oldCart];
      queryClient.setQueryData(["cartItems"], { data: newCart });
      return () => queryClient.setQueryData(["cartItems"], { data: oldCart });
    },

    onSuccess: () => {
      toast.success("Product Added Successfully");
    },
    onError: (error) => {
      toast.error("Something Wrong");
      console.error(error);
    },
  });
  return addProduct;
};
