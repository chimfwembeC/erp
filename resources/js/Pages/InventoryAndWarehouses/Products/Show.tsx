import Breadcrumb from '@/Components/Breadcrumb';
import AppLayout from '@/Layouts/AppLayout';
import React from 'react';

export default function Show({ product }) {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Inventory', href: '/inventory' },
    { label: 'Products' },
  ];
  return (
    <AppLayout title="Product Details">
      <div className="min-h-screen p-6">

        <div className="">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="">{product.name}</div>
        </div>
      </div>
    </AppLayout>
  );
}
