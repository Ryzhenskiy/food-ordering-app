'use client';

import { CartContext } from '@/components/AppContext';
import SectionHeaders from '@/components/layout/SectionHeaders';
import { useContext, useEffect, useState } from 'react';
import CartProduct from '@/components/menu/CartProduct';
import { cartProductPrice } from '@/components/AppContext';
import AddressInputs from '@/components/layout/AddressInputs';
import { useProfile } from '@/components/UseProfile';
import toast from 'react-hot-toast';

const CartPage = () => {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});

  const { data: profileData } = useProfile();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('Payment failed :(');
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  function handleAddressChange(propName, value) {
    setAddress((prev) => ({ ...prev, [propName]: value }));
  }

  async function proceedToCheckout(ev) {
    ev.preventDefault();

    //address and shopping cart products

    const promise = new Promise((resolve, reject) => {
      fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          //redirect to stripe
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    toast.promise(promise, {
      loading: 'Preparing your order...',
      success: 'Redirecting to payment',
      error: 'Something went wrong... Please try again later!',
    });
  }

  let subtotal = cartProducts.reduce((acc, p) => cartProductPrice(p) + acc, 0);

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader={'Cart'} />
        <p className=""> Your shopping cart is empty :{'('}</p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader={'Cart'} />
      </div>

      <div className=" mt-8 grid grid-cols-2 gap-8">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart {':('}</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <CartProduct
                key={product._id}
                product={product}
                onRemove={removeCartProduct}
                index={index}
              />
            ))}

          <div className="py-2 justify-end items-center pr-16 flex">
            <div className="text-gray-500">
              Subtotal: <br />
              Delievery: <br />
              Total:
            </div>

            <div className="text-lg font-semibold pl-2 text-right">
              ${subtotal} <br />
              $5 <br />${subtotal + 5}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProps={handleAddressChange}
            />
            <button type="submit">Pay: ${subtotal + 5} </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default CartPage;
