import React, { useState, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { Button } from 'primereact/button';
import useRoute from '@/Hooks/useRoute';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import { MultiSelect } from 'primereact/multiselect';

const Show = ({ departments, group }) => {
  const route = useRoute();
  const [selectedDepartments, setSelectedDepartments] = useState([]); // State for selected departments
  const [groupDetails, setGroupDetails] = useState(group); // State to track the group details (departments included)

  useEffect(() => {
    setGroupDetails(group); // Ensure group details are always up-to-date
    // Set the selected departments based on the group’s current departments
    setSelectedDepartments(group.departments.map((dept) => dept.id)); // Pre-select departments that belong to the group
  }, [group]);

  const items = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Hrm', href: '/hrm' },
    { label: 'Departments Groups', href: '/hrm/department-groups' },
    { label: group.name },
  ];

  const handleRemoveDepartment = (departmentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this department from the group?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(
          route('hrm.department-groups.unlink-department', {
            group: group.id,
            department: departmentId,
          }),
          {
            onSuccess: () => {
              Swal.fire('Removed!', 'Department has been removed.', 'success');
              // Remove department from the group in the UI
              setGroupDetails((prevGroup) => ({
                ...prevGroup,
                departments: prevGroup.departments.filter(
                  (department) => department.id !== departmentId
                ),
              }));
              // Update selectedDepartments state to reflect changes
              setSelectedDepartments((prevSelected) =>
                prevSelected.filter((id) => id !== departmentId)
              );
            },
            onError: () => {
              Swal.fire('Error!', 'Failed to remove the department.', 'error');
            },
          }
        );
      }
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route('hrm.department-groups.destroy', group.id), {
          onSuccess: () => {
            Swal.fire('Deleted!', 'Department group has been deleted.', 'success').then(() => {
              router.get(route('hrm.departments.index'));
            });
          },
          onError: () => {
            Swal.fire('Error!', 'There was an error deleting the department group.', 'error');
          },
        });
      }
    });
  };

  const handleLinkDepartments = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to link the selected departments to this group?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, link them!',
    }).then((result) => {
      if (result.isConfirmed) {
        router.post(
          route('hrm.department-groups.link-department', group.id),
          { departments: selectedDepartments }, // Payload
          {
            onSuccess: () => {
              Swal.fire('Success!', 'Departments have been linked successfully.', 'success');
              // Update group departments with newly linked departments
              setGroupDetails((prevGroup) => ({
                ...prevGroup,
                departments: [
                  ...prevGroup.departments,
                  ...departments.filter((d) => selectedDepartments.includes(d.id)),
                ],
              }));
            },
            onError: () => {
              Swal.fire('Error!', 'There was an error linking the departments.', 'error');
            },
          }
        );
      }
    });
  };

  return (
    <AppLayout title="Department Group Details">
      <Breadcrumb items={items} />

      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Department Group Details</h1>
          <Button
            label="Back to Departments"
            icon="pi pi-arrow-left"
            className="p-button-secondary p-2 rounded-lg text-white"
            onClick={() => router.get(route('hrm.departments.index'))}
          />
        </div>

        <div className="gap-4">
          <div className="p-4 border rounded-lg">
            <h2 className="font-semibold text-lg">Name</h2>
            <p>{groupDetails.name}</p>
            <div>
              <h2 className="font-semibold text-lg">Description: </h2>
              <p>{groupDetails.description || 'No description provided'}</p>
              <div>
                <h2 className="font-semibold text-lg">Manager</h2>
                <p>{groupDetails.manager?.name || 'No manager assigned'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
        <div className='mb-4'>
            <MultiSelect
              placeholder="Select Departments"
              options={departments}
              value={selectedDepartments}
              className="border-2 w-1/2"
              display="chip"
              optionLabel="name"
              optionValue="id"
              filter
              onChange={(e) => setSelectedDepartments(e.value)} // Update selected departments
              selectedItemsLabel="Departments Selected"
            />
          </div>
        <Button
            label="Link Departments"
            icon="pi pi-check"
            className="p-button-success bg-primary p-2 rounded-lg text-white"
            onClick={handleLinkDepartments}
          />
        </div>

        <div className="bg-white border-2 rounded-md p-4 w-full mt-4">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200 p-2 rounded-md">
                <th>NO#</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupDetails.departments.length > 0 ? (
                groupDetails.departments.map((department, index) => (
                  <tr key={department.id} className="border-b">
                    <td>{index + 1}</td>
                    <td>{department.name}</td>
                    <td className="flex justify-evenly items-center">
                      <Button
                        icon="pi pi-trash"
                        className="p-button-danger p-button-sm"
                        onClick={() => handleRemoveDepartment(department.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No Departments Added
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex gap-2">
          <Button
            label="Edit Group"
            icon="pi pi-pencil"
            className="p-button-warning"
            onClick={() => router.get(route('hrm.departments.edit', group.id))}
          />
          <Button
            label="Delete Group"
            icon="pi pi-trash"
            className="p-button-danger"
            onClick={handleDelete}
          />

        </div>
      </div>
    </AppLayout>
  );
};

export default Show;
