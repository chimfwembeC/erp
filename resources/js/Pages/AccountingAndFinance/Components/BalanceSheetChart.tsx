import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const BalanceSheetChart = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('/api/balance-sheet-chart')
            .then(response => {
                setData([
                    { name: 'Assets', value: response.data.assets },
                    { name: 'Liabilities', value: response.data.liabilities },
                    { name: 'Equity', value: response.data.equity }
                ]);
            });
    }, []);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BalanceSheetChart;
