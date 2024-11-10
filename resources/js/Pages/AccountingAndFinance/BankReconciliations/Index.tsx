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

const Index = ({ bankReconciliations }) => {
  const route = useRoute();

  // Define the breadcrumb items
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Bank Reconciliations', href: '/bank-reconciliations' },
  ];

  // Handle delete action
  const handleDelete = (bankReconciliationId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will delete the bank reconciliation permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route('accounting.bank-reconciliations.destroy', bankReconciliationId));
        Swal.fire('Deleted!', 'The bank reconciliation has been deleted.', 'success');
      }
    });
  };

  // Action buttons template
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-eye"
          className="p-button-info p-button-sm"
          rounded
          onClick={() => router.get(route('accounting.bank-reconciliations.show', rowData.id))}
          tooltip="View Reconciliation"
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-warning p-button-sm"
          rounded
          onClick={() => router.get(route('accounting.bank-reconciliations.edit', rowData.id))}
          tooltip="Edit Reconciliation"
        />
        <Button
          icon="pi pi-trash"
          rounded
          className="p-button-danger p-button-sm"
          onClick={() => handleDelete(rowData.id)}
          tooltip="Delete Reconciliation"
        />
      </div>
    );
  };

  return (
    <AppLayout title="Bank Reconciliation Management">
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Manage Bank Reconciliations</h1>
          <Button
            label="Add Bank Reconciliation"
            icon="pi pi-plus"
            className="p-button-primary bg-primary p-2 rounded-lg text-white"
            onClick={() => router.get(route('accounting.bank-reconciliations.create'))}
          />
        </div>

        <DataTable
          value={bankReconciliations}
          paginator
          stripedRows
          rows={10}
          tableStyle={{ minWidth: '60rem' }}
          sortMode="multiple"
        >
          <Column
            field="bank_account.account_name"
            header="Account Name"
            sortable
            filter
            filterPlaceholder="Search by Account Name"
          />
          <Column
            field="reconciliation_date"
            header="Reconciliation Date"
            sortable
            filter
            filterPlaceholder="Search by Date"
            body={(rowData) => moment(rowData.reconciliation_date).format('MM/DD/YYYY')}
          />
          <Column
            field="statement_balance"
            header="Statement Balance"
            sortable
            filter
            filterPlaceholder="Search by Statement Balance"
          />
          <Column
            field="ledger_balance"
            header="Ledger Balance"
            sortable
            filter
            filterPlaceholder="Search by Ledger Balance"
          />
          <Column header="Actions" body={actionBodyTemplate} style={{ width: '12rem', textAlign: 'center' }} />
        </DataTable>
      </div>
    </AppLayout>
  );
};

export default Index;
