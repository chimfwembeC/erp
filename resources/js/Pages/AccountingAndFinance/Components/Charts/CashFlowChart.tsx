import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const CashFlowChart = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        axios.get('/api/cash-flow-chart')
            .then(response => {
                setData(response.data);
            });
    }, []);

    const chartData = [
        {
            name: 'Cash Flow',
            inflows: data.inflows || 0,
            outflows: data.outflows || 0,
        },
    ];

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="inflows" fill="#8884d8" />
                <Bar dataKey="outflows" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default CashFlowChart;
