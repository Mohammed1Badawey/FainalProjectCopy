import React from "react";
import { authAxios } from "../../../API/AxiosConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRemoveFromCart } from "./useRemoveFromCart";

export const useUpdateCart = () => {
  async function RemoveItemFromCart(id) {
    setCurrentItemId(id);
    mutateRemove(id, {
      onSettled: () => {setCurrentItemId(null),queryClient.invalidateQueries("cartItems")}
    });
  }

  const queryClient = useQueryClient();
  async function updateCartItems({ productId, newCount }) {
    const res = await authAxios.put(`/cart/${productId}`, { count: newCount });
    return res;
  }

  const updateCart = useMutation({
    mutationFn: updateCartItems,
    onMutate: ({ productId, newCount }) => {
      const cartData = queryClient.getQueryData(["cartItems"]);
      const oldCartItems = cartData?.data?.products || [];
      const countItems = (cartData?.numOfCartItems) ? cartData?.numOfCartItems : 0;
        let updatedCartItems;
        const newCountItems = newCount <= 0 ? countItems - 1 : countItems; 
        if (newCount <= 0) {
          updatedCartItems = oldCartItems.filter(
            (item) => item.product.id !== productId
          );
        } else {
          updatedCartItems = oldCartItems.map((item) =>
            item.product.id === productId ? { ...item, count: newCount } : item
          );
        }

        queryClient.setQueryData(["cartItems"], { numOfCartItems: newCountItems, data: { products: updatedCartItems } });

        return { previousCartItems: oldCartItems };

    },

    onSuccess: () => {
      queryClient.invalidateQueries(["cartItems"]);
    },
    onError: (error) => {
      toast.error("Something Wrong");
      console.warn(error);
      queryClient.setQueryData(["cartItems"], {
        data: { products: context.previousCartItems },
      });
    },
  });
  return updateCart;
};
