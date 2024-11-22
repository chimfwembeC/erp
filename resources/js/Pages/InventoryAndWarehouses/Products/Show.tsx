import Breadcrumb from '@/Components/Breadcrumb';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
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

        <div className="mt-4">
          <div className="text-2xl">Product Details</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <div className="bg-white rounded-lg relative">
              <div className="h-52">
                <div className="inset-0 bg-primary h-48 top-0 absolute rounded-t-lg"></div>
              </div>

              <div className="p-4">
                <div className="">
                  <span className="font-bold">Name: </span> {product.name}
                </div>
                <div className="">
                  <span className="font-bold">Sku: </span> {product.sku}
                </div>
                <div className="">
                  <span className="font-bold text-justify">Description: </span>{' '}
                  {product.description}
                </div>
                <div className="">
                  <span className="font-bold">Price: </span>ZMW {product.price}
                </div>
                <div className="">
                  <span className="font-bold">Stock: </span> {product.stock}
                </div>
                <div className="">
                  <span className="font-bold">Quantity: </span>{' '}
                  {product.quantity}
                </div>
              </div>
              <div className="flex justify-end gap-4 p-4">
                <Link href={`/inventory/products/${product.id}/edit`} className='bg-primary p-2 text-white rounded-lg'>Edit Product</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
