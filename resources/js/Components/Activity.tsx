import { Link } from '@inertiajs/react';
import React from 'react';

const activities = [
    { id: 1, name: "John Doe", activity: "Completed task: Design homepage", time: "2 minutes ago", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
    { id: 2, name: "Jane Smith", activity: "Started project: Mobile App Design", time: "5 hours ago", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
    { id: 3, name: "Alice Johnson", activity: "Commented on task: Finalize report", time: "1 day ago", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
    { id: 4, name: "Bob Brown", activity: "Uploaded document: Marketing Plan", time: "2 days ago", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
    { id: 5, name: "Bob Brown", activity: "Uploaded document: Marketing Plan", time: "2 days ago", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
    { id: 6, name: "Bob Brown", activity: "Uploaded document: Marketing Plan", time: "2 days ago", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
    { id: 7, name: "Bob Brown", activity: "Uploaded document: Marketing Plan", time: "2 days ago", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
    { id: 8, name: "Bob Brown", activity: "Uploaded document: Marketing Plan", time: "2 days ago", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
    { id: 9, name: "Bob Brown", activity: "Uploaded document: Marketing Plan", time: "2 days ago", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
    { id: 10, name: "Bob Brown", activity: "Uploaded document: Marketing Plan", time: "2 days ago", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
    { id: 11, name: "Bob Brown", activity: "Uploaded document: Marketing Plan", time: "2 days ago", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },

];

const Activity = () => {
    return (
        <div className="rounded-lg shadow-lg bg-white p-6  max-h-96 h-full">
            <div className="h-10 mb-4">
                <div className="text-2xl font-semibold">Recent Activities</div>
            </div>
            <div className="overflow-y-scroll max-h-64">
                {activities.map(activity => (
                    <div key={activity.id} className="p-2 rounded-md hover:bg-gray-200 bg-gray-100 flex justify-between items-center mb-2">
                        <div className="h-10 w-10 bg-gray-800 rounded-full">
                            <img src={activity.avatar} alt={activity.name} className="rounded-full w-full h-full" />
                        </div>
                        <div className="flex-1 ml-4">
                            <div className="font-semibold">{activity.name}</div>
                            <div className="text-sm text-gray-600">{activity.activity}</div>
                        </div>
                        <div className="text-sm text-gray-400">{activity.time}</div>
                    </div>
                ))}
            </div>
            <div className="p-4 text-end">
                <Link
                    href='#'
                    className="underline"
                >
                    All Activities
                </Link>
            </div>
        </div>
    );
};

export default Activity;
