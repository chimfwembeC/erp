import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Show() {
  const { id } = useParams();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    axios.get(`/hrm/job-applications/${id}`)
      .then(response => {
        setApplication(response.data);
      })
      .catch(error => {
        console.error('Error fetching job application:', error);
      });
  }, [id]);

  if (!application) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Job Application Details</h1>
      <p><strong>Job ID:</strong> {application.posted_job_id}</p>
      <p><strong>User ID:</strong> {application.user_id}</p>
      <p><strong>Resume:</strong> <a href={application.resume}>Download</a></p>
      <p><strong>Cover Letter:</strong> {application.cover_letter}</p>
      <p><strong>Status:</strong> {application.status}</p>
    </div>
  );
}
