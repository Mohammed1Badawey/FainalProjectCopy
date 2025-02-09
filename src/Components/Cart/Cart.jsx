import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  let {
    getUserCart,
    updateCartQuantity,
    removeItemFromCart,
    clearItemsFromCart,
  } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [loadingQty, setLoadingQty] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const [currentIdQty, setCurrentIdQty] = useState("");
  const [loading, setLoading] = useState(false);

  async function GetUserCart(id) {
    setLoadingCart(true);
    let response = await getUserCart(id);
    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      setLoadingCart(false);
    } else {
      setLoadingCart(false);
      return (
        <h3 className="my-12 text-center text-4xl font-[600] text-red-600">
          Something wronge
        </h3>
      );
    }
  }

  async function UpdateCartQuantity(id, count) {
    setCurrentIdQty(id);
    setLoadingQty(true);
    let response = await updateCartQuantity(id, count);
    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      toast.success("Product Updated Successfully");
      setLoadingQty(false);
    } else {
      toast.error("Something wronge");
      setLoadingQty(false);
    }
  }

  async function RemoveItemFromCart(id) {
    let response = await removeItemFromCart(id);
    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      toast.success("Product Removed Successfully");
    } else {
      toast.error("Something wronge");
    }
  }

  async function ClearItemsFromCart() {
    let response = await clearItemsFromCart();
    if (response.data.message == "success") {
      setCartDetails(null);
      toast.success("Products Removed Successfully");
    } else {
      toast.error("Something wronge");
    }
  }

  useEffect(() => {
    GetUserCart();
  }, []);

  return (
    <>
      {loadingCart ? (
        <div className="mt-18 flex items-center justify-center">
          <span className="loader"></span>
        </div>
      ) : cartDetails?.products.length > 0 ? (
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
                    Qty
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
                {cartDetails?.products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b border-gray-200 bg-white hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">
                      <img
                        src={product.product.imageCover}
                        className="max-h-full w-16 max-w-full md:w-32"
                        alt={product.product.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          className="me-3 inline-flex size-6 items-center justify-center rounded-full border border-gray-300 bg-white p-3 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none"
                          type="button"
                          onClick={() => {
                            UpdateCartQuantity(
                              product.product.id,
                              product.count - 1,
                            );
                          }}
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <div>
                          {loadingQty && currentIdQty == product.product.id ? (
                            <i className="fas fa-spinner fa-spin"></i>
                          ) : (
                            <span>{product.count}</span>
                          )}
                        </div>
                        <button
                          className="ms-3 inline-flex size-6 items-center justify-center rounded-full border border-gray-300 bg-white p-3 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none"
                          type="button"
                          onClick={() => {
                            UpdateCartQuantity(
                              product.product.id,
                              product.count + 1,
                            );
                          }}
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      EGP {product.price}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="cursor-pointer font-medium text-red-600 hover:underline"
                        onClick={() => {
                          RemoveItemFromCart(product.product.id);
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between">
              <button
                className="btn-clear-cart"
                onClick={() => {
                  ClearItemsFromCart();
                }}
              >
                {" "}
                Clear Cart
              </button>
              <h2 className="p-8 text-end font-[900]">
                <span className="font-[600]">Total Price: </span>
                {cartDetails?.totalCartPrice
                  ? cartDetails.totalCartPrice.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "0.00"}{" "}
                EGP
              </h2>
            </div>
          </div>

          <div className="">
            <Link to={"/checkout"}>
              <button
                className="btn-specific-product"
                // onClick={}
              >
                {/* {loading && currentIdBtn == productData.id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    `Add To Cart`
                    )} */}
                CheckOut
              </button>
            </Link>
          </div>
        </>
      ) : (
        <div className="mt-4 flex justify-center rounded bg-emerald-600 bg-linear-to-r to-emerald-500 to-45% p-8">
          <h2 className="text-2xl font-[600]">Your cart is empty</h2>
        </div>
      )}
    </>
  );
}
