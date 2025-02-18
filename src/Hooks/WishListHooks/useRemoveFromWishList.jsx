import React from "react";
import { authAxios } from "../../../API/AxiosConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useRemoveFromWishList = () => {
  const queryClient = useQueryClient();
  async function removeFromWishList(productId) {
    const res = await authAxios.delete(`/wishlist/${productId}`);
    return res;
  }

  const removeProductFromWishList = useMutation({
    mutationFn: removeFromWishList,
    onMutate: (productId) => {
      const oldWishList =
        queryClient.getQueryData(["WishListItems"])?.data || [];
      const newWishList = oldWishList.filter(
        (product) => product.id !== productId,
      );
      queryClient.setQueryData(["WishListItems"], { data: newWishList });
      return () =>
        queryClient.setQueryData(["WishListItems"], { data: oldWishList });
    },

    onSuccess: () => {
      toast.success("Product Removed Successfully");
    },
    onError: (error) => {
      toast.error("Something wronge");
      console.warn(error);
    },
  });
  return removeProductFromWishList;
};
