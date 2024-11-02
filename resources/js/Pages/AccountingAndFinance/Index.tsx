import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { DollarSign, FileText, User, CheckCircle } from 'lucide-react';

interface AccountingModule {
  label: string;
  icon: JSX.Element;
  href: string;
}

interface AccountingInsight {
  label: string;
  description: string;
  icon: JSX.Element;
}

const Index: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Accounting', href: '/accounting' },
  ];

  const accountingInsights: AccountingInsight[] = [
    { label: 'Total Invoices', description: 'Manage and track all invoices issued.', icon: <FileText className="text-green-500 mb-2" /> },
    { label: 'Total Payments', description: 'Overview of all payments received.', icon: <DollarSign className="text-green-500 mb-2" /> },
    { label: 'Outstanding Balances', description: 'Monitor outstanding payments and balances.', icon: <DollarSign className="text-green-500 mb-2" /> },
    { label: 'Sales Invoices', description: 'Track and manage sales invoices.', icon: <FileText className="text-green-500 mb-2" /> },
    { label: 'Purchase Orders', description: 'Manage and track purchase orders.', icon: <FileText className="text-green-500 mb-2" /> },
    { label: 'Budgets Overview', description: 'View and manage your budgeting.', icon: <DollarSign className="text-green-500 mb-2" /> },
    { label: 'Tax Reports', description: 'Generate and manage tax reports.', icon: <FileText className="text-green-500 mb-2" /> },
    { label: 'Bank Account Overview', description: 'Manage all bank accounts and transactions.', icon: <User className="text-green-500 mb-2" /> },
  ];

  const accountingModules: AccountingModule[] = [
    { label: 'Invoices', icon: <FileText className="mr-2" />, href: '/accounting/invoices' },
    { label: 'Payments', icon: <DollarSign className="mr-2" />, href: '/accounting/payments' },
    { label: 'Accounts', icon: <User className="mr-2" />, href: '/accounting/accounts' },
    { label: 'General Ledgers', icon: <FileText className="mr-2" />, href: '/accounting/general-ledgers' },
    { label: 'Journal Entries', icon: <FileText className="mr-2" />, href: '/accounting/journal-entries' },
    { label: 'Sales Invoices', icon: <FileText className="mr-2" />, href: '/accounting/sales-invoices' },
    { label: 'Purchase Orders', icon: <FileText className="mr-2" />, href: '/accounting/purchase-orders' },
    { label: 'Budgets', icon: <DollarSign className="mr-2" />, href: '/accounting/budgets' },
    { label: 'Taxes', icon: <FileText className="mr-2" />, href: '/accounting/taxes' },
    { label: 'Bank Accounts', icon: <User className="mr-2" />, href: '/accounting/bank-accounts' },
  ];

  return (
    <AppLayout title="Accounting Dashboard">
      <div className="overflow-hidden">
        <Breadcrumb items={breadcrumbItems} />

        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-4">Accounting Dashboard</h1>

          {/* Accounting Insights Section */}
          <h2 className="text-xl font-semibold mt-8 mb-4">Key Insights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {accountingInsights.map((insight, index) => (
              <div key={index} className="p-4 bg-white shadow rounded-lg flex flex-col">
                {insight.icon}
                <h3 className="font-medium">{insight.label}</h3>
                <p className="text-sm text-gray-600">{insight.description}</p>
                <CheckCircle className="text-green-500 mt-2" />
              </div>
            ))}
          </div>

          {/* Accounting Modules Section */}
          <h2 className="text-xl font-semibold mt-8 mb-4">Accounting & Finance Module</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {accountingModules.map((module, index) => (
              <div key={index} className="p-4 bg-white shadow rounded-lg flex items-center">
                {module.icon}
                <a href={module.href} className="text-blue-600 hover:underline">{module.label}</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default Index;
