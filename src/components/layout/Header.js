'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import Burger from '@/components/icons/Burger';
import { useContext, useState } from 'react';
import { CartContext } from '../AppContext';
import Cart from '@/components/icons/Cart';

function AuthLinks({ status, userName }) {
  if (status === 'authenticated') {
    return (
      <>
        <Link href={'/profile'} className="whitespace-nowrap">
          Hello, {userName}
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-primary text-white px-8 py-2 rounded-full"
        >
          Logout
        </button>
      </>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <>
        <Link href={'/login'}>Login</Link>
        <Link
          href={'/register'}
          className="bg-primary text-white px-8 py-2 rounded-full"
        >
          Register
        </Link>
      </>
    );
  }

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
}

const Header = () => {
  const session = useSession();
  const status = session.status;
  const userData = session.data?.user;
  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }

  return (
    <header>
      <div className="flex md:hidden justify-between">
        <Link
          className="text-primary flex items-center gap-2 font-semibold text-2xl"
          href={'/'}
        >
          ST PIZZA
        </Link>
        <div className="flex items-center gap-8">
          <Link href={'/cart'} className="relative">
            <Cart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-primary text-white text-sm p-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
          <button
            className="p-1"
            onClick={() => setMobileNavOpen((prev) => !prev)}
          >
            <Burger />
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center "
        >
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'#about'}>About</Link>
          <Link href={'#contact'}>Contact</Link>
          <AuthLinks status={status} userName={userName} />
        </div>
      )}

      <div className="hidden md:flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link
            className="text-primary flex items-center gap-2 font-semibold text-2xl"
            href={'/'}
          >
            ST PIZZA
          </Link>
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'#about'}>About</Link>
          <Link href={'#contact'}>Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          <AuthLinks status={status} userName={userName} />
          <Link href={'/cart'} className="relative">
            <Cart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-primary text-white text-sm p-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};
export default Header;
