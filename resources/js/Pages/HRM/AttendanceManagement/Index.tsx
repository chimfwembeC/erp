import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Breadcrumb from '@/Components/Breadcrumb';
import useRoute from '@/Hooks/useRoute';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import moment from 'moment';

const Index = ({ attendances }) => {
  const route = useRoute();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'HRM', href: '/hrm' },
    { label: 'Attendance' },
  ];

  const handleDelete = attendanceId => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will delete the attendance record permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        router.delete(route('hrm.attendances.destroy', attendanceId));
        Swal.fire('Deleted!', 'The attendance record has been deleted.', 'success');
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
          onClick={() => router.get(route('hrm.attendances.show', rowData.id))}
          tooltip="View Attendance"
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-warning p-button-sm"
          rounded
          onClick={() => router.get(route('hrm.attendances.edit', rowData.id))}
          tooltip="Edit Attendance"
        />
        {/* <Button
          icon="pi pi-trash"
          rounded
          className="p-button-danger p-button-sm"
          onClick={() => handleDelete(rowData.id)}
          tooltip="Delete Attendance"
        /> */}
      </div>
    );
  };

  // Custom templates for date and status
  const checkInTemplate = rowData => moment(rowData.check_in).format('MMMM Do YYYY, h:mm A');
  const checkOutTemplate = rowData =>
    rowData.check_out ? moment(rowData.check_out).format('MMMM Do YYYY, h:mm A') : 'Not checked out yet';
  const statusTemplate = rowData => (
    <span
      className={`${
        rowData.status === 'checked_in' ? 'bg-green-500' : 'bg-orange-500'
      } text-white text-sm px-3 py-1 rounded-lg`}
    >
      {rowData.status === 'checked_in' ? 'Checked In' : 'Checked Out'}
    </span>
  );

  return (
    <AppLayout title="Attendance Management">
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Manage Attendance</h1>
          <Button
            label="Add Attendance"
            icon="pi pi-plus"
            className="p-button-primary bg-primary p-2 rounded-lg text-white"
            onClick={() => router.get(route('hrm.attendances.create'))}
          />
        </div>

        <DataTable
          value={attendances}
          paginator
          stripedRows
          rows={10}
          tableStyle={{ minWidth: '60rem' }}
          sortMode="multiple"
        >
          <Column field="user.name" header="Name" sortable filter filterPlaceholder="Search by name" />
          <Column
            field="check_in"
            header="Check In"
            body={checkInTemplate}
            sortable
            filter
            filterPlaceholder="Search by check-in date"
          />
          <Column
            field="check_out"
            header="Check Out"
            body={checkOutTemplate}
            sortable
            filter
            filterPlaceholder="Search by check-out date"
          />
          <Column header="Status" body={statusTemplate} style={{ width: '10rem', textAlign: 'center' }} />
          <Column header="Actions" body={actionBodyTemplate} style={{ width: '12rem', textAlign: 'center' }} />
        </DataTable>
      </div>
    </AppLayout>
  );
};

export default Index;
