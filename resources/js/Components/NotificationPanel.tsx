import { Link } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import NotificationCard from './NotificationCard';
import { Bell } from 'lucide-react';

interface Notification {
    title: string;
    description?: string;
    timeAgo: string;
}

interface NotificationPanelProps {
    notifications: Notification[];
}

export default function NotificationPanel({ notifications }: NotificationPanelProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const closeDropdown = () => setDropdownOpen(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                closeDropdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative">
            {/* Notification Bell */}
            <button
                className="relative bg-white dark:bg-gray-600 p-2 rounded-full focus:outline-none hover:bg-gray-100"
                onClick={toggleDropdown}
                aria-label="Toggle notifications"
            >
                <Bell size={24} />
                {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                        {notifications.length}
                    </span>
                )}
            </button>

            {/* Dropdown Panel */}
            {dropdownOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute right-0 top-16 mt-2 w-64 bg-white shadow-lg rounded-lg py-2 z-50"
                >
                    <h3 className="px-4 py-2 text-sm font-semibold text-gray-700">
                        Notifications
                    </h3>
                    <div className="border-t"></div>

                    <ul className="divide-y divide-gray-200">
                        {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <NotificationCard
                                    key={index}
                                    title={notification.title}
                                    description={notification.description}
                                    timeAgo={notification.timeAgo}
                                />
                            ))
                        ) : (
                            <li className="px-4 py-2 text-gray-500 text-sm">
                                No new notifications
                            </li>
                        )}
                    </ul>

                    <div className="border-t"></div>

                    <div className="text-center p-2">
                        <Link
                            href="/notifications"
                            className="text-xs text-indigo-600 hover:underline"
                        >
                            View all notifications
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
