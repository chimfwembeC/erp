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
import { Warehouse } from 'lucide-react';

const Create = ({ warehouses, products }) => {
  const [formData, setFormData] = useState({
    warehouse_id: '',
    product_id: '',
    quantity: '',
    movement_type: '',
  });

  const route = useRoute();

  const items = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Inventory', href: '/inventory' },
    { label: 'Inventory Movement', href: '/inventory/inventory-movement' },
    { label: 'Add Inventory Movement' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(route('inventory.inventory_movements.store'), formData, {
      onSuccess: () => {
        Swal.fire('Created!', 'The inventory movements has been created successfully.', 'success').then(() => {
          router.get(route('inventory.inventory_movements.index'));
        });
      },
      onError: (error) => {
        Swal.fire('Error', 'There was an issue creating the inventorymovements.', 'error');
      },
    });
  };

  return (
    <AppLayout title="Create inventory movements">
      <Breadcrumb items={items} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <SectionTitle
        title="Create New inventory movements"
        description="Fill out the details to add a new inventory movements. Include inventory movements location, description, and assign a manager."
      />
      <div className="p-6 bg-white shadow-md rounded-lg col-span col-span-2">
        <h1 className="text-2xl font-bold mb-4">Create inventory movements</h1>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label htmlFor="product_id" className="block font-medium mb-2">
            Products
            </label>
            <Dropdown
              id="product_id"
              name="product_id"
              options={products}
              optionLabel='name'
              optionValue='id'
              value={formData.product_id}
              onChange={handleChange}
              className="w-full border-2"
              required
            />
          </div>
          <div>
            <label htmlFor="warehouse_id" className="block font-medium mb-2">
            Warehouses
            </label>
            <Dropdown
              id="warehouse_id"
              name="warehouse_id"
              options={warehouses}
              optionLabel='name'
              optionValue='id'
              value={formData.warehouse_id}
              onChange={handleChange}
              className="w-full border-2"
              required
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block font-medium mb-2">
            Quantity
            </label>
            <InputText
              id="quantity"
              name="quantity"
              type='number'
              value={formData.quantity}
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="movement_type" className="block font-medium mb-2">
                Movement type
            </label>
            <Dropdown
              id="movement_type"
              name="movement_type"
              value={formData.movement_type}
              options={[
                {'Label' : 'In' , 'Value' : 'in'},
                {'Label' : 'Out' , 'Value' : 'out'},
              ]}
              optionLabel='Label'
              optionValue='Value'
              onChange={handleChange}
              className="w-full border-2"
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
