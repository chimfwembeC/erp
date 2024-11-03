import React, { useState, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import SectionTitle from '@/Components/SectionTitle';
import { Button } from 'primereact/button';
import { useParams } from 'react-router-dom';
import useRoute from '@/Hooks/useRoute';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';

const Edit = ({ tax }) => {
  //   const { id } = useParams();
  const route = useRoute();
  const [taxData, setTaxData] = useState({
    tax_name: tax.tax_name || '',
    rate: tax.rate || '',
    tax_type: tax.tax_type || '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Taxes', href: '/taxes' },
    { label: 'Edit Tax' },
  ];

  //   useEffect(() => {
  //     // Fetch existing tax data
  //     router.get(route('taxes.show', id), {
  //       onSuccess: (data) => {
  //         settax(data);
  //       },
  //       onError: () => {
  //         Swal.fire('Error', 'Failed to load tax data.', 'error');
  //       },
  //     });
  //   }, [id, route]);

  const validateForm = () => {
    const validationErrors = {};
    if (!tax.tax_name) validationErrors.tax_name = 'Tax name is required.';
    if (!tax.rate) validationErrors.rate = 'Tax rate is required.';
    if (!tax.tax_type) validationErrors.tax_type = 'Tax tax type is required.';
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (validateForm()) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update this tax?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, cancel',
      });

      if (result.isConfirmed) {
        setIsSubmitting(true);

        router.put(route('accounting.taxes.update', tax.id), tax, {
          onSuccess: () => {
            Swal.fire(
              'Updated!',
              'The tax has been updated successfully.',
              'success',
            ).then(() => {
              router.get(route('taxes.index'));
            });
          },
          onError: () => {
            Swal.fire('Error', 'There was an issue updating the tax.', 'error');
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
    <AppLayout title="Edit Tax">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle title="Edit Tax" description="Update the tax details." />

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
                onChange={e => setTaxData({ ...taxData, tax_name: e.target.value })}
                placeholder="Enter tax name"
                className="p-inputtext w-full"
              />
              {errors.tax_name && <small className="p-error">{errors.tax_name}</small>}
            </div>

            <div className="field">
              <label htmlFor="rate" className="font-semibold mb-2">
                Tax Rate
              </label>
              <input
                id="rate"
                type="number"
                value={taxData.rate}
                onChange={e => setTaxData({ ...taxData, rate: e.target.value })}
                placeholder="Enter tax rate"
                className="p-inputtext w-full"
              />
              {errors.rate && <small className="p-error">{errors.rate}</small>}
            </div>

            <div className="field">
              <label htmlFor="rate" className="font-semibold mb-2">
                Tax Type
              </label>
              <input
                id="tax_type"
                type="text"
                value={taxData.tax_type}
                onChange={e =>
                  setTaxData({ ...taxData, tax_type: e.target.value })
                }
                placeholder="Enter tax tax type"
                className="p-inputtext w-full"
              />
              {errors.tax_type && (
                <small className="p-error">{errors.tax_type}</small>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                label="Update"
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

export default Edit;
