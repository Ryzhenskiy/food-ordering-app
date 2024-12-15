'use client';
import UserTabs from '../../components/layout/UserTabs';
import DeleteButton from '@/components/DeleteButton';
import { useState, useEffect } from 'react';
import { useProfile } from '../../components/UseProfile';
import toast from 'react-hot-toast';
import Edit from '@/components/icons/Edit';

const CategoriesPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedCategory, setEditedCategory] = useState(null);
  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch('/api/categories').then((res) =>
      res.json().then((categories) => {
        setCategories(categories);
      })
    );
  }

  async function removeCategory(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/categories?_id=' + _id, {
        method: 'DELETE',
      });

      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: 'Deleting...',
      success: 'Category deleted!',
      error: 'Error',
    });

    fetchCategories();
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch('/api/categories', {
        method: editedCategory ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      fetchCategories();
      setCategoryName('');
      setEditedCategory(null);
      if (response.ok) resolve();
      else reject();
    });
    toast.promise(creationPromise, {
      loading: editedCategory
        ? 'Updating a category...'
        : 'Creating new category...',
      success: editedCategory ? 'Category updated' : 'New category created!',
      error: editedCategory
        ? 'Failed to update category'
        : 'Failed to create new category!',
    });
  }

  if (profileLoading) {
    return 'Loading user info...';
  }

  if (!profileData.admin) {
    return 'Not an admin!';
  }

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? 'Update category' : 'New Category name'}
              {editedCategory && (
                <b>
                  <>: {editedCategory.name}</>
                </b>
              )}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
            />
          </div>
          <div className="pb-2 flex gap-2">
            <button className="border border-primary" type="submit">
              {editedCategory ? 'Update' : 'Create'}
            </button>
            {editedCategory && (
              <button
                type="button"
                onClick={() => {
                  setEditedCategory(null);
                  setCategoryName('');
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing categories:</h2>
        {categories?.length > 0 ? (
          categories.map((category, index) => (
            <div
              key={category._id}
              className=" bg-gray-100 rounded-xl mb-1 p-2 px-4 flex justify-between items-center gap-1"
            >
              <span className="font-bold hover:underline cursor-pointer">
                {category.name}
              </span>
              <div className="flex gap-2">
                <DeleteButton onDelete={() => removeCategory(category._id)} />
                <button
                  onClick={() => {
                    setEditedCategory(category);
                    setCategoryName(category.name);
                  }}
                  type="button"
                  className="hover:bg-gray-200"
                >
                  <Edit />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-lg text-center opacity-35 mt-5">
            No existing categories {':('}
          </div>
        )}
      </div>
    </section>
  );
};
export default CategoriesPage;
