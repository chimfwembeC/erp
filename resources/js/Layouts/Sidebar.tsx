import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { ChevronDown, ChevronUp, X, Menu } from 'lucide-react';
import useTypedPage from '@/Hooks/useTypedPage';
import { useTranslation } from 'react-i18next';

interface SidebarLink {
    labelKey: string;
    icon?: React.ReactNode;
    href?: string;
    children?: SidebarLink[];
    badge?: string;
    divider?: boolean;
    roles?: string[];
}

// Filter links by user role
const filterLinksByRole = (links: SidebarLink[], role: string): SidebarLink[] => {
    return links
        .filter(link => !link.roles || link.roles.includes(role))
        .map(link => {
            const children = link.children ? filterLinksByRole(link.children, role) : undefined;
            return {
                ...link,
                children: children && children.length > 0 ? children : undefined,
            };
        });
};

const Sidebar: React.FC<{ links: SidebarLink[]; sidebarOpen: boolean; setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>> }> = ({ links, sidebarOpen, setSidebarOpen }) => {
    const [activeDropdowns, setActiveDropdowns] = useState<string[]>([]);
    const page = useTypedPage();
    const userRole = page.props.auth.user?.role || '';
    const { t } = useTranslation();

    // Translate sidebar links
    const translatedSidebarLinks = links.map(link => ({
        ...link,
        label: t(link.labelKey),
        children: link.children
            ? link.children.map(child => ({
                ...child,
                label: t(child.labelKey),
            }))
            : [],
    }));

    // Retrieve dropdown state from localStorage
    useEffect(() => {
        const storedDropdowns = localStorage.getItem('activeDropdowns');
        if (storedDropdowns) {
            setActiveDropdowns(JSON.parse(storedDropdowns));
        }
    }, []);

    // Retrieve sidebar state from localStorage on first load (defaults to closed)
    useEffect(() => {
        const storedSidebarState = localStorage.getItem('sidebarOpen');
        setSidebarOpen(storedSidebarState === 'true'); // Defaults to false
    }, []);

    // Store dropdown state in localStorage
    useEffect(() => {
        localStorage.setItem('activeDropdowns', JSON.stringify(activeDropdowns));
    }, [activeDropdowns]);

    // Store sidebar state in localStorage
    useEffect(() => {
        localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
    }, [sidebarOpen]);

    // Toggle dropdowns
    const toggleDropdowns = (label: string) => {
        setActiveDropdowns(prev =>
            prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
        );
    };

    // Check if link is active
    const isActiveLink = (href?: string) => {
        const { url } = page;
        return href && url === href;
    };

    // Render links
    const renderLinks = (links: SidebarLink[]) => {
        return links.map(link => (
            <li key={link.labelKey}>
                {link.children ? (
                    <div>
                        <div
                            onClick={() => toggleDropdowns(link.labelKey)}
                            className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition ${activeDropdowns.includes(link.labelKey) ? 'bg-indigo-50 dark:bg-indigo-900' : 'hover:bg-indigo-100 dark:hover:bg-indigo-700'
                                }`}
                        >
                            <div className="flex items-center space-x-3">
                                <span className="text-gray-700 dark:text-white">
                                    {link.icon}
                                </span>
                                <span className="text-sm font-medium text-gray-700 dark:text-white">{link.label}</span>
                            </div>
                            {activeDropdowns.includes(link.labelKey) ? (
                                <ChevronUp size={18} className="text-gray-500 dark:text-gray-300" />
                            ) : (
                                <ChevronDown size={18} className="text-gray-500 dark:text-gray-300" />
                            )}
                        </div>
                        {activeDropdowns.includes(link.labelKey) && (
                            <ul className="ml-4 mt-2 space-y-2 border-l-2 border-indigo-100 dark:border-indigo-700 pl-2">
                                {renderLinks(link.children)}
                            </ul>
                        )}
                    </div>
                ) : (
                    <Link
                        href={link.href!}
                        className={`flex items-center p-3 rounded-md transition ${isActiveLink(link.href) ? 'bg-indigo-200 font-semibold text-indigo-800 dark:bg-indigo-900 dark:text-white' : 'hover:bg-indigo-50 dark:hover:bg-indigo-700'
                            }`}
                    >
                        <span className="text-gray-700 dark:text-white">
                            {link.icon}
                        </span>
                        <span className="ml-3 text-sm text-gray-700 dark:text-white">{link.label}</span>
                        {link.badge && (
                            <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-600 dark:bg-indigo-800 dark:text-indigo-400">
                                {link.badge}
                            </span>
                        )}
                    </Link>
                )}
                {link.divider && <div className="my-1 border-t border-gray-200 dark:border-gray-700"></div>}
            </li>
        ));
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                className="p-2 text-gray-600 lg:hidden fixed top-2 left-2 z-50 bg-gray-200 rounded-full shadow dark:bg-gray-700 dark:text-white"
                onClick={() => setSidebarOpen(prev => !prev)}
            >
                <Menu size={24} />
            </button>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 text-white shadow-md transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <nav className="h-full flex flex-col">
                    <div className="p-4 flex justify-between items-center">
                        <h1 className="font-bold text-xl text-gray-800 dark:text-white">
                            <img src={page.props?.logo || ""} className="w-12 h-12" alt="brand logo" />
                        </h1>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-black dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <div className="p-4">
                        <Link href="/dashboard" className="text-xl font-bold text-gray-800 dark:text-white">
                            Tekrem Solutions
                        </Link>
                    </div>
                    <div className="flex-1 p-4 space-y-3 overflow-auto">
                        <ul>{renderLinks(filterLinksByRole(translatedSidebarLinks, userRole))}</ul>
                    </div>
                    <div className="p-4">
                        <div className="flex items-center space-x-3">
                            <img
                                src={`https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=${page.props.auth.user?.name}`}
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <p className="text-sm font-medium text-gray-800 dark:text-white">
                                    {page.props.auth.user?.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{page.props.auth.user?.role}</p>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
