import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import SectionTitle from '@/Components/SectionTitle';

const ShowAccount = ({ account }) => {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Accounting', href: '/accounting' },
    { label: 'Accounts', href: '/accounting/accounts' },
    { label: 'Show Account' },
  ];

  return (
    <AppLayout title="Show Account">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title="Account Details"
          description="View the details of the selected account."
        />

        <div className="p-6 bg-white shadow-md rounded-lg col-span-2">
          <div className="grid gap-4">
            <div className="field">
              <label className="font-semibold">Account Name:</label>
              <p>{account.account_name}</p>
            </div>

            <div className="field">
              <label className="font-semibold">Account Type:</label>
              <p>{account.account_type}</p>
            </div>

            <div className="field">
              <label className="font-semibold">Account Number:</label>
              <p>{account.account_number}</p>
            </div>

            <div className="field">
              <label className="font-semibold">Parent Account ID:</label>
              <p>{account.parent_account_id || 'None'}</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ShowAccount;
