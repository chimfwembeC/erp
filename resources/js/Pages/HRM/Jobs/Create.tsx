import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import axios from 'axios';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';
import Breadcrumb from '@/Components/Breadcrumb';

export default function Create() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    job_type: 'full-time',
    deadline: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' }); // Clear error for the field being updated
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Job title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.salary) {
      newErrors.salary = 'Salary is required';
    } else if (formData.salary <= 0) {
      newErrors.salary = 'Salary must be a positive number';
    }
    if (!formData.deadline) newErrors.deadline = 'Application deadline is required';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // SweetAlert2 confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to create this job!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.post('/hrm/jobs', formData); // Adjust the route as necessary
        Swal.fire('Created!', 'The job has been created successfully.', 'success').then(() => {
            router.get('/hrm/jobs');
        });
      } catch (error) {
        Swal.fire('Error!', 'There was an error creating the job.', 'error');
      }
    }
  };

  const items = [
    { label: 'Home', href: '/dashboard' },
    { label: 'hrm', href: '/hrm' },
    { label: 'Jobs', href: '/hrm/jobs' },
    { label: 'Create Job' },
];
  return (
    <AppLayout title="Create Job">
        <Breadcrumb items={items} />

      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md mt-4">
        <h1 className="text-2xl font-bold mb-4">Create Job</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="title">Job Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border rounded focus:outline-none focus:ring ${errors.title ? 'border-red-500' : ''}`}
              required
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="description">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border rounded focus:outline-none focus:ring ${errors.description ? 'border-red-500' : ''}`}
              required
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border rounded focus:outline-none focus:ring ${errors.location ? 'border-red-500' : ''}`}
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="salary">Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border rounded focus:outline-none focus:ring ${errors.salary ? 'border-red-500' : ''}`}
            />
            {errors.salary && <p className="text-red-500 text-sm">{errors.salary}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="job_type">Job Type</label>
            <select
              name="job_type"
              value={formData.job_type}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded focus:outline-none focus:ring"
            >
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="deadline">Application Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border rounded focus:outline-none focus:ring ${errors.deadline ? 'border-red-500' : ''}`}
            />
            {errors.deadline && <p className="text-red-500 text-sm">{errors.deadline}</p>}
          </div>

          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition">
            Create Job
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
