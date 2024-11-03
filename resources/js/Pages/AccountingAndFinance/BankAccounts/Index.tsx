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

const Index = ({ bankAccounts }) => {
  const route = useRoute();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Accounting', href: '/accounting' },
    { label: 'Bank Accounts' },
  ];

  const handleDelete = accountId => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will delete the bank account permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        router.delete(route('accounting.bank-accounts.destroy', accountId))
        
            Swal.fire('Deleted!', 'The bank account has been deleted.', 'success');
                
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
          onClick={() => router.get(route('accounting.bank-accounts.show', rowData.id))}
          tooltip="View Account"
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-warning p-button-sm"
          rounded
          onClick={() => router.get(route('accounting.bank-accounts.edit', rowData.id))}
          tooltip="Edit Account"
        />
        <Button
          icon="pi pi-trash"
          rounded
          className="p-button-danger p-button-sm"
          onClick={() => handleDelete(rowData.id)}
          tooltip="Delete Account"
        />
      </div>
    );
  };

  return (
    <AppLayout title="Bank Account Management">
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Manage Bank Accounts</h1>
          <Button
            label="Add Bank Account"
            icon="pi pi-plus"
            className="p-button-primary bg-primary p-2 rounded-lg text-white"
            onClick={() => router.get(route('accounting.bank-accounts.create'))}
          />
        </div>

        <DataTable
          value={bankAccounts}
          paginator
          stripedRows
          rows={10}
          tableStyle={{ minWidth: '60rem' }}
          sortMode="multiple"
        >
          <Column field="account_name" header="Account Name" sortable filter filterPlaceholder="Search by name" />
          <Column field="account_number" header="Account Number" sortable filter filterPlaceholder="Search by number" />
          {/* <Column field="bank_name" header="Bank Name" sortable filter filterPlaceholder="Search by bank name" /> */}
          <Column header="Actions" body={actionBodyTemplate} style={{ width: '12rem', textAlign: 'center' }} />
        </DataTable>
      </div>
    </AppLayout>
  );
};

export default Index;
