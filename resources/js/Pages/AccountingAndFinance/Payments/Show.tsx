import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import SectionTitle from '@/Components/SectionTitle';

const ShowPayment = ({ payment }) => {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Accounting & Finance', href: '/accounting' },
    { label: 'Payments', href: '/accounting/payments' },
    { label: 'Payment Details' },
  ];

  return (
    <AppLayout title="Payment Details">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title="Payment Details"
          description="View the details of the selected payment."
        />

        <div className="p-6 bg-white shadow-md rounded-lg col-span-2">
          <div className="field mb-4">
            <label className="font-semibold mb-2">Invoice ID</label>
            <div>{payment.invoice_id}</div>
          </div>

          <div className="field mb-4">
            <label className="font-semibold mb-2">Amount</label>
            <div>{payment.amount}</div>
          </div>

          <div className="field mb-4">
            <label className="font-semibold mb-2">Payment Date</label>
            <div>{new Date(payment.payment_date).toLocaleDateString()}</div>
          </div>

          <div className="field mb-4">
            <label className="font-semibold mb-2">Payment Method</label>
            <div>{payment.payment_method}</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ShowPayment;
