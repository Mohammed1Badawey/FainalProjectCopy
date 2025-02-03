import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);
  let { id, category } = useParams();

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: true,
    autoplay: true,
    arrows: false,
  };

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

  function getAllProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let Related = res.data.data.filter(
          (product) => product.category.name == category,
        );
        setRelatedProduct(Related);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  useEffect(() => {
    getProduct(id);
    getAllProducts();
  }, [id, category]);
  return (
    <>
      <div className="grid grid-cols-12 items-center gap-5">
        <section className="col-span-3 col-start-2">
          <div>
            <figure>
              <Slider {...settings}>
                {product?.images.map((src) => (
                  <img src={src} className="w-full" alt="" />
                ))}
              </Slider>
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
          <div className="flex justify-evenly px-4 py-8">
            <button className="btnProduct">
              Add To Cart <TiShoppingCart className="inline" />
            </button>
          </div>
        </section>
        <section className="col-span-10 col-start-2">
          {relatedProduct.length > 0 ? (
            <div className="grid grid-cols-12 justify-items-center gap-x-6 gap-y-6 px-3 py-5">
              {relatedProduct.map((product) => (
                <div key={product.id} className="group col-span-3 px-5">
                  <div className="product productBorder px-1">
                    <Link
                      to={`/productdetails/${product.id}/${product.category.name}`}
                    >
                      <figure className="overflow-hidden">
                        <img
                          className="w-full"
                          src={product.imageCover}
                          alt=""
                        />
                      </figure>
                      <div className="p-5">
                        <h3 className="text-emerald-600">
                          {product.category.name}
                        </h3>
                        <h3>
                          {product.title.split(" ").slice(0, 2).join(" ")}
                        </h3>
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
                      <div className="btnCart flex justify-center pe-3">
                        <button className="btnProduct my-2">
                          Add To Cart <TiShoppingCart className="inline" />
                        </button>
                        <i class="fa-regular fa-heart fa-2xl"></i>
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
        </section>
      </div>
    </>
  );
}
