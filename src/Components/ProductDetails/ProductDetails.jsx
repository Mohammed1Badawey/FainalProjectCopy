import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegHeart, FaStar } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  let { id } = useParams();
  function getProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        console.log(res);

        setProduct(res.data.data);
      })
      .catch((err) => {
        console.log(res);
      });
  }

  useEffect(() => {
    getProduct(id);
  }, []);
  return (
    <>
      <div className="grid grid-cols-12 items-center gap-5">
        <section className="col-span-3 col-start-2">
          <div>
            <figure>
              <img src={product?.imageCover} className="w-full" alt="" />
            </figure>
          </div>
        </section>
        <section className="col-span-6 col-start-5">
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-[600] text-black">{product?.title}</h3>
            <p className="text-gray-600">{product?.description}</p>
            <h6 className="font-[400] text-emerald-600">
              {product?.category.name}
            </h6>
            <div className="flex items-center justify-between">
              <span className="font-[500]">{product?.price} EGP</span>
              <span className="flex items-center gap-0.5">
                {product?.ratingsAverage} <FaStar className="text-yellow-400" />
              </span>
            </div>
          </div>
          <div className="flex justify-evenly py-8 px-4">
            <button className="btnProduct">
              Add To Cart <TiShoppingCart className="inline" />
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
