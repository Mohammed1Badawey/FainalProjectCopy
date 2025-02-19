import React from "react";
import { authAxios } from "../../../API/AxiosConfig";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateCart = () => {
  async function updateCartItems({ productId, newCount }) {
    const res = await authAxios.put(`/cart/${productId}`, { count: newCount });
    return res;
  }

  const updateCart = useMutation({
    mutationFn: updateCartItems,
    onSuccess: () => {
      toast.success("Product Updated Successfully");
    },
    onError: (error) => {
      toast.error("Something Wrong");
      console.error(error);
    },
  });
  return updateCart;
};
