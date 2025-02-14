import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { authAxios } from "../../API/AxiosConig";

export let WishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const [numWishList, setNumWishList] = useState(0);
  const [wishlistdetails, setWishlistDetails] = useState(null);

  async function addToWishList(productId) {

    try {
        const res = await authAxios.post(`/wishlist`,{ productId })
        setNumWishList(res.data.count);
        return res;
      }
      catch(err) { return err }
  }

  async function removeItemFromWishList(productId) {
    try {
        const res = await authAxios.delete(`/wishlist/${productId}`)
        setNumWishList(res.data.count);
        return res;
      }
      catch(err) { return err }
  }

  async function getUserWishList() {

    try {
        const res = await authAxios.get(`/wishlist`)
        setNumWishList(res.data.count);
        setWishlistDetails(res.data.data);
        return res;
      }
      catch(err) { return err }
  }
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getUserWishList();
    }
  }, []);

  return (
    <WishListContext.Provider
      value={{
        addToWishList,
        getUserWishList,
        removeItemFromWishList,
        setNumWishList,
        numWishList,
        wishlistdetails,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
