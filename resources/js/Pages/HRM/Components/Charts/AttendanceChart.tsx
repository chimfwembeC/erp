import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

interface Attendance {
    id: number;
    user_id: number;
    check_in: string;
    check_out: string;
    status: string;
    created_at: Date;
    updated_at: Date;
}

export default function AttendanceChart() {
    // Example attendance data
    const attendanceData: Attendance[] = [
        { id: 1, user_id: 101, check_in: '2023-01-15T09:00:00', check_out: '2023-01-15T17:00:00', status: 'Present', created_at: new Date(), updated_at: new Date() },
        { id: 2, user_id: 102, check_in: '2023-01-16T09:00:00', check_out: '2023-01-16T17:00:00', status: 'Absent', created_at: new Date(), updated_at: new Date() },
        { id: 3, user_id: 103, check_in: '2023-02-10T09:00:00', check_out: '2023-02-10T17:00:00', status: 'Present', created_at: new Date(), updated_at: new Date() },
        { id: 4, user_id: 104, check_in: '2023-03-15T09:00:00', check_out: '2023-03-15T17:00:00', status: 'Present', created_at: new Date(), updated_at: new Date() },
        { id: 5, user_id: 105, check_in: '2023-03-20T09:00:00', check_out: '2023-03-20T17:00:00', status: 'Present', created_at: new Date(), updated_at: new Date() },
        { id: 6, user_id: 106, check_in: '2023-04-10T09:00:00', check_out: '2023-04-10T17:00:00', status: 'Present', created_at: new Date(), updated_at: new Date() },
        { id: 7, user_id: 107, check_in: '2023-05-01T09:00:00', check_out: '2023-05-01T17:00:00', status: 'Absent', created_at: new Date(), updated_at: new Date() },
        { id: 8, user_id: 108, check_in: '2023-06-15T09:00:00', check_out: '2023-06-15T17:00:00', status: 'Present', created_at: new Date(), updated_at: new Date() },
    ];

    // Aggregate attendance by month
    const aggregatedData = attendanceData.reduce((acc, curr) => {
        const month = new Date(curr.check_in).toLocaleString('default', { month: 'short' });
        const existing = acc.find((entry) => entry.month === month);

        if (existing) {
            existing.attendance += 1;
        } else {
            acc.push({ month, attendance: 1 });
        }

        return acc;
    }, [] as { month: string; attendance: number }[]);

    return (
        <div className="overflow-x-auto">
            <BarChart width={600} height={300} data={aggregatedData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Legend />
                <Bar dataKey="attendance" fill="#82ca9d" />
            </BarChart>
        </div>
    );
}
