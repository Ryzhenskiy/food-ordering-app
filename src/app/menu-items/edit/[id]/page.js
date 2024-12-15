'use client';
import { useProfile } from '../../../../components/UseProfile';
import { useState, useEffect } from 'react';
import { useParams, redirect } from 'next/navigation';
import UserTabs from '@/components/layout/UserTabs';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Left from '../../../../components/icons/Left';
import MenuItemForm from '../../../../components/layout/MenuItemForm';
import DeleteButton from '@/components/DeleteButton';

export default function EditMenuItemPage() {
  const { id } = useParams();
  const { loading, data } = useProfile();
  const [menuItem, setMenuItem] = useState(null);
  const [redirectToItems, setRedirectToItems] = useState(false);

  useEffect(() => {
    fetch('/api/menu-items').then((response) => {
      response.json().then((data) => {
        const item = data.find((i) => i._id == id);
        setMenuItem(item);
      });
    });
  }, []);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/menu-items', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(savingPromise, {
      loading: 'Saving...',
      success: 'Menu item saved!',
      error: 'Failed to save!',
    });
    setRedirectToItems(true);
  }

  async function handleDeleteClick() {
    const deletingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/menu-items?_id=' + id, {
        method: 'DELETE',
      });
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(deletingPromise, {
      loading: 'Deleting...',
      success: 'Menu item deleted!',
      error: 'Failed to delete!',
    });
    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect('/menu-items');
  }
  if (loading) {
    return 'Loading user info...';
  }

  if (!data.admin) {
    return 'Not an admin!';
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-md mx-auto mt-8">
        <Link href={'/menu-items'} className="button">
          <span>Show all menu items</span>
          <Left />
        </Link>
      </div>
      <MenuItemForm onSubmit={handleFormSubmit} menuItem={menuItem} />
      <div className="max-w-md mx-auto mt-2">
        <div className="max-w-xs ml-auto pl-4">
          <DeleteButton label="Delete" onDelete={handleDeleteClick} />
        </div>
      </div>
    </section>
  );
}
