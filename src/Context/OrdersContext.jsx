import React, { createContext, useContext } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";
import toast from "react-hot-toast";
import { authAxios } from "../../API/AxiosConig";
export const ordersContext = createContext();

export default function OrdersContextProvider({ children }) {
  let { setNumCart } = useContext(CartContext);


  async function checkoutCart(cartId, url, formData) {
    try {
        const res = await authAxios.post(`/orders/checkout-session/${cartId}?url=${url}`, {shippingAddress: formData})
        setNumCart(res.data.numOfCartItems);
        return res;
      }
      catch(err) { return err }
  }

  async function cashOrderCart(cartId, formData) {
    try {
        const res = await authAxios.post(`/orders/${cartId}`, {shippingAddress: formData})
        toast.success(res.data.status);
        setNumCart(0);
        return res;
      }
      catch(err) { return err }
  }

  return (
    <ordersContext.Provider value={{ checkoutCart, cashOrderCart }}>
      {children}
    </ordersContext.Provider>
  );
}
