import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { Box, BoxIcon, WarehouseIcon, PackageIcon, FileText, CheckCircle } from 'lucide-react'; // Add relevant icons
import { Link } from '@inertiajs/react';

interface InventoryModule {
  label: string;
  icon: JSX.Element;
  href: string;
}

interface InventoryInsight {
  label: string;
  description: string;
  icon: JSX.Element;
}

const Index = () => {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Inventory & Warehouse Management', href: '/inventory' },
  ];

  const inventoryInsights: InventoryInsight[] = [
    { label: 'Total Products', description: 'Manage and track all your products in the system.', icon: <PackageIcon className="text-green-500 mb-2" /> },
    { label: 'Total Warehouses', description: 'Overview of all warehouses and locations.', icon: <WarehouseIcon className="text-green-500 mb-2" /> },
    { label: 'Inventory Movements', description: 'Track the movements of inventory across warehouses.', icon: <BoxIcon className="text-green-500 mb-2" /> },
    { label: 'Product Storage', description: 'Manage storage and stock levels for each product.', icon: <FileText className="text-green-500 mb-2" /> },
  ];

  const inventoryModules: InventoryModule[] = [
    { label: 'Products', icon: <PackageIcon className="mr-2" />, href: '/inventory/products' },
    { label: 'Warehouses', icon: <WarehouseIcon className="mr-2" />, href: '/inventory/warehouses' },
    { label: 'Inventory Movements', icon: <BoxIcon className="mr-2" />, href: '/inventory/movements' },
    { label: 'Product Storage', icon: <FileText className="mr-2" />, href: '/inventory/product-storage' },
    { label: 'Stock Adjustments', icon: <BoxIcon className="mr-2" />, href: '/inventory/stock-adjustments' },
    { label: 'Inventory Reports', icon: <FileText className="mr-2" />, href: '/inventory/reports' },
  ];

  return (
    <AppLayout title="Inventory & Warehouse Management Dashboard">
      <div className="overflow-hidden">
        <Breadcrumb items={breadcrumbItems} />

        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-4">Inventory & Warehouse Management Dashboard</h1>

          {/* Inventory Insights Section */}
          <h2 className="text-xl font-semibold mt-8 mb-4">Key Insights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {inventoryInsights.map((insight, index) => (
              <div key={index} className="p-4 bg-white shadow rounded-lg flex flex-col">
                {insight.icon}
                <h3 className="font-medium">{insight.label}</h3>
                <p className="text-sm text-gray-600">{insight.description}</p>
                <CheckCircle className="text-green-500 mt-2" />
              </div>
            ))}
          </div>

          {/* Inventory Modules Section */}
          <h2 className="text-xl font-semibold mt-8 mb-4">Inventory & Warehouse Modules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {inventoryModules.map((module, index) => (
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
