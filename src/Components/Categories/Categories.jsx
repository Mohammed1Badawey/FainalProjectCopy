import React from "react";
import useCategories from "../../Hooks/useCategories";
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
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-10 col-start-3 col-end-11 grid grid-cols-12 gap-9">
          {data?.data?.data.map((category) => {
            return (

              <div key={category.name} className="col-span-4 group my-main-hover bg-white border border-gray-200 rounded-lg shadow-sm ">
  <Link href="#">
    <img className="rounded-t-lg h-[400px] w-[300px] object-cover" src={category.image}
                    alt={category.name} />
  </Link>
  <div className="p-5 group-hover:scale-108 transition-all duration-500">
    <Link href="#">
      <h5 className="mb-2 text-emerald-700 hover:text-emerald-500 transition-all duration-500 text-2xl font-bold tracking-tight text-center ">{category.name}</h5>
    </Link>
  </div>
</div>

              // <div key={category.name} className="col-span-4">
              //   <figure className="">
              //     <img
              //       src={category.image}
              //       alt={category.name}
              //       className="h-[400px] w-full object-cover"
              //     />
              //   </figure>
              //   <h4 className="ps-2 pt-2 text-center font-[600]">
              //     {category.name}
              //   </h4>
              // </div>
              
            );
          })}
        </div>

        

{/* <div key={category.name} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm ">
  <Link href="#">
    <img className="rounded-t-lg" src={category.image}
                    alt={category.name} />
  </Link>
  <div className="p-5">
    <Link href="#">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{category.name}</h5>
    </Link>
  </div>
</div> */}


      </div>
    </>
  );
}
