import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import LoadingAndErrorHandler from "../LoadingAndErrorHandler/LoadingAndErrorHandler";
import useGetUserCart from "../../Hooks/CartHooks/useGetUserCart";
import { useQueryClient } from "@tanstack/react-query";
import { useRemoveFromCart } from "../../Hooks/CartHooks/useRemoveFromCart";
import { useClearCart } from "../../Hooks/CartHooks/useClearCart";
import { useUpdateCart } from "./../../Hooks/CartHooks/useUpdateCart";

export default function Cart() {
  const queryClient = useQueryClient();
  const { data: allcartItems, isLoading, error, isError } = useGetUserCart();
  const [currentItemId, setCurrentItemId] = useState(null);
  const { mutate: mutateRemove, isPending: pendingRemove } =
    useRemoveFromCart();
  const { mutate: mutateClear, isPending: pendingClear } = useClearCart();
  const { mutateAsync: mutateUpdate, isPending: pendingUpdate } =
    useUpdateCart();

  async function RemoveItemFromCart(id) {
    setCurrentItemId(id);
    mutateRemove(id, {
      onSettled: () => {
        setCurrentItemId(null), queryClient.invalidateQueries("cartItems");
      },
    });
  }

  async function ClearItemsFromCart() {
    mutateClear({
      onSettled: () => {
        setCurrentItemId(null), queryClient.invalidateQueries("cartItems");
      },
    });
  }

  async function UpdateItemsFromCart(productId, newCount) {
    setCurrentItemId(productId);
    mutateUpdate(
      { productId, newCount },
      {
        onSettled: () => {
          setCurrentItemId(null), queryClient.invalidateQueries("cartItems");
        },
      },
    );
  }

  return (
    <LoadingAndErrorHandler
      isLoading={isLoading}
      isError={isError}
      error={error}
    >
      <>
        {allcartItems?.data?.products?.length > 0 ? (
          <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
                <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                  <tr>
                    <th scope="col" className="px-2 py-3 md:px-6 md:py-4">
                      Image
                    </th>
                    <th scope="col" className="px-2 py-3 md:px-6 md:py-4">
                      Product
                    </th>
                    <th scope="col" className="px-2 py-3 md:px-6 md:py-4">
                      Qty
                    </th>
                    <th scope="col" className="px-2 py-3 md:px-6 md:py-4">
                      Price
                    </th>
                    <th scope="col" className="px-2 py-3 md:px-6 md:py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allcartItems?.data?.products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b border-gray-200 bg-white hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 md:px-6 md:py-4">
                        <img
                          src={product.product.imageCover}
                          className="h-16 w-16 object-cover md:h-24 md:w-24"
                          alt={product.product.title}
                        />
                      </td>
                      <td className="px-4 py-2 font-semibold text-gray-900 md:px-6 md:py-4">
                        <Link
                          to={`/productdetails/${product.product._id}/${product.product.category.name}`}
                        >
                          <span className="hover:underline">
                            {product.product.title}
                          </span>
                        </Link>
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-4">
                        <div className="flex items-center">
                          <button
                            className="me-2 inline-flex size-6 items-center justify-center rounded-full border border-gray-300 bg-white p-2 text-sm font-medium text-gray-500 transition-all duration-300 hover:bg-gray-100 active:scale-93"
                            type="button"
                            onClick={() =>
                              UpdateItemsFromCart(
                                product.product.id,
                                product.count - 1,
                              )
                            }
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                          <div>
                            <span>{product.count}</span>
                          </div>
                          <button
                            className="ms-2 inline-flex size-6 items-center justify-center rounded-full border border-gray-300 bg-white p-2 text-sm font-medium text-gray-500 transition-all duration-300 hover:bg-gray-100 active:scale-93"
                            type="button"
                            onClick={() =>
                              UpdateItemsFromCart(
                                product.product.id,
                                product.count + 1,
                              )
                            }
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-2 font-semibold text-gray-900 md:px-6 md:py-4">
                        EGP {product.price}
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-4">
                        <button
                          className="cursor-pointer font-medium text-red-600 transition-all duration-300 hover:underline active:scale-93"
                          onClick={() => RemoveItemFromCart(product.product.id)}
                        >
                          <span>remove</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:items-center">
                <button
                  className="btn-clear-cart w-[170px] rounded bg-red-600 px-4 py-2 text-white transition-all duration-300 hover:bg-red-700 active:scale-93 md:px-6 md:py-3"
                  onClick={ClearItemsFromCart}
                >
                  <span>Clear Cart</span>
                </button>
                <h2 className="p-4 text-center font-[900] md:text-end">
                  <span className="font-[600]">Total Price: </span>
                  {allcartItems?.data?.totalCartPrice
                    ? allcartItems.data?.totalCartPrice.toLocaleString(
                        "en-US",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        },
                      )
                    : "0.00"}{" "}
                  EGP
                </h2>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-6">
              <button className="w-[50%] max-w-[250px]">
                <Link
                  className="block w-full cursor-pointer rounded-2xl bg-emerald-600 px-6 py-3 text-white duration-500 hover:bg-emerald-700"
                  to={"/checkout"}
                >
                  Visa
                </Link>
              </button>

              <button className="w-[50%] max-w-[250px]">
                <Link
                  className="block w-full cursor-pointer rounded-2xl bg-emerald-600 px-6 py-3 text-white duration-500 hover:bg-emerald-700"
                  to={"/cashorder"}
                >
                  On Delivery
                </Link>
              </button>
            </div>
          </>
        ) : (
          <div className="mt-4 flex items-center justify-center rounded bg-emerald-600 bg-linear-to-r to-emerald-500 to-45% p-8">
            <h2 className="text-2xl font-[600] text-white">
              Your cart is empty
            </h2>
          </div>
        )}
      </>
    </LoadingAndErrorHandler>
  );
}
