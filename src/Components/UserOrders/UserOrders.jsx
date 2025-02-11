import React from "react";
import useUserOrders from "../../Hooks/useUserOrders";
import LoadingAndErrorHandler from "../LoadingAndErrorHandler/LoadingAndErrorHandler";

export default function UserOrders() {
  let { data: orders, isLoading, isError, error } = useUserOrders();

  if (isLoading || !orders) {
    return <LoadingAndErrorHandler isLoading={isLoading} isError={isError} error={error} />;
  }

  if (orders.length === 0) {
    return <div className="text-center text-gray-500">No orders found.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="border p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-semibold">Order ID: {order._id}</p>
                <p className="text-sm text-gray-500">Placed on: {new Date(order.createdAt).toLocaleDateString("en-EG")}</p>
              </div>
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.isPaid ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Not Paid"}
                </span>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-4">
              <h2 className="font-[700] mb-2 text-lg">Shipping Address</h2>
              <p> <span className="font-[600]">details: </span> {order.shippingAddress.details}</p>
              <p> <span className="font-[600]">city: </span> {order.shippingAddress.city}</p>
              <p> <span className="font-[600]">Phone: </span> {order.shippingAddress.phone}</p>
            </div>

            {/* Cart Items */}
            <div className="mb-4">
              <h2 className="font-[600] mb-2">Items</h2>
              <div className="space-y-2">
                {order.cartItems.map((item) => (
                  <div key={item._id} className="flex items-center">
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />
                    <div>
                      <p className="font-[500]">{item.product.title}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.count}</p>
                      <p className="text-sm">{item.price.toFixed(2)} EGP</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4">
              <h2 className="font-[600] mb-2">Order Summary</h2>
              <div className="flex justify-between ">

                <p className="text-xl font[700]">Total:</p>
                <p className="text-xl font[700]"> {order.totalOrderPrice.toFixed(2)} EGP</p>

              </div>
              <div className="flex justify-between">
                <p>Tax:</p>
                <p>{order.taxPrice.toFixed(2)} EGP</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping:</p>
                <p>{order.shippingPrice.toFixed(2)} EGP</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}