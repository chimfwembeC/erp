import React, { useState } from 'react';
import axios from 'axios';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';

const ProjectForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [ownerId, setOwnerId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Show confirmation dialog
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to create this project?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, create it!',
        }).then((result) => {
            if (result.isConfirmed) {
                // Proceed with form submission
                axios
                    .post('/projects', { name, description, start_date: startDate, end_date: endDate, owner_id: ownerId })
                    .then(() => {
                        Swal.fire('Created!', 'The project has been created.', 'success');
                        router.get('/projects');
                    })
                    .catch((err) => {
                        console.error(err);
                        Swal.fire('Error!', 'An error occurred while creating the project.', 'error');
                    });
            }
        });
    };

    return (
        <div className="w-1/2 bg-white shadow-md rounded-lg p-6 mt-4 mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Create New Project</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Project Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Project Name"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Project Description"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Owner ID</label>
                    <input
                        type="number"
                        value={ownerId}
                        onChange={(e) => setOwnerId(e.target.value)}
                        placeholder="Owner ID"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Create Project
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProjectForm;
