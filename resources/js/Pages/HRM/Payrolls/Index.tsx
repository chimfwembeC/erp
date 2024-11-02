import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Breadcrumb from '@/Components/Breadcrumb';
import useRoute from '@/Hooks/useRoute';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';

const Index = ({ payrolls }) => {
  const route = useRoute();

  const items = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Payroll Management', href: '/hrm/payrolls' },
    { label: 'Payrolls' },
  ];

  const handleDelete = (payrollId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will delete the payroll record permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route('hrm.payrolls.destroy', payrollId), {
          onSuccess: () => {
            Swal.fire('Deleted!', 'The payroll record has been deleted.', 'success')
            // .then(() => {
            //   router.get(route('hrm.payrolls.index')); // Redirect after deletion
            // });
          },
          onError: () => {
            Swal.fire('Error!', 'There was an error deleting the payroll record.', 'error');
          },
        });
      }
    });
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-eye"
          className="p-button-info p-button-sm"
          rounded
          onClick={() => router.get(route('hrm.payrolls.show', rowData.id))}
          tooltip="View Payroll"
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-warning p-button-sm"
          rounded
          onClick={() => router.get(route('hrm.payrolls.edit', rowData.id))}
          tooltip="Edit Payroll"
        />
        <Button
          icon="pi pi-trash"
          rounded
          className="p-button-danger p-button-sm"
          onClick={() => handleDelete(rowData.id)}
          tooltip="Delete Payroll"
        />
      </div>
    );
  };

  return (
    <AppLayout title="Payroll Management">
      <Breadcrumb items={items} />

      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Payroll Management</h1>
          <Button
            label="Add Payroll"
            icon="pi pi-plus"
            className="p-button-primary bg-primary p-2 rounded-lg text-white"
            onClick={() => router.get(route('hrm.payrolls.create'))}
          />
        </div>

        <DataTable
          value={payrolls}
          paginator
          stripedRows
          rows={10}
          tableStyle={{ minWidth: '60rem' }}
          sortMode="multiple"
        >
          <Column
            field="user.name"
            header="Employee"
            sortable
            filter
            filterPlaceholder="Search by employee"
          />
          <Column
            field="pay_date"
            header="Pay Date"
            sortable
            filter
            filterPlaceholder="Search by date"
          />
          <Column
            field="amount"
            header="Salary"
            sortable
            filter
            filterPlaceholder="Search by salary"
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
