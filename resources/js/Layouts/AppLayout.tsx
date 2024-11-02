import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react'; // Added `usePage`
import { Home, User, FileText, Settings, Bell, Menu, X, ChevronDown, ChevronUp, User2, DollarSign, ShoppingCart, HelpCircle, Clipboard, CheckCircle, Dot, Folder } from 'lucide-react';
import { useRoute } from 'ziggy-js';

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

const route = useRoute();


function logout(e: React.FormEvent) {
  e.preventDefault();
  router.post(route('logout'));
}

// Define the structure for sidebar links
interface SidebarLink {
  label: string;
  icon: React.ReactNode;
  href?: string;
  children?: SidebarLink[];
}

const sidebarLinks: SidebarLink[] = [
  { label: 'Dashboard', icon: <Home size={20} />, href: '/dashboard' },

  // Accounting & Finance Module
  {
    label: 'Accounting',
    icon: <DollarSign size={20} />,
    children: [
      { label: 'Invoices', href: '/accounting/invoices' },
      {
        label: 'Payments',
        href: '/accounting/payments',
        children: [
          { label: 'Make Payment', href: '/accounting/payments/make' },
          { label: 'Payment History', href: '/accounting/payments/history' },
        ],
      },
      {
        label: 'Accounts',
        href: '/accounting/accounts',
        children: [
          { label: 'Account Settings', href: '/accounting/accounts/settings' },
          { label: 'Account Balances', href: '/accounting/accounts/balances' },
          { label: 'Transaction History', href: '/accounting/accounts/transaction-history' },
        ],
      },
      { label: 'General Ledgers', href: '/accounting/general-ledgers' },
      { label: 'Journal Entries', href: '/accounting/journal-entries' },
      {
        label: 'Sales Invoices',
        href: '/accounting/sales-invoices',
        children: [
          { label: 'Create Sales Invoice', href: '/accounting/sales-invoices/create' },
          { label: 'Sales Invoice History', href: '/accounting/sales-invoices/history' },
        ],
      },
      {
        label: 'Purchase Orders',
        href: '/accounting/purchase-orders',
        children: [
          { label: 'Create Purchase Order', href: '/accounting/purchase-orders/create' },
          { label: 'Purchase Order History', href: '/accounting/purchase-orders/history' },
        ],
      },
      { label: 'Budgets', href: '/accounting/budgets' },
      { label: 'Taxes', href: '/accounting/taxes' },
      { label: 'Bank Accounts', href: '/accounting/bank-accounts' },
    ],
  },


  // Human Resources (HR) & Payroll Module
  {
    label: 'HRM System',
    icon: <User2 size={20} />,
    children: [
      { label: 'Overview', href: '/hrm' },
      { label: 'Departments', href: '/hrm/departments' },
      { label: 'Branches', href: '/hrm/branches' },
      { label: 'Jobs', href: '/hrm/jobs' },
      { label: 'Jobs Applications', href: '/hrm/job-applications' },
      { label: 'Attendance Management', href: '/hrm/attendances' },
      { label: 'Employee Management', href: '/hrm/employees' },
      { label: 'Leave Management', href: '/hrm/leaves' },
      { label: 'User Management', href: '/hrm/users' },      
      {
        label: 'Payroll Management',
        icon: <FileText size={20} />,
        children: [
          { label: 'Payrolls', href: '/payroll' },
          { label: 'Salary', href: '/payroll/salary' },
          { label: 'Payroll Reports', href: '/payroll/reports' },         
        ],
      },
      {
        label: 'HRM Setup',
        icon: <Settings size={20} />,
        children: [
          { label: 'Positions', href: '/hrm/positions' },
          { label: 'Leave Types', href: '/hrm/leave-types' },
          { label: 'Department Groups', href: '/hrm/department-groups' },
          { label: 'Net Pay', href: '/payroll/net-pay' },
          { label: 'HRM Setup', href: '/hrm/setup' },
        ],
      },
    ],
  },

  // Inventory & Warehouse Management Module
  {
    label: 'Inventory',
    icon: <ShoppingCart size={20} />,
    children: [
      {
        label: 'Products',
        href: '/inventory/products',
        children: [
          { label: 'Add New Product', href: '/inventory/products/add' },
          { label: 'Product Categories', href: '/inventory/products/categories' },
          { label: 'Product Suppliers', href: '/inventory/products/suppliers' },
          { label: 'Product Inventory', href: '/inventory/products/inventory' },
        ],
      },
      {
        label: 'Warehouses',
        href: '/inventory/warehouses',
        children: [
          { label: 'Add New Warehouse', href: '/inventory/warehouses/add' },
          { label: 'Warehouse Locations', href: '/inventory/warehouses/locations' },
        ],
      },
      { label: 'Inventory Movements', href: '/inventory/inventory-movements' },
      { label: 'Product Warehouse', href: '/inventory/product-warehouse' },
    ],
  },

  // Auditing & Compliance Module
  {
    label: 'Auditing',
    icon: <FileText size={20} />,
    children: [
      { label: 'Audit Trails', href: '/auditing/audit-trails' },
    ],
  },


  // Sales & Order Management Module
  {
    label: 'Sales',
    icon: <User size={20} />,
    children: [
      { label: 'Orders', href: '/sales/orders' },
      { label: 'Order Items', href: '/sales/order-items' },
      { label: 'Quotes', href: '/sales/quotes' },
    ],
  },

  // Project Management & Task Management Module
  {
    label: 'Projects',
    icon: <Folder size={20} />, // Assuming you have a folder icon
    children: [
      { label: 'Active Projects', href: '/projects/active' },
      { label: 'Completed Projects', href: '/projects/completed' },
      { label: 'Project Templates', href: '/projects/templates' },
    ],
  },

  // CRM Module
  {
    label: 'CRM',
    icon: <User size={20} />,
    children: [
      { label: 'Leads', href: '/crm/leads' },
      { label: 'Opportunities', href: '/crm/opportunities' },
      { label: 'Customers', href: '/crm/customers' },
    ],
  },

  // POS Module
  {
    label: 'POS',
    icon: <ShoppingCart size={20} />,
    children: [
      { label: 'Sales', href: '/pos/sales' },
      { label: 'Inventory', href: '/pos/inventory' },
      { label: 'Reports', href: '/pos/reports' },
    ],
  },

  // Support Module
  {
    label: 'Support',
    icon: <HelpCircle size={20} />,
    children: [
      { label: 'Tickets', href: '/support/tickets' },
      { label: 'Knowledge Base', href: '/support/knowledge-base' },
    ],
  },
];


