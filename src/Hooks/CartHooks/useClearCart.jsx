import React from "react";
import { authAxios } from "../../../API/AxiosConig";
import { useMutation } from "@tanstack/react-query";

export const useClearCart = () => {
  async function clearItemsFromCart() {
    const res = await authAxios.delete(`/cart`);
    return res;
  }

  const clearCart = useMutation({
    mutationFn: clearItemsFromCart,
    onSuccess: () => {
      toast.success("Cart Cleard Successfully");
    },
    onError: (error) => {
      toast.error("Something Wrong");
      console.error(error);
    },
  });
  return clearCart;
};
