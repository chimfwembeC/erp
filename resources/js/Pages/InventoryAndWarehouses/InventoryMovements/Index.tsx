import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Breadcrumb from '@/Components/Breadcrumb';
import useRoute from '@/Hooks/useRoute';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';

const Index = ({ inventoryMovements }) => {
  const route = useRoute();

  const items = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Inventory', href: '/inventory' },
    // { label: 'inventoryMovements', href: '/inventory/warehouses' },
    { label: 'Inventory Movements' },
  ];

  const handleDelete = inventoryMovementId => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will delete the Inventory Movement permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        router.delete(route('inventory.inventory_movements.destroy', inventoryMovementId));
        Swal.fire('Deleted!', 'The Inventory Movement has been deleted.', 'success');
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
          onClick={() => router.get(route('inventory.inventory_movements.show', rowData.id))}
          tooltip="View Inventory Movement"
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-warning p-button-sm"
          rounded
          onClick={() => router.get(route('inventory.inventory_movements.edit', rowData.id))}
          tooltip="Edit Inventory Movement"
        />
        <Button
          icon="pi pi-trash"
          rounded
          className="p-button-danger p-button-sm"
          onClick={() => handleDelete(rowData.id)}
          tooltip="Delete Inventory Movement"
        />
      </div>
    );
  };

  return (
    <AppLayout title="Inventory Movements Management">
      <Breadcrumb items={items} />

      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Inventory Movements</h1>
          <Button
            label="Add Inventory Movement"
            icon="pi pi-plus"
            className="p-button-primary bg-primary p-2 rounded-lg text-white"
            onClick={() => router.get(route('inventory.inventory_movements.create'))}
          />
        </div>

        <DataTable
          value={inventoryMovements}
          paginator
          stripedRows
          rows={10}
          tableStyle={{ minWidth: '60rem' }}
          sortMode="multiple"
        >
          <Column
            field="product.name"
            header="Product"
            sortable
            filter
            filterPlaceholder="Search by product name"
          />

          <Column
            field="warehouse.name"
            header="Warehouse"
            sortable
            filter
            filterPlaceholder="Search by warehouse name"
          />
          <Column
            field="quantity"
            header="Quantity"
            sortable
            // filter
            // filterPlaceholder="Search by warehouse name"
          />
          <Column
            field="movement_type"
            header="Movement Type"
            sortable
            filter
            filterPlaceholder="Search by warehouse name"
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
