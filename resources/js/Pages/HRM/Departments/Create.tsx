import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import AppLayout from '@/Layouts/AppLayout';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import Breadcrumb from '@/Components/Breadcrumb';

const CreateDepartment = ({ employees, groups }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        manager_id: null,
        department_group_id: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // SweetAlert confirmation
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to create this department?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, create it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Proceed with submission if confirmed
                post(route('hrm.departments.store'), {
                    onSuccess: () => {
                        Swal.fire(
                            'Created!',
                            'Department has been created successfully.',
                            'success'
                        );
                        reset(); // Clear the form after successful submission
                    },
                    onError: () => {
                        Swal.fire(
                            'Error!',
                            'There was an error creating the department.',
                            'error'
                        );
                    }
                });
            }
        });
    };

    const items = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Hrm', href: '/hrm' },
        { label: 'Departments', href: '/hrm/departments' },
        { label: 'Create Department' }
    ];

    return (
        <AppLayout title="Create Department">
            <Breadcrumb items={items} />

            <div className="p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-6">Create New Department</h1>

                <form onSubmit={handleSubmit} className="grid gap-4">
                    {/* Name Field */}
                    <div className="field">
                        <label htmlFor="name" className="block font-semibold mb-2">Name</label>
                        <InputText
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            className={`p-inputtext w-full ${errors.name && 'p-invalid'}`}
                            maxLength={100}
                        />
                        {errors.name && <small className="p-error">{errors.name}</small>}
                    </div>

                    {/* Description Field */}
                    <div className="field">
                        <label htmlFor="description" className="block font-semibold mb-2">Description</label>
                        <InputText
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            className={`p-inputtext w-full ${errors.description && 'p-invalid'}`}
                            maxLength={255}
                        />
                        {errors.description && <small className="p-error">{errors.description}</small>}
                    </div>

                    {/* Manager Dropdown */}
                    <div className="field">
                        <label htmlFor="manager_id" className="block font-semibold mb-2">Manager</label>
                        <Dropdown
                            id="manager_id"
                            name="manager_id"
                            value={data.manager_id}
                            options={employees}
                            onChange={(e) => setData('manager_id', e.value)}
                            optionLabel="name"
                            optionValue="id"
                            placeholder="Select a Manager"
                            className={`w-full ${errors.manager_id && 'p-invalid'}`}
                        />
                        {errors.manager_id && <small className="p-error">{errors.manager_id}</small>}
                    </div>

                    {/* Department Group Dropdown */}
                    <div className="field">
                        <label htmlFor="department_group_id" className="block font-semibold mb-2">Department Group</label>
                        <Dropdown
                            id="department_group_id"
                            name="department_group_id"
                            value={data.department_group_id}
                            options={groups}
                            onChange={(e) => setData('department_group_id', e.value)}
                            optionLabel="name"
                            optionValue="id"
                            placeholder="Select a Group"
                            className={`w-full ${errors.department_group_id && 'p-invalid'}`}
                        />
                        {errors.department_group_id && <small className="p-error">{errors.department_group_id}</small>}
                    </div>

                    {/* Submit Button */}
                    <Button label="Create Department" icon="pi pi-check" type="submit" className="p-button-primary mt-4" loading={processing} />
                </form>
            </div>
        </AppLayout>
    );
};

export default CreateDepartment;
