import AppLayout from '@/Layouts/AppLayout';
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, UserCheck, Users } from 'lucide-react';
import Breadcrumb from '@/Components/Breadcrumb';
import { StatCard } from '@/Components/Shared/StatCard';

export default function Index() {
    const [loading, setLoading] = useState(true);

    // Simulate loading time
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds loading time
        return () => clearTimeout(timer);
    }, []);

    const stats = [
        { icon: Users, label: 'Total Employees', value: '156', change: '+12%' },
        { icon: UserCheck, label: 'Present Today', value: '142', change: '91%' },
        { icon: Clock, label: 'On Leave', value: '8', change: '5%' },
        { icon: Calendar, label: 'Upcoming Reviews', value: '24', change: '' },
    ];

    const items = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Sale And Orders', href: '/sale-orders' },
    ];

    return (
        <AppLayout title="HRM Dashboard">
            <div className="min-h-screen">
                <div className="p-4">
                    <Breadcrumb items={items} />
                </div>

                {loading ? (
                    <>
                        {/* Skeleton Loader for Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {[1, 2, 3, 4].map((_, index) => (
                                <div
                                    key={index}
                                    className="animate-pulse bg-gray-300 h-24 rounded-lg"
                                ></div>
                            ))}
                        </div>

                        {/* Skeleton Loader for Grid Content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                            {[1, 2, 3, 4].map((_, index) => (
                                <div
                                    key={index}
                                    className="animate-pulse bg-gray-300 h-48 rounded-md"
                                ></div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {stats.map((stat) => (
                                <StatCard key={stat.label} {...stat} />
                            ))}
                        </div>

                        <div
                            className="bg-white shadow-md h-48 rounded-md flex items-center justify-center"
                        >
                            Content
                        </div>

                        {/* Example Grid Content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-4">

                            <div
                                className="bg-white shadow-md h-48 rounded-md"
                            >
                                Content
                            </div>
                        </div>
                    </>
                )}
            </div>
        </AppLayout>
    );
}
