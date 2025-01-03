import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data format for tax summary (you'll typically fetch this from the backend)
const taxData = [
    { tax_name: 'VAT', tax_type: 'Sales Tax', amount: 5000 },
    { tax_name: 'Income Tax', tax_type: 'Income Tax', amount: 3000 },
    { tax_name: 'VAT', tax_type: 'Sales Tax', amount: 2000 },
    { tax_name: 'Income Tax', tax_type: 'Income Tax', amount: 2500 },
    { tax_name: 'VAT', tax_type: 'Sales Tax', amount: 1500 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface TaxSummaryProps {
    data: Array<{ tax_name: string; amount: number; }>;
}

const TaxSummaryChart: React.FC<TaxSummaryProps> = ({ data }) => {
    // Summarize the tax amounts by type (e.g., VAT, Income Tax)
    const summarizedData = data.reduce((acc: any, { tax_name, amount }) => {
        if (acc[tax_name]) {
            acc[tax_name].amount += amount;
        } else {
            acc[tax_name] = { tax_name, amount };
        }
        return acc;
    }, {});

    // Convert summarized data to an array for the PieChart
    const chartData = Object.values(summarizedData);

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="text-2xl font-semibold">Tax Summary</div>
            <div className="overflow-x-auto">
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="amount"
                            nameKey="tax_name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        >
                            {chartData.map((entry, index) => (
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
