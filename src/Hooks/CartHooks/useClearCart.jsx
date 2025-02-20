import React from "react";
import { authAxios } from "../../../API/AxiosConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useClearCart = () => {
  const queryClient = useQueryClient();
  async function clearItemsFromCart() {
    const res = await authAxios.delete(`/cart`);
    return res;
  }

  const clearCart = useMutation({
    mutationFn: clearItemsFromCart,
    onMutate: () => {
      const oldCartItems =
        queryClient.getQueryData(["cartItems"])?.data?.products || [];
      const updatedCartItems = [];
      queryClient.setQueryData(["cartItems"], {
        data: { products: updatedCartItems },
      });
      return { previousCartItems: oldCartItems };
     
    },
    onSuccess: (res) => {
      toast.success("Cart Cleared Successfully");
      queryClient.invalidateQueries(["cartItems"]);      
    },
    onError: (error) => {
      toast.error("Something Wrong");
      console.error(error);
    },
  });
  return clearCart;
};

