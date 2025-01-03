import AppLayout from '@/Layouts/AppLayout';
import React, { useState } from 'react';
import { Calendar, Clock, User, UserCheck, Users } from 'lucide-react';
import AttendanceChart from './Components/Charts/AttendanceChart';
import PayrollChart from './Components/Charts/PayrollChart';
import Breadcrumb from '@/Components/Breadcrumb';
import { StatCard } from '@/Components/Shared/StatCard';
import Activity from '@/Components/Activity';
import { LeaveRequests } from './Components/LeaveRequests';

export default function Index() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // const items = [{ label: 'HRM' }];
    // const home = { icon: 'pi pi-home', url: 'HRM' };
    const [leaveRequests, setLeaveRequests] = useState([
        {
            id: 1,
            user_id: 101,
            start_date: '2023-01-01',
            end_date: '2023-01-03',
            status: 'Pending',
            deleted_at: null,
            created_at: '2023-01-01T08:00:00Z',
            updated_at: '2023-01-01T08:00:00Z',
        },
        {
            id: 2,
            user_id: 102,
            start_date: '2023-02-10',
            end_date: '2023-02-10',
            status: 'Approved',
            deleted_at: null,
            created_at: '2023-02-01T10:00:00Z',
            updated_at: '2023-02-01T10:00:00Z',
        },
        {
            id: 3,
            user_id: 103,
            start_date: '2023-03-01',
            end_date: '2023-03-15',
            status: 'Rejected',
            deleted_at: null,
            created_at: '2023-02-28T12:00:00Z',
            updated_at: '2023-03-01T09:00:00Z',
        },
        {
            id: 4,
            user_id: 104,
            start_date: '2023-04-05',
            end_date: '2023-04-06',
            status: 'Pending',
            deleted_at: null,
            created_at: '2023-04-01T07:00:00Z',
            updated_at: '2023-04-01T07:00:00Z',
        },
        {
            id: 5,
            user_id: 105,
            start_date: '2023-05-01',
            end_date: '2023-05-05',
            status: 'Approved',
            deleted_at: null,
            created_at: '2023-04-28T10:00:00Z',
            updated_at: '2023-04-28T10:00:00Z',
        },
        {
            id: 6,
            user_id: 106,
            start_date: '2023-06-10',
            end_date: '2023-06-13',
            status: 'Pending',
            deleted_at: null,
            created_at: '2023-06-01T08:30:00Z',
            updated_at: '2023-06-01T08:30:00Z',
        },
        {
            id: 7,
            user_id: 107,
            start_date: '2023-07-20',
            end_date: '2023-07-26',
            status: 'Rejected',
            deleted_at: null,
            created_at: '2023-07-15T09:00:00Z',
            updated_at: '2023-07-15T09:00:00Z',
        },
        {
            id: 8,
            user_id: 108,
            start_date: '2023-08-01',
            end_date: '2023-08-07',
            status: 'Approved',
            deleted_at: null,
            created_at: '2023-07-25T11:00:00Z',
            updated_at: '2023-07-25T11:00:00Z',
        },
        {
            id: 9,
            user_id: 109,
            start_date: '2023-09-10',
            end_date: '2023-09-12',
            status: 'Pending',
            deleted_at: null,
            created_at: '2023-09-01T10:00:00Z',
            updated_at: '2023-09-01T10:00:00Z',
        },
        {
            id: 10,
            user_id: 110,
            start_date: '2023-10-01',
            end_date: '2023-10-10',
            status: 'Approved',
            deleted_at: null,
            created_at: '2023-09-25T08:00:00Z',
            updated_at: '2023-09-25T08:00:00Z',
        },
        {
            id: 11,
            user_id: 111,
            start_date: '2023-11-01',
            end_date: '2023-11-07',
            status: 'Rejected',
            deleted_at: null,
            created_at: '2023-10-25T12:00:00Z',
            updated_at: '2023-10-25T12:00:00Z',
        },
        {
            id: 12,
            user_id: 112,
            start_date: '2023-12-05',
            end_date: '2023-12-15',
            status: 'Pending',
            deleted_at: null,
            created_at: '2023-12-01T09:00:00Z',
            updated_at: '2023-12-01T09:00:00Z',
        },
        {
            id: 13,
            user_id: 113,
            start_date: '2023-06-15',
            end_date: '2023-06-30',
            status: 'Approved',
            deleted_at: null,
            created_at: '2023-06-10T10:00:00Z',
            updated_at: '2023-06-10T10:00:00Z',
        },
        {
            id: 14,
            user_id: 114,
            start_date: '2023-07-05',
            end_date: '2023-07-10',
            status: 'Rejected',
            deleted_at: null,
            created_at: '2023-06-30T09:00:00Z',
            updated_at: '2023-06-30T09:00:00Z',
        },
        {
            id: 15,
            user_id: 115,
            start_date: '2023-09-15',
            end_date: '2023-09-20',
            status: 'Pending',
            deleted_at: null,
            created_at: '2023-09-01T08:00:00Z',
            updated_at: '2023-09-01T08:00:00Z',
        },
    ]);


    const handleApprove = (id: number) => {
        alert(`Approved leave request ID: ${id}`);
        setLeaveRequests((prev) => prev.filter((request) => request.id !== id));
    };

    const handleReject = (id: number) => {
        alert(`Rejected leave request ID: ${id}`);
        setLeaveRequests((prev) => prev.filter((request) => request.id !== id));
    };

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    const stats = [
        { icon: Users, label: 'Total Employees', value: '156', change: '+12%' },
        { icon: UserCheck, label: 'Present Today', value: '142', change: '91%' },
        { icon: Clock, label: 'On Leave', value: '8', change: '5%' },
        { icon: Calendar, label: 'Upcoming Reviews', value: '24', change: '' },
    ];

    const items = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Hrm', href: '/hrm' },
        // { label: 'Job Details' }, // No href for the current page
    ];


    return (
        <AppLayout title="HRM Dashboard">
            <Breadcrumb items={items} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>



            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-4">
                <div className="col-span col-span-3">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4">Attendance Chart</h2>
                            <div className="bg-white p-4 rounded-lg shadow">
                                <AttendanceChart />
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4">Payroll Chart</h2>
                            <div className="bg-white p-4 rounded-lg shadow">
                                <PayrollChart />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span col-span-2">
                    <Activity />
                    <div className="mt-4">
                        <LeaveRequests
                            requests={leaveRequests}
                            onApprove={handleApprove}
                            onReject={handleReject}
                        />
                    </div>
                </div>

            </div>

        </AppLayout>
    );
}
