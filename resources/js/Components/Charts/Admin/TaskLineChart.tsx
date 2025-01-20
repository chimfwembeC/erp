import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', tasks: 4000 },
    { name: 'Feb', tasks: 3000 },
    { name: 'Mar', tasks: 2000 },
    { name: 'Apr', tasks: 2780 },
    { name: 'May', tasks: 1890 },
    { name: 'Jun', tasks: 2390 },
    { name: 'Jul', tasks: 3490 },
];

const TaskLineChart = () => {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-6 shadow-xl rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Tasks Completed (Monthly)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" className="dark:stroke-gray-600" />
                    <XAxis dataKey="name" stroke="#8884d8" className="dark:stroke-white" />
                    <YAxis stroke="#8884d8" className="dark:stroke-white" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="tasks" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TaskLineChart;
