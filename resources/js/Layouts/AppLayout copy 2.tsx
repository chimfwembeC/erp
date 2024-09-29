import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Home, User, FileText, Settings, Bell, Menu, X, ChevronDown, ChevronUp } from 'lucide-react';

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [employeeDropdownOpen, setEmployeeDropdownOpen] = useState(false);
  const [payrollDropdownOpen, setPayrollDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
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
            {/* Dashboard */}
            <li>
              <Link
                href="/dashboard"
                className="flex items-center p-2 space-x-2 hover:bg-indigo-100 rounded-md"
              >
                <Home size={20} />
                <span>Dashboard</span>
              </Link>
            </li>

            {/* Employees Dropdown */}
            <li>
              <div
                onClick={() => setEmployeeDropdownOpen(!employeeDropdownOpen)}
                className="flex items-center justify-between p-2 space-x-2 hover:bg-indigo-100 rounded-md cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <User size={20} />
                  <span>Employees</span>
                </div>
                {employeeDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>

              {/* Employees Sub-menu */}
              {employeeDropdownOpen && (
                <ul className="pl-6 space-y-2">
                  <li>
                    <Link href="/employees/list" className="block p-2 text-sm hover:bg-indigo-50 rounded-md">
                      Employee List
                    </Link>
                  </li>
                  <li>
                    <Link href="/employees/attendance" className="block p-2 text-sm hover:bg-indigo-50 rounded-md">
                      Attendance
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Payroll Dropdown */}
            <li>
              <div
                onClick={() => setPayrollDropdownOpen(!payrollDropdownOpen)}
                className="flex items-center justify-between p-2 space-x-2 hover:bg-indigo-100 rounded-md cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <FileText size={20} />
                  <span>Payroll</span>
                </div>
                {payrollDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>

              {/* Payroll Sub-menu */}
              {payrollDropdownOpen && (
                <ul className="pl-6 space-y-2">
                  <li>
                    <Link href="/payroll/salary" className="block p-2 text-sm hover:bg-indigo-50 rounded-md">
                      Salary
                    </Link>
                  </li>
                  <li>
                    <Link href="/payroll/reports" className="block p-2 text-sm hover:bg-indigo-50 rounded-md">
                      Payroll Reports
                    </Link>
                  </li>
                </ul>
              )}
            </li>
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
                    <Link href="/profile" className="block p-2 hover:bg-indigo-50 rounded-md">
                      Manage Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/settings" className="block p-2 hover:bg-indigo-50 rounded-md">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link href="/logout" className="block p-2 text-red-600 hover:bg-red-50 rounded-md">
                      Logout
                    </Link>
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
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2">
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold">{title}</h1>
          <nav className="flex items-center space-x-4">
            {/* Notifications Button */}
            <div className="relative">
              <button
                className="relative focus:outline-none"
                onClick={() => toggleDropdown('notifications')}
              >
                <Bell size={24} />
                <span className="absolute -top-2 -right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
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
                  <div className="p-2 px-4 block text-sm text-gray-800 font-semibold">Profile settings</div>
                  <ul>
                    <li>
                      <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">
                        Settings
                      </Link>
                    </li>
                  </ul>
                  <div className='m-2'>
                    <Link href="/logout" className="block px-4 py-2 text-white bg-red-500 p-2 rounded-lg hover:bg-red-700">
                      Logout
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            {activeDropdown === 'profile' && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
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
                  <li>
                    <Link href="/logout" className="block px-4 py-2 text-red-600 hover:bg-red-50">
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </nav>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto mt-16 p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
