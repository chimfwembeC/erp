import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function Edit() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    posted_job_id: '',
    user_id: '',
    resume: null,
    cover_letter: '',
    status: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/hrm/job-applications/${id}`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching job application:', error);
      });
  }, [id]);

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
    if (formData.resume) data.append('resume', formData.resume);
    data.append('cover_letter', formData.cover_letter);
    data.append('status', formData.status);

    axios.put(`/hrm/job-applications/${id}`, data)
      .then(response => {
        console.log('Job application updated successfully');
        navigate('/job-applications');
      })
      .catch(error => {
        console.error('Error updating job application:', error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Edit Job Application</h1>
      <form onSubmit={handleSubmit}>
        {/* Same fields as in the Create form */}
      </form>
    </div>
  );
}
