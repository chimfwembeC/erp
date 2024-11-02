import Breadcrumb from '@/Components/Breadcrumb';
import AppLayout from '@/Layouts/AppLayout';
import { Chip } from 'primereact/chip';
import React from 'react';

const Show = ({ jobApplication }) => {
  if (!jobApplication) {
    return <div>Loading...</div>; // Handle loading state
  }

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'HRM', href: '/hrm' },
    { label: 'Job Applications', href: '/hrm/job-applications' },
    { label: 'Job Application Details' },
  ];

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <AppLayout title="Job Application Details">
      <div>
        <h1 className="text-2xl font-bold mb-4">Job Application Details</h1>
        <Breadcrumb items={breadcrumbItems} />
        <div className="job-application-details mb-6 bg-white p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="shadow-md border-2 rounded-lg p-4">
              <h2 className="text-xl font-semibold">Applicant Information</h2>
              <p><strong>Name:</strong> {jobApplication.applicant.name}</p>
              <p><strong>Applicant Email:</strong> {jobApplication.applicant_email}</p>
              <p><strong>Phone Number:</strong> {jobApplication.phone_number}</p>
              <p>
                <strong>LinkedIn Profile:</strong>
                {isValidUrl(jobApplication.linkedin_profile) ? (
                  <a href={jobApplication.linkedin_profile} target="_blank" rel="noopener noreferrer">
                    {jobApplication.linkedin_profile}
                  </a>
                ) : 'N/A'}
              </p>
              <p>
                <strong>Portfolio URL:</strong>
                {isValidUrl(jobApplication.portfolio_url) ? (
                  <a href={jobApplication.portfolio_url} target="_blank" rel="noopener noreferrer">
                    {jobApplication.portfolio_url}
                  </a>
                ) : 'N/A'}
              </p>
              <p><strong>Availability Date:</strong> {jobApplication.availability_date}</p>
              <p className="block">
                <strong>Skills:</strong>
                {JSON.parse(jobApplication.skills).map((skill, index) => (
                  <Chip className="mr-2 px-4" label={skill} key={index} />
                ))}
              </p>
              <p><strong>Cover Letter:</strong> <div dangerouslySetInnerHTML={{ __html: jobApplication.cover_letter }} /></p>
              <p><strong>Status:</strong> {jobApplication.status}</p>
              <p><strong>References:</strong> {JSON.parse(jobApplication.references).join(', ')}</p>
            </div>
            <div className="shadow-md border-2 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">Resume</h2>
              <iframe
                src={jobApplication.resume} // Ensure resume URL is valid
                style={{ width: '100%', height: '600px', border: 'none' }}
                title="Resume"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Show;
