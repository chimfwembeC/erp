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
        <div className="bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg shadow transition-all duration-300">
            <div className="flex items-center justify-between p-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-700 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                </div>
                {change && (
                    <span className="text-sm text-green-600 dark:text-green-400">{change}</span>
                )}
            </div>
            <div className="border dark:border-gray-600"></div>
            <div className="p-4">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm">{label}</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
            </div>
        </div>
    );
}
