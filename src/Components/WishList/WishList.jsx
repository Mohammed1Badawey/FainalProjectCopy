import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/WishListContext";
import { CartContext } from "../../Context/CartContext";

export default function WishList() {
  let { getUserWishList, removeItemFromWishList } = useContext(WishListContext);
  const [wishlistdetails, setWishlistDetails] = useState(null);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [currentIdQty, setCurrentIdQty] = useState("");
  let { addToCart } = useContext(CartContext);
    const [currentIdBtn, setCurrentIdBtn] = useState("");
    const [loading, setLoading] = useState(false);
  

  async function GetUserWishList() {
    setLoadingWishlist(true);
    let response = await getUserWishList();
    console.log(response);

    if (response.data.status == "success") {
      setWishlistDetails(response.data.data);
      setLoadingWishlist(false);
    } else {
      setLoadingWishlist(false);
      return (
        <h3 className="my-12 text-center text-4xl font-[600] text-red-600">
          Something wronge
        </h3>
      );
    }
  }

  async function RemoveItemFromWishList(id) {
    setCurrentIdQty(id);
    setLoadingRemove(true);
    let response = await removeItemFromWishList(id);
    console.log(response);

    if (response.data.status == "success") {
      await getUserWishList();
      toast.success(response.data.message);
      setWishlistDetails((prevWishlist) =>
        prevWishlist.filter((item) => item.id !== id)
      );
      setLoadingRemove(false);
    } else {
      toast.error("Something wronge");
      setLoadingRemove(false);
    }
  }

  async function AddToCart(id) {
    setCurrentIdBtn(id);
    setLoading(true);
    let response = await addToCart(id);
    if (response?.data?.status == "success") {
      setLoading(false);
      toast.success(response.data.message, {
        duration: 2000,
        position: "top-center",
      });
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(response.data.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    GetUserWishList();
  }, []);

  return (
    <>
      {loadingWishlist ? (
        <div className="mt-18 flex items-center justify-center">
          <span className="loader"></span>
        </div>
      ) : wishlistdetails?.length > 0 ? (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
              <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {wishlistdetails?.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b border-gray-200 bg-white hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">
                      <img
                        src={product.imageCover}
                        className="max-h-full w-16 max-w-full md:w-32"
                        alt={product.title}
                      />
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {product.title}
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-900">
                      EGP {product.price}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <button
                          className="cursor-pointer font-medium text-emerald-600 hover:underline"
                          onClick={() => {
                            AddToCart(product.id);
                          }}
                        >
                          <div>
                            {loading && currentIdBtn == product.id ? (
                              <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                              <span>Add to cart</span>
                            )}
                          </div>
                        </button>

                        <button
                          className="cursor-pointer font-medium text-red-600 hover:underline"
                          onClick={() => {
                            RemoveItemFromWishList(product.id);
                          }}
                        >
                          <div>
                            {loadingRemove && currentIdQty == product.id ? (
                              <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                              <span>remove</span>
                            )}
                          </div>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="mt-4 flex justify-center rounded bg-emerald-600 bg-linear-to-r to-emerald-500 to-45% p-8">
          <h2 className="text-2xl font-[600]">Your Wishlist is empty</h2>
        </div>
      )}
    </>
  );
}
