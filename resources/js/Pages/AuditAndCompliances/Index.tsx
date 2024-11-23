import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { DollarSign, FileText, User, CheckCircle, BanknoteIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface AuditAndComplianceModule {
  label: string;
  icon: JSX.Element;
  href: string;
}

interface AuditAndComplianceInsight {
  label: string;
  description: string;
  icon: JSX.Element;
}

const Index: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Auditing And Compliances', href: '/audit-trails' },
  ];

  const AuditAndComplianceInsights: AuditAndComplianceInsight[] = [
    { label: 'Operations Monitoring', description: 'Manage and track all foot prints left by user operations.', icon: <FileText className="text-green-500 mb-2" /> },
  ];

  const AuditAndComplianceModules: AuditAndComplianceModule[] = [
    { label: 'Audit trails', icon: <FileText className="mr-2" />, href: '/audit-trails' },
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
            {AuditAndComplianceInsights.map((insight, index) => (
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
            {AuditAndComplianceModules.map((module, index) => (
              <div key={index} className="p-4 bg-white shadow rounded-lg flex items-center">
                {module.icon}
                <Link href={module.href} className="text-blue-600 hover:underline">{module.label}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default Index;
