import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import useTypedPage from '@/Hooks/useTypedPage';

interface SidebarLink {
    label: string;
    icon?: React.ReactNode;
    href?: string;
    children?: SidebarLink[];
    badge?: string;
    divider?: boolean;
    roles?: string[]; // Allowed roles for this link
}

interface SidebarProps {
    links: SidebarLink[];
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const filterLinksByRole = (links: SidebarLink[], role: string): SidebarLink[] => {
    return links
        .filter(link => !link.roles || link.roles.includes(role)) // Include if no roles or role matches
        .map(link => ({
            ...link,
            children: link.children ? filterLinksByRole(link.children, role) : undefined, // Recursively filter children
        }))
        .filter(link => link.children ? link.children.length > 0 : true); // Remove parent links with no accessible children
};

const Sidebar: React.FC<SidebarProps> = ({ links, sidebarOpen, setSidebarOpen }) => {
    const [activeDropdowns, setActiveDropdowns] = useState<string[]>([]);
    const page = useTypedPage();
    const userRole = page.props.auth.user?.role || ''; // Get user's role

    // Filter links based on the user's role
    const filteredLinks = filterLinksByRole(links, userRole);

    useEffect(() => {
        const storedDropdowns = localStorage.getItem('activeDropdowns');
        if (storedDropdowns) {
            setActiveDropdowns(JSON.parse(storedDropdowns));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('activeDropdowns', JSON.stringify(activeDropdowns));
    }, [activeDropdowns]);

    const toggleDropdowns = (label: string) => {
        setActiveDropdowns(prev =>
            prev.includes(label)
                ? prev.filter(item => item !== label)
                : [...prev, label],
        );
    };

    const isActiveLink = (href?: string) => {
        const { url } = page;
        return href && url === href;
    };

    const renderLinks = (links: SidebarLink[]) =>
        links.map(link => (
            <li key={link.label} className="mb-2">
                {link.children ? (
                    <div>
                        {/* Parent Link */}
                        <div
                            onClick={() => toggleDropdowns(link.label)}
                            className={`flex items-center justify-between p-3 rounded-full cursor-pointer transition ${activeDropdowns.includes(link.label)
                                ? 'bg-indigo-50 shadow-md'
                                : 'hover:bg-indigo-100'
                                }`}
                        >
                            <div className="flex items-center space-x-3">
                                {link.icon}
                                <span className="text-sm font-medium text-gray-700">{link.label}</span>
                            </div>
                            {activeDropdowns.includes(link.label) ? (
                                <ChevronUp size={18} className="text-gray-500" />
                            ) : (
                                <ChevronDown size={18} className="text-gray-500" />
                            )}
                        </div>

                        {/* Child Links */}
                        {activeDropdowns.includes(link.label) && (
                            <ul className="ml-4 mt-2 space-y-2 border-l-2 border-indigo-500 pl-4">
                                {link.children.map(child => (
                                    <li key={child.label}>
                                        <Link
                                            href={child.href!}
                                            className={`block px-3 py-2 rounded-md text-sm font-medium transition ${isActiveLink(child.href)
                                                ? 'bg-indigo-100 text-indigo-600 shadow'
                                                : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
                                                }`}
                                        >
                                            {child.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ) : (
                    <Link
                        href={link.href!}
                        className={`flex items-center p-3 rounded-full transition ${isActiveLink(link.href)
                            ? 'bg-indigo-100 text-indigo-600 shadow-md'
                            : 'text-gray-700 hover:bg-indigo-100'
                            }`}
                    >
                        <div className="flex items-center space-x-3">
                            {link.icon}
                            <span className="text-sm font-medium">{link.label}</span>
                        </div>
                        {link.badge && (
                            <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-600">
                                {link.badge}
                            </span>
                        )}
                    </Link>
                )}
                {link.divider && <div className="border-t border-gray-200 my-2"></div>}
            </li>
        ));

    return (
        <div
            className={`fixed top-0 left-0 z-30 h-full w-64 bg-white shadow-md transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
        >
            <nav className="h-full flex flex-col">
                <div className="p-4 flex justify-between items-center lg:hidden">
                    <h1 className="font-bold text-xl text-gray-800">Logo</h1>
                    <button onClick={() => setSidebarOpen(false)} className="p-2">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-4">
                    <Link href="/dashboard" className="text-xl font-bold text-gray-800">
                        ERP System
                    </Link>
                </div>
                <div className="flex-1 p-4 space-y-3 overflow-auto">
                    <ul>{renderLinks(filteredLinks)}</ul>
                </div>
                <div className="p-4">
                    <div className="flex items-center space-x-3">
                        <img
                            src={`https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=${page.props.auth.user?.name}`}
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <p className="text-sm font-medium text-gray-800">
                                {page.props.auth.user?.name}
                            </p>
                            <p className="text-xs text-gray-500">{page.props.auth.user?.role}</p>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
