import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Breadcrumb from '@/Components/Breadcrumb';
import useRoute from '@/Hooks/useRoute';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';

const Index = ({ productWarehouses }) => {
  const route = useRoute();

  const items = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Inventory', href: '/inventory' },
    // { label: 'Warehouses', href: '/inventory/warehouses' },
    { label: 'Product Warehouse' },
  ];

  const handleDelete = warehouseId => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will delete the warehouse permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        router.delete(route('inventory.product-warehouses.destroy', warehouseId));
        Swal.fire('Deleted!', 'The warehouse has been deleted.', 'success');
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
          onClick={() => router.get(route('inventory.product-warehouses.show', rowData.id))}
          tooltip="View "
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-warning p-button-sm"
          rounded
          onClick={() => router.get(route('inventory.product-warehouses.edit', rowData.id))}
          tooltip="Edit"
        />
        <Button
          icon="pi pi-trash"
          rounded
          className="p-button-danger p-button-sm"
          onClick={() => handleDelete(rowData.id)}
          tooltip="Delete"
        />
      </div>
    );
  };

  return (
    <AppLayout title="Warehouses Management">
      <Breadcrumb items={items} />

      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Product Warehouses</h1>
          <Button
            label="Add Product to WareHouse"
            icon="pi pi-plus"
            className="p-button-primary bg-primary p-2 rounded-lg text-white"
            onClick={() => router.get(route('inventory.product-warehouses.create'))}
          />
        </div>

        <DataTable
          value={productWarehouses}
          paginator
          stripedRows
          rows={10}
          tableStyle={{ minWidth: '60rem' }}
          sortMode="multiple"
        >
          <Column
            field="product.name"
            header="Product Name"
            sortable
            filter
            filterPlaceholder="Search by product name"
          />
          <Column
            field="warehouse.name"
            header="Warehouse Name"
            sortable
            filter
            filterPlaceholder="Search by warehouse name"
          />
          <Column
            field="quantity"
            header="Quantity"
            sortable
            filter
            filterPlaceholder="Search by quantity"
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
