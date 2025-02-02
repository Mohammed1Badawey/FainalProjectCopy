import axios from "axios";
import React, { useEffect, useState } from "react";
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
      <div className="grid grid-cols-12 items-end justify-items-start">
        <section className="col-span-2 col-start-2">
          <div>
            <figure>
              <img src={product?.imageCover} className="w-full" alt="" />
            </figure>
          </div>
        </section>
        <section className="col-span-8 col-start-4">
          <div>
            <h3>{product?.title}</h3>
            <p>{product?.description}</p>
          </div>
        </section>
      </div>
    </>
  );
}
