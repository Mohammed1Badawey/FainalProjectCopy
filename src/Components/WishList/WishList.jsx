import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGetUserWishList from "../../Hooks/WishListHooks/useGetUserWishList";
import { useRemoveFromWishList } from "../../Hooks/WishListHooks/useRemoveFromWishList";
import { useQueryClient } from "@tanstack/react-query";
import { useAddToCart } from "../../Hooks/CartHooks/useAddToCart";

export default function WishList() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useAddToCart();
  const { data: allWishListItems } = useGetUserWishList();
  const [currentItemId, setCurrentItemId] = useState(null);
  const { mutate: mutateRemove, isPending: pendingRemove } =
    useRemoveFromWishList();

  async function RemoveItemFromWishList(id) {
    setCurrentItemId(id);
    mutateRemove(id, {
      onSettled: () => {setCurrentItemId(null)}
    });
  }

  const handleAddToCart = (productId) => {
    setCurrentItemId(productId);
    mutate(productId, {
      onSettled: () => {setCurrentItemId(null),queryClient.invalidateQueries("cartItems");}
    });
  };

  return (
    <>
      {allWishListItems?.data?.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
            <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
              <tr>
                <th scope="col" className="px-4 py-3 md:px-6 md:py-4">
                  Image
                </th>
                <th scope="col" className="px-4 py-3 md:px-6 md:py-4">
                  Product
                </th>
                <th scope="col" className="px-4 py-3 md:px-6 md:py-4">
                  Price
                </th>
                <th scope="col" className="px-4 py-3 md:px-6 md:py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allWishListItems?.data?.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-gray-200 bg-white hover:bg-gray-50"
                >
                  <td className="px-4 py-2 md:px-6 md:py-4">
                    <img
                      src={product.imageCover}
                      className="h-16 w-16 object-cover md:h-24 md:w-24"
                      alt={product.title}
                    />
                  </td>

                  <td className="px-4 py-2 font-semibold text-gray-900 md:px-6 md:py-4">
                    <Link
                      to={`/productdetails/${product._id}/${product.category.name}`}
                    >
                      <span className="hover:underline">{product.title}</span>
                    </Link>
                  </td>

                  <td className="px-4 py-2 font-semibold text-gray-900 md:px-6 md:py-4">
                    EGP {product.price}
                  </td>

                  <td className="px-4 py-2 md:px-6 md:py-4">
                    <div className="flex flex-col gap-2">
                      <button
                        className="cursor-pointer font-medium text-emerald-600 hover:underline active:scale-93 transition-all duration-300"
                        onClick={() => handleAddToCart(product.id)}
                      >
                          <span className="">Add to cart</span>
                      </button>

                      <button
                        className="cursor-pointer font-medium text-red-600 hover:underline active:scale-93 transition-all duration-300"
                        onClick={() => RemoveItemFromWishList(product.id)}
                      >
                          <span>Remove</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-4 flex items-center justify-center rounded bg-emerald-600 bg-linear-to-r to-emerald-500 to-45% p-8">
          <h2 className="text-2xl font-[600] text-white">
            Your Wishlist is empty
          </h2>
        </div>
      )}
    </>
  );
}
