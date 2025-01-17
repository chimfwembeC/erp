import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Breadcrumb from '@/Components/Breadcrumb';
import useRoute from '@/Hooks/useRoute';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';

const Index = ({ users }) => {
  const route = useRoute();

  console.log(users);
  const items = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'User Management', href: '/hrm/users' },
    { label: 'Users' },
  ];

  const handleDelete = (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will delete the user permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route('users.destroy', userId), {
          onSuccess: () => {
            Swal.fire('Deleted!', 'The user has been deleted.', 'success').then(() => {
              router.get(route('hrm.users.index')); // Redirect after deletion
            });
          },
          onError: () => {
            Swal.fire('Error!', 'There was an error deleting the user.', 'error');
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
          onClick={() => router.get(route('hrm.users.show', rowData.id))}
          tooltip="View User"
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-warning p-button-sm"
          rounded
          onClick={() => router.get(route('hrm.users.edit', rowData.id))}
          tooltip="Edit User"
        />
        <Button
          icon="pi pi-trash"
          rounded
          className="p-button-danger p-button-sm"
          onClick={() => handleDelete(rowData.id)}
          tooltip="Delete User"
        />
      </div>
    );
  };

  return (
    <AppLayout title="User Management">
      <Breadcrumb items={items} />

      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Users</h1>
          <Button
            label="Add User"
            icon="pi pi-plus"
            className="p-button-primary bg-primary p-2 rounded-lg text-white"
            onClick={() => router.get(route('hrm.users.create'))}
          />
        </div>

        <DataTable
          value={users}
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
            field="email"
            header="Email"
            sortable
            filter
            filterPlaceholder="Search by email"
          />
          <Column
            field="role"
            header="Role"
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
