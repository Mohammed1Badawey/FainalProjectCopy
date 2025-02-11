import React from "react";
import useBrands from "../../Hooks/useBrands";
import LoadingAndErrorHandler from "../LoadingAndErrorHandler/LoadingAndErrorHandler";

export default function Brands() {
  let { data, isError, isLoading, error } = useBrands();

  return (
    <LoadingAndErrorHandler
      isLoading={isLoading}
      isError={isError}
      error={error}
    >
      <>
        <div className="mt-18 grid grid-cols-2 justify-items-center gap-x-4 gap-y-12 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {data?.map((brand) => (
            <div key={brand._id} className="group col-span-1 px-5">
              <div className="productBorder my-main-hover overflow-hidden rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105">
                <figure className="overflow-hidden">
                  <img
                    className="h-auto w-full object-cover"
                    src={brand.image}
                    alt={brand.name || "Brand Logo"}
                  />
                </figure>
              </div>
            </div>
          ))}
        </div>
      </>
    </LoadingAndErrorHandler>
  );
}
