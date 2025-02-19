import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ProductButtons from "../ProductButtons/ProductButtons";

export const ProductCard = ({
  product,
  AddToCart,
  handleAddToWishList,
  loadingAddToCart,
  allWishListItems,
}) => (
  <div
    key={product.id}
    className="group col-span-6 md:col-span-6 md:px-5 lg:col-span-3"
  >
    <div className="productBorder my-main-hover relative ">
    <div className="absolute flex rounded justify-center items-center size-6 p-4 top-3 right-5">

    <button
        onClick={() => handleAddToWishList(product.id)}
        className="text-gray-500 transition-colors duration-300 md:hover:text-red-700"
      >
        { allWishListItems?.some(item => item.id === product.id) ? (
          <i className="fa-solid fa-heart fa-xl md:fa-2xl cursor-pointer text-red-700"></i>
        ) : (
          <i className="fa-regular fa-heart fa-xl md:fa-2xl cursor-pointer"></i>
        )}
      </button>
    </div>
      <Link to={`/productdetails/${product.id}/${product.category.name}`}>
        <figure className="overflow-hidden">
          <img
            className="w-full object-cover"
            src={product.imageCover}
            alt=""
          />
        </figure>
        <div className="p-2 md:p-5 text-center md:text-start">
          <h3 className="text-emerald-600">{product.category.name}</h3>
          <h3>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
          <div className="flex items-center justify-between">
            <span>{product.price} EGP</span>
            <span className="flex items-center gap-0.5">
              {product.ratingsAverage} <FaStar className="text-yellow-400" />
            </span>
          </div>
        </div>
      </Link>

      <ProductButtons
product = {product}
AddToCart = {AddToCart}
handleAddToWishList = {handleAddToWishList}
loadingAddToCart = {loadingAddToCart}
allWishListItems = {allWishListItems}
      />
    </div>
  </div>
);
