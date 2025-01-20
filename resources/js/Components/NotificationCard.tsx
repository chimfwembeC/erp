import React from 'react'

export default function NotificationCard({ title, description, timeAgo }) {
    return (
        <li className="px-4 py-3 hover:bg-indigo-50 dark:hover:bg-indigo-500 dark:hover:text-gray-400">
            <p className="text-sm text-gray-700 dark:text-gray-200">{title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo}</p>
        </li>
    )
}
