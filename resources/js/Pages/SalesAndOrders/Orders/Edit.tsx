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

const Edit = ({order,users}) => {
  const [formData, setFormData] = useState({
    user_id: order.user_id || '',
    total_price: order.total_price || '',
    status: order.status || 'pending',
  });

  const route = useRoute();

  const items = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Orders', href: '/sale-orders/orders' },
    { label: 'Update Order' },
  ];

  const statuses = [
    { label: 'Pending', value: 'pending' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
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
      text: 'You are about to create a new order.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const method = 'put';
        const url = route('sale-orders.orders.update', order.id);

        router[method](url, formData, {
          onSuccess: () => {
            Swal.fire('Success!', 'Order created successfully.', 'success').then(() => {
              router.get(route('orders.index'));
            });
          },
          onError: (error) => {
            Swal.fire('Error', 'There was an issue creating the order.', 'error');
          },
        });
      }
    });
  };

  return (
    <AppLayout title={'Create'}>
      <Breadcrumb items={items} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title={'Create New Order'}
          description="Fill out the details to add a new order."
        />
        <div className="p-6 bg-white shadow-md rounded-lg col-span col-span-2">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <label htmlFor="user_id" className="block font-medium mb-2">User</label>
              <Dropdown
                id="user_id"
                name="user_id"
                value={formData.user_id}
                options={users}
                optionLabel='name'
                optionValue='id'
                onChange={(e) => setFormData((prev) => ({ ...prev, user_id: e.value }))}
                placeholder="Select a user"
                className="w-full border-2"
                required
              />
            </div>
            <div>
              <label htmlFor="total_price" className="block font-medium mb-2">Total Price</label>
              <InputText
                id="total_price"
                type='number'
                name="total_price"
                value={formData.total_price}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="status" className="block font-medium mb-2">Status</label>
              <Dropdown
                id="status"
                name="status"
                value={formData.status}
                options={statuses}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.value }))}
                placeholder="Select a status"
                className="w-full border-2"
                required
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                label={'Update Order'}
                icon="pi pi-check"
                className="p-button-success bg-primary text-white p-2 rounded-lg"
              />
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default Edit;
