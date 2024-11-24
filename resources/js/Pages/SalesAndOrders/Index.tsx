import AppLayout from '@/Layouts/AppLayout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { User } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { DollarSign } from 'lucide-react';
import { FileText } from 'lucide-react';
import Breadcrumb from '@/Components/Breadcrumb';

export default function Index() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const items = [{ label: 'HRM' }];
  // const home = { icon: 'pi pi-home', url: 'HRM' };



  const items = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Sale And Orders', href: '/sale-orders' },
    // { label: 'Job Details' }, // No href for the current page
  ];

  return (
    <AppLayout title="HRM Dashboard">
      <div className="min-h-screen">
        <div className="p-4">
        <Breadcrumb items={items} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {[1,2,3,4].map(item => (
                <div index={item} className="animate-pulse bg-gray-300 h-48 rounded-md"></div>
            ))}
        </div>
      </div>
    </AppLayout>
  );
}
