'use client';

import { useContext, useEffect, useState } from 'react';
import SectionHeaders from '../../../components/layout/SectionHeaders';
import { CartContext, cartProductPrice } from '@/components/AppContext';
import { useParams } from 'next/navigation';
import AddressInputs from '@/components/layout/AddressInputs';
import CartProduct from '@/components/menu/CartProduct';
const OrderPage = () => {
  const { clearCart } = useContext(CartContext);
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);
  useEffect(() => {
    if (typeof window.console !== 'undefined') {
      if (window.location.href.includes('clear-cart=1')) {
        clearCart();
      }
    }

    if (id) {
      setLoadingOrder(true);
      fetch('/api/orders?_id=' + id).then((res) =>
        res.json().then((orderData) => {
          setOrder(orderData);
          setLoadingOrder(false);
        })
      );
    }
  }, []);

  let subtotal = 0;

  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }

  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <div className="text-center">
        {' '}
        <SectionHeaders mainHeader="Your order" />
        <div className="my-4">
          <p>Thanks for your order!</p>
          <p>We will call you when your order will be on the way!</p>
        </div>
      </div>
      {loadingOrder && <div>Loading order...</div>}
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div>
            {order.cartProducts.map((product) => (
              <CartProduct product={product} />
            ))}
            <div className="text-right py-2 text-gray-500">
              Subtotal:{' '}
              <span className="text-black inline-block w-6 font-bold">
                ${subtotal}
              </span>
              <br />
              Delievery:{' '}
              <span className="text-black inline-block w-6 font-bold">$5</span>
              <br />
              Total:{' '}
              <span className="text-black inline-block w-6 font-bold">
                ${subtotal + 5}
              </span>
              <br />
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInputs disabled={true} addressProps={order} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default OrderPage;
