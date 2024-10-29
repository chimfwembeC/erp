import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useRoute } from '@/Hooks/useRoute';
import { router } from '@inertiajs/react';

const BranchShow = ({ branch }) => {
  const route = useRoute();

  const items = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'HRM', href: '/hrm' },
    { label: 'Branches', href: route('hrm.branches.index') },
    { label: 'Branch Details' },
  ];

  return (
    <AppLayout title="Branch Details">
      <Breadcrumb items={items} />
      
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Branch Details</h1>
        <Card title={branch.name} className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium">Location</h5>
              <p>{branch.location || 'Not specified'}</p>
            </div>
            <div>
              <h5 className="font-medium">Description</h5>
              <p>{branch.description || 'No description available'}</p>
            </div>
            <div>
              <h5 className="font-medium">Manager</h5>
              <p>{branch.manager?.name || 'No manager assigned'}</p>
            </div>
            <div>
              <h5 className="font-medium">Group</h5>
              <p>{branch.department_group?.name || 'No group assigned'}</p>
            </div>
          </div>
        </Card>

        <Button
          label="Back to Branches"
          icon="pi pi-arrow-left"
          className="p-button-secondary"
          onClick={() => router.get(route('hrm.branches.index'))}
        />
      </div>
    </AppLayout>
  );
};

export default BranchShow;
