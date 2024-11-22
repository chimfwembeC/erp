import Breadcrumb from '@/Components/Breadcrumb';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function Show({ warehouse }) {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Inventory', href: '/inventory' },
    { label: 'Warehouse', href: '/inventory/warehouse' },
    { label: 'Warehouse Details' },
  ];
  return (
    <AppLayout title="Warehouse Details">
      <div className="min-h-screen p-6">
        <div className="">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="mt-4">
          <div className="text-2xl">Warehouse Details</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white rounded-lg ">

              <div className="p-4">
                <div className="">
                  <span className="font-bold">Name: </span> {warehouse.name}
                </div>
                <div className="">
                  <span className="font-bold">Location: </span> {warehouse.location}
                </div>
              </div>
              <div className="flex justify-end gap-4 p-4">
                <Link href={`/inventory/products/${warehouse.id}/edit`} className='bg-primary p-2 text-white rounded-lg'>Edit Product</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
