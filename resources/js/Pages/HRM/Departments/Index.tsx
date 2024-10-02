import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Index = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        axios.get('/departments').then((response) => {
            setDepartments(response.data);
        });
    }, []);

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Departments</h1>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add Department</button>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Name</th>
                        <th className="px-4 py-2 border-b">Description</th>
                        <th className="px-4 py-2 border-b">Manager</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((department) => (
                        <tr key={department.id}>
                            <td className="px-4 py-2 border-b">{department.name}</td>
                            <td className="px-4 py-2 border-b">{department.description}</td>
                            <td className="px-4 py-2 border-b">{department.manager}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Index;
