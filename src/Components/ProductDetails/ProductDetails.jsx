import React, { useContext, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import useAllProducts from "../../Hooks/useAllProducts";
import useSpecificProduct from './../../Hooks/useSpecificProduct';
import { useAddToCart } from "../../Hooks/CartHooks/useAddToCart";
import { useAddToWishList } from "../../Hooks/WishListHooks/useAddToWishList";
import { useRemoveFromWishList } from "../../Hooks/WishListHooks/useRemoveFromWishList";
import useGetUserWishList from "../../Hooks/WishListHooks/useGetUserWishList";
import { ProductCard } from "../ProductCard/ProductCard";
import LoadingAndErrorHandler from "../LoadingAndErrorHandler/LoadingAndErrorHandler";
import { useQueryClient } from "@tanstack/react-query";



export default function ProductDetails() {
  const queryClient = useQueryClient();
  let { id, category } = useParams();

  const { mutate: mutateAddToCart, isPending: pendingAddToCart } = useAddToCart();
  const { mutate: mutateAddToWishList } = useAddToWishList();
  const { mutate: mutateRemove } = useRemoveFromWishList();
  const [currentItemId, setCurrentItemId] = useState(null);
  const { data: allWishListItems } = useGetUserWishList();


const handleAddToCart = (productId) => {
  setCurrentItemId(productId);
  mutateAddToCart(productId, {
    onSettled: () => {setCurrentItemId(null),queryClient.invalidateQueries("cartItems");}
  });

};

const handleAddToWishList = (productId) => {
  setCurrentItemId(productId);
  const isInWishList = allWishListItems?.data?.some(
    (item) => item.id === productId,
  );
  if (isInWishList) {
    mutateRemove(productId, {
      onSettled: () => {setCurrentItemId(null),queryClient.invalidateQueries("WishListItems")}
    });
  } else {
    mutateAddToWishList(productId, {
      onSettled: () => {setCurrentItemId(null),queryClient.invalidateQueries("WishListItems")}
    });
  }
};


  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: true,
    autoplay: true,
    arrows: false,
  };


  const pageOneCachedData =
    queryClient.getQueryData(["products", { pageNum: 1 }]) || [];
  const pageTwoCachedData =
    queryClient.getQueryData(["products", { pageNum: 2 }]) || [];
  const allProducts = [...pageOneCachedData, ...pageTwoCachedData];


  const { specificProduct } = useSpecificProduct();
  
  const productData = specificProduct?.data || {};

  


  let {
    data: AllProductsData,
    isLoading: AllProductsLoading,
    isError: AllProductsIsError,
    error: AllProductsError,
  } = useAllProducts();

  const filteredProducts = allProducts?.filter (
    (product) => product.category.name === category && product.id !== id,
  );



  return (
        <LoadingAndErrorHandler
          isLoading={AllProductsLoading}
          isError={AllProductsIsError}
          error={AllProductsError}
        >
    <>

    {/* <div className="grid grid-cols-12 gap-5 md:items-center">
    <section className="col-span-4 md:col-span-3 md:col-start-2"> */}

      <div className="grid grid-cols-12 gap-5 md:items-center">
        <section className="col-span-12  md:col-span-3 md:col-start-2">
          <div>
            <figure>
              {productData?.images?.length > 1 ? (
                <Slider {...settings}>
                  {productData?.images.map((src) => (
                    <img
                      key={productData?.id}
                      src={src}
                      className="w-[90%]"
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

        <section className="col-span-12 md:col-span-6 md:col-start-5">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-[600] text-black">
              {productData?.title}
            </h3>
            <p className="text-gray-600">{productData?.description}</p>
            <h6 className="font-[400] text-emerald-600">
              {productData?.category?.name}
            </h6>
            <div className="flex items-center justify-between">
              <span className="font-[500]">{productData?.price} EGP</span>
              <span className="flex items-center gap-0.5">
                {productData?.ratingsAverage}{" "}
                <FaStar className="text-yellow-400" />
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between p-3 pe-3">

            <button
              onClick={() => handleAddToCart(productData?.id)}
              className="btn-specific-product"
            >
              {pendingAddToCart && currentItemId == productData?.id ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                `Add To Cart`
              )}
            </button>

            <button
              onClick={() => handleAddToWishList(productData?.id)}
              className="text-gray-500 transition-colors duration-300 hover:text-emerald-600"
            >
              { allWishListItems?.data?.some(
                  (item) => item.id === productData?.id,
                ) ? (
                <i className="fa-solid fa-heart fa-xl md:fa-2xl cursor-pointer text-emerald-600"></i>
              ) : (
                <i className="fa-regular fa-heart fa-xl md:fa-2xl cursor-pointer"></i>
              )}
            </button>


          </div>
        </section>

        <section className="col-span-12">

          <div className="mt-18 grid grid-cols-12 justify-items-center gap-x-4 gap-y-12">

            { filteredProducts?.map((product) => (
                            <ProductCard
                              key={product.id}
                              product={product}
                              AddToCart={handleAddToCart}
                              handleAddToWishList={handleAddToWishList}
                              loadingAddToCart={
                                pendingAddToCart && currentItemId === product.id
                              }
                              allWishListItems={allWishListItems?.data}
                            />
                          ))}
          </div>
        </section>
      </div>
    </>
    </LoadingAndErrorHandler>
  );
}
