import { useState, useEffect } from 'react';
import EditableImage from '../layout/EditableImage';
import { MenuItemPriceProps } from '@/components/layout/MenuItemPriceProps';

const MenuItemForm = ({ onSubmit, menuItem }) => {
  const [image, setImage] = useState(menuItem?.image || '');
  const [name, setName] = useState(menuItem?.name || '');
  const [description, setDescription] = useState(menuItem?.description || '');
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [category, setCategory] = useState(menuItem?.category || '');
  const [extraIngridients, setExtraIngridients] = useState(
    menuItem?.extraIngridients || []
  );
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/categories').then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          description,
          basePrice,
          sizes,
          extraIngridients,
          category,
        })
      }
      className="mt-8 max-w-md mx-auto"
    >
      <div
        className="md:grid items-start gap-2"
        style={{ gridTemplateColumns: '.3fr .7fr' }}
      >
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <label>Category</label>
          <select
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            {categories?.length > 0 &&
              categories.map((category) => (
                <option value={category._id}>{category.name}</option>
              ))}
          </select>
          <label>Base price</label>
          <input
            type="text"
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
          />
          <MenuItemPriceProps
            props={sizes}
            setProps={setSizes}
            name={'Sizes'}
            addLabel={'Add item size'}
            placeHolder={'Size name'}
          />

          <MenuItemPriceProps
            props={extraIngridients}
            setProps={setExtraIngridients}
            name={'Extra ingridients'}
            addLabel={'Add extra ingridients'}
            placeHolder={'Ingridient name'}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
};

export default MenuItemForm;
