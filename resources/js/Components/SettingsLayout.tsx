import React from 'react';
import SettingsPanel from './SettingsPanel';
import { Activity, Bell, Brush, CreditCard, Database, Globe, Link, Lock, Settings, Shield, Users } from 'lucide-react';

interface SettingsLayoutProps {
    currentSection: string;
    onSectionChange: (href: string) => void;
    children: React.ReactNode;
}

const settingsData = [
    {
        labelKey: 'generalSettings',
        href: '/settings/general',
        icon: <Settings size={18} />, // General settings
    },
    // {
    //     labelKey: 'userManagement',
    //     href: '/settings/users',
    //     icon: <Users size={18} />, // User management
    // },
    {
        labelKey: 'notifications',
        href: '/settings/notifications',
        icon: <Bell size={18} />, // Notifications
    },
    {
        labelKey: 'systemLogs',
        href: '/settings/logs',
        icon: <Activity size={18} />, // System logs
    },
    {
        labelKey: 'languageSettings',
        href: '/settings/language',
        icon: <Globe size={18} />, // Language preferences
    },
    {
        labelKey: 'accessControl',
        href: '/settings/access-control',
        icon: <Lock size={18} />, // Access control
    },
    {
        labelKey: 'integrations',
        href: '/settings/integrations',
        icon: <Link size={18} />, // Integrations
    },
    {
        labelKey: 'dataManagement',
        href: '/settings/data',
        icon: <Database size={18} />, // Data management
    },
    {
        labelKey: 'billing',
        href: '/settings/billing',
        icon: <CreditCard size={18} />, // Billing and subscriptions
    },
    {
        labelKey: 'securitySettings',
        href: '/settings/security',
        icon: <Shield size={18} />, // Security
    },
    {
        labelKey: 'customization',
        href: '/settings/customization',
        icon: <Brush size={18} />, // Customization
    },
];

export function SettingsLayout({
    currentSection,
    onSectionChange,
    children,
}: SettingsLayoutProps) {
    return (
        <div className="">
            <div className="flex gap-6">
                {/* Sidebar Section */}
                {/* <div className="w-64 shrink-0">
                    <SettingsPanel settings={settingsData} />
                </div> */}

                {/* Main Content Section */}
                <div className="flex-1">
                    <div className="h-[calc(100vh-8rem)]">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
