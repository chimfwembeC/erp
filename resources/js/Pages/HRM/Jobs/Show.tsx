import React, { useEffect, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Show() {
  const [job, setJob] = useState(null);
  const { id } = useParams(); // Assuming you're using React Router for job URLs

  console.log('jobId',id);
  const items = [
    { label: 'Home', href: '/hrm' },
    { label: 'Jobs', href: '/hrm/jobs' },
    { label: 'Job Details' },
  ];

  useEffect(() => {
    // Fetch job details based on jobId
    axios.get(`/api/jobs/${id}`)
      .then((response) => {
        setJob(response.data);
      })
      .catch((error) => {
        console.error('Error fetching job details:', error);
      });
  }, [id]);

  if (!job) {
    return <div>Loading...</div>; // Render a loading state while data is being fetched
  }

  return (
    <AppLayout title="Job Details">
      <Breadcrumb items={items} />
      <div className="h-48 bg-indigo-800 bg-opacity-80 rounded-md mb-8 relative">
        <div className="flex justify-center items-center h-full">
          <h1 className="text-4xl text-white font-bold">{job.title}</h1>
        </div>
      </div>

      <div className="px-6">
        <div className="max-w-4xl mx-auto p-8 bg-white relative -mt-20 z-10 rounded-lg shadow-lg">
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">{job.title}</h2>
            <p className="text-sm text-gray-500">Posted on: {new Date(job.created_at).toLocaleDateString()}</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between border-b pb-4">
              <span className="text-gray-600 font-semibold">Location:</span>
              <span>{job.location || 'Not specified'}</span>
            </div>
            <div className="flex justify-between border-b pb-4">
              <span className="text-gray-600 font-semibold">Salary:</span>
              <span>{job.salary ? `$${job.salary}` : 'Not specified'}</span>
            </div>
            <div className="flex justify-between border-b pb-4">
              <span className="text-gray-600 font-semibold">Job Type:</span>
              <span>{job.job_type}</span>
            </div>
            <div className="flex justify-between border-b pb-4">
              <span className="text-gray-600 font-semibold">Application Deadline:</span>
              <span>{job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Not specified'}</span>
            </div>
            <div className="flex justify-between border-b pb-4">
              <span className="text-gray-600 font-semibold">Employer:</span>
              <span>{job.employer?.name}</span>
            </div>
            <div className="flex justify-between border-b pb-4">
              <span className="text-gray-600 font-semibold">Last Updated:</span>
              <span>{new Date(job.updated_at).toLocaleDateString()}</span>
            </div>
            <div className="border-b pb-4">
              <span className="text-gray-600 font-semibold">Description:</span>
              <p className="mt-2 text-gray-700">{job.description}</p>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <a
              href={`/job-applications/create/${job.id}`}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-500 transition duration-300"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
