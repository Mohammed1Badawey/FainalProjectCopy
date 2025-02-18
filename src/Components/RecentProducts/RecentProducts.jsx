import React from "react";
import LoadingAndErrorHandler from "../LoadingAndErrorHandler/LoadingAndErrorHandler";
import useAllProducts from "../../Hooks/useAllProducts";
import Products from './../Products/Products';

export default function RecentProducts() {
  let { isLoading, isError, error } = useAllProducts();
  
  return (
    <LoadingAndErrorHandler
      isLoading={isLoading}
      isError={isError}
      error={error}
    >
      <>
          <Products></Products>
      </>
    </LoadingAndErrorHandler>
  );
}
