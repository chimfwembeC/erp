import { Link } from '@inertiajs/react'
import React from 'react'
import NotificationCard from './NotificationCard'

export default function NotificationPanel({ notifications }) {
    return (
        <div className="absolute right-0 top-16 w-64 bg-white shadow-lg rounded-lg py-2">
            <h3 className="px-4 py-2 text-sm font-semibold text-gray-700">
                Notifications
            </h3>
            <div className="border-1 border-b bg-primary"></div>

            <ul className="divide-y divide-gray-200">
                {notifications.map((notification, index) => (
                    <NotificationCard
                        key={index}
                        title={notification.title}
                        description={notification.description}
                        timeAgo={notification.timeAgo}
                    />
                ))}
            </ul>

            <div className="border-1 border-b bg-primary"></div>

            <div className="text-center p-2">
                <Link
                    href="/notifications"
                    className="text-xs text-indigo-600"
                >
                    View all notifications
                </Link>
            </div>
        </div>
    )
}
