import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";


export default function RecentProducts() {

  const [allProducts, setAllProducts] = useState([]);

  function getAllProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        console.log(res.data.data);
        setAllProducts(res.data.data);
      })
      .catch(() => {});
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      {allProducts.length > 0 ? (
        <div className="grid grid-cols-10 justify-items-center gap-4 px-3 py-5 ">
          {allProducts.map((product) => (
            <div key={product.id} className="col-span-2 group">
              <div className="product">
                <figure>
                  <img className="w-full" src={product.imageCover} alt="" />
                </figure>
                <h3 className="text-emerald-600">{product.category.name}</h3>
                <h3>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                <div className="flex items-center justify-between">
                  <span>{product.price} EGP</span>
                  <span className="flex items-center gap-0.5">
                    {product.ratingsAverage}{" "}
                    <FaStar className="text-yellow-400" />
                  </span>
                </div>
              <div className="flex items-center">
              <button className="btnProduct">
                  Add To Cart
                </button>
              </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div class="flex items-center justify-center">
          <span class="loader"></span>
        </div>
      )}
    </>
  );
}
