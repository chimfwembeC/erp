import React from 'react';
import { FaTasks, FaUsers, FaBoxes } from 'react-icons/fa';

export default function AdditionalFeatures() {
    return (
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Additional Features</h3>
            <p className="mb-6 text-gray-600 dark:text-gray-300">Explore more ERP modules or components, such as project tracking, employee performance, inventory management, etc.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Feature 1: Project Tracking */}
                <div className="bg-gray-200 dark:bg-gray-900 rounded-lg p-4 shadow-md">
                    <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        <FaTasks className="mr-2 text-blue-500" />
                        Project Tracking
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 mb-4">Monitor and manage projects, tasks, and timelines efficiently with real-time progress tracking.</p>
                    <button
                        className="mt-4 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
                        data-tip="Track projects in real-time"
                    >
                        Explore
                    </button>
                </div>

                {/* Feature 2: Employee Performance */}
                <div className="bg-gray-200 dark:bg-gray-900 rounded-lg p-4 shadow-md">
                    <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        <FaUsers className="mr-2 text-green-500" />
                        Employee Performance
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 mb-4">Assess employee performance, set goals, and track achievements with ease.</p>
                    <button
                        className="mt-4 bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600"
                        data-tip="Monitor employee growth and success"
                    >
                        Explore
                    </button>
                </div>

                {/* Feature 3: Inventory Management */}
                <div className="bg-gray-200 dark:bg-gray-900 rounded-lg p-4 shadow-md">
                    <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        <FaBoxes className="mr-2 text-yellow-500" />
                        Inventory Management
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 mb-4">Manage stock levels, suppliers, and purchase orders all in one place.</p>
                    <button
                        className="mt-4 bg-yellow-500 text-white rounded-lg px-4 py-2 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-500"
                        data-tip="Control inventory and orders easily"
                    >
                        Explore
                    </button>
                </div>
            </div>
        </div>
    );
}
