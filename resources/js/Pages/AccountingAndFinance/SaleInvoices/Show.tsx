import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import SectionTitle from '@/Components/SectionTitle';

const ShowInvoice = ({ invoice }) => {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Accounting & Finance', href: '/accounting' },
    { label: 'Invoices', href: '/accounting/invoices' },
    { label: 'Invoice Details' },
  ];

  return (
    <AppLayout title="Invoice Details">
      <Breadcrumb items={breadcrumbItems} />
      <SectionTitle title="Invoice Details" description="View the details of the invoice." />

      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="mb-4">
          <h4 className="font-semibold">Customer</h4>
          <p>{invoice.customer?.name}</p>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold">Total Amount</h4>
          <p>{invoice.total_amount}</p>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold">Tax Amount</h4>
          <p>{invoice.tax_amount}</p>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold">Discount Amount</h4>
          <p>{invoice.discount_amount}</p>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold">Invoice Date</h4>
          <p>{invoice.invoice_date}</p>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold">Due Date</h4>
          <p>{invoice.due_date}</p>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold">Status</h4>
          <p>{invoice.status}</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default ShowInvoice;
