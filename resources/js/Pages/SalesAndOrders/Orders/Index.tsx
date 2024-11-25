import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Breadcrumb from '@/Components/Breadcrumb';
import useRoute from '@/Hooks/useRoute';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';

const Index = ({ orders }) => {
  const route = useRoute();

//   console.log('orders',orders);
  const items = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Sale Orders', href: '/sale-orders' },
    { label: 'orders' },
  ];

  const handleDelete = (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will delete the order permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route('sale-orders.orders.destroy', userId), {
          onSuccess: () => {
            Swal.fire('Deleted!', 'The order has been deleted.', 'success').then(() => {
              router.get(route('sale-orders.orders.index')); // Redirect after deletion
            });
          },
          onError: () => {
            Swal.fire('Error!', 'There was an error deleting the order.', 'error');
          },
        });
      }
    });
  };

  // Action Buttons Template
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-eye"
          className="p-button-info p-button-sm"
          rounded
          onClick={() => router.get(route('sale-orders.orders.show', rowData.id))}
          tooltip="View order"
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-warning p-button-sm"
          rounded
          onClick={() => router.get(route('sale-orders.orders.edit', rowData.id))}
          tooltip="Edit order"
        />
        <Button
          icon="pi pi-trash"
          rounded
          className="p-button-danger p-button-sm"
          onClick={() => handleDelete(rowData.id)}
          tooltip="Delete order"
        />
      </div>
    );
  };

  return (
    <AppLayout title="Order Management">
      <Breadcrumb items={items} />

      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Orders</h1>
          <Button
            label="Add Order"
            icon="pi pi-plus"
            className="p-button-primary bg-primary p-2 rounded-lg text-white"
            onClick={() => router.get(route('sale-orders.orders.create'))}
          />
        </div>

        <DataTable
          value={orders}
          paginator
          stripedRows
          rows={10}
          tableStyle={{ minWidth: '60rem' }}
          sortMode="multiple"
        >
          <Column
            field="customer.name"
            header="Customer"
            sortable
            filter
            filterPlaceholder="Search by name"
          />
          <Column
            field="total_price"
            header="Total Price"
            sortable
            filter
            filterPlaceholder="Search by price"
          />
          <Column
            field="status"
            header="Status"
            sortable
            filter
            filterPlaceholder="Search by role"
          />
          <Column
            header="Actions"
            body={actionBodyTemplate}
            style={{ width: '12rem', textAlign: 'center' }}
          />
        </DataTable>
      </div>
    </AppLayout>
  );
};

export default Index;
