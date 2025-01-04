import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const IncomeStatementChart = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        axios.get('/api/income-statement-chart')
            .then(response => {
                setData(response.data);
            });
    }, []);

    const chartData = [
        { name: 'Income', value: data.income || 0 },
        { name: 'Expenses', value: data.expenses || 0 },
        { name: 'Net Income', value: data.net_income || 0 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

    return (
        <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="text-2xl font-semibold">Balance Sheet</div>
            <div className="overflow-x-auto">
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#8884d8" label>
                            {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default IncomeStatementChart;
