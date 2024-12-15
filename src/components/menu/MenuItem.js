import { useContext, useState } from 'react';
import { CartContext } from '../AppContext';
import MenuItemTile from './MenuItemTile';
import toast from 'react-hot-toast';
import Image from 'next/image';

const MenuItem = (menuItem) => {
  const { image, name, description, basePrice, sizes, extraIngridients } =
    menuItem;
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtraIngridients, setSelecetedExtraIngridients] = useState([]);

  function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 && extraIngridients.length > 0;

    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }

    addToCart(menuItem, selectedSize, selectedExtraIngridients);

    setShowPopup(false);
    toast.success('Added to cart!');
  }

  function handleExtraIngridientClick(ev, extraIngridient) {
    const checked = ev.target.checked;
    if (checked) {
      setSelecetedExtraIngridients((prev) => [...prev, extraIngridient]);
    } else {
      setSelecetedExtraIngridients((prev) => {
        return prev.filter((e) => e.name !== extraIngridient.name);
      });
    }
  }

  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtraIngridients?.length > 0) {
    for (const extra of selectedExtraIngridients) {
      selectedPrice += extra.price;
    }
  }
  return (
    <>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            className="bg-white p-4 rounded-lg max-w-md"
            onClick={(ev) => ev.stopPropagation()}
          >
            <div
              className="overflow-y-scroll p-2"
              style={{ maxHeight: 'calc(100vh - 100px)' }}
            >
              <Image
                src={image}
                alt={name}
                width={300}
                height={200}
                className="mx-auto"
              />
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">
                {description}
              </p>
              {sizes?.length > 0 && (
                <div className=" rounded-md p-2">
                  <h3 className="font-semibold text-center text-gray-500">
                    Pick your size
                  </h3>
                  {sizes.map((size) => (
                    <label className="flex items-center gap-2 p-4 border rounded-md mb-1 text-gray-500">
                      <input
                        type="radio"
                        name="size"
                        checked={selectedSize?.name === size.name}
                        onClick={() => setSelectedSize(size)}
                      />{' '}
                      {size.name} {basePrice + size.price}$
                    </label>
                  ))}
                </div>
              )}
              {extraIngridients?.length > 0 && (
                <div className=" rounded-md p-2">
                  <h3 className="font-semibold text-center text-gray-500">
                    Add extra ingridients
                  </h3>
                  {extraIngridients.map((extraI) => (
                    <label className="flex items-center gap-2 p-4 border rounded-md mb-1 text-gray-500">
                      <input
                        type="checkbox"
                        name={extraI.name}
                        onClick={(ev) => handleExtraIngridientClick(ev, extraI)}
                      />{' '}
                      {extraI.name} +{extraI.price}$
                    </label>
                  ))}
                </div>
              )}
              <button
                type="button"
                className="primary sticky bottom-2 mb-2"
                onClick={handleAddToCartButtonClick}
              >
                Add to cart {selectedPrice}$
              </button>
              <button type="button" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
};
export default MenuItem;
