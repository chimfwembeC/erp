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

export default function AdminDashboard() {

    const { t } = useTranslation();

    const stats = [
        { icon: Users, label: t('totalEmployees'), value: '156', change: '+12%' },
        { icon: UserCheck, label: t('presentToday'), value: '142', change: '91%' },
        { icon: Clock, label: t('onLeave'), value: '8', change: '5%' },
        { icon: Calendar, label: t('upcomingReviews'), value: '24', change: '' },
    ];

    return (
        <div className="py-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <Welcome />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat) => (
                        <StatCard key={stat.label} {...stat} />
                    ))}
                </div>

                <TaskLineChart />
                {/* Charts Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <DepartmentBarChart />
                    <ProjectPieChart />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="col-span col-span-3">

                        {/* Attendance Section */}
                        <div className="">
                            <Attendance />
                        </div>
                        <div className="mt-4">
                            <AdditionalFeatures />
                        </div>

                    </div>
                    <div className="col-span col-span-2">
                        <Activity />
                        <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores illum vel atque illo eum qui enim, exercitationem expedita, quam quae ut aspernatur dolor aliquid facilis laborum iste magnam dicta distinctio.
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
