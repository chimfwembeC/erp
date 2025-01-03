import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Completed', value: 400 },
    { name: 'In Progress', value: 300 },
    { name: 'Pending', value: 300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const ProjectPieChart = () => {
    return (
        <div className="bg-white p-6 shadow-xl rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Project Status</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProjectPieChart;
