import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";

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
        <div className="grid grid-cols-10 justify-items-center gap-x-4 gap-y-6 px-3 py-5">
          {allProducts.map((product) => (
            <div key={product.id} className="group col-span-2">
              <div className="product productBorder">
                <Link to={`productdetails/${product.id}`}>
                  <figure className="overflow-hidden">
                    <img className="w-full" src={product.imageCover} alt="" />
                  </figure>
                  <div className="p-2">
                    <h3 className="text-emerald-600">
                      {product.category.name}
                    </h3>
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
                  <div className="btnCart flex justify-evenly">
                    <button className="btnProduct my-2">
                      Add To Cart <TiShoppingCart className="inline" />
                    </button>
                    <FaRegHeart className="" />
                  </div>
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
