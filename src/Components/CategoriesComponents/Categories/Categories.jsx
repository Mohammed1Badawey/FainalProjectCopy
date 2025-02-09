import React from "react";
import useCategories from "../../../Hooks/CategoriesHooks/useCategories";
import { Link } from "react-router-dom";

export default function Categories() {
  let { data, isError, isLoading, error } = useCategories();

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
    <div className="grid grid-cols-12">
      <div className="col-span-10 col-start-3 col-end-11 grid grid-cols-12 gap-9">
        {data?.data?.data.map((category) => (
          <div
            key={category._id}
            className="group my-main-hover col-span-4 rounded-lg border border-gray-200 bg-white shadow-sm"
          >
            <Link to={`/category/${category._id}`}>
              <img
                className="h-[400px] w-[300px] rounded-t-lg object-cover"
                src={category.image}
                alt={category.name}
              />
            </Link>
            <div className="p-5 transition-all duration-500 group-hover:scale-108">
              <Link to={`/category/${category._id}`}>
                <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-emerald-700 transition-all duration-500 hover:text-emerald-500">
                  {category.name}
                </h5>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
