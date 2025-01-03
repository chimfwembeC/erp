import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Payment {
    id: number;
    invoice_id: string;
    amount: number;
    payment_date: string;
    payment_method: string;
}

const payments: Payment[] = [
    { id: 1, invoice_id: 'INV-001', amount: 500, payment_date: '2025-01-01', payment_method: 'Credit Card' },
    { id: 2, invoice_id: 'INV-002', amount: 750, payment_date: '2025-01-03', payment_method: 'Bank Transfer' },
    { id: 3, invoice_id: 'INV-003', amount: 400, payment_date: '2025-01-05', payment_method: 'Cash' },
    { id: 4, invoice_id: 'INV-004', amount: 950, payment_date: '2025-01-07', payment_method: 'Credit Card' },
    { id: 5, invoice_id: 'INV-005', amount: 1200, payment_date: '2025-01-10', payment_method: 'Bank Transfer' },
    { id: 6, invoice_id: 'INV-006', amount: 850, payment_date: '2025-01-12', payment_method: 'Cash' },
    { id: 7, invoice_id: 'INV-007', amount: 300, payment_date: '2025-01-15', payment_method: 'Credit Card' },
    { id: 8, invoice_id: 'INV-008', amount: 1400, payment_date: '2025-01-17', payment_method: 'Bank Transfer' },
    { id: 9, invoice_id: 'INV-009', amount: 600, payment_date: '2025-01-20', payment_method: 'Cash' },
    { id: 10, invoice_id: 'INV-010', amount: 200, payment_date: '2025-01-22', payment_method: 'Credit Card' },
    { id: 11, invoice_id: 'INV-011', amount: 500, payment_date: '2025-01-25', payment_method: 'Bank Transfer' },
    { id: 12, invoice_id: 'INV-012', amount: 300, payment_date: '2025-01-28', payment_method: 'Cash' },
    { id: 13, invoice_id: 'INV-013', amount: 600, payment_date: '2025-02-02', payment_method: 'Credit Card' },
    { id: 14, invoice_id: 'INV-014', amount: 400, payment_date: '2025-02-05', payment_method: 'Bank Transfer' },
    { id: 15, invoice_id: 'INV-015', amount: 700, payment_date: '2025-02-07', payment_method: 'Cash' },
    { id: 16, invoice_id: 'INV-016', amount: 1200, payment_date: '2025-02-10', payment_method: 'Credit Card' },
    { id: 17, invoice_id: 'INV-017', amount: 950, payment_date: '2025-02-12', payment_method: 'Bank Transfer' },
    { id: 18, invoice_id: 'INV-018', amount: 1500, payment_date: '2025-02-15', payment_method: 'Cash' },
    { id: 19, invoice_id: 'INV-019', amount: 700, payment_date: '2025-02-18', payment_method: 'Credit Card' },
    { id: 20, invoice_id: 'INV-020', amount: 300, payment_date: '2025-02-20', payment_method: 'Bank Transfer' },
    { id: 21, invoice_id: 'INV-021', amount: 400, payment_date: '2025-02-22', payment_method: 'Cash' },
    { id: 22, invoice_id: 'INV-022', amount: 900, payment_date: '2025-02-25', payment_method: 'Credit Card' },
    { id: 23, invoice_id: 'INV-023', amount: 1500, payment_date: '2025-02-27', payment_method: 'Bank Transfer' },
    { id: 24, invoice_id: 'INV-024', amount: 800, payment_date: '2025-02-28', payment_method: 'Cash' },
    { id: 25, invoice_id: 'INV-025', amount: 600, payment_date: '2025-03-01', payment_method: 'Credit Card' },
    { id: 26, invoice_id: 'INV-026', amount: 1000, payment_date: '2025-03-03', payment_method: 'Bank Transfer' },
    { id: 27, invoice_id: 'INV-027', amount: 400, payment_date: '2025-03-05', payment_method: 'Cash' },
    { id: 28, invoice_id: 'INV-028', amount: 700, payment_date: '2025-03-07', payment_method: 'Credit Card' },
    { id: 29, invoice_id: 'INV-029', amount: 850, payment_date: '2025-03-10', payment_method: 'Bank Transfer' },
    { id: 30, invoice_id: 'INV-030', amount: 1100, payment_date: '2025-03-12', payment_method: 'Cash' },
];

// Aggregate payments by payment method
const chartData = payments.reduce((acc, payment) => {
    const existing = acc.find((item) => item.payment_method === payment.payment_method);
    if (existing) {
        existing.amount += payment.amount;
    } else {
        acc.push({ payment_method: payment.payment_method, amount: payment.amount });
    }
    return acc;
}, [] as { payment_method: string; amount: number }[]);

// Define colors for each payment method
const paymentMethodColors: { [key: string]: string } = {
    'Credit Card': '#4F46E5',    // Blue
    'Bank Transfer': '#34D399',  // Green
    'Cash': '#F59E0B',           // Orange
};

export default class PaymentsChart extends PureComponent {
    render() {
        return (
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="text-2xl font-semibold">Payments</div>
                <div className="overflow-x-auto">
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart
                            data={chartData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="payment_method" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {Object.keys(paymentMethodColors).map((method) => (
                                <Line
                                    key={method}
                                    type="monotone"
                                    dataKey="amount"
                                    stroke={paymentMethodColors[method]}
                                    name={method}
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}
