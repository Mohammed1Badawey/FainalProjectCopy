import React, { createContext, useContext } from "react";
import toast from "react-hot-toast";
import { authAxios } from "../../API/AxiosConfig";
import { useQueryClient } from "@tanstack/react-query";

export const ordersContext = createContext();

export default function OrdersContextProvider({ children }) {
  const queryClient = useQueryClient();
  async function checkoutCart(userCartId, url, formData) {
    try {
      const res = await authAxios.post(
        `/orders/checkout-session/${userCartId}?url=${url}`,
        { shippingAddress: formData },
      );
      queryClient.invalidateQueries("cartItems");
      return res;
    } catch (err) {
      return err;
    }
  }

  async function cashOrderCart(cartId, formData) {
    try {
      const res = await authAxios.post(`/orders/${cartId}`, {
        shippingAddress: formData,
      });
      toast.success(res.data.status);
      queryClient.invalidateQueries("cartItems");
      return res;
    } catch (err) {
      return err;
    }
  }

  return (
    <ordersContext.Provider value={{ checkoutCart, cashOrderCart }}>
      {children}
    </ordersContext.Provider>
  );
}
