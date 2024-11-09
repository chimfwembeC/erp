import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Breadcrumb from '@/Components/Breadcrumb';
import useRoute from '@/Hooks/useRoute';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import moment from 'moment';
import { Chip } from 'primereact/chip';

const Index = ({ purchaseOrders }) => {
  const route = useRoute();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Purchases', href: '/purchase-orders' },
    { label: 'Purchase Orders' },
  ];

  const handleDelete = orderId => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will delete the purchase order permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        router.delete(route('accounting.purchase-orders.destroy', orderId));
        Swal.fire(
          'Deleted!',
          'The purchase order has been deleted.',
          'success',
        );
      }
    });
  };

  // Action Buttons Template
  const actionBodyTemplate = rowData => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-eye"
          className="p-button-info p-button-sm"
          rounded
          onClick={() =>
            router.get(route('accounting.purchase-orders.show', rowData.id))
          }
          tooltip="View Order"
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-warning p-button-sm"
          rounded
          onClick={() =>
            router.get(route('accounting.purchase-orders.edit', rowData.id))
          }
          tooltip="Edit Order"
        />
        <Button
          icon="pi pi-trash"
          rounded
          className="p-button-danger p-button-sm"
          onClick={() => handleDelete(rowData.id)}
          tooltip="Delete Order"
        />
      </div>
    );
  };

  // Custom templates for dates (if necessary)
  const orderDateTemplate = rowData =>
    moment(rowData.order_date).format('MMMM Do YYYY');
  const deliveryDateTemplate = rowData =>
    moment(rowData.delivery_date).format('MMMM Do YYYY');

  return (
    <AppLayout title="Purchase Order Management">
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Manage Purchase Orders</h1>
          <Button
            label="Create Order"
            icon="pi pi-plus"
            className="p-button-primary bg-primary p-2 rounded-lg text-white"
            onClick={() =>
              router.get(route('accounting.purchase-orders.create'))
            }
          />
        </div>

        <DataTable
          value={purchaseOrders}
          paginator
          stripedRows
          rows={10}
        
          sortMode="multiple"
          scrollable // Make the table scrollable on smaller screens
          scrollHeight="400px"          
        >
          <Column
            field="user.name"
            header="Supplier"
            sortable
            filter
            filterPlaceholder="Search by supplier"
          />
          <Column
            field="total_amount"
            header="Total"
            sortable
            filter
            filterPlaceholder="Search by total amount"
          />
          <Column
            field="tax_amount"
            header="Tax"
            sortable
            filter
            filterPlaceholder="Search by tax amount"
          />
          <Column
            field="discount_amount"
            header="Discount"
            sortable
            filter
            filterPlaceholder="Search by discount amount"
          />
          <Column
            field="order_date"
            header="Order"
            body={orderDateTemplate}
            sortable
            filter
            filterPlaceholder="Search by order date"
          />
          <Column
            field="delivery_date"
            header="Delivery"
            body={deliveryDateTemplate}
            sortable
            filter
            filterPlaceholder="Search by delivery date"
          />
          <Column
            field="status"
            header="Status"
            body={rowData => <Chip label={rowData.status} />}
            sortable
            filter
            filterPlaceholder="Search by status"
          />
          <Column
            header="Actions"
            body={actionBodyTemplate}
            style={{
              width: '12rem',
              textAlign: 'center',
            }}
          />
        </DataTable>
      </div>
    </AppLayout>
  );
};

export default Index;
