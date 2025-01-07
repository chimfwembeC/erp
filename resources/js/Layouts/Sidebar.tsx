import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import useTypedPage from '@/Hooks/useTypedPage';
import { useTranslation } from 'react-i18next';

interface SidebarLink {
    labelKey: string; // Change to use keys for translation
    icon?: React.ReactNode;
    href?: string;
    children?: SidebarLink[];
    badge?: string;
    divider?: boolean;
    roles?: string[];
}
const filterLinksByRole = (links: SidebarLink[], role: string): SidebarLink[] => {
    return links
        .filter(link => !link.roles || link.roles.includes(role)) // Include if no roles or role matches
        .map(link => {
            // Only filter children if they exist
            const children = link.children ? filterLinksByRole(link.children, role) : undefined;

            // If the link has children, we include the children; otherwise, it's just a regular link.
            return {
                ...link,
                children: children && children.length > 0 ? children : undefined, // Only keep children if they exist
            };
        });
};



const Sidebar: React.FC<SidebarProps> = ({ links, sidebarOpen, setSidebarOpen }) => {
    const [activeDropdowns, setActiveDropdowns] = useState<string[]>([]);
    const page = useTypedPage();
    const userRole = page.props.auth.user?.role || '';
    const { t } = useTranslation();

    // Map sidebar links and translate labels dynamically
    const translatedSidebarLinks = links.map(link => ({
        ...link,
        label: t(link.labelKey), // Translate the label based on the key
        children: link.children
            ? link.children.map(child => ({
                ...child,
                label: t(child.labelKey), // Translate the child label as well
            }))
            : [],
    }));

    // Filter links based on the user's role
    const filteredLinks = filterLinksByRole(translatedSidebarLinks, userRole);

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
            prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
        );
    };

    const isActiveLink = (href?: string) => {
        const { url } = page;
        return href && url === href;
    };

    const renderLinks = (links: SidebarLink[]) => {
        return links.map(link => (
            <li key={link.labelKey}>
                {link.children ? (
                    <div>
                        {/* Parent Link with Dropdown */}
                        <div
                            onClick={() => toggleDropdowns(link.labelKey)}
                            className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition ${activeDropdowns.includes(link.labelKey) ? 'bg-indigo-50' : 'hover:bg-indigo-100'
                                }`}
                        >
                            <div className="flex items-center space-x-3">
                                {link.icon}
                                <span className="text-sm font-medium text-gray-700">{t(link.labelKey)}</span>
                            </div>
                            {activeDropdowns.includes(link.labelKey) ? (
                                <ChevronUp size={18} className="text-gray-500" />
                            ) : (
                                <ChevronDown size={18} className="text-gray-500" />
                            )}
                        </div>

                        {/* Dropdown Items */}
                        {activeDropdowns.includes(link.labelKey) && (
                            <ul className="ml-4 mt-2 space-y-2 border-l-2 border-indigo-100 pl-2">
                                {renderLinks(link.children)} {/* Recursively render child links */}
                            </ul>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Single Link */}
                        <Link
                            href={link.href!}
                            className={`flex items-center p-3 rounded-md transition ${isActiveLink(link.href) ? 'bg-indigo-200 font-semibold text-indigo-800' : 'hover:bg-indigo-50'
                                }`}
                        >
                            {link.icon}
                            <span className="ml-3 text-sm text-gray-700">{t(link.labelKey)}</span>
                            {link.badge && (
                                <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-600">
                                    {link.badge}
                                </span>
                            )}
                        </Link>
                    </>
                )}

                {/* Divider */}
                {link.divider && <div className="my-1 border-t border-gray-200"></div>}
            </li>
        ));
    };

    return (
        <div
            className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-md transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
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
                        Tekrem Solutions
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
