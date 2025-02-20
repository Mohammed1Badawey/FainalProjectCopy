import React from "react";
import { authAxios } from "../../../API/AxiosConfig";
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
      const cartData = queryClient.getQueryData(["cartItems"]);
      const oldCart = Array.isArray(cartData?.data?.products) ? cartData.data.products : [];      
      const countItems = (cartData?.numOfCartItems) ? cartData?.numOfCartItems : 0;
      const newCart = oldCart.filter(
        (product) => product.product._id !== productId,
      );
      const newCount = countItems > 0 ? countItems - 1 : 0;
      queryClient.setQueryData(["cartItems"], { numOfCartItems: newCount, data: {products: newCart} });
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
