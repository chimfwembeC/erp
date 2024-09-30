import AppLayout from '@/Layouts/AppLayout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Employees from './Employees';
import Attendance from './Attendance';
import Payroll from './Payroll';
import Sidebar from './Components/Sidebar';
import { BreadCrumb } from 'primereact/breadcrumb';
import { useState } from 'react';
import { User } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { DollarSign } from 'lucide-react';
import { FileText } from 'lucide-react';
import AttendanceChart from './Components/AttendanceChart';
import PayrollChart from './Components/PayrollChart';

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

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    {/* Users Card */}
                    <div className="p-4 bg-white rounded-lg flex items-center">
                        <div className="bg-indigo-50 h-12 w-12 flex justify-center items-center p-2 rounded-lg">
                            <User className="h-8 w-8" />
                        </div>
                        <div className="text-xl ml-4">
                            Users: 300
                        </div>
                    </div>

                    {/* Attendance Card */}
                    <div className="p-4 bg-white rounded-lg flex items-center">
                        <div className="bg-green-50 h-12 w-12 flex justify-center items-center p-2 rounded-lg">
                            <CheckCircle className="h-8 w-8" />
                        </div>
                        <div className="text-xl ml-4">
                            Attendance: 150
                        </div>
                    </div>

                    {/* Payroll Card */}
                    <div className="p-4 bg-white rounded-lg flex items-center">
                        <div className="bg-blue-50 h-12 w-12 flex justify-center items-center p-2 rounded-lg">
                            <DollarSign className="h-8 w-8" />
                        </div>
                        <div className="text-xl ml-4">
                            Payroll: $50,000
                        </div>
                    </div>

                    {/* Job Applications Card */}
                    <div className="p-4 bg-white rounded-lg flex items-center">
                        <div className="bg-yellow-50 h-12 w-12 flex justify-center items-center p-2 rounded-lg">
                            <FileText className="h-8 w-8" />
                        </div>
                        <div className="text-xl ml-4">
                            Job Applications: 25
                        </div>
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-4">
                <div className="">
                    <h2 className="text-2xl font-semibold mb-4">Attendance Chart</h2>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <AttendanceChart />
                    </div>
                </div>

                <div className="">
                    <h2 className="text-2xl font-semibold mb-4">Payroll Chart</h2>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <PayrollChart />
                    </div>
                </div>
                </div>
            </div>
        </AppLayout>
    );
}
