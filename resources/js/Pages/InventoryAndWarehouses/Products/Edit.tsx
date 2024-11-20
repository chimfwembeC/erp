import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import useRoute from '@/Hooks/useRoute';
import SectionTitle from '@/Components/SectionTitle';

const Edit = ({ product, warehouses }) => {
  const [formData, setFormData] = useState({
    name: product.name || '',
    sku: product.sku || '',
    description: product.description || '',
    price: product.price || '',
    quantity: product.quantity || '',
    stock: product.stock || '',
    warehouse_id: product.warehouse_id || null,
  });

  const route = useRoute();

  const items = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Products', href: '/products' },
    { label: 'Edit Product' },
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
      text: "You are about to update this product.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const method = 'put';
        const url = route('inventory.products.update', product.id);

        router[method](url, formData, {
          onSuccess: () => {
            Swal.fire('Updated!', `Product updated successfully.`, 'success').then(() => {
              router.get(route('inventory.products.index'));
            });
          },
          onError: (error) => {
            Swal.fire('Error', `There was an issue updating the product.`, 'error');
          },
        });
      }
    });
  };

  const handleWarehouseSelection = () => {
    Swal.fire({
      title: 'Select Warehouse',
      input: 'select',
      inputOptions: warehouses?.reduce((options, warehouse) => {
        options[warehouse.id] = warehouse.name;
        return options;
      }, {}),
      inputPlaceholder: 'Select a warehouse',
      showCancelButton: true,
      confirmButtonText: 'Change Warehouse',
      showLoaderOnConfirm: true,
      preConfirm: (warehouse_id) => {
        if (!warehouse_id) {
          Swal.showValidationMessage('Please select a warehouse');
        } else {
          setFormData((prevData) => ({ ...prevData, warehouse_id }));
        }
      },
    });
  };

  return (
    <AppLayout title={'Edit Product'}>
      <Breadcrumb items={items} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title={'Edit Product'}
          description="Update the product details."
        />
        <div className="p-6 bg-white shadow-md rounded-lg col-span col-span-2">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <label htmlFor="name" className="block font-medium mb-2">Product Name</label>
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
              <label htmlFor="sku" className="block font-medium mb-2">SKU</label>
              <InputText
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block font-medium mb-2">Description</label>
              <InputText
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="price" className="block font-medium mb-2">Price</label>
              <InputText
                id="price"
                name="price"
                type='number'
                value={formData.price}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="stock" className="block font-medium mb-2">Stock</label>
              <InputText
                id="stock"
                name="stock"
                type='number'
                value={formData.stock}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block font-medium mb-2">Quantity</label>
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

            <div className="flex justify-end">
              <Button type="submit" label={'Update Product'} icon="pi pi-check" className="p-button-success bg-primary text-white p-2 rounded-lg" />
            </div>
          </form>

          <div className="flex justify-between mt-4">
            <Button
              label="Change Warehouse"
              icon="pi pi-box"
              onClick={handleWarehouseSelection}
              className="p-button-info"
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Edit;
