// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApplicationIndex from './Index';
import JobApplicationCreate from './Create';
import JobApplicationShow from './Show';
import JobApplicationEdit from './Edit'; // New Edit Component
import AppLayout from '@/Layouts/AppLayout';

export default function App({ jobApplications }) {
  return (
    <Router>
      <AppLayout title='Job Applications'>
        <Routes>
          <Route path="/hrm/job-applications" element={<ApplicationIndex jobApplications={jobApplications} />} />
          <Route path="/hrm/job-applications/create" element={<JobApplicationCreate />} />
          <Route path="/hrm/job-applications/:id" element={<JobApplicationShow />} />
          <Route path="/hrm/job-applications/:id/edit" element={<JobApplicationEdit />} /> {/* Edit Route */}
        </Routes>
      </AppLayout>
    </Router>
  );
}
