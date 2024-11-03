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

const Index = ({ payments }) => {
  const route = useRoute();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Accounting', href: '/accounting' },
    { label: 'Payments' },
  ];

  const handleDelete = (paymentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will delete the payment permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route('accounting.payments.destroy', paymentId));
        Swal.fire('Deleted!', 'The payment has been deleted.', 'success');
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
          onClick={() => router.get(route('accounting.payments.show', rowData.id))}
          tooltip="View Payment"
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-warning p-button-sm"
          rounded
          onClick={() => router.get(route('accounting.payments.edit', rowData.id))}
          tooltip="Edit Payment"
        />
        <Button
          icon="pi pi-trash"
          rounded
          className="p-button-danger p-button-sm"
          onClick={() => handleDelete(rowData.id)}
          tooltip="Delete Payment"
        />
      </div>
    );
  };

  // Custom templates for date and amount (if necessary)
  const paymentDateTemplate = (rowData) => moment(rowData.payment_date).format('MMMM Do YYYY');

  return (
    <AppLayout title="Payment Management">
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Manage Payments</h1>
          <Button
            label="Make Payment"
            icon="pi pi-plus"
            className="p-button-primary bg-primary p-2 rounded-lg text-white"
            onClick={() => router.get(route('accounting.payments.create'))}
          />
        </div>

        <DataTable
          value={payments}
          paginator
          stripedRows
          rows={10}
          tableStyle={{ minWidth: '60rem' }}
          sortMode="multiple"
        >
          <Column field="invoice.customer.name" header="Customer Name" sortable filter filterPlaceholder="Search by name" />
          <Column
            field="payment_date"
            header="Payment Date"
            body={paymentDateTemplate}
            sortable
            filter
            filterPlaceholder="Search by payment date"
          />
          <Column
            field="amount"
            header="Amount"
            sortable
            filter
            filterPlaceholder="Search by amount"
          />
          <Column
            field="status"
            header="Status"
            // body={(rowData) => <Chip label={rowData.status} />}
            sortable
            filter
            filterPlaceholder="Search by status"
          />
          <Column header="Actions" body={actionBodyTemplate} style={{ width: '12rem', textAlign: 'center' }} />
        </DataTable>
      </div>
    </AppLayout>
  );
};

export default Index;
