import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import useTypedPage from '@/Hooks/useTypedPage';


interface SidebarLink {
    label: string;
    icon?: React.ReactNode;
    href?: string;
    children?: SidebarLink[];
}

const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
const [activeDropdowns, setActiveDropdowns] = useState<string[]>([]);
const page = useTypedPage();

// Get the current URL path using usePage hook from Inertia
const { url } = usePage();

const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
};

const toggleDropdowns = (label: string) => {
    setActiveDropdowns(prev =>
        prev.includes(label)
            ? prev.filter(item => item !== label)
            : [...prev, label],
    );
};

const isActiveLink = (href?: string) => {
    return href && url === href; // Check if the current page matches the href
};

const renderLinks = (links: SidebarLink[]) => {
    return links.map(link => (
        <li key={link.label}>
            {link.children ? (
                <div>
                    {/* Parent Link with Dropdown */}
                    <div
                        onClick={() => toggleDropdowns(link.label)}
                        className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition ${activeDropdowns.includes(link.label) ? 'bg-indigo-50' : 'hover:bg-indigo-100'
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

                    {/* Dropdown Items */}
                    {activeDropdowns.includes(link.label) && (
                        <ul className="ml-4 mt-2 space-y-2 border-l-2 border-indigo-100 pl-2">
                            {renderLinks(link.children)}
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
                        <span className="ml-3 text-sm text-gray-700">{link.label}</span>
                        {link.badge && (
                            <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-600">
                                {link.badge}
                            </span>
                        )}
                    </Link>
                </>
            )}

            {/* Divider */}
            {link.divider && <div className="my-4 border-t border-gray-200"></div>}
        </li>
    ));
};

export default renderLinks;
