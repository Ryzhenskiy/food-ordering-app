'use client';

import Link from 'next/link';
import UserTabs from '@/components/layout/UserTabs';
import { useProfile } from '@/components/UseProfile';
import { useEffect, useState } from 'react';
import { dbTimeForHuman } from '../../libs/datetime';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { loading, data: profile } = useProfile();

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    fetch('/api/orders').then((res) => {
      console.log(res);
      res.json().then((orders) => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      });
    });
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profile.admin} />
      <div className="mt-8">
        {loadingOrders && <div>Loading orders...</div>}
        {orders.length > 0 &&
          orders.map((order) => (
            <div className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6">
              <div className="grow flex flex-col md:flex-row items-center gap-6">
                <div>
                  <div
                    className={
                      (order.paid ? 'bg-green-500' : 'bg-red-400') +
                      ' p-2 rounded-md text-white w-24 text-center'
                    }
                  >
                    {order.paid ? 'Paid' : 'Not paid'}
                  </div>
                </div>
                <div className="grow">
                  <div className="flex gap-2 items-center mb-1">
                    <div className="grow">{order.userEmail}</div>
                    <div className="text-gray-500 text-xs">
                      {dbTimeForHuman(order.createdAt)}
                    </div>
                  </div>

                  <div className="text-gray-500 text-sm">
                    {order.cartProducts?.length > 0 &&
                      order.cartProducts
                        .map((cartProduct) => cartProduct.name)
                        .join(', ')}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 items-center whitespace-nowrap">
                <Link href={'/orders/' + order._id} className="button">
                  Show order
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
export default OrdersPage;
