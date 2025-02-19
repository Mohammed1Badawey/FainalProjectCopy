import React from "react";
import { authAxios } from "../../../API/AxiosConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  async function updateCartItems({ productId, newCount }) {
    const res = await authAxios.put(`/cart/${productId}`, { count: newCount });
    return res;
  }

  const updateCart = useMutation({
    mutationFn: updateCartItems,
    onMutate: ({ productId, newCount })=> {
      const oldCartItems = queryClient.getQueryData(["cartItems"])?.data?.products || [];
      const updatedCartItems = oldCartItems.map((item) => {
        if (item.product.id === productId) {
          item.count = newCount;
          return item;
        } else {
          return item; }
      });
      queryClient.setQueryData(["cartItems"], {
        data: { products: updatedCartItems },
      });
    },

    onSuccess: (res) => {
      toast.success("Product Updated Successfully");
    },
    onError: (error) => {
      toast.error("Something Wrong");
      console.error(error);
    },
  });
  return updateCart;
};
