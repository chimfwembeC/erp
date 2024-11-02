import AppLayout from '@/Layouts/AppLayout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Employees from './EmployeeManagement/Index';
import Attendance from './AttendanceManagement/Index';
import Payroll from './Payrolls/Index';
import Sidebar from './Components/Sidebar';
import { useState } from 'react';
import { User } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { DollarSign } from 'lucide-react';
import { FileText } from 'lucide-react';
import AttendanceChart from './Components/Charts/AttendanceChart';
import PayrollChart from './Components/Charts/PayrollChart';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoiceDocument from './Components/Receipts/InvoiceDocument';
import Breadcrumb from '@/Components/Breadcrumb';

export default function Index() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // const items = [{ label: 'HRM' }];
    // const home = { icon: 'pi pi-home', url: 'HRM' };

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    const invoiceData = {
        "companyLogoUrl": "https://example.com/logo.png",
        "companyName": "ABC Company",
        "companyAddress": "123 Main Street, City, State, ZIP",
        "companyEmail": "support@company.com",
        "companyPhone": "(123) 456-7890",
        "companyWebsite": "www.abccompany.com",
        "invoiceNumber": "INV-1001",
        "date": "2024-10-01",
        "dueDate": "2024-10-31",
        "paymentTerms": "Net 30",
        "customerName": "John Doe",
        "customerAddress": "456 Elm Street, City, State, ZIP",
        "customerEmail": "johndoe@example.com",
        "customerPhone": "(098) 765-4321",
        "items": [
            {
                "description": "Product 1",
                "quantity": 2,
                "unitPrice": 50.00
            },
            {
                "description": "Product 2",
                "quantity": 1,
                "unitPrice": 150.00
            }
        ],
        "subtotal": 250.00,
        "tax": 20.00,
        "total": 270.00,
        "footerNote": "Thank you for your business!"
    };
    
    const items = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Hrm', href: '/hrm' },
        // { label: 'Job Details' }, // No href for the current page
      ];
    

    return (
        <AppLayout title="HRM Dashboard">
            <div className="h-screen overflow-hidden">
            <Breadcrumb items={items} />

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

                <div>
        <PDFDownloadLink document={<InvoiceDocument invoiceData={invoiceData} />} fileName="invoice.pdf">
            {({ loading }) => (loading ? 'Loading document...' : 'Download Invoice')}
        </PDFDownloadLink>
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
