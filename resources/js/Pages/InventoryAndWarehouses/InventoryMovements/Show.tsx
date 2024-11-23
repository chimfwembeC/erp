import Breadcrumb from '@/Components/Breadcrumb';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function Show({ inventoryMovement }) {
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
          <div className="text-2xl">Inventory Movement Details</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white rounded-lg ">

              <div className="p-4">
                <div className="">
                  <span className="font-bold">Product Name: </span> {inventoryMovement.product.name}
                  <br />
                  <span className="font-bold">Price: </span> {inventoryMovement.product.price}

                </div>
                <div className="">
                  <span className="font-bold">Warehouse Name: </span> {inventoryMovement.warehouse.name}
                  <br />
                  <span className="font-bold">Location: </span> {inventoryMovement.warehouse.location}
                </div>
                <div className="">
                  <span className="font-bold">Quantity: </span> {inventoryMovement.quantity}
                </div>
                <div className="">
                  <span className="font-bold">Movement Type: </span> <span className={`text-white p-2 px-4 rounded-lg ${inventoryMovement.movement_type === 'in' ? 'bg-green-500' :'bg-red-500'}`} >{inventoryMovement.movement_type}</span>
                </div>
              </div>
              <div className="flex justify-end gap-4 p-4">
                <Link href={`/inventory/inventory-movements/${inventoryMovement.id}/edit`} className='bg-primary p-2 text-white rounded-lg'>Edit Inventory Movement</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
