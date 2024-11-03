import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import SectionTitle from '@/Components/SectionTitle';

const Show = ({ entry }) => {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Accounting & Finance', href: '/accounting' },
    { label: 'Show Entry' },
  ];

  return (
    <AppLayout title="Show Entry">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title="Entry Details"
          description="Here are the details of the selected entry."
        />

        <div className="p-6 bg-white shadow-md rounded-lg col-span-2">
          <div className="grid gap-4">
            <div className="field">
              <label className="font-semibold mb-2">Name</label>
              <p>{entry.name}</p>
            </div>

            <div className="field">
              <label className="font-semibold mb-2">Description</label>
              <p>{entry.description}</p>
            </div>

            <div className="field">
              <label className="font-semibold mb-2">Amount</label>
              <p>{entry.amount}</p>
            </div>

            <div className="field">
              <label className="font-semibold mb-2">Date</label>
              <p>{new Date(entry.transaction_date).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Show;
