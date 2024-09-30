// PayrollChart.js
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const PayrollChart = () => {
    const data = [
        { month: 'Jan', payroll: 40000 },
        { month: 'Feb', payroll: 42000 },
        { month: 'Mar', payroll: 43000 },
        { month: 'Apr', payroll: 45000 },
        { month: 'May', payroll: 48000 },
        { month: 'Jun', payroll: 50000 },
    ];

    return (
        <LineChart width={600} height={300} data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Legend />
            <Line type="monotone" dataKey="payroll" stroke="#ff7300" />
        </LineChart>
    );
};

export default PayrollChart;
