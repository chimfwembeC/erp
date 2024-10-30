import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import SectionTitle from '@/Components/SectionTitle';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import useRoute from '@/Hooks/useRoute';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';

const CreateAttendance = ({ users, statuses }) => {
  const route = useRoute();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'HRM', href: '/hrm' },
    { label: 'Attendances', href: '/hrm/attendances' },
    { label: 'Create' },
  ];

  const [attendanceData, setAttendanceData] = useState({
    user_id: null,
    check_in: null,
    check_out: null,
    status: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission control

  const validateForm = () => {
    const validationErrors = {};
    if (!attendanceData.user_id)
      validationErrors.user_id = 'Employee name is required.';
    if (!attendanceData.check_in)
      validationErrors.check_in = 'Check-in date and time is required.';
    if (!attendanceData.status) validationErrors.status = 'Status is required.';
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (validateForm()) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to submit this attendance record?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, submit it!',
        cancelButtonText: 'No, cancel',
      });

      if (result.isConfirmed) {
        setIsSubmitting(true); // Disable the submit button

        router.post(route('hrm.attendances.store'), attendanceData, {
          onSuccess: () => {
            Swal.fire(
              'Created!',
              'The attendance has been created successfully.',
              'success',
            ).then(() => {
              router.get(route('hrm.attendances.index'));
            });
            setAttendanceData({
              user_id: null,
              check_in: null,
              check_out: null,
              status: null,
            });
            setErrors({});
          },
          onError: () => {
            Swal.fire(
              'Error',
              'There was an issue creating the attendance.',
              'error',
            );
          },
          onFinish: () => setIsSubmitting(false), // Re-enable the submit button
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields.',
      });
    }
  };

  return (
    <AppLayout title="Create Attendance">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title="Create New Attendance"
          description="Fill out the form below to log a new attendance record."
        />

        <div className="p-6 bg-white shadow-md rounded-lg col-span-2">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="user_id" className="font-semibold mb-2">
                Employee Name
              </label>
              <Dropdown
                id="user_id"
                value={attendanceData.user_id}
                onChange={e =>
                  setAttendanceData({ ...attendanceData, user_id: e.value })
                }
                options={users}
                optionLabel="name"
                optionValue="id" // Ensure only the ID is stored
                placeholder="Select an Employee"
                className="w-full"
              />

              {errors.user_id && (
                <small className="p-error">{errors.user_id}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="check_in" className="font-semibold mb-2">
                Check In
              </label>
              <Calendar
                id="check_in"
                value={attendanceData.check_in}
                onChange={e =>
                  setAttendanceData({ ...attendanceData, check_in: e.value })
                }
                showTime
                placeholder="Select check-in date and time"
                className="w-full"
              />
              {errors.check_in && (
                <small className="p-error">{errors.check_in}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="check_out" className="font-semibold mb-2">
                Check Out
              </label>
              <Calendar
                id="check_out"
                value={attendanceData.check_out}
                onChange={e =>
                  setAttendanceData({ ...attendanceData, check_out: e.value })
                }
                showTime
                placeholder="Select check-out date and time"
                className="w-full"
              />
            </div>

            <div className="field">
              <label htmlFor="status" className="font-semibold mb-2">
                Status
              </label>
              <Dropdown
                id="status"
                value={attendanceData.status}
                onChange={e =>
                  setAttendanceData({ ...attendanceData, status: e.value })
                }
                options={statuses}
                optionLabel="name"
                optionValue="value"
                placeholder="Select Status"
                className="w-full"
              />
              {errors.status && (
                <small className="p-error">{errors.status}</small>
              )}
            </div>

            <Button
              label="Submit"
              icon="pi pi-check"
              className="p-button-primary mt-4"
              type="submit"
              disabled={isSubmitting} // Disable while submitting
            />
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default CreateAttendance;
