import Image from 'next/image';
import { Trash } from '@/components/icons/Trash';
import { cartProductPrice } from '@/components/AppContext';
const CartProduct = ({ product, onRemove, index }) => {
  return (
    <div className="flex gap-4 items-center mb-2 border-b py-2">
      {' '}
      <div className="w-24">
        <Image src={product.image} alt={''} width={240} height={240} />
      </div>
      <div className="grow">
        <h3 className="font-semibold"> {product.name}</h3>
        {product.size && (
          <div className="text-sm ">
            Size: <span>{product.size.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className="text-sm text-gray-500">
            {product.extras.map((extra) => (
              <div>
                {extra.name} ${extra.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-semibold">${cartProductPrice(product)}</div>
      {!!onRemove && (
        <div className="ml-2">
          <button
            type="button"
            onClick={(ev) => onRemove(index)}
            className="p-2"
          >
            <Trash />
          </button>
        </div>
      )}
    </div>
  );
};
export default CartProduct;
