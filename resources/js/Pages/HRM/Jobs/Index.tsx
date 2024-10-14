import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import moment from 'moment';

const Index = ({ jobs }) => {
    const navigate = useNavigate();
    const items = [
        { label: 'Home', href: '/hrm' },
        { label: 'Jobs' },
    ];

    return (
        <AppLayout title="Job Management">
            <Breadcrumb items={items} />
            <div className="container mx-auto py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Posted Jobs</h1>
                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
                        onClick={() => navigate('/hrm/jobs/create')}
                    >
                        <i className="pi pi-plus mr-2"></i> Add Job
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {jobs.map((job) => (
                        <div key={job.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
                                <p className="mt-2 text-gray-600">{job.description}</p>
                                <div className="mt-4">
                                    <p className="text-sm text-gray-500">
                                        <span className="font-semibold">Location:</span> {job.location || 'N/A'}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        <span className="font-semibold">Salary:</span> {job.salary ? `$${job.salary}` : 'N/A'}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        <span className="font-semibold">Job Type:</span> {job.job_type}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        <span className="font-semibold">Deadline Date:</span> {job.deadline ? moment(job.deadline).format('MMMM Do YYYY') : 'N/A'}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        <span className="font-semibold">Deadline Time:</span> {job.deadline ? moment(job.deadline).format('h:mm:ss a') : 'N/A'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-end p-4 border-t border-gray-200">
                                <button
                                    className="text-blue-600 hover:text-blue-800 transition-colors duration-300 mr-4"
                                    onClick={() => navigate(`/hrm/jobs/${job.id}`)}
                                >
                                    <i className="pi pi-eye"></i>
                                </button>
                                <button
                                    className="text-yellow-500 hover:text-yellow-700 transition-colors duration-300 mr-4"
                                    onClick={() => navigate(`/hrm/jobs/${job.id}/edit`)}
                                >
                                    <i className="pi pi-pencil"></i>
                                </button>
                                <button
                                    className="text-red-600 hover:text-red-800 transition-colors duration-300"
                                    onClick={() => navigate(`/hrm/jobs/${job.id}/delete`)}
                                >
                                    <i className="pi pi-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
