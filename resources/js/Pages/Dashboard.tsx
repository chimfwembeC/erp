import React, { useEffect, useState } from 'react';
import Welcome from '@/Components/Welcome';
import AppLayout from '@/Layouts/AppLayout';
import Attendance from '@/Components/Attendance';
import Activity from '@/Components/Activity';
import TaskLineChart from '@/Components/Charts/Admin/TaskLineChart';
import DepartmentBarChart from '@/Components/Charts/Admin/DepartmentBarChart';
import ProjectPieChart from '@/Components/Charts/Admin/ProjectPieChart';
import AdditionalFeatures from '@/Components/AdditionalFeatures';
import { Users, UserCheck, Clock, Calendar } from 'lucide-react';
import { StatCard } from '@/Components/Shared/StatCard';
import useTypedPage from '@/Hooks/useTypedPage';
import CustomerDashboard from './Dashboards/CustomerDashboard';
import AdminDashboard from './Dashboards/AdminDashboard';

export default function Dashboard() {

    const page = useTypedPage();
    const user = page.props.auth?.user;
    const stats = [
        { icon: Users, label: 'Total Employees', value: '156', change: '+12%' },
        { icon: UserCheck, label: 'Present Today', value: '142', change: '91%' },
        { icon: Clock, label: 'On Leave', value: '8', change: '5%' },
        { icon: Calendar, label: 'Upcoming Reviews', value: '24', change: '' },
    ];

    return (
        <AppLayout title="Dashboard">

            {/* admin dashboard */}
            {user?.role === "admin" && (
                <AdminDashboard />
            )}
            {/* customer dashboard */}
            {user?.role === "customer" && (
                <CustomerDashboard />
            )}

        </AppLayout>
    );
}
