import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import useRoute from '@/Hooks/useRoute';
import SectionTitle from '@/Components/SectionTitle';

const Show = ({ group }) => {


  const route = useRoute();

  const items = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'HRM', href: '/hrm' },
    { label: 'Department Groups', href: route('hrm.department-groups.index') },
    { label: 'Department Group details' },
  ];



  return (
    <AppLayout title="Update Department Groups">
      <Breadcrumb items={items} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title="Update New Branch"
          description="Fill out the details to add a new branch. Include name, description."
        />
        <div className="p-6 bg-white shadow-md rounded-lg col-span col-span-2">
          <h1 className="text-2xl font-bold mb-4">Update Department Groups</h1>
          <form className="grid gap-4">
            <div>
              <label htmlFor="name" className="font-medium mb-2">
                Name
              </label>
              {group.name}:{" "}
            </div>

            <div>
              <label htmlFor="description" className="font-medium mb-2">
                Description:{" "}
              </label>
              {group.description}
            </div>
            {/* <div>
            <label htmlFor="manager_id" className="block font-medium mb-2">
              Manager
            </label>
            <Dropdown
              id="manager_id"
              name="manager_id"
              value={formData.manager_id}
              options={employees}
              onChange={handleChange}
              optionLabel="name"
              optionValue="id"
              placeholder="Select a manager"
              className="w-full border-2"
            />
          </div> */}
            <div className="flex justify-end">
              {/* <Button
                type="submit"
                label="Update Groups"
                icon="pi pi-check"
                className="p-button-success bg-primary text-white p-2 rounded-lg"
              /> */}
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default Show;
