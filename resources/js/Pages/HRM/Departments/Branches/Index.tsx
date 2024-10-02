import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Index = ({data}) => {
    const [branchDepartments, setBranchDepartments] = useState([]);

    useEffect(() => {
        // axios.get('/hrm/branch-department').then((response) => {
            setBranchDepartments(data);
        // });
    }, []);

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Branch - Department Management</h1>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Link Branch and Department</button>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Branch</th>
                        <th className="px-4 py-2 border-b">Department</th>
                    </tr>
                </thead>
                <tbody>
                    {branchDepartments.map((item) => (
                        <tr key={item.id}>
                            <td className="px-4 py-2 border-b">{item.branch.name}</td>
                            <td className="px-4 py-2 border-b">{item.department.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Index;