export default function AppLayout({ title, children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeDropdowns, setActiveDropdowns] = useState<string[]>([]);

  // Get the current URL path using usePage hook from Inertia
  const { url } = usePage();

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const toggleDropdowns = (label: string) => {
    setActiveDropdowns((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const isActiveLink = (href?: string) => {
    return href && url === href; // Check if the current page matches the href
  };

  const renderLinks = (links: SidebarLink[]) => {
    return links.map((link) => (
      <li key={link.label}>
        {link.children ? (
          <div>
            <div
              onClick={() => toggleDropdowns(link.label)}
              className={`flex items-center justify-between p-2 space-x-2 rounded-md cursor-pointer ${
                activeDropdowns.includes(link.label) ? 'bg-indigo-100' : ''
              }`}
            >
              <div className="flex items-center space-x-2">
                {link.icon}
                <span>{link.label}</span>
              </div>
              {activeDropdowns.includes(link.label) ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </div>
            {activeDropdowns.includes(link.label) && (
              <ul className="pl-6 space-y-2">
                {renderLinks(link.children)}
              </ul>
            )}
          </div>
        ) : (
          <Link
            href={link.href!}
            className={`flex items-center p-2 space-x-2 rounded-md mt-2 ${
              isActiveLink(link.href) ? 'bg-indigo-200 font-bold' : 'hover:bg-indigo-100'
            }`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        )}
      </li>
    ));
  };


  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Head title={title} />
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-30 h-full w-72 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <nav className="h-full flex flex-col border-r">
          {/* Mobile Sidebar Toggle */}
          <div className="p-4 flex justify-between items-center lg:hidden">
            <h1 className="font-bold text-xl">Logo</h1>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
              <X size={24} />
            </button>
          </div>

          {/* Dashboard Link */}
          <div className="p-4">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Dashboard
            </Link>
          </div>

          {/* Sidebar Links */}
          <ul className="flex-1 p-4 space-y-3 overflow-auto">
            {renderLinks(sidebarLinks)}
          </ul>

          {/* User Section */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3">
              <img
                src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=John+Doe"
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">John Doe</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>

            {/* Dropdown for account actions */}
            <div className="mt-3">
              <details className="group">
                <summary className="flex items-center justify-between p-2 text-sm cursor-pointer hover:bg-indigo-50 rounded-md focus:outline-none">
                  <span className="text-gray-600">Account</span>
                  <ChevronDown size={20} className="group-open:hidden" />
                  <ChevronUp size={20} className="hidden group-open:block" />
                </summary>

                <ul className="pl-4 mt-1 space-y-2 text-sm text-gray-600">
                  <li>
                    <Link href="/profile" className="hover:text-indigo-600">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/settings" className="hover:text-indigo-600">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <span onClick={logout}  className="hover:text-red-600 cursor-pointer">
                      Logout
                    </span>
                  </li>
                </ul>
              </details>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-72">
        {/* MenuBar */}
        <header className="fixed top-0 left-0 lg:left-72 right-0 z-40 bg-white shadow-md p-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2">
            <Menu size={24} />
          </button>
          <h1 className="text-xs md:text-md lg:text-xl font-semibold">{title}</h1>
          <nav className="flex items-center space-x-4">
            {/* Notifications Button */}
            <div className="relative">
              <button
                className="relative focus:outline-none"
                onClick={() => toggleDropdown('notifications')}
              >
                <Bell size={24} />
                <span className="absolute -top-2 -right-1 w-4 h-4 bg-primary text-white text-xs flex items-center justify-center rounded-full">
                  5
                </span>
              </button>

              {/* Notifications Dropdown */}
              {activeDropdown === 'notifications' && (
                <div className="absolute right-0 top-12 mt-2 w-64 bg-white shadow-lg rounded-lg py-2">
                  <h3 className="px-4 py-2 text-sm font-semibold text-gray-700">Notifications</h3>
                  <ul className="divide-y divide-gray-200">
                    <li className="px-4 py-3 hover:bg-indigo-50">
                      <p className="text-sm text-gray-700">New message from Jane</p>
                      <p className="text-xs text-gray-500">5 mins ago</p>
                    </li>
                    <li className="px-4 py-3 hover:bg-indigo-50">
                      <p className="text-sm text-gray-700">Payroll update available</p>
                      <p className="text-xs text-gray-500">10 mins ago</p>
                    </li>
                    <li className="px-4 py-3 hover:bg-indigo-50">
                      <p className="text-sm text-gray-700">Attendance alert</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </li>
                  </ul>
                  <div className="text-center p-2">
                    <Link href="/notifications" className="text-xs text-indigo-600">View all notifications</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Settings Button */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('settings')}
                className="text-gray-700 focus:outline-none"
              >
                <Settings size={24} />
              </button>

              {/* Settings Dropdown */}
              {activeDropdown === 'settings' && (
                <div className="absolute right-0 top-12 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                  <ul>
                    <li>
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">
                        Settings
                      </Link>
                    </li>
                  </ul>
                  <div className="m-2">
                    <span onClick={logout} className="block cursor-pointer text-gray-800 py-2 p-2 rounded-lg hover:text-red-500">
                      Logout
                    </span>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto mt-16  md:p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
