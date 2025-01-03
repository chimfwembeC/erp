import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    icon: LucideIcon;
    label: string;
    value: string;
    change?: string;
}

export function StatCard({ icon: Icon, label, value, change }: StatCardProps) {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600" />
                </div>
                {change && (
                    <span className="text-sm text-green-600">{change}</span>
                )}
            </div>
            <h3 className="text-gray-500 text-sm">{label}</h3>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    );
}
