import React from "react";
import { FaStar } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import useSpecificProduct from "../../Hooks/useSpecificProduct";
import useProducts from "../../Hooks/UseProducts";

export default function ProductDetails() {
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
  } = useProducts();

  const filteredProducts = AllProductsData?.filter(
    (product) => product.category.name === category && product.id !== id,
  );

  // useQuery(
  //   {
  //   queryKey: ["allProducts"],
  //   queryFn: () => getAllProducts(),
  //   staleTime: 30000,
  //   retry: 5,
  //   retryDelay: 3000,
  //   refetchIntervalInBackground: true,
  //   refetchOnWindowFocus: true,
  //   gcTime: 20000,
  //   select: (AllProductsData) => {
  //     return AllProductsData?.data?.data.filter(
  //       (product) =>
  //         product.category.name === category && product.id !== productData.id,
  //     );
  //   },
  // });

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
            <button className="btn-add-product">
              Add To Cart <TiShoppingCart className="inline" />
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

                  <div>
                    <div className="flex justify-center p-3 pe-3">
                      <button className="btn-add-product my-2">
                        Add To Cart <TiShoppingCart className="inline" />
                      </button>
                      <i className="fa-regular fa-heart fa-2xl"></i>
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
