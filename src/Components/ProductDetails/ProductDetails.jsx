import React, { useContext, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import useSpecificProduct from "../../Hooks/useSpecificProduct";
import useAllProducts from "../../Hooks/UseProducts";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  let { id, category } = useParams();
  const [loading, setLoading] = useState(false);

  let { addToCart } = useContext(CartContext);

  const [currentIdBtn, setCurrentIdBtn] = useState("");

  async function AddToCart(id) {
    setCurrentIdBtn(id);
    setLoading(true);
    let response = await addToCart(id);
    if (response.data.status == "success") {
      toast.success(response.data.message, {
        duration: 2000,
        position: "top-center",
      });
      setLoading(false);
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
    setLoading(false);
  }

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

  let {
    data: productData,
    isLoading: productLoading,
    isError: productIsError,
    error: productError,
  } = useSpecificProduct();

  let {
    data: AllProductsData,
    isLoading: AllProductsLoading,
    isError: AllProductsIsError,
    error: AllProductsError,
  } = useAllProducts();

  const filteredProducts = AllProductsData?.filter(
    (product) => product.category.name === category && product.id !== id,
  );

  if (productIsError) {
    return (
      <h3 className="my-12 text-center text-4xl font-[600] text-red-600">
        {productError.message}
      </h3>
    );
  }

  if (productLoading) {
    return (
      <div className="mt-18 flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  if (AllProductsIsError) {
    return (
      <h3 className="my-12 text-center text-4xl font-[600] text-red-600">
        {AllProductsError.message}
      </h3>
    );
  }

  if (AllProductsLoading) {
    return (
      <div className="mt-18 flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-12 items-center gap-5">
        <section className="col-span-3 col-start-2">
          <div>
            <figure>
              {productData?.images?.length > 1 ? (
                <Slider {...settings}>
                  {productData?.images.map((src) => (
                    <img
                      key={productData?.id}
                      src={src}
                      className="w-full"
                      alt=""
                    />
                  ))}
                </Slider>
              ) : (
                <img
                  key={productData?.id}
                  src={productData?.images}
                  className="w-full"
                  alt=""
                />
              )}
            </figure>
          </div>
        </section>

        <section className="col-span-6 col-start-5">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-[600] text-black">
              {productData?.title}
            </h3>
            <p className="text-gray-600">{productData?.description}</p>
            <h6 className="font-[400] text-emerald-600">
              {productData?.category.name}
            </h6>
            <div className="flex items-center justify-between">
              <span className="font-[500]">{productData?.price} EGP</span>
              <span className="flex items-center gap-0.5">
                {productData?.ratingsAverage}{" "}
                <FaStar className="text-yellow-400" />
              </span>
            </div>
          </div>

          <div className="flex justify-evenly px-4 py-8">
            <button
              onClick={() => AddToCart(productData.id)}
              className="btn-specific-product my-2"
            >
              {loading && currentIdBtn == productData.id ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                `Add To Cart`
              )}
            </button>
          </div>
        </section>

        <section className="col-span-10 col-start-2">
          <div className="grid grid-cols-12 justify-items-center gap-x-6 gap-y-6 px-3 py-5">
            {filteredProducts?.map((product) => (
              <div key={product.id} className="group col-span-3 px-5">
                <div className="productBorder my-main-hover px-1">
                  <Link
                    to={`/productdetails/${product.id}/${product.category.name}`}
                  >
                    <figure className="overflow-hidden">
                      <img className="w-full" src={product.imageCover} alt="" />
                    </figure>
                    <div className="p-5">
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
        </section>
      </div>
    </>
  );
}
