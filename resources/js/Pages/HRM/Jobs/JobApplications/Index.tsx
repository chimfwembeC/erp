// src/hrm/Index.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Index = ({ jobApplications }) => {
    const navigate = useNavigate();

    console.log('jobApplications',jobApplications);
    const handleCreate = () => {
        navigate('/hrm/job-applications/create');
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Job Applications Management</h1>
            <button
                onClick={handleCreate}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
                Add Job Application
            </button>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Applicant Name</th>
                        <th className="px-4 py-2 border-b">Email</th>
                        <th className="px-4 py-2 border-b">Position</th>
                        <th className="px-4 py-2 border-b">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {jobApplications.map((application) => (
                        <tr key={application.id}>
                            <td className="px-4 py-2 border-b">{application.applicant_name}</td>
                            <td className="px-4 py-2 border-b">{application.applicant_email}</td>
                            <td className="px-4 py-2 border-b">{application.position}</td>
                            <td className="px-4 py-2 border-b">{application.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Index;
