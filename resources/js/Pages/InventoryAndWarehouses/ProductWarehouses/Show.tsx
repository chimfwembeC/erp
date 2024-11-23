import Breadcrumb from '@/Components/Breadcrumb';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function Show({ productWarehouse }) {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Inventory', href: '/inventory' },
    { label: 'Product Warehouses', href: '/inventory/product-warehouses' },
    { label: 'Product Warehouses Details' },
  ];
  return (
    <AppLayout title="Warehouse Details">
      <div className="min-h-screen p-6">
        <div className="">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="mt-4">
          <div className="text-2xl">Product Warehouses Details</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white rounded-lg ">

              <div className="p-4">
                <div className="">
                  <span className="font-bold">Product Name: </span> {productWarehouse.product.name}
                  <br />
                  <span className="font-bold">Price: </span> {productWarehouse.product.price}

                </div>
                <div className="">
                  <span className="font-bold">Warehouse Name: </span> {productWarehouse.warehouse.name}
                  <br />
                  <span className="font-bold">Location: </span> {productWarehouse.warehouse.location}
                </div>
                <div className="">
                  <span className="font-bold">Quantity: </span> {productWarehouse.quantity}
                </div>
              </div>
              <div className="flex justify-end gap-4 p-4">
                <Link href={`/inventory/product-warehouses/${productWarehouse.id}/edit`} className='bg-primary p-2 text-white rounded-lg'>Edit Inventory Movement</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
