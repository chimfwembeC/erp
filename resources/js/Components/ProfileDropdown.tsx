import React, { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Settings } from 'lucide-react';

interface MenuItem {
    label: string;
    href?: string;
    onClick?: () => void;
    className?: string;
}

interface ProfileDropdownProps {
    menuItems: MenuItem[];
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ menuItems }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setDropdownOpen((prev) => !prev);
    const closeDropdown = () => setDropdownOpen(false);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                closeDropdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                onClick={toggleDropdown}
                className="text-gray-700 bg-white dark:bg-gray-600 dark:text-white p-2  p-2 rounded-full focus:outline-none hover:bg-gray-100"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
            >
                <Settings size={24} />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
                <div className="absolute right-0 top-16 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                    <h3 className="px-4 py-2 text-sm font-semibold text-gray-700">Settings</h3>
                    <div className="border-t border-gray-200"></div>

                    <ul>
                        {menuItems.length > 0 ? (
                            menuItems.map((item, index) => (
                                <React.Fragment key={index}>
                                    <li>
                                        {item.href ? (
                                            <Link
                                                href={item.href}
                                                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${item.className || ''}`}
                                            >
                                                {item.label}
                                            </Link>
                                        ) : (
                                            <button
                                                onClick={item.onClick}
                                                className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${item.className || ''}`}
                                            >
                                                {item.label}
                                            </button>
                                        )}
                                    </li>
                                    {index < menuItems.length - 1 && (
                                        <div className="border-t border-gray-200"></div>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-sm text-gray-500">No options available</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
