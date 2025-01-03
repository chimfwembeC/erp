import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

export interface Payroll {
    user_id: number;
    amount: string; // Assuming string to match your specification, will parse it to number
    pay_date: string;
    status: string;
}

const PayrollChart = () => {
    const payrollData: Payroll[] = [
        { user_id: 1, amount: '2000', pay_date: '2023-01-15', status: 'Paid' },
        { user_id: 2, amount: '2500', pay_date: '2023-01-20', status: 'Paid' },
        { user_id: 3, amount: '3000', pay_date: '2023-02-10', status: 'Paid' },
        { user_id: 4, amount: '2800', pay_date: '2023-02-15', status: 'Paid' },
        { user_id: 5, amount: '3200', pay_date: '2023-03-05', status: 'Paid' },
        { user_id: 6, amount: '2900', pay_date: '2023-03-15', status: 'Paid' },
        { user_id: 7, amount: '3100', pay_date: '2023-04-10', status: 'Paid' },
        { user_id: 8, amount: '3300', pay_date: '2023-04-20', status: 'Paid' },
        { user_id: 9, amount: '3500', pay_date: '2023-05-05', status: 'Paid' },
        { user_id: 10, amount: '3700', pay_date: '2023-05-25', status: 'Paid' },
        { user_id: 11, amount: '4000', pay_date: '2023-06-10', status: 'Paid' },
        { user_id: 12, amount: '4200', pay_date: '2023-06-20', status: 'Paid' },
    ];

    // Aggregate payroll amounts by month
    const aggregatedData = payrollData.reduce((acc, record) => {
        const month = new Date(record.pay_date).toLocaleString('default', { month: 'short' });
        const existing = acc.find((entry) => entry.month === month);

        if (existing) {
            existing.payroll += parseFloat(record.amount);
        } else {
            acc.push({ month, payroll: parseFloat(record.amount) });
        }

        return acc;
    }, [] as { month: string; payroll: number }[]);

    return (
        <div className="overflow-x-auto">
            <LineChart width={600} height={300} data={aggregatedData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Legend />
                <Line type="monotone" dataKey="payroll" stroke="#ff7300" />
            </LineChart>
        </div>
    );
};

export default PayrollChart;
