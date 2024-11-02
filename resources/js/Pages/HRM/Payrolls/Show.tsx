import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { Button } from 'primereact/button';
import { router } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';
import SectionTitle from '@/Components/SectionTitle';

const Show = ({ payroll }) => {
  const route = useRoute();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'HRM', href: '/hrm' },
    { label: 'Payroll Management', href: '/hrm/payrolls' },
    { label: 'View Payroll Entry' },
  ];

  const handleEdit = () => {
    const url = route('hrm.payrolls.edit', payroll.id);
    router.get(url);
  };

  return (
    <AppLayout title={`View Payroll Entry for ${payroll.user.name}`}>
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title="Payroll Entry Details"
          description="Here are the details of the selected payroll entry."
        />
        <div className="p-6 bg-white shadow-md rounded-lg col-span-2">
          <div className="grid gap-4">
            <div>
              <label className="block font-medium mb-2">Employee:</label>
              <p>{payroll.user.name}</p>
            </div>
            <div>
              <label className="block font-medium mb-2">Salary Amount:</label>
              <p>${payroll.amount}</p>
            </div>
            <div>
              <label className="block font-medium mb-2">Pay Date:</label>
              <p>{new Date(payroll.pay_date).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="block font-medium mb-2">Status:</label>
              <p>{payroll.status}</p>
            </div>
            <div className="flex justify-end">
              <Button
                label="Edit Payroll Entry"
                icon="pi pi-pencil"
                className="p-button-warning"
                onClick={handleEdit}
              />
               <Button
                label="Delete Payroll Entry"
                icon="pi pi-trash"
                className="p-button-warning"
                // onClick={handleEdit}
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Show;
