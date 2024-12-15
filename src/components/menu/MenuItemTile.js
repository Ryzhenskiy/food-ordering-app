import AddToCartButton from './AddToCartButton';

const MenuItemTile = ({ onAddToCart, ...item }) => {
  const { image, name, description, basePrice, sizes, extraIngridients } = item;
  const hasSizesOrExtras = sizes?.length > 0 && extraIngridients.length > 0;

  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="text-center">
        <img
          src={image}
          alt="pizza"
          className="max-h-24 max-w-auto block mx-auto"
        />
      </div>

      <h4 className="font-semibold text-xl my-3">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      <AddToCartButton
        hasSizesOrExtras={hasSizesOrExtras}
        onClick={onAddToCart}
        basePrice={basePrice}
      />
    </div>
  );
};
export default MenuItemTile;
