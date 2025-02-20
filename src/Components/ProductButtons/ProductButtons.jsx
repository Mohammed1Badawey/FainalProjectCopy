export default function ProductButtons({
  product,
  AddToCart,
  loadingAddToCart,
}) {
  return (
    <div className="flex flex-col-reverse items-center justify-center p-3 pe-3">
      <button

        disabled = {loadingAddToCart}

        onClick={() => AddToCart(product.id)}
        className="btn-add-product-sm md:btn-add-product my-2 active:scale-93 transition-all duration-300"
      >
          Add To Cart
      </button>
    </div>
  );
}
