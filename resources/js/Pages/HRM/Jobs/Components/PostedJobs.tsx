// resources/js/Pages/PostedJobs.jsx
import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';

const PostedJobs = ({}) => {
    // const [jobs, setJobs] = useState([]);

    // useEffect(() => {
    //     // Fetch posted jobs from the API
    //     const fetchJobs = async () => {
    //         try {
    //             // const response = await axios.get('/api/jobs'); // Adjust the API endpoint as needed
    //             setJobs(response.data);
    //         } catch (error) {
    //             console.error('Error fetching jobs:', error);
    //         }
    //     };

    //     fetchJobs();
    // }, []);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Posted Jobs</h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => (
                    <div key={job.id} className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-semibold">{job.title}</h2>
                        <p className="mt-2 text-gray-600">{job.description}</p>
                        <p className="mt-2 font-semibold">Location: {job.location || 'N/A'}</p>
                        <p className="mt-1 font-semibold">Salary: {job.salary ? `$${job.salary}` : 'N/A'}</p>
                        <p className="mt-1 font-semibold">Job Type: {job.job_type}</p>
                        <p className="mt-1 font-semibold">Deadline: {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'N/A'}</p>
                        <button
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={() => Inertia.visit(`/jobs/${job.id}`)} // Replace with your job detail route
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostedJobs;
