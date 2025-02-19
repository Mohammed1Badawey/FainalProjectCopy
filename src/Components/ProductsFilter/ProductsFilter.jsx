import React, { useState } from "react";
import useCategories from "../../Hooks/CategoriesHooks/useCategories";

export default function ProductsFilter({selectedCategory,setSelectedCategory}) {
  const { allCategories } = useCategories();
  const { data } = allCategories || {};
  const allCategoriesFilter = data?.data?.data || [];

  function onChangeSelected(e) {
    setSelectedCategory(e.target.value);
    
  } 
  
  return (
    <>
      <div className=" items-center md:items-end flex flex-col justify-center mt-2">
        <h5 className="m-3 text-center text-md font-semibold">
          Filter By Category
        </h5>
        <select onChange={onChangeSelected} value={selectedCategory} className="min-w-[250px] rounded-lg border border-emerald-500 p-2 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500">
          <option value="">All Categories</option>
          {allCategoriesFilter?.map((category) => {
            return (
              <option key={category._id} value={category.slug}>
                {category.name}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}
