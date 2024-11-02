import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';
import SectionTitle from '@/Components/SectionTitle';
import { Dropdown } from 'primereact/dropdown';

const Edit = ({ jobApplication, jobs, users }) => {  
  console.log(jobApplication);
  const [formData, setFormData] = useState({
    job_id: jobApplication.job_id || '',
    user_id: jobApplication.user_id || '',
    applicant_name: jobApplication.applicant_name || '',
    applicant_email: jobApplication.applicant_email || '',
    phone_number: jobApplication.phone_number || '',
    linkedin_profile: jobApplication.linkedin_profile || '',
    portfolio_url: jobApplication.portfolio_url || '',
    availability_date: jobApplication.availability_date || '',
    skills: JSON.parse(jobApplication.skills || '[]'), // Parse the skills string
    references: JSON.parse(jobApplication.references || '[]'), // Parse the references string
    source: JSON.parse(jobApplication.source || '[]'), // Parse the source string
    cover_letter: jobApplication.cover_letter || '',
    resume: jobApplication.resume || null,
    status: jobApplication.status || 'pending',
  });

  const statuses = [
    {name: 'Pending', value: 'pending'},
    {name: 'Interviewed', value: 'interviewed'},
    {name: 'Accepted', value: 'accepted'},
    {name: 'Rejected', value: 'rejected'}
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onDrop = (acceptedFiles) => {
    setFormData((prevData) => ({ ...prevData, resume: acceptedFiles[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to update this job application.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const data = new FormData();
        data.append('job_id', formData.job_id);
        data.append('user_id', formData.user_id);
        data.append('applicant_name', formData.applicant_name);
        data.append('applicant_email', formData.applicant_email);
        data.append('phone_number', formData.phone_number);
        data.append('linkedin_profile', formData.linkedin_profile);
        data.append('portfolio_url', formData.portfolio_url);
        data.append('availability_date', formData.availability_date);
        data.append('skills', JSON.stringify(formData.skills));
        data.append('references', JSON.stringify(formData.references));
        data.append('source', formData.source);
        data.append('cover_letter', formData.cover_letter);
        data.append('status', formData.status);
        if (formData.resume) {
          data.append('resume', formData.resume);
        }

        axios.put(`/hrm/job-applications/${jobApplication.id}`, data, {
          onSuccess: () => {
            Swal.fire('Success!', 'Job application updated successfully.', 'success').then(() => {
              router.get('/hrm/job-applications');
            });
          },
          onError: (errors) => {
            Swal.fire('Error', 'There was an issue updating the job application.', 'error');
          },
        });
      }
    });
  };

  // Setup dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.pdf,.doc,.docx',
  });

  return (
    <AppLayout title="Edit Job Application">
      <Breadcrumb items={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'HRM', href: '/hrm' },
        { label: 'Job Applications', href: '/hrm/job-applications' },
        { label: 'Edit Job Application' },
      ]} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title="Edit Job Application"
          description="Update the details of the job application."
        />
        <div className="p-6 bg-white shadow-md rounded-lg col-span-2">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <label htmlFor="job_id" className="block font-medium mb-2">Job</label>
              <Dropdown
                id="job_id"
                name="job_id"
                value={formData.job_id}
                options={jobs}
                optionLabel='title'
                optionValue='id'
                onChange={handleChange}
                required
                placeholder="Select a job"
                className="w-full border-2"
              />
            </div>
            <div>
              <label htmlFor="user_id" className="block font-medium mb-2">User</label>
              <Dropdown
                id="user_id"
                name="user_id"
                value={formData.user_id}
                options={users}
                optionLabel='name'
                optionValue='id'
                onChange={handleChange}
                required
                placeholder="Select a user"
                className="w-full border-2"
              />
            </div>
            <div>
              <label htmlFor="applicant_name" className="block font-medium mb-2">Applicant Name</label>
              <InputText
                id="applicant_name"
                name="applicant_name"
                value={formData.applicant_name}
                onChange={handleChange}
                required
                className="w-full border-2"
              />
            </div>
            <div>
              <label htmlFor="applicant_email" className="block font-medium mb-2">Applicant Email</label>
              <InputText
                id="applicant_email"
                name="applicant_email"
                value={formData.applicant_email}
                onChange={handleChange}
                required
                className="w-full border-2"
              />
            </div>
            <div>
              <label htmlFor="phone_number" className="block font-medium mb-2">Phone Number</label>
              <InputText
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full border-2"
              />
            </div>
            <div>
              <label htmlFor="linkedin_profile" className="block font-medium mb-2">LinkedIn Profile</label>
              <InputText
                id="linkedin_profile"
                name="linkedin_profile"
                value={formData.linkedin_profile}
                onChange={handleChange}
                className="w-full border-2"
              />
            </div>
            <div>
              <label htmlFor="portfolio_url" className="block font-medium mb-2">Portfolio URL</label>
              <InputText
                id="portfolio_url"
                name="portfolio_url"
                value={formData.portfolio_url}
                onChange={handleChange}
                className="w-full border-2"
              />
            </div>
            <div>
              <label htmlFor="availability_date" className="block font-medium mb-2">Availability Date</label>
              <InputText
                id="availability_date"
                name="availability_date"
                value={formData.availability_date}
                onChange={handleChange}
                className="w-full border-2"
                placeholder="YYYY-MM-DD"
              />
            </div>
            <div>
              <label htmlFor="skills" className="block font-medium mb-2">Skills</label>
              <InputTextarea
                id="skills"
                name="skills"
                value={formData.skills?.join(', ')}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(',').map(skill => skill.trim()) })}
                className="w-full border-2"
                rows={3}
                placeholder="Enter skills separated by commas"
              />
            </div>
            <div>
              <label htmlFor="references" className="block font-medium mb-2">References</label>
              <InputTextarea
                id="references"
                name="references"
                value={formData.references?.join(', ')}
                onChange={(e) => setFormData({ ...formData, references: e.target.value.split(',').map(ref => ref.trim()) })}
                className="w-full border-2"
                rows={3}
                placeholder="Enter references separated by commas"
              />
            </div>
            <div>
              <label htmlFor="source" className="block font-medium mb-2">Source</label>
              <InputTextarea
                id="source"
                name="source"
                value={formData.source?.join(', ')} // Corrected spelling from source to sources
                onChange={(e) => setFormData({ ...formData, source: e.target.value.split(',').map(ref => ref.trim()) })}
                className="w-full border-2"
                rows={3}
                placeholder="Enter sources separated by commas" // Fixed spelling mistake
              />
            </div>
            <div>
              <label htmlFor="cover_letter" className="block font-medium mb-2">Cover Letter</label>
              <InputTextarea
                id="cover_letter"
                name="cover_letter"
                value={formData.cover_letter}
                onChange={handleChange}
                className="w-full border-2"
                rows={5}
              />
            </div>
            <div>
              <label htmlFor="status" className="block font-medium mb-2">Status</label>
              <Dropdown
                id="status"
                name="status"
                value={formData.status}
                options={statuses}
                optionLabel='name'
                optionValue='value'
                onChange={handleChange}
                required
                placeholder="Select a status"
                className="w-full border-2"
              />
            </div>
            <div {...getRootProps({ className: 'dropzone border-2 p-4' })}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>{formData.resume ? formData.resume.name : "Drag 'n' drop some files here, or click to select files"}</p>
              )}
            </div>
            <Button type="submit" label="Update Job Application" className="mt-4" />
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default Edit;
