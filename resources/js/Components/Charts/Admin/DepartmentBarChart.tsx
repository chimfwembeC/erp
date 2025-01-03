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
        <div className="bg-white p-6 shadow-xl rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Employees per Department</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="employees" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DepartmentBarChart;
