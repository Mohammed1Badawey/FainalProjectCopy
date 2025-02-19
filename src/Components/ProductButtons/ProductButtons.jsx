export default function ProductButtons({
  product,
  AddToCart,
  loadingAddToCart,
}) {
  return (
    <div className="flex flex-col-reverse items-center justify-center p-3 pe-3">
      <button
        disabled={loadingAddToCart}
        onClick={() => AddToCart(product.id)}
        className="btn-add-product-sm md:btn-add-product my-2"
      >
        {loadingAddToCart ? (
          <i className="fas fa-spinner fa-spin"></i>
        ) : (
          `Add To Cart`
        )}
      </button>
    </div>
  );
}
