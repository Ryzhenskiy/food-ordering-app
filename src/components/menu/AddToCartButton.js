const AddToCartButton = ({ hasSizesOrExtras, onClick, basePrice }) => {
  return (
    <button
      onClick={onClick}
      className="bg-primary text-white rounded-full px-8 py-2 mt-4 "
      type="button"
    >
      {hasSizesOrExtras
        ? `Add to cart(from ${basePrice}$)`
        : `Add to cart ${basePrice}$`}
    </button>
  );
};
export default AddToCartButton;
