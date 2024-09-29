import AppLayout from '@/Layouts/AppLayout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Employees from './Employees';
import Attendance from './Attendance';
import Payroll from './Payroll';
import Sidebar from './Components/Sidebar';
import { BreadCrumb } from 'primereact/breadcrumb';
import { useState } from 'react';

export default function Index() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const items = [{ label: 'HRM' }];
    const home = { icon: 'pi pi-home', url: 'HRM' };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <AppLayout title="HRM Dashboard">
            <div className="h-screen flex flex-col">
                <Router>
                    <div className="flex flex-1">
                        {/* Sidebar */}
                        <div className={`fixed z-30 inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:flex lg:w-64`}>
                            <Sidebar />
                        </div>

                        {/* Overlay for mobile when sidebar is open */}
                        {sidebarOpen && (
                            <div className="fixed inset-0 bg-black opacity-50 lg:hidden" onClick={toggleSidebar}></div>
                        )}

                        <div className="flex-1 flex flex-col">
                            {/* Header */}
                            <nav className="p-4 lg:p-6">
                                <div className="container mx-auto flex justify-between items-center">
                                    {/* Hamburger menu for mobile */}
                                    <button
                                        className="lg:hidden text-gray-600 focus:outline-none"
                                        onClick={toggleSidebar}
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                        </svg>
                                    </button>

                                    <BreadCrumb model={items} home={home} className="w-full lg:w-auto rounded-lg" />
                                </div>
                            </nav>

                            {/* Main Content */}
                            <main className="p-4 lg:p-8 flex-1 overflow-auto">
                                <Routes>
                                    <Route path="/hrm/dashboard" element={<Index />} />
                                    <Route path="/hrm/employees" element={<Employees />} />
                                    <Route path="/hrm/attendance" element={<Attendance />} />
                                    <Route path="/hrm/payroll" element={<Payroll />} />
                                </Routes>
                            </main>
                        </div>
                    </div>
                </Router>
            </div>
        </AppLayout>
    );
}
