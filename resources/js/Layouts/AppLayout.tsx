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
import ThemeToggle from '@/Components/Themes/ThemeToggle';

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
    const [uiPrimaryColor, setUiPrimaryColor] = useState('bg-blue-100');
    const [uiSecondaryColor, setUiSecondaryColor] = useState('bg-yellow-100');
    const [uiNeutralColor, setUiNeutralColor] = useState('bg-gray-100');
    const [showFooter, setShowFooter] = useState(true);
    const [footerText, setFooterText] = useState('2025 My Application. All rights reserved.');

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
        <div className={`flex flex-col h-screen overflow-hidden ${uiPrimaryColor ? uiPrimaryColor : 'bg-gray-100'}`}>
            <Head title={title} />
            <I18nextProvider i18n={i18n}>
                <Sidebar links={sidebarLinks} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </I18nextProvider>

            <div className="flex-1 flex flex-col lg:ml-64">
                {/* Header */}
                <header className="fixed m-4  mx-8 rounded-lg top-0 left-0 lg:left-64 bg-white shadow-lg right-0 z-40 p-4 flex items-center justify-between">
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
                        {/* Language Selector */}
                        <div className="relative">
                            <LanguageSelector />
                        </div>
                        {/* Mode Selector */}
                        <div className="relative">
                            <ThemeToggle />
                        </div>
                        {/* Notifications */}
                        <div className="relative">
                            <NotificationPanel notifications={notifications} />
                        </div>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <ProfileDropdown menuItems={menuItems} />
                        </div>
                    </nav>
                </header>

                {/* Main Content */}
                <main className="h-screen overflow-auto">
                    <div className="mt-24">
                        <div className="pb-12 px-6">
                            {children}
                        </div>


                        {/* Footer */}
                        {showFooter && (
                            <footer className="p-4 bottom-0 right-0 left-0">
                                <div className="container mx-auto px-6 text-center">
                                    <p className="text-sm mb-4">
                                        &copy; {footerText}
                                    </p>

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
                </main>
            </div>
        </div>
    );
}
