import React from 'react'

export default function NotificationCard({ title, description, timeAgo }) {
    return (
        <li className="px-4 py-3 hover:bg-indigo-50">
            <p className="text-sm text-gray-700">{title}</p>
            <p className="text-xs text-gray-500">{timeAgo}</p>
        </li>
    )
}
