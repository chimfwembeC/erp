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
import { useTranslation } from 'react-i18next';

export default function CustomerDashboard() {
    const { t } = useTranslation();

    const stats = [
        { icon: Users, label: t('projects'), value: '10', change: '+12%' },
        { icon: UserCheck, label: t('invoices'), value: '8', change: '91%' },
        { icon: Clock, label: t('tickets'), value: '8', change: '5%' },
        { icon: Calendar, label: 'Upcoming Reviews', value: '24', change: '' },
    ];

    return (
        <div className="py-8">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat) => (
                        <StatCard key={stat.label} {...stat} />
                    ))}
                </div>


                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                    <Welcome />
                </div>


            </div>
        </div>
    );
}
