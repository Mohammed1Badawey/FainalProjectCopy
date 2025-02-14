import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { authAxios } from "../../API/AxiosConig";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [numCart, setNumCart] = useState(0);
  const [cartId, setCartId] = useState(0);

  async function addToCart(productId) {

    try {
        const res = await authAxios.post(`/cart`, {productId})
        setNumCart(res.data.numOfCartItems);
        return res;
      }
      catch(err) { return err }
  }

  async function getUserCart() {

    try {
        const res = await authAxios.get(`/cart`)
        setNumCart(res.data.numOfCartItems);
        setCartId(res.data.cartId);
        return res;
      }
      catch(err) { return err }
  }

  async function updateCartQuantity(productId, newCount) {
    try {
        const res = await authAxios.put(`/cart/${productId}`, { count: newCount })
        setNumCart(res.data.numOfCartItems);
        return res;
      }
      catch(err) { return err }
  }

  async function removeItemFromCart(productId) {
    try {
        const res = await authAxios.delete(`/cart/${productId}`)
        setNumCart(res.data.numOfCartItems);
        return res;
      }
      catch(err) { return err }
  }

  async function clearItemsFromCart() {
    try {
        const res = await authAxios.delete(`/cart`)
        setNumCart(res.data.numOfCartItems);
        return res;
      }
      catch(err) { return err }
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getUserCart();
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getUserCart,
        updateCartQuantity,
        removeItemFromCart,
        setNumCart,
        numCart,
        cartId,
        clearItemsFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
