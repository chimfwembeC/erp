import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const ReceivablesPayablesChart = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        axios.get('/api/receivables-payables-chart')
            .then(response => {
                setData(response.data);
            });
    }, []);

    const chartData = [
        {
            name: 'Receivables vs Payables',
            receivables: data.receivables || 0,
            payables: data.payables || 0,
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
                <Bar dataKey="receivables" fill="#8884d8" />
                <Bar dataKey="payables" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ReceivablesPayablesChart;
