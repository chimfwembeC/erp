import React, { useEffect, useState } from 'react';
import { Bar } from 'recharts';
import axios from 'axios';
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart } from 'recharts';

const BalanceSheetChart = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        axios.get('api/balance-sheet-chart')
            .then(response => {
                setData(response.data);
            });
    }, []);

    const chartData = [
        {
            name: 'Balance Sheet',
            assets: data.assets || 0,
            liabilities: data.liabilities || 0,
            equity: data.equity || 0,
        },
    ];

    return (
        <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="text-2xl font-semibold">Balance Sheet</div>
            <div className="overflow-x-auto">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="assets" stackId="a" fill="#8884d8" />
                        <Bar dataKey="liabilities" stackId="a" fill="#82ca9d" />
                        <Bar dataKey="equity" stackId="a" fill="#ff7300" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

    );
};

export default BalanceSheetChart;
