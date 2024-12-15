import { Trash } from '@/components/icons/Trash';
import { Plus } from '@/components/icons/Plus';
import UpAndDown from '@/components/icons/UpAndDown';
import { useState } from 'react';
import { set } from 'mongoose';
export const MenuItemPriceProps = ({
  name,
  addLabel,
  props,
  setProps,
  placeHolder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  function addProp() {
    setProps((oldProps) => {
      return [...oldProps, { name: '', price: 0 }];
    });
  }

  function editProp(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((oldProps) => {
      const newSizes = [...oldProps];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(index) {
    setProps((oldProps) => {
      const newSizes = oldProps.filter((v, i) => i !== index);
      return newSizes;
    });
  }
  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
        className="inline-flex items-center p-1 mb-2 border-0 justify-start"
      >
        <UpAndDown className="w-4 h-4" />
        <span>{name}</span>
        <span>({props?.length})</span>
      </button>
      <div className={isOpen ? 'block' : 'hidden'}>
        {props?.length > 0 &&
          props.map((size, index) => (
            <div className="flex  items-end gap-2">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  placeholder={placeHolder}
                  value={size.name}
                  onChange={(ev) => editProp(ev, index, 'name')}
                />
              </div>
              <div>
                <label>Extra price</label>
                <input
                  type="text"
                  placeholder="Price"
                  value={size.price}
                  onChange={(ev) => editProp(ev, index, 'price')}
                />
              </div>
              <div>
                <button
                  onClick={() => removeProp(index)}
                  type="button"
                  className="bg-white mb-2 px-2"
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        <button type="button" onClick={addProp} className="bg-white">
          <Plus />
          {addLabel}
        </button>
      </div>
    </div>
  );
};
