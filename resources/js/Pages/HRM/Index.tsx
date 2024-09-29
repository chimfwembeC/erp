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
        setSidebarOpen((prev) => !prev);
    };

    return (
        <AppLayout title="HRM Dashboard">
            <div className="h-screen overflow-hidden">
            <nav className="bg-white shadow p-4 lg:p-6">
                            <div className="container mx-auto">
                                {/* Hamburger menu for mobile */}                              
                                <BreadCrumb model={items} home={home} className="w-full lg:w-auto rounded-lg" />
                            </div>
                        </nav>   
            </div>
        </AppLayout>
    );
}
