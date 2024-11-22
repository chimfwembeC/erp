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

const Create = ({ employees }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
  });

  const route = useRoute();

  const items = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Inventory', href: '/inventory' },
    { label: 'Warehouses', href: '/inventory/warehouses' },
    { label: 'Add Warehouse' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(route('inventory.warehouses.store'), formData, {
      onSuccess: () => {
        Swal.fire('Created!', 'The Warehouse has been created successfully.', 'success').then(() => {
          router.get(route('hrm.warehouses.index'));
        });
      },
      onError: (error) => {
        Swal.fire('Error', 'There was an issue creating the Warehouse.', 'error');
      },
    });
  };

  return (
    <AppLayout title="Create Warehouse">
      <Breadcrumb items={items} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <SectionTitle
        title="Create New Warehouses"
        description="Fill out the details to add a new Warehouses. Include Warehouses location, description, and assign a manager."
      />
      <div className="p-6 bg-white shadow-md rounded-lg col-span col-span-2">
        <h1 className="text-2xl font-bold mb-4">Create Warehouse</h1>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label htmlFor="name" className="block font-medium mb-2">
              Warehouse Name
            </label>
            <InputText
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="location" className="block font-medium mb-2">
              Location
            </label>
            <InputText
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>

          <div className="flex justify-end">
          <Button type="submit" label="Create Warehouse" icon="pi pi-check" className="p-button-success bg-primary text-white p-2 rounded-lg" />
          </div>
        </form>
      </div>
      </div>
    </AppLayout>
  );
};

export default Create;
