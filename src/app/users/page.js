'use client';

import UserTabs from '@/components/layout/UserTabs';
import Edit from '@/components/icons/Edit';
import { useProfile } from '@/components/UseProfile';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch('/api/users').then((res) => {
      res.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);

  if (loading) {
    return 'Loading users info...';
  }

  if (!data.admin) {
    return 'Not an admin';
  }

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {users?.length > 0 &&
          users.map((user) => (
            <div className="bg-gray-300 rounded-lg mb-2 p-4 flex   items-center">
              <div className="font-semibold grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                <div className="text-gray-900">
                  {!!user.name && <span>{user.name}</span>}
                  {!user.name && <span className="italic">No name</span>}
                </div>
                <span className="text-gray-500">{user.email}</span>
              </div>
              <div className="border border-gray-400 rounded-lg hover:bg-gray-200 cursor-pointer">
                <Link href={'/users/' + user._id} className="button">
                  <Edit />
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
export default UsersPage;
