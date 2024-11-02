import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { Button } from 'primereact/button';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';
import SectionTitle from '@/Components/SectionTitle';
import moment from 'moment'; // Import moment.js

const Show = ({ leave }) => {
  const route = useRoute();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'HRM', href: '/hrm' },
    { label: 'Leave Requests', href: '/hrm/leaves' },
    { label: 'Leave Request Details' },
  ];

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this leave request.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const url = route('hrm.leaves.destroy', leave.id);
        
        router.delete(url, {
          onSuccess: () => {
            Swal.fire('Deleted!', 'Leave request has been deleted.', 'success');
            router.visit('/hrm/leaves'); // Redirect to the leave requests list
          },
          onError: () => {
            Swal.fire('Error', 'There was an issue deleting the leave request.', 'error');
          },
        });
      }
    });
  };

  return (
    <AppLayout title="Leave Request Details">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title="Leave Request Details"
          description="View the details of the leave request."
        />
        <div className="p-6 bg-white shadow-md rounded-lg col-span-2">
          <div className="mb-4">
            <strong>Employee:</strong> {leave.user.name} {/* Assuming leave.user contains the employee's name */}
          </div>
          <div className="mb-4">
            <strong>Start Date:</strong> {moment(leave.start_date).format('MMMM D, YYYY')}
          </div>
          <div className="mb-4">
            <strong>End Date:</strong> {moment(leave.end_date).format('MMMM D, YYYY')}
          </div>
          <div className="mb-4">
            <strong>Status:</strong> {leave.status}
          </div>
          <div className="flex justify-end space-x-2">
            <Button 
              label="Edit Leave Request" 
              icon="pi pi-pencil" 
              onClick={() => router.visit(route('hrm.leaves.edit', leave.id))} 
              className="p-button-warning"
            />
            <Button 
              label="Delete Leave Request" 
              icon="pi pi-trash" 
              onClick={handleDelete} 
              className="p-button-danger"
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Show;
