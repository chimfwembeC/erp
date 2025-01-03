import React from 'react'

export default function AdditionalFeatures() {
    return (
        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Additional Features</h3>
            <p className="mb-6">Explore more ERP modules or components, such as project tracking, employee performance, inventory management, etc.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Feature 1: Project Tracking */}
                <div className="bg-gray-200 rounded-lg p-4 shadow-md">
                    <div className="text-lg font-semibold text-gray-700">Project Tracking</div>
                    <p className="text-gray-600 mt-2">Monitor and manage projects, tasks, and timelines efficiently with real-time progress tracking.</p>
                    <button className="mt-4 bg-blue-500 text-white rounded-lg px-4 py-2">Explore</button>
                </div>

                {/* Feature 2: Employee Performance */}
                <div className="bg-gray-200 rounded-lg p-4 shadow-md">
                    <div className="text-lg font-semibold text-gray-700">Employee Performance</div>
                    <p className="text-gray-600 mt-2">Assess employee performance, set goals, and track achievements with ease.</p>
                    <button className="mt-4 bg-green-500 text-white rounded-lg px-4 py-2">Explore</button>
                </div>

                {/* Feature 3: Inventory Management */}
                <div className="bg-gray-200 rounded-lg p-4 shadow-md">
                    <div className="text-lg font-semibold text-gray-700">Inventory Management</div>
                    <p className="text-gray-600 mt-2">Manage stock levels, suppliers, and purchase orders all in one place.</p>
                    <button className="mt-4 bg-yellow-500 text-white rounded-lg px-4 py-2">Explore</button>
                </div>
            </div>
        </div>
    )
}
