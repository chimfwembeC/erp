import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Create() {
  const [formData, setFormData] = useState({
    posted_job_id: '',
    user_id: '',
    resume: null,
    cover_letter: '',
    status: 'pending',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('posted_job_id', formData.posted_job_id);
    data.append('user_id', formData.user_id);
    data.append('resume', formData.resume);
    data.append('cover_letter', formData.cover_letter);
    data.append('status', formData.status);

    axios.post('/hrm/job-applications', data)
      .then(response => {
        console.log('Job application created successfully');
        navigate('/job-applications');
      })
      .catch(error => {
        console.error('Error creating job application:', error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create Job Application</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="posted_job_id">Job ID</label>
          <input
            type="text"
            name="posted_job_id"
            value={formData.posted_job_id}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="user_id">User ID</label>
          <input
            type="text"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="resume">Resume</label>
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
            className="mt-1 block w-full p-2 border rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="cover_letter">Cover Letter</label>
          <textarea
            name="cover_letter"
            value={formData.cover_letter}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded focus:outline-none focus:ring"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition">
          Submit Application
        </button>
      </form>
    </div>
  );
}
