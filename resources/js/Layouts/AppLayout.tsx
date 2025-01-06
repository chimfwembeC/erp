import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Sidebar from './Sidebar';
import NotificationPanel from '@/Components/NotificationPanel';
import sidebarLinks from './sidebarLinks';
import { Bell, Settings, Menu } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';

interface LayoutProps {
    title: string;
    children: React.ReactNode;
}

const notifications = [
    { title: 'New message from Jane', timeAgo: '5 mins ago' },
    { title: 'Payroll update available', timeAgo: '10 mins ago' },
    { title: 'Attendance alert', timeAgo: '1 hour ago' },
];

export default function AppLayout({ title, children }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const toggleDropdown = (label: string) => {
        setActiveDropdown(activeDropdown === label ? null : label);
    };

    const closeDropdown = () => {
        setActiveDropdown(null);
    };

    const logout = (e: React.FormEvent) => {
        e.preventDefault();
        // Add your logout route logic here
    };

    const menuItems = [
        {
            label: 'Profile',
            href: '/profile',
        },
        {
            label: 'Settings',
            href: '/settings',
        },
        {
            label: 'Logout',
            onClick: () => {
                console.log('Logged out');
            },
            className: 'hover:text-red-600',
        },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-primary">
            <Head title={title} />
            <Sidebar links={sidebarLinks} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col lg:ml-64">
                {/* Header */}
                <header className="fixed top-0 left-0 lg:left-64 right-0 z-40 p-4 flex items-center justify-between">
                    {/* Sidebar Toggle for Mobile */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden p-2"
                    >
                        <Menu size={24} />
                    </button>
                    <h1 className="text-sm md:text-md lg:text-xl font-semibold">{title}</h1>
                    {/* Right-side Actions */}
                    <nav className="flex items-center space-x-4 relative">
                        {/* Notifications */}
                        <div
                            className="relative"
                            onMouseLeave={closeDropdown} // Close dropdown when mouse leaves
                        >
                            <button
                                className="relative focus:outline-none"
                                onClick={() => toggleDropdown('notifications')}
                            >
                                <Bell size={24} />
                                <span className="absolute -top-2 -right-1 w-4 h-4 bg-accent text-white text-xs flex items-center justify-center rounded-sm">
                                    3
                                </span>
                            </button>
                            {activeDropdown === 'notifications' && (
                                // <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg w-64 py-2">
                                <NotificationPanel notifications={notifications} />
                                // </div>
                            )}
                        </div>
                        {/* Profile Dropdown */}
                        <div
                            className="relative"
                            onMouseLeave={closeDropdown} // Close dropdown when mouse leaves
                        >
                            <button
                                className="text-gray-700 focus:outline-none"
                                onClick={() => toggleDropdown('settings')}
                            >
                                <Settings size={24} />
                            </button>
                            {activeDropdown === 'settings' && (
                                <ProfileDropdown menuItems={menuItems} />
                            )}
                        </div>
                    </nav>
                </header>
                {/* Main Content */}
                <main className="flex-1 overflow-auto mt-16 p-4 md:p-6 bg-primary">{children}</main>
            </div>
        </div>
    );
}
