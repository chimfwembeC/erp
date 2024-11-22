import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react'; // Added `usePage`
import {
  Home,
  User,
  FileText,
  Settings,
  Bell,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  User2,
  DollarSign,
  ShoppingCart,
  HelpCircle,
  Clipboard,
  CheckCircle,
  Dot,
  Folder,
  DotIcon,
  Warehouse,
  ListOrdered,
  PiggyBankIcon,
} from 'lucide-react';
import { useRoute } from 'ziggy-js';
import { FaFileInvoice, FaMoneyCheckAlt, FaProductHunt } from 'react-icons/fa';
import SearchInput from '@/Components/SearchInput';

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
      { label: 'Overview', icon: <DotIcon size={20} />, href: '/accounting' },
      {
        label: 'Invoices',
        icon: <DotIcon size={20} />,
        href: '/accounting/invoices',
      },

      {
        label: 'Payments',
        href: '/accounting/payments',
        icon: <FaMoneyCheckAlt size={20} />,
        children: [
          {
            label: 'Overview',
            icon: <DotIcon size={20} />,
            href: '/accounting/payments',
          },
          {
            label: 'Make Payment',
            icon: <DotIcon size={20} />,
            href: '/accounting/payments/create',
          },
          {
            label: 'Payment History',
            icon: <DotIcon size={20} />,
            href: '/accounting/payments/history',
          },
        ],
      },
      {
        label: 'Accounts',
        href: '/accounting/accounts',
        icon: <PiggyBankIcon size={20} />,
        children: [
          {
            label: 'Overview',
            icon: <DotIcon size={20} />,
            href: '/accounting/accounts',
          },
          {
            label: 'Account Settings',
            icon: <DotIcon size={20} />,
            href: '/accounting/accounts/settings',
          },
          {
            label: 'Account Balances',
            icon: <DotIcon size={20} />,
            href: '/accounting/accounts/balances',
          },
          {
            label: 'Transaction History',
            icon: <DotIcon size={20} />,
            href: '/accounting/accounts/transaction-history',
          },
        ],
      },
      {
        label: 'General Ledgers',
        icon: <DotIcon size={20} />,
        href: '/accounting/general-ledgers',
      },
      {
        label: 'Journal Entries',
        icon: <DotIcon size={20} />,
        href: '/accounting/journal-entries',
      },
      {
        label: 'Sales Invoices',
        href: '/accounting/sales-invoices',
        icon: <FaFileInvoice size={20} />,
        children: [
          {
            label: 'Overview',
            icon: <DotIcon size={20} />,
            href: '/accounting/sales-invoices',
          },
          {
            label: 'Create Sales Invoice',
            icon: <DotIcon size={20} />,
            href: '/accounting/sales-invoices/create',
          },
          {
            label: 'Sales Invoice History',
            icon: <DotIcon size={20} />,
            href: '/accounting/sales-invoices/history',
          },
        ],
      },
      {
        label: 'Bank Reconciliation',
        href: '/accounting/bank-reconciliations',
        icon: <ListOrdered size={20} />,
        children: [
          {
            label: 'Overview',
            icon: <DotIcon size={20} />,
            href: '/accounting/bank-reconciliations',
          },
          {
            label: 'Create Reconciliation',
            icon: <DotIcon size={20} />,
            href: '/accounting/bank-reconciliations/create',
          },
          // {
          //   label: 'Purchase Order History',
          //   icon: <DotIcon size={20} />,
          //   href: '/accounting/purchase-orders/history',
          // },
        ],
      },
      {
        label: 'Purchase Orders',
        href: '/accounting/purchase-orders',
        icon: <ListOrdered size={20} />,
        children: [
          {
            label: 'Overview',
            icon: <DotIcon size={20} />,
            href: '/accounting/purchase-orders',
          },
          {
            label: 'Create Purchase Order',
            icon: <DotIcon size={20} />,
            href: '/accounting/purchase-orders/create',
          },
          {
            label: 'Purchase Order History',
            icon: <DotIcon size={20} />,
            href: '/accounting/purchase-orders/history',
          },
        ],
      },
      {
        label: 'Budgets',
        icon: <DotIcon size={20} />,
        href: '/accounting/budgets',
      },
      {
        label: 'Taxes',
        icon: <DotIcon size={20} />,
        href: '/accounting/taxes',
      },
      {
        label: 'Bank Accounts',
        icon: <DotIcon size={20} />,
        href: '/accounting/bank-accounts',
      },
    ],
  },

  // Human Resources (HR) & Payroll Module
  {
    label: 'HRM System',
    icon: <User2 size={20} />,
    children: [
      { label: 'Overview', icon: <DotIcon size={20} />, href: '/hrm' },
      {
        label: 'Departments',
        icon: <DotIcon size={20} />,
        href: '/hrm/departments',
      },
      { label: 'Branches', icon: <DotIcon size={20} />, href: '/hrm/branches' },
      { label: 'Jobs', icon: <DotIcon size={20} />, href: '/hrm/jobs' },
      {
        label: 'Applications',
        icon: <DotIcon size={20} />,
        href: '/hrm/job-applications',
      },
      {
        label: 'Attendances',
        icon: <DotIcon size={20} />,
        href: '/hrm/attendances',
      },
      {
        label: 'Employees',
        icon: <DotIcon size={20} />,
        href: '/hrm/employees',
      },
      { label: 'Leaves', icon: <DotIcon size={20} />, href: '/hrm/leaves' },
      { label: 'Users', icon: <DotIcon size={20} />, href: '/hrm/users' },
      {
        label: 'Payroll Management',
        icon: <FileText size={20} />,
        children: [
          {
            label: 'Payrolls',
            icon: <DotIcon size={20} />,
            href: '/hrm/payrolls',
          },
          // { label: 'Salary', href: '/payroll/salary' },
          {
            label: 'Payroll Reports',
            icon: <DotIcon size={20} />,
            href: '/hrm/payroll/reports',
          },
        ],
      },
      {
        label: 'HRM Setup',
        icon: <Settings size={20} />,
        children: [
          {
            label: 'Positions',
            icon: <DotIcon size={20} />,
            href: '/hrm/positions',
          },
          {
            label: 'Leave Types',
            icon: <DotIcon size={20} />,
            href: '/hrm/leave-types',
          },
          {
            label: 'Department Groups',
            icon: <DotIcon size={20} />,
            href: '/hrm/department-groups',
          },
          {
            label: 'Net Pay',
            icon: <DotIcon size={20} />,
            href: '/payroll/net-pay',
          },
          {
            label: 'HRM Setup',
            icon: <DotIcon size={20} />,
            href: '/hrm/setup',
          },
        ],
      },
    ],
  },

  // Inventory & Warehouse Management Module
  {
    label: 'Inventory System',
    icon: <ShoppingCart size={20} />,
    children: [
      {
        label: 'Overview',
        icon: <DotIcon size={20} />,
        href: '/inventory',
      },
      {
        label: 'Products',
        href: '/inventory/products',
        icon: <FaProductHunt size={20} />,
        children: [
          {
            label: 'Overview',
            icon: <DotIcon size={20} />,
            href: '/inventory/products',
          },
          {
            label: 'Add New Product',
            icon: <DotIcon size={20} />,
            href: '/inventory/products/create',
          },
          {
            label: 'Product Categories',
            icon: <DotIcon size={20} />,
            href: '/inventory/products/categories',
          },
          {
            label: 'Product Suppliers',
            icon: <DotIcon size={20} />,
            href: '/inventory/products/suppliers',
          },
          {
            label: 'Product Inventory',
            icon: <DotIcon size={20} />,
            href: '/inventory/products/inventory',
          },
        ],
      },
      {
        label: 'Warehouses',
        href: '/inventory/warehouses',
        icon: <Warehouse size={20} />,
        children: [
            {
                label: 'Overview',
                icon: <DotIcon size={20} />,
                href: '/inventory/warehouses',
              },
          {
            label: 'Add New Warehouse',
            icon: <DotIcon size={20} />,
            href: '/inventory/warehouses/add',
          },
          {
            label: 'Warehouse Locations',
            icon: <DotIcon size={20} />,
            href: '/inventory/warehouses/locations',
          },
        ],
      },
      {
        label: 'Inventory Movements',
        icon: <DotIcon size={20} />,
        href: '/inventory/inventory-movements',
      },
      {
        label: 'Product Warehouse',
        icon: <DotIcon size={20} />,
        href: '/inventory/product-warehouse',
      },
    ],
  },

  // Auditing & Compliance Module
  {
    label: 'Auditing',
    icon: <FileText size={20} />,
    children: [
      {
        label: 'Audit Trails',
        icon: <DotIcon size={20} />,
        href: '/audit-trails',
      },
    ],
  },

  // Sales & Order Management Module
  {
    label: 'Sales',
    icon: <User size={20} />,
    children: [
      { label: 'Orders', icon: <DotIcon size={20} />, href: '/sales/orders' },
      {
        label: 'Order Items',
        icon: <DotIcon size={20} />,
        href: '/sales/order-items',
      },
      { label: 'Quotes', icon: <DotIcon size={20} />, href: '/sales/quotes' },
    ],
  },

  // Project Management & Task Management Module
  {
    label: 'Projects',
    icon: <Folder size={20} />, // Assuming you have a folder icon
    children: [
      {
        label: 'Active Projects',
        icon: <DotIcon size={20} />,
        href: '/projects/active',
      },
      {
        label: 'Completed Projects',
        icon: <DotIcon size={20} />,
        href: '/projects/completed',
      },
      {
        label: 'Project Templates',
        icon: <DotIcon size={20} />,
        href: '/projects/templates',
      },
    ],
  },

  // CRM Module
  {
    label: 'CRM',
    icon: <User size={20} />,
    children: [
      { label: 'Leads', icon: <DotIcon size={20} />, href: '/crm/leads' },
      {
        label: 'Opportunities',
        icon: <DotIcon size={20} />,
        href: '/crm/opportunities',
      },
      {
        label: 'Customers',
        icon: <DotIcon size={20} />,
        href: '/crm/customers',
      },
    ],
  },

  // POS Module
  {
    label: 'POS',
    icon: <ShoppingCart size={20} />,
    children: [
      { label: 'Sales', icon: <DotIcon size={20} />, href: '/pos/sales' },
      {
        label: 'Inventory',
        icon: <DotIcon size={20} />,
        href: '/pos/inventory',
      },
      { label: 'Reports', icon: <DotIcon size={20} />, href: '/pos/reports' },
    ],
  },

  // Support Module
  {
    label: 'Support',
    icon: <HelpCircle size={20} />,
    children: [
      {
        label: 'Tickets',
        icon: <DotIcon size={20} />,
        href: '/support/tickets',
      },
      {
        label: 'Knowledge Base',
        icon: <DotIcon size={20} />,
        href: '/support/knowledge-base',
      },
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
    setActiveDropdowns(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label],
    );
  };

  const isActiveLink = (href?: string) => {
    return href && url === href; // Check if the current page matches the href
  };

  const renderLinks = (links: SidebarLink[]) => {
    return links.map(link => (
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
              <ul className="space-y-2">
                <div className="">{renderLinks(link.children)}</div>
              </ul>
            )}

            <div className="border-1 my-2 border-b border-primary"></div>
          </div>
        ) : (
          <>
            <Link
              href={link.href!}
              className={`flex items-center p-2 space-x-2 rounded-md mt-2 ${
                isActiveLink(link.href)
                  ? 'bg-indigo-200 font-bold'
                  : 'hover:bg-indigo-100'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          </>
        )}
      </li>
    ));
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Head title={title} />
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <nav className="h-full flex flex-col border-r">
          {/* Mobile Sidebar Toggle */}
          <div className="p-4 flex justify-between items-center lg:hidden">
            <h1 className="font-bold text-xl">Logo</h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2"
            >
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
                      Profilepencil
                    </Link>
                  </li>
                  <li>
                    <Link href="/settings" className="hover:text-indigo-600">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <span
                      onClick={logout}
                      className="hover:text-red-600 cursor-pointer"
                    >
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
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* MenuBar */}
        <header className="fixed top-0 left-0 lg:left-64 right-0 z-40 bg-white shadow-md p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xs md:text-md lg:text-xl font-semibold">
            {title}
          </h1>
          <nav className="flex items-center space-x-4">
            <div className="">
              <SearchInput links={sidebarLinks} />
            </div>
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
                  <h3 className="px-4 py-2 text-sm font-semibold text-gray-700">
                    Notifications
                  </h3>
                  <ul className="divide-y divide-gray-200">
                    <li className="px-4 py-3 hover:bg-indigo-50">
                      <p className="text-sm text-gray-700">
                        New message from Jane
                      </p>
                      <p className="text-xs text-gray-500">5 mins ago</p>
                    </li>

                    <div className="border-1 border-b bg-primary"></div>

                    <li className="px-4 py-3 hover:bg-indigo-50">
                      <p className="text-sm text-gray-700">
                        Payroll update available
                      </p>
                      <p className="text-xs text-gray-500">10 mins ago</p>
                    </li>

                    <div className="border-1 border-b bg-primary"></div>

                    <li className="px-4 py-3 hover:bg-indigo-50">
                      <p className="text-sm text-gray-700">Attendance alert</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </li>
                  </ul>

                  <div className="border-1 border-b bg-primary"></div>

                  <div className="text-center p-2">
                    <Link
                      href="/notifications"
                      className="text-xs text-indigo-600"
                    >
                      View all notifications
                    </Link>
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
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                      >
                        Profile
                      </Link>
                    </li>

                    <div className="border-1 border-b bg-primary"></div>

                    <li>
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                      >
                        Settings
                      </Link>
                    </li>
                  </ul>
                  <div className="border-1 border-b bg-primary"></div>
                  <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50">
                    <span onClick={logout} className="cursor-pointer">
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
