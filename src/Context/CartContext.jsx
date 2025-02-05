import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
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

  return (
    <CartContext.Provider value={{ addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
