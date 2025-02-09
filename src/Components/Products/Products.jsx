import React, { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAllProducts from "../../Hooks/UseProducts";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function Products() {

let { addToCart } = useContext(CartContext);
  let { data, isLoading, isError, error } = useAllProducts();
    const [loading, setLoading] = useState(false);
  const [currentIdBtn, setCurrentIdBtn] = useState("");
  
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
    }
    else {
      setLoading(false);
      toast.error(response.data.message);
    }
    setLoading(false);
  }

  if (isError) {
    return (
      <h3 className="my-12 text-center text-4xl font-[600] text-red-600">
        {error.message}
      </h3>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-18 flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <div className="mt-18 grid grid-cols-12 justify-items-center gap-x-4 gap-y-12">
        {data.map((product) => (
          <div key={product.id} className="group col-span-3 px-5">
            <div className="productBorder my-main-hover">
              <Link
                to={`/productdetails/${product.id}/${product.category.name}`}
              >
                <figure className="overflow-hidden">
                  <img
                    className="w-full object-cover"
                    src={product.imageCover}
                    alt=""
                  />
                </figure>
                <div className="p-5">
                  <h3 className="text-emerald-600">{product.category.name}</h3>
                  <h3>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                  <div className="flex items-center justify-between">
                    <span>{product.price} EGP</span>
                    <span className="flex items-center gap-0.5">
                      {product.ratingsAverage}{" "}
                      <FaStar className="text-yellow-400" />
                    </span>
                  </div>
                </div>
              </Link>

              <div className="flex items-center justify-center p-3 pe-3">
                <button
                  onClick={() => AddToCart(product.id)}
                  className="btn-add-product my-2"
                >
                  {loading && currentIdBtn == product.id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    `Add To Cart`
                  )}
                </button>
                <i className="fa-regular fa-heart fa-2xl cursor-pointer"></i>
              </div>


            </div>
          </div>
        ))}
      </div>
    </>
  );
}
