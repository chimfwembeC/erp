import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { Button } from 'primereact/button';
import useRoute from '@/Hooks/useRoute';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2'; // Import SweetAlert2

const ShowDepartment = ({ department }) => {
    const route = useRoute();

    const items = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Hrm', href: '/hrm' },
        { label: 'Departments', href: '/hrm/departments' },
        { label: department.name }
    ];

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('hrm.departments.destroy', department.id), {
                    onSuccess: () => {
                        Swal.fire('Deleted!', 'Department has been deleted.', 'success').then(() => {
                            router.get(route('hrm.departments.index')); // Redirect after deletion
                        });
                    },
                    onError: () => {
                        Swal.fire('Error!', 'There was an error deleting the department.', 'error');
                    },
                });
            }
        });
    };

    return (
        <AppLayout title="Department Details">
            <Breadcrumb items={items} />

            <div className="p-6 bg-white shadow-md rounded-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Department Details</h1>
                    <Button 
                        label="Back to Departments" 
                        icon="pi pi-arrow-left" 
                        className="p-button-secondary p-2 rounded-lg text-white"
                        onClick={() => router.get(route('hrm.departments.index'))}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                        <h2 className="font-semibold text-lg">Name</h2>
                        <p>{department.name}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <h2 className="font-semibold text-lg">Description</h2>
                        <p>{department.description || 'No description provided'}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <h2 className="font-semibold text-lg">Manager</h2>
                        <p>{department.manager?.name || 'No manager assigned'}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <h2 className="font-semibold text-lg">Department Group</h2>
                        <p>{department.department_group?.name || 'No group assigned'}</p>
                    </div>
                </div>

                <div className="mt-6 flex gap-2">
                    <Button 
                        label="Edit Department" 
                        icon="pi pi-pencil" 
                        className="p-button-warning"
                        onClick={() => router.get(route('hrm.departments.edit', department.id))}
                    />
                    <Button 
                        label="Delete Department" 
                        icon="pi pi-trash" 
                        className="p-button-danger"
                        onClick={handleDelete} // Use the SweetAlert function for delete
                    />
                </div>
            </div>
        </AppLayout>
    );
};

export default ShowDepartment;
