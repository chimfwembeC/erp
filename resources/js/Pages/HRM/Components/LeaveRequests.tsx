import { Link } from '@inertiajs/react';
import React, { useState } from 'react';



interface LeaveRequestsProps {
    requests: LeaveRequest[];
    onApprove: (id: number) => void;
    onReject: (id: number) => void;
}

export function LeaveRequests({ requests, onApprove, onReject }: LeaveRequestsProps) {
    return (
        <div className="bg-white rounded-lg shadow p-6 max:h-96">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Leave Requests</h2>
            <div className="overflow-y-auto">
                {requests.length > 0 ? (
                    <div className="space-y-4 max-h-64">
                        {requests.map((request) => (
                            <div key={request.id} className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 p-2 rounded-sm">
                                <div className="flex items-center space-x-4">
                                    <div>
                                        {/* <p className="text-sm font-medium text-gray-900">User ID: {request.user_id}</p> */}
                                        <p className="text-sm text-gray-500">
                                            {request.start_date} to {request.end_date} · Status: {request.status}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => onApprove(request.id)}
                                        className="px-3 py-1 text-sm text-green-600 bg-green-100 rounded-full"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => onReject(request.id)}
                                        className="px-3 py-1 text-sm text-red-600 bg-red-100 rounded-full"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">No leave requests at the moment.</p>
                )}
            </div>
            <div className="p-4 text-end">
                <Link
                    href='/hrm/leaves'
                    className="underline"
                >
                    All Leave Requests
                </Link>
            </div>
        </div>
    );
}

export default function App() {
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(
        Array.from({ length: 25 }, (_, i) => ({
            id: i + 1,
            user_id: 1000 + i,
            start_date: `2025-01-${String(10 + i).padStart(2, '0')}`,
            end_date: `2025-01-${String(12 + i).padStart(2, '0')}`,
            status: i % 2 === 0 ? 'Pending' : 'Approved',
            deleted_at: null,
            created_at: `2024-12-${String(20 + i).padStart(2, '0')}`,
            updated_at: `2024-12-${String(21 + i).padStart(2, '0')}`,
        }))
    );

    const handleApprove = (id: number) => {
        alert(`Approved leave request ID: ${id}`);
        setLeaveRequests((prev) =>
            prev.map((request) =>
                request.id === id ? { ...request, status: 'Approved' } : request
            )
        );
    };

    const handleReject = (id: number) => {
        alert(`Rejected leave request ID: ${id}`);
        setLeaveRequests((prev) =>
            prev.map((request) =>
                request.id === id ? { ...request, status: 'Rejected' } : request
            )
        );
    };

    return (
        <div className="p-4">
            <LeaveRequests requests={leaveRequests} onApprove={handleApprove} onReject={handleReject} />
        </div>
    );
}
