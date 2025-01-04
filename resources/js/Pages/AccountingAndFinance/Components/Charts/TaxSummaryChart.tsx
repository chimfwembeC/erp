import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const TaxSummaryChart = () => {
    const [taxes, setTaxes] = useState([]);

    useEffect(() => {
        axios.get('/api/tax-summary-chart')
            .then(response => {
                // Ensure the response is in the correct format for the PieChart
                const formattedData = response.data.map(tax => ({
                    name: tax.name,
                    value: tax.value
                }));
                setTaxes(formattedData);
            });
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

    return (
        <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="text-2xl font-semibold">Tax Summary</div>
            <div className="overflow-x-auto">
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={taxes}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            fill="#8884d8"
                            label
                        >
                            {taxes.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TaxSummaryChart;
