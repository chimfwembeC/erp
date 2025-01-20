import { Link } from '@inertiajs/react';
import React from 'react';

const activities = [
    { id: 1, name: "John Doe", activity: "Completed task: Design homepage", time: "2 minutes ago", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
    { id: 2, name: "Jane Smith", activity: "Started project: Mobile App Design", time: "5 hours ago", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
    { id: 3, name: "Alice Johnson", activity: "Commented on task: Finalize report", time: "1 day ago", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
    { id: 4, name: "Bob Brown", activity: "Uploaded document: Marketing Plan", time: "2 days ago", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
    { id: 5, name: "Charlie White", activity: "Reviewed task: Design wireframes", time: "3 days ago", avatar: "https://randomuser.me/api/portraits/men/4.jpg" },
    { id: 6, name: "Eve Black", activity: "Started project: Research new features", time: "4 days ago", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
    { id: 7, name: "Grace Green", activity: "Completed task: Write documentation", time: "1 week ago", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
    { id: 8, name: "Danielle Blue", activity: "Updated task: Fix UI bugs", time: "1 week ago", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
    { id: 9, name: "Oliver Purple", activity: "Started task: Analyze user feedback", time: "2 weeks ago", avatar: "https://randomuser.me/api/portraits/men/5.jpg" },
    { id: 10, name: "Liam Gray", activity: "Uploaded report: Q1 performance", time: "3 weeks ago", avatar: "https://randomuser.me/api/portraits/men/6.jpg" },
    { id: 11, name: "Mia Red", activity: "Completed task: Code review for feature", time: "4 weeks ago", avatar: "https://randomuser.me/api/portraits/women/5.jpg" },
];

const Activity = () => {
    return (
        <div className="rounded-lg shadow-lg bg-white dark:bg-gray-800 p-6 max-h-96 h-full">
            <div className="h-10 mb-4">
                <div className="text-2xl font-semibold text-gray-800 dark:text-white">Recent Activities</div>
            </div>
            <div className="overflow-y-scroll max-h-64">
                {activities.map(activity => (
                    <div key={activity.id} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 bg-gray-100 dark:bg-gray-900 flex justify-between items-center mb-2">
                        <div className="h-10 w-10 bg-gray-800 dark:bg-gray-600 rounded-full">
                            <img src={activity.avatar} alt={activity.name} className="rounded-full w-full h-full" />
                        </div>
                        <div className="flex-1 ml-4">
                            <div className="font-semibold text-gray-800 dark:text-white">{activity.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{activity.activity}</div>
                        </div>
                        <div className="text-sm text-gray-400 dark:text-gray-500">{activity.time}</div>
                    </div>
                ))}
            </div>
            <div className="p-4 text-end">
                <Link
                    href='#'
                    className="underline text-blue-600 dark:text-blue-400"
                >
                    All Activities
                </Link>
            </div>
        </div>
    );
};

export default Activity;
