import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Breadcrumb from '@/Components/Breadcrumb';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import useRoute from '@/Hooks/useRoute';

const Index = ({ jobApplications }) => {
    const route = useRoute();
    const breadcrumbItems = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'HRM', href: '/hrm' },
        { label: 'Job Applications' },
    ];

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action will permanently delete the job application.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then(result => {
            if (result.isConfirmed) {
                router.delete(route('hrm.job-applications.show', id), {
                    onSuccess: () => {
                        Swal.fire('Deleted!', 'The job application has been deleted.', 'success');
                    },
                    onError: () => {
                        Swal.fire('Error', 'There was an issue deleting the job application.', 'error');
                    },
                });
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
                    onClick={() => router.get(route('hrm.job-applications.show', rowData.id))}
                    tooltip="View Application"
                    tooltipOptions={{ position: 'top' }} // Adjust the position as needed
                />

                <Button
                    icon="pi pi-pencil"
                    className="p-button-warning p-button-sm"
                    rounded
                    onClick={() => router.get(route('hrm.job-applications.edit', rowData.id))}
                    tooltip="Edit Application"
                    tooltipOptions={{ position: 'top' }} // Adjust the position as needed
                />

                <Button
                    icon="pi pi-trash"
                    className="p-button-danger p-button-sm"
                    rounded
                    onClick={() => handleDelete(rowData.id)}
                    tooltip="Delete Application"
                    tooltipOptions={{ position: 'top' }} // Adjust the position as needed
                />
            </div>
        );
    };

    return (
        <AppLayout title="Job Applications Management">
            <Breadcrumb items={breadcrumbItems} />

            <div className="p-6 bg-white shadow-md rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold mb-4">Job Applications</h1>
                    <Button
                        label="Add Job Application"
                        icon="pi pi-plus"
                        className="p-button-primary bg-primary p-2 rounded-lg text-white"
                        onClick={() => router.get(route('hrm.job-applications.create'))}
                        tooltip='Add a new job application'
                        tooltipOptions={{ position: 'top' }} // Adjust the position as needed
                    />
                </div>
                <DataTable
                    value={jobApplications}
                    paginator
                    rows={10}
                    stripedRows
                    tableStyle={{ minWidth: '60rem' }}
                    sortMode="multiple"
                >
                    <Column field="applicant_name" header="Applicant Name" sortable />
                    <Column field="applicant_email" header="Email" sortable />
                    <Column field="position" header="Position" sortable />
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
