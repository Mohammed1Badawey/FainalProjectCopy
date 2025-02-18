export default function ProductButtons({
  product,
  AddToCart,
  handleAddToWishList,
  loadingAddToCart,
  allWishListItems
}) {
  return (
    <div className="flex items-center justify-center p-3 pe-3">
      <button
        onClick={() => AddToCart(product.id)}
        className="btn-add-product-sm md:btn-add-product my-2"
      >
        {loadingAddToCart ? (
          <i className="fas fa-spinner fa-spin"></i>
        ) : (
          `Add To Cart`
        )}
      </button>
      <button
        onClick={() => handleAddToWishList(product.id)}
        className="text-gray-500 transition-colors duration-300 hover:text-emerald-600"
      >
        { allWishListItems?.some(item => item.id === product.id) ? (
          <i className="fa-solid fa-heart fa-xl md:fa-2xl cursor-pointer text-emerald-600"></i>
        ) : (
          <i className="fa-regular fa-heart fa-xl md:fa-2xl cursor-pointer"></i>
        )}
      </button>
    </div>
  );
}
