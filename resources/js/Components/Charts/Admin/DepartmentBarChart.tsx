import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'HR', employees: 10 },
    { name: 'Engineering', employees: 50 },
    { name: 'Sales', employees: 25 },
    { name: 'Marketing', employees: 15 },
];

const DepartmentBarChart = () => {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-6 shadow-xl rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Employees per Department
            </h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" className="dark:stroke-gray-600" />
                    <XAxis dataKey="name" stroke="#8884d8" className="dark:stroke-white" />
                    <YAxis stroke="#8884d8" className="dark:stroke-white" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="employees" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DepartmentBarChart;
