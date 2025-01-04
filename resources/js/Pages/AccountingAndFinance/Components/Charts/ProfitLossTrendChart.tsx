import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const ProfitLossTrendChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/api/profit-loss-trend-chart')
            .then(response => {
                setData(response.data);
            });
    }, []);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default ProfitLossTrendChart;
