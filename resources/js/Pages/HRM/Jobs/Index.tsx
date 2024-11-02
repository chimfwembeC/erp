import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import moment from 'moment';
import { Button } from 'primereact/button';
import { router } from '@inertiajs/react';
import { Paginator } from 'primereact/paginator';

const Index = ({ jobs }) => {
    const [isGridView, setIsGridView] = useState(true);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(6); // Number of items per page for grid view

    const breadcrumbItems = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'HRM', href: '/hrm' },
        { label: 'Jobs' },
    ];

    const toggleLayout = () => {
        setIsGridView(prevView => !prevView);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this job?')) {
            router.delete(`/hrm/jobs/${id}`);
        }
    };

    const actionBodyTemplate = (rowData) => (
        <div className="flex gap-2 justify-center">
            <Button
                icon="pi pi-eye"
                className="p-button-info p-button-sm"
                onClick={() => router.get(`/hrm/jobs/${rowData.id}`)}
            />
            <Button
                icon="pi pi-pencil"
                className="p-button-warning p-button-sm"
                onClick={() => router.get(`/hrm/jobs/${rowData.id}/edit`)}
            />
            <Button
                icon="pi pi-trash"
                className="p-button-danger p-button-sm"
                onClick={() => handleDelete(rowData.id)}
            />
        </div>
    );

    const onPageChange = (e) => {
        setFirst(e.first);
        setRows(e.rows);
    };

    return (
        <AppLayout title="Job Management">
            <Breadcrumb items={breadcrumbItems} />
            <div className="container mx-auto py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Posted Jobs</h1>
                    <div className="flex items-center gap-4">
                        <Button
                            label="Add Job"
                            icon="pi pi-plus"
                            className="p-button-primary bg-primary p-2 text-white"
                            onClick={() => router.get('/hrm/jobs/create')}
                        />
                        <Button
                            label={isGridView ? 'Switch to Table View' : 'Switch to Grid View'}
                            icon={isGridView ? 'pi pi-table' : 'pi pi-th-large'}
                            className="p-button-secondary bg-primary p-2 text-white"
                            onClick={toggleLayout}
                        />
                    </div>
                </div>

                {isGridView ? (
                    <>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-4">
                            {jobs.slice(first, first + rows).map((job) => (
                                <div key={job.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    <div className="p-6">
                                        <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
                                        <p className="mt-2 text-gray-600">{job.description}</p>
                                        <div className="mt-4">
                                            <p className="text-sm text-gray-500"><span className="font-semibold">Location:</span> {job.location || 'N/A'}</p>
                                            <p className="text-sm text-gray-500"><span className="font-semibold">Salary:</span> {job.salary ? `$${job.salary}` : 'N/A'}</p>
                                            <p className="text-sm text-gray-500"><span className="font-semibold">Job Type:</span> {job.job_type}</p>
                                            <p className="text-sm text-gray-500"><span className="font-semibold">Deadline Date:</span> {job.deadline ? moment(job.deadline).format('MMMM Do YYYY') : 'N/A'}</p>
                                            <p className="text-sm text-gray-500"><span className="font-semibold">Deadline Time:</span> {job.deadline ? moment(job.deadline).format('h:mm:ss a') : 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end p-4 border-t border-gray-200">
                                        <Button icon="pi pi-eye" className="p-button-text text-blue-600" onClick={() => router.get(`/hrm/jobs/${job.id}`)} />
                                        <Button icon="pi pi-pencil" className="p-button-text text-yellow-500" onClick={() => router.get(`/hrm/jobs/${job.id}/edit`)} />
                                        <Button icon="pi pi-trash" className="p-button-text text-red-600" onClick={() => handleDelete(job.id)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Paginator first={first} rows={rows} totalRecords={jobs.length} onPageChange={onPageChange} />
                    </>
                ) : (
                    <DataTable value={jobs} paginator rows={10} className="p-datatable-sm">
                        <Column field="title" header="Job Title" sortable />
                        <Column field="location" header="Location" sortable />
                        <Column field="salary" header="Salary" body={(rowData) => (rowData.salary ? `$${rowData.salary}` : 'N/A')} sortable />
                        <Column field="job_type" header="Job Type" sortable />
                        <Column field="deadline" header="Deadline" body={(rowData) => (rowData.deadline ? moment(rowData.deadline).format('MMMM Do YYYY, h:mm:ss a') : 'N/A')} sortable />
                        <Column header="Actions" body={actionBodyTemplate} style={{ textAlign: 'center', width: '12rem' }} />
                    </DataTable>
                )}
            </div>
        </AppLayout>
    );
};

export default Index;
