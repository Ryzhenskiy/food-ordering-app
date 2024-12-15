'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
const UserTabs = ({ isAdmin }) => {
  const path = usePathname();

  return (
    <div className="flex gap-2 tabs justify-center flex-wrap">
      <Link className={path === '/profile' ? 'active' : ''} href={'/profile'}>
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            href={'/categories'}
            className={path === '/categories' ? 'active' : ''}
          >
            Categories
          </Link>
          <Link
            href={'/menu-items'}
            className={/menu-items/.test(path) ? 'active' : ''}
          >
            Menu items
          </Link>
          <Link
            href={'/users'}
            className={path.includes('/users') ? 'active' : ''}
          >
            Users
          </Link>
        </>
      )}
      <Link href={'/orders'} className={path === '/orders' ? 'active' : ''}>
        Orders
      </Link>
    </div>
  );
};
export default UserTabs;
