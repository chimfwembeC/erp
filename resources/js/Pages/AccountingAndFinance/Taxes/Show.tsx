import React, { useEffect, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import SectionTitle from '@/Components/SectionTitle';
import { Button } from 'primereact/button';
import { useParams } from 'react-router-dom';
import useRoute from '@/Hooks/useRoute';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';

const Show = () => {
  const { id } = useParams();
  const route = useRoute();
  const [taxData, setTaxData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Taxes', href: '/taxes' },
    { label: 'Tax Details' },
  ];

  useEffect(() => {
    // Fetch tax data
    router.get(route('taxes.show', id), {
      onSuccess: (data) => {
        setTaxData(data);
        setIsLoading(false);
      },
      onError: () => {
        Swal.fire('Error', 'Failed to load tax data.', 'error');
        setIsLoading(false);
      },
    });
  }, [id, route]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this tax?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    });

    if (result.isConfirmed) {
      router.delete(route('taxes.destroy', id), {
        onSuccess: () => {
          Swal.fire('Deleted!', 'The tax has been deleted successfully.', 'success')
            .then(() => {
              router.get(route('taxes.index'));
            });
        },
        onError: () => {
          Swal.fire('Error', 'There was an issue deleting the tax.', 'error');
        },
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // You might want to add a loading spinner here
  }

  return (
    <AppLayout title="Tax Details">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle title="Tax Details" description="View tax information." />

        <div className="p-6 bg-white shadow-md rounded-lg col-span-2">
          {taxData && (
            <div>
              <div className="field mb-4">
                <label className="font-semibold">Tax Name:</label>
                <div>{taxData.name}</div>
              </div>
              <div className="field mb-4">
                <label className="font-semibold">Tax Rate:</label>
                <div>{taxData.rate}</div>
              </div>
              <Button
                label="Edit"
                icon="pi pi-pencil"
                className="p-button-info mr-2"
                onClick={() => router.get(route('taxes.edit', id))}
              />
              <Button
                label="Delete"
                icon="pi pi-trash"
                className="p-button-danger"
                onClick={handleDelete}
              />
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Show;
