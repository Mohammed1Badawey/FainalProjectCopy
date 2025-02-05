import React from "react";
import { FaStar } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";
import useAllProducts from "../../Hooks/UseProducts";

export default function Products() {
  let { data, isLoading, isError, error } = useAllProducts();

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

              <div>
                <div className="flex items-center justify-center p-3 pe-3">
                  <button className="btn-add-product my-2">
                    Add To Cart <TiShoppingCart className="inline" />
                  </button>
                  <i className="fa-regular cursor-pointer fa-heart fa-2xl"></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
