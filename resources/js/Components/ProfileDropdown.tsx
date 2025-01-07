import React from 'react';
import { Link } from '@inertiajs/react';

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
    return (
        <div className="absolute right-0 top-12 w-48 bg-white shadow-lg rounded-lg py-2">
            <h3 className="px-4 py-2 text-sm font-semibold text-gray-700">
                Settings
            </h3>
            <div className="border-1 border-b bg-primary"></div>

            <ul>
                {menuItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <li>
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 ${item.className || ''}`}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span
                                    onClick={item.onClick}
                                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 cursor-pointer ${item.className || ''}`}
                                >
                                    {item.label}
                                </span>
                            )}
                        </li>
                        {index < menuItems.length - 1 && (
                            <div className="border-t border-gray-200 my-1"></div>
                        )}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
};

export default ProfileDropdown;
