'use client';
import { useProfile } from '../../../components/UseProfile';
import { useState } from 'react';
import UserTabs from '@/components/layout/UserTabs';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Left from '../../../components/icons/Left';
import MenuItemForm from '../../../components/layout/MenuItemForm';
import { redirect } from 'next/navigation';
export default function newMenuItemPage() {
  const { loading, data } = useProfile();
  const [redirectToItems, setRedirectToItems] = useState(false);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/menu-items', {
        method: 'POST',
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
      <div className="max-w-lg mx-auto mt-8">
        <Link href={'/menu-items'} className="button">
          <span>Show all menu items</span>
          <Left />
        </Link>
      </div>
      <MenuItemForm onSubmit={handleFormSubmit} menuItem={null} />
    </section>
  );
}
