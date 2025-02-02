import axios from "axios";
import React, { useEffect, useState } from "react";


export default function RecentProducts() {

  const [allProducts, setAllProducts] = useState([])

  function getAllProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((res)=>{console.log(res.data.data);
      setAllProducts(res.data.data)
    })
    .catch(()=>{})
  }

  useEffect(()=>{
    getAllProducts()
  },[])

  return (
    <>
        <div className="grid grid-cols-12 py-5 px-3 justify-items-center">
        {allProducts.map((product) => (
          <div key={product.id} className="col-span-2">
            <div className="product">
              <figure>
                <img className="w-full" src={product.imageCover} alt="" />
              </figure>
            </div>
          </div>
        ))}
        </div>
    </>
  );
}
