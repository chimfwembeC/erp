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

const Create = () => {
  const [formData, setFormData] = useState({
    name:  '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'customer',    
  });

  const route = useRoute();

  const items = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'HRM', href: '/hrm' },
    { label: 'Employees', href: '/hrm/employees' },
    { label: 'Create Employee' },
  ];

  const roles = [
    { label: 'Customer', value: 'customer' },
    { label: 'Employee', value: 'employee' },
    { label: 'Manager', value: 'manager' },
    // { label: 'Admin', value: 'admin' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Show confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: "You are about to create a new user.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const method = 'post';
        const url = route('hrm.users.store');
  
        router[method](url, formData, {
          onSuccess: () => {
            Swal.fire('Success!', `user created successfully.`, 'success').then(() => {
              router.get(route('hrm.users.index'));
            });
          },
          onError: (error) => {
            Swal.fire('Error', `There was an issue creating the user.`, 'error');
          },
        });
      }
    });
  };
  

  return (
    <AppLayout title={'Create user'}>
      <Breadcrumb items={items} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title={'Create New user'}
          description="Fill out the details to add or edit an user."
        />
        <div className="p-6 bg-white shadow-md rounded-lg col-span col-span-2">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <label htmlFor="name" className="block font-medium mb-2">Name</label>
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
              <label htmlFor="email" className="block font-medium mb-2">Email</label>
              <InputText
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block font-medium mb-2">Password</label>
              <InputText
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full"
                placeholder={'Enter new password'}
              />
            </div>
            <div>
              <label htmlFor="password_confirmation" className="block font-medium mb-2">Confirm Password</label>
              <InputText
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                value={formData.password_confirmation}
                onChange={handleChange}
                className="w-full"
                placeholder={'Confirm Above password'}
              />
            </div>
            <div>
              <label htmlFor="role" className="block font-medium mb-2">Role</label>
              <Dropdown
                id="role"
                name="role"
                value={formData.role}
                options={roles}
                onChange={(e) => setFormData((prev) => ({ ...prev, role: e.value }))}
                placeholder="Select a role"
                className="w-full border-2"
              />
            </div>          
            <div className="flex justify-end">
              <Button type="submit" label={'Create user'} icon="pi pi-check" className="p-button-success bg-primary text-white p-2 rounded-lg" />
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default Create;
