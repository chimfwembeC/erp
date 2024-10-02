import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppLayout from '@/Layouts/AppLayout';

const Index = ({leaveRequests}) => {
    // const [leaveRequests, setLeaveRequests] = useState([]);

    // useEffect(() => {
    //     axios.get('/leave_requests').then((response) => {
    //         setLeaveRequests(response.data);
    //     });
    // }, []);

    const handleApproval = (id, status) => {
        axios.post(`/hrm/leave-requests/${id}/approve`, { status }).then(() => {
            // Refresh the leave request list
        });
    };

    return (
        <AppLayout title='Leave Management'>
            <div className="p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Leave Requests</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Employee</th>
                        <th className="px-4 py-2 border-b">Start Date</th>
                        <th className="px-4 py-2 border-b">End Date</th>
                        <th className="px-4 py-2 border-b">Status</th>
                        <th className="px-4 py-2 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveRequests.map((request) => (
                        <tr key={request.id}>
                            <td className="px-4 py-2 border-b">{request.user.name}</td>
                            <td className="px-4 py-2 border-b">{request.start_date}</td>
                            <td className="px-4 py-2 border-b">{request.end_date}</td>
                            <td className="px-4 py-2 border-b">{request.status}</td>
                            <td className="px-4 py-2 border-b">
                                <button
                                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                    onClick={() => handleApproval(request.id, 'approved')}
                                >
                                    Approve
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleApproval(request.id, 'rejected')}
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </AppLayout>
    );
};

export default Index;
