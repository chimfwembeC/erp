import React, { useEffect, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import useRoute from '@/Hooks/useRoute';
import SectionTitle from '@/Components/SectionTitle';
import moment from 'moment';

const Edit = ({ users, payroll }) => {
  // console.log('payroll',payroll);
  const [formData, setFormData] = useState({
    user_id: payroll.user_id,
    amount: payroll.amount,
    pay_date: moment(payroll.pay_date).toDate(), // Convert moment object to JavaScript Date
    status: payroll.status,
  });

  const route = useRoute();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'HRM', href: '/hrm' },
    { label: 'Payroll Management', href: '/hrm/payrolls' },
    { label: 'Edit Payroll Entry' },
  ];

  const statusOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'Paid', value: 'paid' },
    { label: 'Overdue', value: 'overdue' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to update the payroll entry.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const url = route('hrm.payrolls.update', payroll.id); // Assuming you have a route to update payroll by ID

        router.put(url, formData, {
          onSuccess: () => {
            Swal.fire('Success!', 'Payroll entry updated successfully.', 'success').then(() => {
              router.get(route('payroll.index'));
            });
          },
          onError: () => {
            Swal.fire('Error!', 'There was an issue updating the payroll entry.', 'error');
          },
        });
      }
    });
  };

  useEffect(() => {
    // Set initial state or perform any required side effects when the component mounts
    setFormData({
      user_id: payroll.user_id,
      amount: payroll.amount,
      pay_date: payroll.pay_date,
      status: payroll.status,
    });
  }, [payroll]);

  return (
    <AppLayout title="Edit Payroll Entry">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title="Edit Payroll Entry"
          description="Update the details of the payroll entry."
        />
        <div className="p-6 bg-white shadow-md rounded-lg col-span-2">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <label htmlFor="user_id" className="block font-medium mb-2">Employee</label>
              <Dropdown
                id="user_id"
                name="user_id"
                value={formData.user_id}
                options={users.map((user) => ({ label: user.name, value: user.id }))}
                onChange={(e) => setFormData((prev) => ({ ...prev, user_id: e.value }))}
                placeholder="Select an employee"
                className="w-full border-2"
                required
              />
            </div>
            <div>
              <label htmlFor="amount" className="block font-medium mb-2">Salary Amount</label>
              <InputText
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter salary amount"
                required
                className="w-full border-2"
              />
            </div>
            <div>
              <label htmlFor="pay_date" className="block font-medium mb-2">Pay Date</label>
              <Calendar
                id="pay_date"
                name="pay_date"
                value={formData.pay_date}
                onChange={(e) => setFormData((prev) => ({ ...prev, pay_date: e.value }))}
                dateFormat="yy-mm-dd"
                placeholder="Select pay date"
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
                options={statusOptions}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.value }))}
                placeholder="Select status"
                className="w-full border-2"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" label="Update Payroll Entry" icon="pi pi-check" className="p-button-success bg-primary text-white p-2 rounded-lg" />
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default Edit;
