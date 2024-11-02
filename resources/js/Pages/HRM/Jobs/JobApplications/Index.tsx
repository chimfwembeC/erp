import React, { useState } from 'react';
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
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
    
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
    const actionBodyTemplate = rowData => (
        <div className="flex gap-2">
            <Button icon="pi pi-eye" className="p-button-info p-button-sm" rounded
                onClick={() => router.get(route('hrm.job-applications.show', rowData.id))}
                tooltip="View Application" tooltipOptions={{ position: 'top' }} />

            <Button icon="pi pi-pencil" className="p-button-warning p-button-sm" rounded
                onClick={() => router.get(route('hrm.job-applications.edit', rowData.id))}
                tooltip="Edit Application" tooltipOptions={{ position: 'top' }} />

            <Button icon="pi pi-trash" className="p-button-danger p-button-sm" rounded
                onClick={() => handleDelete(rowData.id)}
                tooltip="Delete Application" tooltipOptions={{ position: 'top' }} />
        </div>
    );

    return (
        <AppLayout title="Job Applications Management">
            <Breadcrumb items={breadcrumbItems} />

            <div className="p-6 bg-white shadow-md rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Job Applications</h1>
                    <div className="flex gap-4">
                        <Button
                            label={viewMode === 'table' ? 'Switch to Grid' : 'Switch to Table'}
                            icon={viewMode === 'table' ? 'pi pi-th-large' : 'pi pi-table'}
                            className="p-button-outlined"
                            onClick={() => setViewMode(viewMode === 'table' ? 'grid' : 'table')}
                        />
                        <Button
                            label="Add Job Application"
                            icon="pi pi-plus"
                            className="p-button-primary bg-primary p-2 rounded-lg text-white"
                            onClick={() => router.get(route('hrm.job-applications.create'))}
                            tooltip='Add a new job application'
                            tooltipOptions={{ position: 'top' }}
                        />
                    </div>
                </div>

                {viewMode === 'table' ? (
                    <DataTable value={jobApplications} paginator rows={10} stripedRows tableStyle={{ minWidth: '60rem' }} sortMode="multiple">
                        <Column field="applicant_name" header="Applicant Name" sortable />
                        <Column field="applicant_email" header="Email" sortable />
                        <Column field="position" header="Position" sortable />
                        <Column field="status" header="Status" sortable />
                        <Column header="Actions" body={actionBodyTemplate} style={{ width: '12rem', textAlign: 'center' }} />
                    </DataTable>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {jobApplications.map(job => (
                            <div key={job.id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                                <h2 className="text-xl font-bold text-gray-800">{job.position}</h2>
                                <p className="mt-2 text-gray-600">Applicant: {job.applicant_name}</p>
                                <p className="mt-2 text-gray-600">Email: {job.applicant_email}</p>
                                <p className="mt-2 text-gray-600">Status: {job.status}</p>
                                <div className="flex justify-end mt-4 gap-2">
                                    <Button icon="pi pi-eye" className="p-button-info p-button-sm" rounded
                                        onClick={() => router.get(route('hrm.job-applications.show', job.id))}
                                        tooltip="View Application" tooltipOptions={{ position: 'top' }} />

                                    <Button icon="pi pi-pencil" className="p-button-warning p-button-sm" rounded
                                        onClick={() => router.get(route('hrm.job-applications.edit', job.id))}
                                        tooltip="Edit Application" tooltipOptions={{ position: 'top' }} />

                                    <Button icon="pi pi-trash" className="p-button-danger p-button-sm" rounded
                                        onClick={() => handleDelete(job.id)}
                                        tooltip="Delete Application" tooltipOptions={{ position: 'top' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default Index;
