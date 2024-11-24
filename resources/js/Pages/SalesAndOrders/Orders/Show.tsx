import Breadcrumb from '@/Components/Breadcrumb';
import AppLayout from '@/Layouts/AppLayout';
import React from 'react'

export default function Show({order}) {
    const items = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Order Management', href: '/sale-orders/orders' },
        { label: 'orders' },
      ];
  return (
    <AppLayout title='Order Details'>
      <Breadcrumb items={items} />

       <div className="p-4 bg-white rounded-md w-1/2">
       <div className="">
            <div className="text-xl font-bold">User: </div>{order.customer.name}
        </div>
        <div className="">
            <div className="text-xl font-bold">Total Price: </div>{order.total_price}
        </div>
        <div className="">
            <div className="text-xl font-bold">Status: </div>{order.status}
        </div>
       </div>

       <div className="text-2xl font-bold my-4">Order Items</div>

       <div className="bg-white rounded-md p-4">

       </div>
    </AppLayout>
  )
}
