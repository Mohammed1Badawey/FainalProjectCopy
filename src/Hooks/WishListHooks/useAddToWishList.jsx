import React from "react";
import { authAxios } from "../../../API/AxiosConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAddToWishList = () => {
  const queryClient = useQueryClient();

  async function addToWishList(productId) {
    const res = await authAxios.post(`/wishlist`, { productId });
    return res.data;
  }

  const addProductToWishList = useMutation({
    mutationFn: addToWishList,
    onMutate: async (productId) => {
      const wishListData = await queryClient.getQueryData(["WishListItems"]);
      const oldWishList = Array.isArray(wishListData?.data)
        ? wishListData.data
        : [];
      const pageOneCachedData =
        queryClient.getQueryData(["products", { pageNum: 1 }]) || [];
      const pageTwoCachedData =
        queryClient.getQueryData(["products", { pageNum: 2 }]) || [];
      const allProducts = [...pageOneCachedData, ...pageTwoCachedData];
      const productWished = allProducts.find((item) => item.id === productId);
      const newWishList = [productWished, ...oldWishList];

      queryClient.setQueryData(["WishListItems"], { data: newWishList });
      return () =>
        queryClient.setQueryData(["WishListItems"], { data: oldWishList });
    },

    onSuccess: () => {
      toast.success("Product Added Successfully to Wishlist");
    },
    onError: (error) => {
      toast.error("Something wronge");
      console.warn(error);
    },
  });

  return addProductToWishList;
};
