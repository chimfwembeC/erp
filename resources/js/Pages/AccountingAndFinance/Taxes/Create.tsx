import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import SectionTitle from '@/Components/SectionTitle';
import { Button } from 'primereact/button';
import useRoute from '@/Hooks/useRoute';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';

const CreateTax = () => {
  const route = useRoute();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Accounting & Finance', href: '/accounting' },
    { label: 'Taxes', href: '/accounting/taxes' },
    { label: 'Create Tax' },
  ];

  const [taxData, setTaxData] = useState({
    tax_name: '',
    rate: '',
    tax_type: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const validationErrors = {};
    if (!taxData.tax_name) 
      validationErrors.tax_name = 'Tax tax_name is required.';
    if (!taxData.rate) 
      validationErrors.rate = 'Tax rate is required.';
    if (!tax.tax_type) validationErrors.tax_type = 'Tax tax type is required.';
    
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to create this tax?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, create it!',
        cancelButtonText: 'No, cancel',
      });

      if (result.isConfirmed) {
        setIsSubmitting(true);

        router.post(route('accounting.taxes.store'), taxData, {
          onSuccess: () => {
            Swal.fire(
              'Created!',
              'The tax has been created successfully.',
              'success'
            ).then(() => {
              router.get(route('accounting.taxes.index'));
            });
          },
          onError: () => {
            Swal.fire(
              'Error',
              'There was an issue creating the tax.',
              'error'
            );
          },
          onFinish: () => setIsSubmitting(false),
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields.',
      });
    }
  };

  return (
    <AppLayout title="Create Tax">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title="Create Tax"
          description="Fill in the details to create a new tax."
        />

        <div className="p-6 bg-white shadow-md rounded-lg col-span-2">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name" className="font-semibold mb-2">
                Tax Name
              </label>
              <input
                id="tax_name"
                type="text"
                value={taxData.tax_name}
                onChange={(e) =>
                  setTaxData({ ...taxData, tax_name: e.target.value })
                }
                placeholder="Enter tax name"
                className="p-inputtext w-full"
              />
              {errors.tax_name && (
                <small className="p-error">{errors.tax_name}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="rate" className="font-semibold mb-2">
                Tax Rate
              </label>
              <input
                id="rate"
                type="number"
                value={taxData.rate}
                onChange={(e) =>
                  setTaxData({ ...taxData, rate: e.target.value })
                }
                placeholder="Enter tax rate"
                className="p-inputtext w-full"
              />
              {errors.rate && (
                <small className="p-error">{errors.rate}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="rate" className="font-semibold mb-2">
                Tax Type
              </label>
              <input
                id="tax_type"
                type="number"
                value={taxData.tax_type}
                onChange={(e) => setTaxData({ ...taxData, tax_type: e.target.value })}
                placeholder="Enter tax tax type"
                className="p-inputtext w-full"
              />
              {errors.tax_type && <small className="p-error">{errors.tax_type}</small>}
            </div>

            <div className="flex justify-end">
                 <Button
              label="Create"
              icon="pi pi-check"
              className="p-button-primary mt-4 bg-primary text-white p-2"
              type="submit"
              disabled={isSubmitting}
            />
            </div>
           
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default CreateTax;
