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

const Index = ({ saleInvoices }) => {
  const route = useRoute();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Accounting', href: '/accounting' },
    // { label: 'Sales Invoices', href: '/sales-invoices' },
    { label: 'Sales Invoices' },
  ];

  const handleDelete = (invoiceId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will delete the invoice permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route('accounting.sales-invoices.destroy', invoiceId));
        Swal.fire('Deleted!', 'The invoice has been deleted.', 'success');
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
          onClick={() => router.get(route('accounting.sales-invoices.show', rowData.id))}
          tooltip="View Invoice"
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-warning p-button-sm"
          rounded
          onClick={() => router.get(route('accounting.sales-invoices.edit', rowData.id))}
          tooltip="Edit Invoice"
        />
        <Button
          icon="pi pi-trash"
          rounded
          className="p-button-danger p-button-sm"
          onClick={() => handleDelete(rowData.id)}
          tooltip="Delete Invoice"
        />
      </div>
    );
  };

  // Format the invoice date
  const invoiceDateTemplate = (rowData) => moment(rowData.invoice_date).format('MMMM Do YYYY');

  return (
    <AppLayout title="Invoice Management">
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Manage Sale Invoices</h1>
          <Button
            label="Create Invoice"
            icon="pi pi-plus"
            className="p-button-primary bg-primary p-2 rounded-lg text-white"
            onClick={() => router.get(route('accounting.sales-invoices.create'))}
          />
        </div>

        <DataTable
          value={saleInvoices}
          paginator
          stripedRows
          rows={10}
          tableStyle={{ minWidth: '60rem' }}
          sortMode="multiple"
        >
          <Column field="customer.name" header="Customer Name" sortable filter filterPlaceholder="Search by name" />
          <Column field="invoice_date" header="Invoice Date" body={invoiceDateTemplate} sortable filter filterPlaceholder="Search by date" />
          <Column field="total_amount" header="Total Amount" sortable filter filterPlaceholder="Search by amount" />
          <Column field="tax_amount" header="Tax Amount" sortable filter filterPlaceholder="Search by tax" />
          <Column field="discount_amount" header="Discount" sortable filter filterPlaceholder="Search by discount" />
          <Column field="status" header="Status" body={(rowData) => <Chip label={rowData.status} />} sortable filter filterPlaceholder="Search by status" />
          <Column header="Actions" body={actionBodyTemplate} style={{ width: '12rem', textAlign: 'center' }} />
        </DataTable>
      </div>
    </AppLayout>
  );
};

export default Index;
