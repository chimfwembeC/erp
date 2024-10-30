import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { Button } from 'primereact/button';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import useRoute from '@/Hooks/useRoute';
import SectionTitle from '@/Components/SectionTitle';
import moment from 'moment'; // Import Moment.js

const EmployeeShow = ({ employee }) => {
  const route = useRoute();

  const items = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'HRM', href: '/hrm' },
    { label: 'Employees', href: route('hrm.employees.index') },
    { label: employee.name },
  ];

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to recover this employee!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route('hrm.employees.destroy', employee.id), {
          onSuccess: () => {
            Swal.fire('Deleted!', 'The employee has been deleted.', 'success').then(() => {
              router.get(route('hrm.employees.index'));
            });
          },
          onError: (error) => {
            Swal.fire('Error', 'There was an issue deleting the employee.', 'error');
          },
        });
      }
    });
  };

  return (
    <AppLayout title="Employee Details">
      <Breadcrumb items={items} />
      <div className="p-6 bg-white shadow-md rounded-lg">
        <SectionTitle
          title={`Employee: ${employee.name}`}
          description="Details of the selected employee."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="font-bold">Name:</h2>
            <p>{employee.name}</p>
          </div>
          <div>
            <h2 className="font-bold">Email:</h2>
            <p>{employee.email}</p>
          </div>
          <div>
            <h2 className="font-bold">Role:</h2>
            <p>{employee.role}</p>
          </div>
          <div>
            <h2 className="font-bold">Department:</h2>
            <p>{employee.department ? employee.department.name : 'N/A'}</p>
          </div>
          <div>
            <h2 className="font-bold">Managed Departments:</h2>
            <p>{employee.managedDepartment ? employee.managedDepartment.map(dep => dep.name).join(', ') : 'N/A'}</p>
          </div>
          <div>
            <h2 className="font-bold">Managed Branches:</h2>
            <p>{employee.managedBranches ? employee.managedBranches.map(branch => branch.name).join(', ') : 'N/A'}</p>
          </div>
          <div>
            <h2 className="font-bold">Branch:</h2>
            <p>{employee.branch ? employee.branch.name : 'N/A'}</p>
          </div>
          <div>
            <h2 className="font-bold">Attendance Records:</h2>
            <ul>
              {employee.attendances.length > 0 ? (
                employee.attendances.map((attendance) => (
                  <li key={attendance.id}>
                    {moment(attendance.date).format('MMMM Do YYYY')} - {attendance.status}
                  </li>
                ))
              ) : (
                <li>No attendance records available.</li>
              )}
            </ul>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <Button
            label="Edit Employee"
            icon="pi pi-pencil"
            className="p-button-warning"
            onClick={() => router.get(route('hrm.employees.edit', employee.id))}
          />
          <Button
            label="Delete Employee"
            icon="pi pi-trash"
            className="p-button-danger"
            onClick={handleDelete}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default EmployeeShow;
