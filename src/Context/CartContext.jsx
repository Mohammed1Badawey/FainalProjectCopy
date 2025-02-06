import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [numCart, setNumCart] = useState(0);

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: productId },
        { headers },
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function getUserCart(productId) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => {
        setNumCart(res.data.numOfCartItems);
        return res;
      })
      .catch((err) => err);
  }

  function updateCartQuantity(productId, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
        { headers },
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function removeItemFromCart(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getUserCart,
        updateCartQuantity,
        removeItemFromCart,
        setNumCart,
        numCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
