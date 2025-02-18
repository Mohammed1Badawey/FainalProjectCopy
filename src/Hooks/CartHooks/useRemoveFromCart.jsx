import React from "react";
import { authAxios } from "../../../API/AxiosConig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  async function removeFromCart(productId) {
    const res = await authAxios.delete(`/cart/${productId}`);
    return res;
  }
  const removeProduct = useMutation({
    mutationFn: removeFromCart,

    onMutate: (productId) => {
      const oldCart =
        queryClient.getQueryData(["cartItems"])?.data?.products || [];
      const newCart = oldCart.filter(
        (product) => product.product._id !== productId,
      );
      queryClient.setQueryData(["cartItems"], { data: { products: newCart } });
      return () =>
        queryClient.setQueryData(["cartItems"], {
          data: { products: oldCart },
        });
    },

    onSuccess: (res) => {
      toast.success("Product Removed Successfully");
    },
    onError: (error) => {
      toast.error("Something Wrong");
      console.error(error);
    },
  });
  return removeProduct;
};
