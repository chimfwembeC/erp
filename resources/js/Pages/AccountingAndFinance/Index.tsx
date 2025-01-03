import React, { useState } from 'react'
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { DollarSign, FileText, User, CheckCircle, BanknoteIcon, Users, UserCheck, Clock, Calendar } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { StatCard } from '@/Components/Shared/StatCard';
import Activity from '@/Components/Activity';
import { Payments } from '@/types';
import { PaymentsPanel } from './Components/PaymentsPanel';
import PaymentsChart from './Components/Charts/PaymentsChart';
import TaxSummaryChart from './Components/Charts/TaxSummaryChart';

interface AccountingModule {
    label: string;
    icon: JSX.Element;
    href: string;
}

interface AccountingInsight {
    label: string;
    description: string;
    icon: JSX.Element;
}

const Index: React.FC = () => {
    const breadcrumbItems = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Accounting', href: '/accounting' },
    ];

    const stats = [
        { icon: Users, label: 'Total Employees', value: '156', change: '+12%' },
        { icon: UserCheck, label: 'Present Today', value: '142', change: '91%' },
        { icon: Clock, label: 'On Leave', value: '8', change: '5%' },
        { icon: Calendar, label: 'Upcoming Reviews', value: '24', change: '' },
    ];

    const [payments, setPayments] = useState<Payments[]>(
        Array.from({ length: 15 }, (_, i) => ({
            id: (i + 1).toString(),
            invoice_id: `INV00${i + 1}`,
            amount: `$${(100 + i * 50).toFixed(2)}`,
            payment_date: `2025-01-${String(10 + i).padStart(2, '0')}`,
            payment_method: i % 3 === 0 ? 'Credit Card' : i % 3 === 1 ? 'PayPal' : 'Bank Transfer',
        }))
    );


    const handleRefund = (id: string) => {
        alert(`Refund issued for payment ID: ${id}`);
        setPayments((prev) => prev.filter((payment) => payment.id !== id));
    };

    const taxData = [
        { tax_name: 'VAT', tax_type: 'Sales Tax', amount: 5000 },
        { tax_name: 'Income Tax', tax_type: 'Income Tax', amount: 3000 },
        { tax_name: 'VAT', tax_type: 'Sales Tax', amount: 2000 },
        { tax_name: 'Income Tax', tax_type: 'Income Tax', amount: 2500 },
        { tax_name: 'VAT', tax_type: 'Sales Tax', amount: 1500 },
    ];
    return (
        <AppLayout title="Accounting Dashboard">
            <div className="overflow-hidden">
                <Breadcrumb items={breadcrumbItems} />
                {/* Accounting Insights Section */}
                <h2 className="text-xl font-semibold mt-8 mb-4">Key Insights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat) => (
                        <StatCard key={stat.label} {...stat} />
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div className="col-span col-span-3">
                        <PaymentsChart />
                        <TaxSummaryChart data={taxData} />
                    </div>
                    <div className="col-span col-span-2">
                        <Activity />
                        <div className="mt-4">
                            <PaymentsPanel payments={payments} onRefund={handleRefund} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

export default Index;
