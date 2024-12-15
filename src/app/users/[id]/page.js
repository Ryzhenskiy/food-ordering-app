'use client';

import toast from 'react-hot-toast';
import UserTabs from '../../../components/layout/UserTabs';
import UserForm from '@/components/layout/UserForm';
import { useProfile } from '../../../components/UseProfile';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const EditUserPage = () => {
  const { loading, data } = useProfile();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/profile?_id=' + id).then((res) => {
      res.json().then((user) => {
        setUser(user);
      });
    });
  }, []);

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();

    const updatingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          _id: id,
        }),
      });
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(updatingPromise, {
      loading: 'Updating...',
      success: 'Profile updated!',
      error: 'Failed to update!',
    });
  }

  if (loading) {
    return 'Laoding user info...';
  }

  if (!data.admin) {
    return 'Not an admin!';
  }

  return (
    <section className="mt-8 mx-auto max-w-lg">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
};
export default EditUserPage;
