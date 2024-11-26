import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Breadcrumb from '@/Components/Breadcrumb';
import useRoute from '@/Hooks/useRoute';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Index = ({ groups }) => {
  const route = useRoute();

  const items = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Hrm', href: '/hrm' },
    { label: 'Departments Groups' },
  ];

  const handleDelete = groupId => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will delete the department group permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        router.delete(
          route('hrm.department-groups.destroy', groupId),
        );

          Swal.fire('Deleted!', 'The department group has been deleted.', 'success');

        //   Swal.fire(
        //     'Error!',
        //     'There was an error deleting the department.',
        //     'error',
        //   );

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
          onClick={() => router.get(route('hrm.department-groups.show', rowData.id))}
          tooltip="View Department"
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-warning p-button-sm"
          rounded
          onClick={() => router.get(route('hrm.department-groups.edit', rowData.id))}
          tooltip="Edit Department"
        />
        <Button
          icon="pi pi-trash"
          rounded
          className="p-button-danger p-button-sm"
          onClick={() => handleDelete(rowData.id)}
          tooltip="Delete Department"
        />
      </div>
    );
  };

  return (
    <AppLayout title="Department Groups Management">
      <Breadcrumb items={items} />

      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Department Groups</h1>
          <Button
            label="Add Department Group"
            icon="pi pi-plus"
            className="p-button-primary bg-primary p-2 rounded-lg text-white"
            onClick={() => router.get(route('hrm.department-groups.create'))}
          />
        </div>

        <DataTable
          value={groups}
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
            field="description"
            header="Description"
            sortable
            filter
            filterPlaceholder="Search by description"
          />
          {/* <Column
            field="manager.name"
            header="Manager"
            sortable
            filter
            filterPlaceholder="Search by manager"
          /> */}

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
