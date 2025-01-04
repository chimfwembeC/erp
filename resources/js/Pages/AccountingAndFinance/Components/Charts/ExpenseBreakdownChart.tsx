import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const ExpenseBreakdownChart = () => {
    const [expenses, setExpenses] = useState({});

    useEffect(() => {
        axios.get('/api/expense-breakdown-chart')
            .then(response => {
                setExpenses(response.data);
            });
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FF8042', '#FFBB28', '#FF8042'];

    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie data={expenses.data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#8884d8" label>
                    {expenses.data && expenses.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default ExpenseBreakdownChart;
