import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppLayout from '@/Layouts/AppLayout';

const Index = ({employees}) => {
    // const [employees, setEmployees] = useState([]);

    // useEffect(() => {
    //     axios.get('/hrm/employees').then((response) => {
    //         setEmployees(response.data);
    //     });
    // }, []);

    const handleApproval = (id, status) => {
        axios.post(`/hrm/employees/${id}/approve`, { status }).then(() => {
            // Refresh the leave request list
        });
    };

    return (
       <AppLayout title='Employee Management'>
         <div className="p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Employees</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Name</th>
                        <th className="px-4 py-2 border-b">Role</th>
                        <th className="px-4 py-2 border-b">Department</th>
                        {/* <th className="px-4 py-2 border-b">Status</th> */}
                        <th className="px-4 py-2 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td className="px-4 py-2 border-b">{employee.username}</td>
                            <td className="px-4 py-2 border-b">{employee.role}</td>
                            <td className="px-4 py-2 border-b">{employee.departments?.name}</td>
                            {/* <td className="px-4 py-2 border-b">{employee.status}</td> */}
                            <td className="px-4 py-2 border-b">
                                <button
                                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                    onClick={() => handleApproval(employee.id, 'approved')}
                                >
                                    Approve
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleApproval(employee.id, 'rejected')}
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
