import React, { useEffect, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Sidebar from './Sidebar';
import NotificationPanel from '@/Components/NotificationPanel';
import sidebarLinks from './sidebarLinks';
import { Bell, Settings, Menu } from 'lucide-react';
import ProfileDropdown from '../Components/ProfileDropdown';
import LanguageSelector from '@/Components/LanguageSelector';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import axios from 'axios';

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
    const [uiPrimaryColor, setUiPrimaryColor] = useState('#0052CC');
    const [uiSecondaryColor, setUiSecondaryColor] = useState('#FF5722');
    const [uiNeutralColor, setUiNeutralColor] = useState('#FF5722');
    const [showFooter, setShowFooter] = useState(true);
    const [footerText, setFooterText] = useState('© 2025 My Application. All rights reserved.');

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
                router.post('logout');
            },
            className: 'hover:text-red-600',
        },
    ];

    useEffect(() => {
        // Fetch current customization settings from the backend
        axios.get('/api/settings/customization')
            .then(response => {
                const data = response.data;
                setUiPrimaryColor(data.ui_primary_color);
                setUiSecondaryColor(data.ui_secondary_color);
                setUiNeutralColor(data.ui_neutral_color);
                setShowFooter(data.show_footer === '1');
                setFooterText(data.footer_text);
            })
            .catch(error => {
                console.error("Error fetching customization settings:", error);
            });
    }, []);

    return (
        <div className={`flex h-screen overflow-hidden ${uiPrimaryColor}`}>
            <Head title={title} />
            <I18nextProvider i18n={i18n}>
                <Sidebar links={sidebarLinks} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </I18nextProvider>

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
                    <div className="relative hidden md:block">
                        <div className="left-0 bg-white p-2 rounded-lg">
                            <h1 className="text-sm md:text-md lg:text-xl font-semibold">{title}</h1>
                        </div>
                    </div>
                    {/* Right-side Actions */}
                    <nav className="flex items-center space-x-4 relative">

                        {/* Langauages */}
                        <div className="relative">
                            <LanguageSelector />
                        </div>
                        {/* Notifications */}
                        <div
                            className="relative"
                            onMouseLeave={closeDropdown} // Close dropdown when mouse leaves
                        >
                            <button
                                className="relative bg-white p-2 rounded-lg focus:outline-none"
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
                                className="text-gray-700 bg-white p-2 rounded-lg focus:outline-none"
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
                <main className="flex-1 overflow-auto mt-16 p-4 md:p-6">
                    {children}
                </main>
                {/* Footer with Social Links */}
                {showFooter && (
                    <footer className="p-4">
                        <div className="container mx-auto px-6 text-center">
                            <p className="text-sm mb-4">
                                &copy; {footerText}
                            </p>

                            {/* Social Media Links */}
                            <div className="flex justify-center space-x-4">
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-accent transition duration-200"
                                    aria-label="Facebook"
                                >
                                    <FaFacebookF size={20} />
                                </a>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-accent transition duration-200"
                                    aria-label="Twitter"
                                >
                                    <FaTwitter size={20} />
                                </a>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-accent transition duration-200"
                                    aria-label="Instagram"
                                >
                                    <FaInstagram size={20} />
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-accent transition duration-200"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedinIn size={20} />
                                </a>
                            </div>
                        </div>
                    </footer>
                )}

            </div>
        </div>
    );
}
