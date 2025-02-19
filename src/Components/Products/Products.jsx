import React, { useEffect, useState } from "react";
import LoadingAndErrorHandler from "../LoadingAndErrorHandler/LoadingAndErrorHandler";
import useAllProducts from "./../../Hooks/useAllProducts";
import ProductsFilter from "../ProductsFilter/ProductsFilter";
import ProductsSearch from "./../ProductsSearch/ProductsSearch";
import useSearch from "../../Hooks/useSearch";
import { ProductCard } from "../ProductCard/ProductCard";
import { useAddToCart } from "../../Hooks/CartHooks/useAddToCart";
import useGetUserWishList from "../../Hooks/WishListHooks/useGetUserWishList";
import { useRemoveFromWishList } from "../../Hooks/WishListHooks/useRemoveFromWishList";
import { useAddToWishList } from "../../Hooks/WishListHooks/useAddToWishList";
import { useQueryClient } from "@tanstack/react-query";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

export default function Products() {
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [pageNum, setPageNum] = useState(1);
  const { data: searchData } = useSearch(searchQuery, selectedCategory,pageNum);

  const { mutate: mutateAddToCart, isPending: pendingAddToCart } =
    useAddToCart();

  const { mutate: mutateAddToWishList , isPending:addToCartPenfing } = useAddToWishList();

  const { data: allWishListItems } = useGetUserWishList();

  const { mutate: mutateRemove } =
    useRemoveFromWishList();

  const [currentItemId, setCurrentItemId] = useState(null);

  const { data, isLoading, isError, error } = useAllProducts(
    selectedCategory,
    pageNum,
  );

  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, [pageNum]);
  

  const handleAddToCart = (productId) => {
    setCurrentItemId(productId);
    mutateAddToCart(productId, {
      onSettled: () => {
        // setCurrentItemId(null), queryClient.invalidateQueries("cartItems");
      },
    });
  };

  const handleAddToWishList = (productId) => {
    setCurrentItemId(productId);
    const isInWishList = allWishListItems?.data?.some(
      (item) => item.id === productId,
    );
    if (isInWishList) {
      mutateRemove(productId, {
        onSettled: () => {
          setCurrentItemId(null)
            // queryClient.invalidateQueries("WishListItems");
        },
      });
    } else {
      mutateAddToWishList(productId, {
        onSettled: () => {
          setCurrentItemId(null)
            // queryClient.invalidateQueries("WishListItems");
        },
      });
    }
  };

  return (
    <LoadingAndErrorHandler
      isLoading={isLoading}
      isError={isError}
      error={error}
      
    >
      <>
        <div>
          <ProductsSearch
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
          />
          <ProductsFilter
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </div>
        <div className="mt-18 grid grid-cols-12 justify-items-center gap-x-4 gap-y-12">
          {data?.length > 0 ? (
            searchQuery && searchData ? (
              searchData.length > 0 ? (
                searchData.map((product) => (
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
                ))
              ) : (
                <p className="col-span-12 text-center text-gray-500">
                  No products found for your search.
                </p>
              )
            ) : (
              data.map((product) => (
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
              ))
            )
          ) : (
            <p className="col-span-12 text-center text-gray-500">
              No products found.
            </p>
          )}
        </div>
        {selectedCategory === "" && searchQuery === "" && (
          <div className="m-auto mt-8 justify-center gap-6 text-center">
            <div className="flex justify-center">
              <div className="flex h-8 items-center -space-x-px text-sm">
                <button
                  onClick={() => setPageNum(1)}
                  className="flex h-8 cursor-pointer items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  1
                </button>
                <button
                  onClick={() => setPageNum(2)}
                  className="flex h-8 cursor-pointer items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  2
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    </LoadingAndErrorHandler>
  );
}
