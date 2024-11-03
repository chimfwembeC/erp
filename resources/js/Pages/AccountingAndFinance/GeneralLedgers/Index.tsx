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

const Index = ({ entries }) => {
  const route = useRoute();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Accounting', href: '/accounting' },
    { label: 'General Ledgers' },
  ];

  const handleDelete = entryId => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will delete the ledger entry permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        router.delete(route('accounting.general-ledgers.destroy', entryId));
        Swal.fire('Deleted!', 'The ledger entry has been deleted.', 'success');
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
          onClick={() => router.get(route('accounting.general-ledgers.show', rowData.id))}
          tooltip="View Entry"
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-warning p-button-sm"
          rounded
          onClick={() => router.get(route('accounting.general-ledgers.edit', rowData.id))}
          tooltip="Edit Entry"
        />
        <Button
          icon="pi pi-trash"
          rounded
          className="p-button-danger p-button-sm"
          onClick={() => handleDelete(rowData.id)}
          tooltip="Delete Entry"
        />
      </div>
    );
  };

  // Custom templates for date and amount
  const transactionDateTemplate = rowData => moment(rowData.transaction_date).format('MMMM Do YYYY');
  const amountTemplate = rowData => (rowData.debit ? `$${rowData.debit}` : `$${rowData.credit}`);
//   const itdebTemplate = rowData => (rowData.debit ? `$${rowData.debit}` : `$${rowData.credit}`);


  return (
    <AppLayout title="General Ledger Management">
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Manage General Ledgers</h1>
          <Button
            label="Add Entry"
            icon="pi pi-plus"
            className="p-button-primary bg-primary p-2 rounded-lg text-white"
            onClick={() => router.get(route('accounting.general-ledgers.create'))}
          />
        </div>

        <DataTable
          value={entries}
          paginator
          stripedRows
          rows={10}
          tableStyle={{ minWidth: '60rem' }}
          sortMode="multiple"
        >
          <Column field="account.account_name" header="Account Name" sortable filter filterPlaceholder="Search by account" />
          <Column
            field="transaction_date"
            header="Transaction Date"
            body={transactionDateTemplate}
            sortable
            filter
            filterPlaceholder="Search by transaction date"
          />
          <Column
            field="debit"
            header="Debit Amount"
            // body={amountTemplate}
            sortable
            filter
            filterPlaceholder="Search by debit amount"
          />
          <Column
            field="credit"
            header="Credit Amount"
            // body={amountTemplate}
            sortable
            filter
            filterPlaceholder="Search by credit amount"
          />
          <Column header="Actions" body={actionBodyTemplate} style={{ width: '12rem', textAlign: 'center' }} />
        </DataTable>
      </div>
    </AppLayout>
  );
};

export default Index;
