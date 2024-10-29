import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Breadcrumb from '@/Components/Breadcrumb';
import useRoute from '@/Hooks/useRoute';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';

const Index = ({ branches }) => {
  const route = useRoute();

  const items = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'HRM', href: '/hrm' },
    { label: 'Branches' },
  ];

  const handleDelete = branchId => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will delete the branch permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        router.delete(route('hrm.branches.destroy', branchId));
        Swal.fire('Deleted!', 'The branch has been deleted.', 'success');
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
          onClick={() => router.get(route('hrm.branches.show', rowData.id))}
          tooltip="View Branch"
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-warning p-button-sm"
          rounded
          onClick={() => router.get(route('hrm.branches.edit', rowData.id))}
          tooltip="Edit Branch"
        />
        <Button
          icon="pi pi-trash"
          rounded
          className="p-button-danger p-button-sm"
          onClick={() => handleDelete(rowData.id)}
          tooltip="Delete Branch"
        />
      </div>
    );
  };

  return (
    <AppLayout title="Branches Management">
      <Breadcrumb items={items} />

      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Branches</h1>
          <Button
            label="Add Branch"
            icon="pi pi-plus"
            className="p-button-primary bg-primary p-2 rounded-lg text-white"
            onClick={() => router.get(route('hrm.branches.create'))}
          />
        </div>

        <DataTable
          value={branches}
          paginator
          stripedRows
          rows={10}
          tableStyle={{ minWidth: '60rem' }}
          sortMode="multiple"
        >
          <Column
            field="name"
            header="Name"
            sortable
            filter
            filterPlaceholder="Search by name"
          />
          <Column
            field="location"
            header="Location"
            sortable
            filter
            filterPlaceholder="Search by location"
          />
          <Column
            field="description"
            header="Description"
            sortable
            filter
            filterPlaceholder="Search by description"
          />
          <Column
            field="manager.name"
            header="Manager"
            sortable
            filter
            filterPlaceholder="Search by manager"
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
