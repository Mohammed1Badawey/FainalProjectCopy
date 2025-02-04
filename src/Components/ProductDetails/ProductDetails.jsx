import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";

export default function ProductDetails() {
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
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

  function getAllProducts() {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      }

    let {data: productData , isLoading: productLoading  , isError: productIsError , error: productError} = useQuery({
      queryKey : ["product" , id],
      queryFn: () => getProduct(id),
      staleTime: 30000,
      retry: 5,
      retryDelay: 3000,
      refetchInterval: 20000,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      gcTime: 20000,
      select: (productData) => productData.data.data,
    });


    
    
    let {data: AllProductsData , isLoading: AllProductsLoading  , isError: AllProductsIsError , error: AllProductsError} = useQuery({
      queryKey : ["allProducts"],
      queryFn: () => getAllProducts(),
      staleTime: 30000,
      retry: 5,
      retryDelay: 3000,
      refetchInterval: 20000,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      gcTime: 20000,
    });

  useEffect(() => {
    let Related = AllProductsData?.data?.data.filter(
      (product) => product.category.name == category,
    );
    setRelatedProduct(Related);    
  }, [AllProductsData]);

  return (
    <>
      <div className="grid grid-cols-12 items-center gap-5">
        
        
        <section className="col-span-3 col-start-2">
          <div>
            <figure>
              <Slider {...settings}>
                {productData?.images.map((src) => (
                  <img key={productData?.id} src={src} className="w-full" alt="" />
                ))}
              </Slider>
            </figure>
          </div>
        </section>

        <section className="col-span-6 col-start-5">
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-[600] text-black">{productData?.title}</h3>
            <p className="text-gray-600">{productData?.description}</p>
            <h6 className="font-[400] text-emerald-600">
              {productData?.category.name}
            </h6>
            <div className="flex items-center justify-between">
              <span className="font-[500]">{productData?.price} EGP</span>
              <span className="flex items-center gap-0.5">
                {productData?.ratingsAverage} <FaStar className="text-yellow-400" />
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
            <div className="grid grid-cols-12 justify-items-center gap-x-6 gap-y-6 px-3 py-5">
              {relatedProduct?.map((product) => (
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
        </section>

      </div>
    </>
  );
}
