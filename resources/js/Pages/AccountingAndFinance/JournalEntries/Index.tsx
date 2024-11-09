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

const Index = ({ journalEntries }) => {
  const route = useRoute();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Journal Entries', href: '/journal-entries' },
  ];

  const handleDelete = journalEntryId => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will delete the Journal Entry permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        router.delete(route('accounting.journal-entries.destroy', journalEntryId));
        Swal.fire('Deleted!', 'The Journal Entry has been deleted.', 'success');
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
          onClick={() => router.get(route('accounting.journal-entries.show', rowData.id))}
          tooltip="View Journal Entry"
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-warning p-button-sm"
          rounded
          onClick={() => router.get(route('accounting.journal-entries.edit', rowData.id))}
          tooltip="Edit Journal Entry"
        />
        <Button
          icon="pi pi-trash"
          rounded
          className="p-button-danger p-button-sm"
          onClick={() => handleDelete(rowData.id)}
          tooltip="Delete Journal Entry"
        />
      </div>
    );
  };

  return (
    <AppLayout title="Journal Entries Management">
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Manage journal Entries</h1>
          <Button
            label="Add Journal Entry"
            icon="pi pi-plus"
            className="p-button-primary bg-primary p-2 rounded-lg text-white"
            onClick={() => router.get(route('accounting.journal-entries.create'))}
          />
        </div>

        <DataTable
          value={journalEntries}
          paginator
          stripedRows
          rows={10}
          tableStyle={{ minWidth: '60rem' }}
          sortMode="multiple"
        >
          <Column field="reference" header="Reference" sortable filter filterPlaceholder="Search by reference" />
          <Column field="description" header="Description" sortable filter filterPlaceholder="Search by description" />
          <Column field="total_debit" header="Total Debit" sortable filter filterPlaceholder="Search by total debit" />
          <Column field="total_credit" header="Total Credit" sortable filter filterPlaceholder="Search by total credit" />
          <Column 
          field="entry_date" 
          header="Entry Date"  
        //   body={(rowData) => {
        //     moment(rowData.fiscal_year).format('YY')
        //   }} 
          sortable 
          filter           
          filterPlaceholder="Search by date" />
          <Column header="Actions" body={actionBodyTemplate} style={{ width: '12rem', textAlign: 'center' }} />
        </DataTable>
      </div>
    </AppLayout>
  );
};

export default Index;
