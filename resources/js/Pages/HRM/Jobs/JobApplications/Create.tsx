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

const Create = ({ jobs, users }) => {
  const [formData, setFormData] = useState({
    job_id: '',
    user_id: '',
    applicant_name: '',
    applicant_email: '',
    phone_number: '',
    linkedin_profile: '',
    portfolio_url: '',
    availability_date: '',
    skills: [],
    sources: [],
    references: [],
    resume: null,
    cover_letter: '',
    status: 'pending',
  });

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'HRM', href: '/hrm' },
    { label: 'Job Applications', href: '/hrm/job-applications' },
    { label: 'Create Job Application' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onDrop = (acceptedFiles) => {
    setFormData((prevData) => ({ ...prevData, resume: acceptedFiles[0] }));
  };

  const handleMultiSelectChange = (name) => (value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to create a new job application.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create it!',
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
        data.append('sources', JSON.stringify(formData.sources));
        data.append('references', JSON.stringify(formData.references));
        data.append('resume', formData.resume);
        data.append('cover_letter', formData.cover_letter);
        data.append('status', formData.status);

        router.post('/hrm/job-applications', data, {
          onSuccess: () => {
            Swal.fire('Success!', 'Job application created successfully.', 'success').then(() => {
              router.get('/hrm/job-applications');
            });
          },
          onError: (errors) => {
            Swal.fire('Error', 'There was an issue creating the job application. Please try again.', 'error');
          },
        });
      }
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.pdf,.doc,.docx',
  });

  return (
    <AppLayout title="Create Job Application">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title="Create New Job Application"
          description="Fill out the details to add a job application."
        />
        <div className="p-6 bg-white shadow-md rounded-lg col-span-2">
          <form onSubmit={handleSubmit} className="grid gap-4">
            {/* Other form fields... */}
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
                value={formData.skills.join(', ')}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(',').map(ref => ref.trim()) })}
                className="w-full border-2"
                rows={3}
                placeholder="Enter skills separated by commas"
              />
            </div>
            <div>
              <label htmlFor="sources" className="block font-medium mb-2">Sources</label>
              <InputTextarea
                id="sources"
                name="sources"
                value={formData.sources.join(', ')} // Corrected spelling from source to sources
                onChange={(e) => setFormData({ ...formData, sources: e.target.value.split(',').map(ref => ref.trim()) })}
                className="w-full border-2"
                rows={3}
                placeholder="Enter sources separated by commas" // Fixed spelling mistake
              />
            </div>
            <div>
              <label htmlFor="references" className="block font-medium mb-2">References</label>
              <InputTextarea
                id="references"
                name="references"
                value={formData.references.join(', ')}
                onChange={(e) => setFormData({ ...formData, references: e.target.value.split(',').map(ref => ref.trim()) })}
                className="w-full border-2"
                rows={3}
                placeholder="Enter references separated by commas"
              />
            </div>
            <div {...getRootProps()} className="border-2 border-dashed p-4 flex flex-col justify-center items-center mb-4">
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-gray-500">Drop the files here ...</p>
              ) : (
                <p className="text-gray-500">Drag 'n' drop your resume here, or click to select files</p>
              )}
            </div>
            {formData.resume && (
              <div className="border p-4 rounded mb-4">
                <h4 className="font-medium mb-2">Uploaded Resume:</h4>
                <p>{formData.resume.name}</p>
                <p>{(formData.resume.size / 1024).toFixed(2)} KB</p>
                <a href={URL.createObjectURL(formData.resume)} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  View Resume
                </a>
              </div>
            )}

            <div>
              <label htmlFor="cover_letter" className="block font-medium mb-2">Cover Letter</label>
              <InputTextarea
                id="cover_letter"
                name="cover_letter"
                value={formData.cover_letter}
                onChange={handleChange}
                rows={4}
                className="w-full border-2"
              />
            </div>
            <Button type="submit" label="Submit" className="mt-4" />
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default Create;
