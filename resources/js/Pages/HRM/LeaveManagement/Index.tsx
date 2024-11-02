import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Breadcrumb from '@/Components/Breadcrumb';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import useRoute from '@/Hooks/useRoute';

const Index = ({ leaveRequests }) => {
  const route = useRoute();
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Leave Management', href: '/hrm/leaves' },
    { label: 'Requests' },
  ];

  const handleApproval = (id, status) => {
    const endpoint =
      status === 'approved'
        ? `/hrm/leaves/${id}/approve`
        : `/hrm/leaves/${id}/deny`;

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${status} this leave request?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${status} it!`,
    }).then(result => {
      if (result.isConfirmed) {
        router.put(
          endpoint,
          {},
          {
            onSuccess: () => {
              Swal.fire(
                `${status.charAt(0).toUpperCase() + status.slice(1)}!`,
                `The leave request has been ${status}.`,
                'success',
              ).then(() => {
                router.get(route('hrm.leaves.index'));
              });
            },
            onError: () => {
              Swal.fire(
                'Error!',
                `There was an error ${status} the leave request.`,
                'error',
              );
            },
          },
        );
      }
    });
  };

  // Action Buttons Template
  const actionBodyTemplate = rowData => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-eye"
          className="p-button-info p-button-sm"
          rounded
          onClick={() => router.get(route('hrm.leaves.show', rowData.id))}
          tooltip="View Leave"
          tooltipOptions={{ position: 'top' }} // Adjust the position as needed
        />

        <Button
          icon="pi pi-pencil"
          className="p-button-warning p-button-sm"
          rounded
          onClick={() => router.get(route('hrm.leaves.edit', rowData.id))}
          tooltip="Edit Leave"
          tooltipOptions={{ position: 'top' }} // Adjust the position as needed
        />

        <Button
          icon="pi pi-trash"
          className="p-button-danger p-button-sm"
          rounded
          onClick={() => {
            Swal.fire({
              title: 'Are you sure?',
              text: 'This action will permanently delete the leave request.',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Yes, delete it!',
              cancelButtonText: 'Cancel',
            }).then(result => {
              if (result.isConfirmed) {
                // If confirmed, proceed with deletion
                router.delete(route('hrm.leaves.show', rowData.id), {
                  onSuccess: () => {
                    Swal.fire(
                      'Deleted!',
                      'The leave request has been deleted.',
                      'success',
                    );
                  },
                  onError: () => {
                    Swal.fire(
                      'Error',
                      'There was an issue deleting the leave request.',
                      'error',
                    );
                  },
                });
              }
            });
          }}
          tooltip="Delete Leave"
          tooltipOptions={{ position: 'top' }} // Adjust the position as needed
        />

        {rowData.status !== 'denied' ? (
          <Button
            icon="pi pi-check"
            className="p-button-success p-button-sm"
            rounded
            onClick={() => handleApproval(rowData.id, 'approved')}
            tooltip="Approve Leave"
            tooltipOptions={{ position: 'top' }} // Adjust the position as needed
          />
        ) : (
          <></>
        )}

        {rowData.status !== 'approved' ? (
          <Button
            icon="pi pi-times"
            className="p-button-danger p-button-sm"
            rounded
            onClick={() => handleApproval(rowData.id, 'denied')}
            tooltip="Reject Leave"
            tooltipOptions={{ position: 'top' }} // Adjust the position as needed
          />
        ) : (
          <></>
        )}
      </div>
    );
  };

  return (
    <AppLayout title="Leave Management">
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mb-4">Leave Requests</h1>
          <Button
            label="Request Leave"
            icon="pi pi-plus"
            className="p-button-primary bg-primary p-2 rounded-lg text-white"
            onClick={() => router.get(route('hrm.leaves.create'))}
            tooltip='Request for a leave'
            tooltipOptions={{ position: 'top' }} // Adjust the position as needed
          />
        </div>
        <DataTable
          value={leaveRequests}
          paginator
          rows={10}
          stripedRows
          tableStyle={{ minWidth: '60rem' }}
          sortMode="multiple"
        >
          <Column field="user.name" header="Employee" sortable />
          <Column field="start_date" header="Start Date" sortable />
          <Column field="end_date" header="End Date" sortable />
          <Column field="status" header="Status" sortable />
          <Column
            header="Actions"
            body={actionBodyTemplate}
            style={{ width: '12rem', textAlign: 'center' }}
          />
        </DataTable>
      </div>
    </AppLayout>
  );
};

export default Index;
