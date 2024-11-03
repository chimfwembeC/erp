import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import SectionTitle from '@/Components/SectionTitle';

const ShowBudget = ({ budget }) => {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Accounting', href: '/accounting' },
    { label: 'Budgets', href: '/accounting/budgets' },
    { label: 'Details' },
  ];

  return (
    <AppLayout title="Budget Details">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title="Budget Details"
          description="View the information about this budget."
        />

        <div className="p-6 bg-white shadow-md rounded-lg col-span-2">
          <div className="grid gap-4">
            <div className="field">
              <label className="font-semibold mb-2">Account:</label>
              <p>{budget.account?.account_name}</p>
            </div>
            
            <div className="field">
              <label className="font-semibold mb-2">Budgeted Amount:</label>
              <p>{budget.budgeted_amount}</p>
            </div>
            
            <div className="field">
              <label className="font-semibold mb-2">Actual Amount:</label>
              <p>{budget.actual_amount}</p>
            </div>
            
            <div className="field">
              <label className="font-semibold mb-2">Fiscal Year:</label>
              <p>{budget.fiscal_year}</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ShowBudget;
