import React, { useState } from 'react';
import Swal from 'sweetalert2';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import SectionTitle from '@/Components/SectionTitle';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import useRoute from '@/Hooks/useRoute';
import { router } from '@inertiajs/react';

const EditAttendance = ({ attendance, users, statuses }) => {
  const route = useRoute();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'HRM', href: '/hrm' },
    { label: 'Attendances', href: '/hrm/attendances' },
    { label: 'Edit' },
  ];

  const [attendanceData, setAttendanceData] = useState({
    user_id: attendance.user_id,
    check_in: new Date(attendance.check_in),
    check_out: attendance.check_out ? new Date(attendance.check_out) : null,
    status: attendance.status,
  });

  const handleUpdate = async (event) => {
    event.preventDefault();

    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to update this attendance record?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await router.put(route('hrm.attendances.update', attendance.id), attendanceData);
        Swal.fire('Updated!', 'The attendance record has been updated.', 'success');
      }
    });
  };

  return (
    <AppLayout title="Edit Attendance">
      <Breadcrumb items={breadcrumbItems} />
      <SectionTitle title="Update Attendance" description="Modify the details for this attendance record as needed." />

      <div className="p-6 bg-white shadow-md rounded-lg">
        <form className="grid gap-4" onSubmit={handleUpdate}>
          <div className="field">
            <label htmlFor="user_id" className="font-semibold mb-2">Employee Name</label>
            <Dropdown
              id="user_id"
              value={attendanceData.user_id}
              onChange={(e) => setAttendanceData({ ...attendanceData, user_id: e.value })}
              options={users}
              optionLabel="name"
              optionValue="id"
              placeholder="Select an Employee"
              className="w-full"
            />
          </div>
          <div className="field">
            <label htmlFor="check_in" className="font-semibold mb-2">Check In</label>
            <Calendar
              id="check_in"
              value={attendanceData.check_in}
              onChange={(e) => setAttendanceData({ ...attendanceData, check_in: e.value })}
              showTime
              placeholder="Select check-in date and time"
              className="w-full"
            />
          </div>
          <div className="field">
            <label htmlFor="check_out" className="font-semibold mb-2">Check Out</label>
            <Calendar
              id="check_out"
              value={attendanceData.check_out}
              onChange={(e) => setAttendanceData({ ...attendanceData, check_out: e.value })}
              showTime
              placeholder="Select check-out date and time"
              className="w-full"
            />
          </div>
          <div className="field">
            <label htmlFor="status" className="font-semibold mb-2">Status</label>
            <Dropdown
              id="status"
              value={attendanceData.status}
              onChange={(e) => setAttendanceData({ ...attendanceData, status: e.value })}
              options={statuses}
              placeholder="Select Status"
              optionLabel="name"
              optionValue="value"
              className="w-full"
            />
          </div>
          <Button type="submit" label="Update" icon="pi pi-check" className="p-button-primary mt-4" />
        </form>
      </div>
    </AppLayout>
  );
};

export default EditAttendance;
