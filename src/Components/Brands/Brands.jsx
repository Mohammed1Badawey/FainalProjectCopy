import React from "react";
import useBrands from "../../Hooks/useBrands";

export default function Brands() {
  let { data, isError, isLoading, error } = useBrands();

  if (isError) {
    return (
      <h3 className="my-12 text-center text-4xl font-[600] text-red-600">
        {error.message}
      </h3>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-18 flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <div className="mt-18 grid grid-cols-12 justify-items-center gap-x-4 gap-y-12">
        {data?.map((brand) => (
          <div key={brand._id} className="group col-span-3 px-5">
            <div className="product productBorder">
              <figure className="overflow-hidden">
                <img className="w-full object-cover" src={brand.image} alt="" />
              </figure>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
