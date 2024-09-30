// AttendanceChart.js
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const AttendanceChart = () => {
    const data = [
        { month: 'Jan', attendance: 30 },
        { month: 'Feb', attendance: 40 },
        { month: 'Mar', attendance: 35 },
        { month: 'Apr', attendance: 50 },
        { month: 'May', attendance: 60 },
        { month: 'Jun', attendance: 70 },
    ];

    return (
      <div className="overflow-x-auto">
          <BarChart width={600} height={300} data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Legend />
            <Bar dataKey="attendance" fill="#82ca9d" />
        </BarChart>
      </div>
    );
};

export default AttendanceChart;
