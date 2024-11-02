import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import useRoute from '@/Hooks/useRoute';
import SectionTitle from '@/Components/SectionTitle';

const Create = ({ users }) => {
  const [formData, setFormData] = useState({
    user_id: null,
    start_date: null,
    end_date: null,
    status: 'pending',
  });

  const route = useRoute();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'HRM', href: '/hrm' },
    { label: 'Leave Requests', href: '/hrm/leaves' },
    { label: 'Create Leave Request' },
  ];

  const statusOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'Rejected', value: 'rejected' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to create a new leave request.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const url = route('hrm.leaves.store');
  
        router.post(url, formData, {
            onSuccess: () => {
              Swal.fire('Success!', 'Leave request created successfully.', 'success').then(() => {
                router.get(route('hrm.leaves.index'));
              });
            },
            onError: (errors) => {
              // Check for the specific error message and show a SweetAlert if it exists
              if (errors.error && errors.error.includes('pending leave application')) {
                Swal.fire('Error', 'You already have a pending leave application. Please contact Human Resources for further assistance.', 'error');
              } else {
                Swal.fire('Error', 'There was an issue creating the leave request.', 'error');
              }
            },
          });
      }
    });
  };

  return (
    <AppLayout title="Create Leave Request">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title="Create New Leave Request"
          description="Fill out the details to add a leave request."
        />
        <div className="p-6 bg-white shadow-md rounded-lg col-span-2">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <label htmlFor="user_id" className="block font-medium mb-2">Employee</label>
              <Dropdown
                id="user_id"
                name="user_id"
                value={formData.user_id}
                options={users.map((user) => ({ label: user.name, value: user.id }))}
                onChange={(e) => setFormData((prev) => ({ ...prev, user_id: e.value }))}
                placeholder="Select an employee"
                className="w-full border-2"
                required
              />
            </div>
            <div>
              <label htmlFor="start_date" className="block font-medium mb-2">Start Date</label>
              <Calendar
                id="start_date"
                name="start_date"
                value={formData.start_date}
                onChange={(e) => setFormData((prev) => ({ ...prev, start_date: e.value }))}
                dateFormat="yy-mm-dd"
                placeholder="Select start date"
                className="w-full"
                showTime // Enables time selection
                hourFormat="24" // Use 12 for AM/PM format, 24 for 24-hour format
                disabledDays={[0, 6]}  // Disables Sundays (0) and Saturdays (6)
                required
              />
            </div>
            <div>
              <label htmlFor="end_date" className="block font-medium mb-2">End Date</label>
              <Calendar
                id="end_date"
                name="end_date"
                value={formData.end_date}
                onChange={(e) => setFormData((prev) => ({ ...prev, end_date: e.value }))}
                dateFormat="yy-mm-dd"
                placeholder="Select end date"
                className="w-full"
                showTime // Enables time selection
                hourFormat="24" // Use 12 for AM/PM format, 24 for 24-hour format
                disabledDays={[0, 6]}  // Disables Sundays (0) and Saturdays (6)
                required
              />
            </div>
            <div>
              <label htmlFor="status" className="block font-medium mb-2">Status</label>
              <Dropdown
                id="status"
                name="status"
                value={formData.status}
                disabled
                options={statusOptions}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.value }))}
                placeholder="Select status"
                className="w-full border-2"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" label="Create Leave Request" icon="pi pi-check" className="p-button-success bg-primary text-white p-2 rounded-lg" />
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default Create;
