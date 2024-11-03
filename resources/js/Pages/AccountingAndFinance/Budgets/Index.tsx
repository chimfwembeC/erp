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

const Index = ({ budgets }) => {
  const route = useRoute();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Budgets', href: '/budgets' },
  ];

  const handleDelete = budgetId => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will delete the budget permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        router.delete(route('accounting.budgets.destroy', budgetId));
        Swal.fire('Deleted!', 'The budget has been deleted.', 'success');
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
          onClick={() => router.get(route('accounting.budgets.show', rowData.id))}
          tooltip="View Budget"
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-warning p-button-sm"
          rounded
          onClick={() => router.get(route('accounting.budgets.edit', rowData.id))}
          tooltip="Edit Budget"
        />
        <Button
          icon="pi pi-trash"
          rounded
          className="p-button-danger p-button-sm"
          onClick={() => handleDelete(rowData.id)}
          tooltip="Delete Budget"
        />
      </div>
    );
  };

  return (
    <AppLayout title="Budget Management">
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Manage Budgets</h1>
          <Button
            label="Add Budget"
            icon="pi pi-plus"
            className="p-button-primary bg-primary p-2 rounded-lg text-white"
            onClick={() => router.get(route('accounting.budgets.create'))}
          />
        </div>

        <DataTable
          value={budgets}
          paginator
          stripedRows
          rows={10}
          tableStyle={{ minWidth: '60rem' }}
          sortMode="multiple"
        >
          <Column field="account.account_name" header="Account ID" sortable filter filterPlaceholder="Search by Account ID" />
          <Column field="budgeted_amount" header="Budgeted Amount" sortable filter filterPlaceholder="Search by Amount" />
          <Column field="actual_amount" header="Actual Amount" sortable filter filterPlaceholder="Search by Actual Amount" />
          <Column 
          field="fiscal_year" 
          header="Fiscal Year"  
        //   body={(rowData) => {
        //     moment(rowData.fiscal_year).format('YY')
        //   }} 
          sortable 
          filter 
          filterPlaceholder="Search by Year" />
          <Column header="Actions" body={actionBodyTemplate} style={{ width: '12rem', textAlign: 'center' }} />
        </DataTable>
      </div>
    </AppLayout>
  );
};

export default Index;
