import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Breadcrumb from '@/Components/Breadcrumb';
import useRoute from '@/Hooks/useRoute';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';

const Index = ({ employees }) => {
  const route = useRoute();

  console.log(employees);
  const items = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Hrm', href: '/hrm' },
    { label: 'Employees' },
  ];

  const handleDelete = (employeeId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will delete the employee permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route('hrm.employees.destroy', employeeId), {
          onSuccess: () => {
            Swal.fire('Deleted!', 'The employee has been deleted.', 'success');
          },
          onError: () => {
            Swal.fire('Error!', 'There was an error deleting the employee.', 'error');
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
          onClick={() => router.get(route('hrm.employees.show', rowData.id))}
          tooltip="View Employee"
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-warning p-button-sm"
          rounded
          onClick={() => router.get(route('hrm.employees.edit', rowData.id))}
          tooltip="Edit Employee"
        />
        <Button
          icon="pi pi-trash"
          rounded
          className="p-button-danger p-button-sm"
          onClick={() => handleDelete(rowData.id)}
          tooltip="Delete Employee"
        />
      </div>
    );
  };

  return (
    <AppLayout title="Employees Management">
      <Breadcrumb items={items} />

      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Employees</h1>
          <Button
            label="Add Employee"
            icon="pi pi-plus"
            className="p-button-primary bg-primary p-2 rounded-lg text-white"
            onClick={() => router.get(route('hrm.employees.create'))}
          />
        </div>

        <DataTable
          value={employees}
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
            field="departments.name"
            header="Department"
            sortable
            filter
            filterPlaceholder="Search by department"
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
