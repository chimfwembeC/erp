import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import SectionTitle from '@/Components/SectionTitle';

const ShowBankAccount = ({ bankAccount }) => {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Accounting & Finance', href: '/accounting' },
    { label: 'Bank Accounts', href: '/accounting/bank-accounts' },
    { label: 'View' },
  ];

  return (
    <AppLayout title="View Bank Account">
      <Breadcrumb items={breadcrumbItems} />
      <SectionTitle
        title="Bank Account Details"
        description="Details of the selected bank account."
      />

      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="mb-4">
          <h3 className="font-semibold">Account Name</h3>
          <p>{bankAccount.account_name}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Account Number</h3>
          <p>{bankAccount.account_number}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Current Balance</h3>
          <p>{bankAccount.current_balance}</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default ShowBankAccount;
