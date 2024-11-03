import React, { useEffect, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import SectionTitle from '@/Components/SectionTitle';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import useRoute from '@/Hooks/useRoute';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';

const EditPayment = ({ payment }) => {
  const route = useRoute();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Accounting & Finance', href: '/accounting' },
    { label: 'Payments', href: '/accounting/payments' },
    { label: 'Edit Payment' },
  ];

  const paymentMethods = [
    { id: 'cash', name: 'Cash' },
    { id: 'bank', name: 'Bank' },
    { id: 'online_banking', name: 'Online Banking' },
    { id: 'money_money', name: 'Money Money' },
  ];

  const [paymentData, setPaymentData] = useState({
    invoice_id: payment.invoice_id,
    amount: payment.amount,
    payment_date: payment.payment_date,
    payment_method: payment.payment_method,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const validationErrors = {};
    if (!paymentData.invoice_id) 
      validationErrors.invoice_id = 'Invoice ID is required.';
    if (!paymentData.amount) 
      validationErrors.amount = 'Amount is required.';
    if (!paymentData.payment_date) 
      validationErrors.payment_date = 'Payment date is required.';
    if (!paymentData.payment_method) 
      validationErrors.payment_method = 'Payment method is required.';
    
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update this payment?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, cancel',
      });

      if (result.isConfirmed) {
        setIsSubmitting(true);

        router.put(route('accounting.payments.update', payment.id), paymentData, {
          onSuccess: () => {
            Swal.fire(
              'Updated!',
              'The payment has been updated successfully.',
              'success'
            ).then(() => {
              router.get(route('payments.index'));
            });
          },
          onError: () => {
            Swal.fire(
              'Error',
              'There was an issue updating the payment.',
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
    <AppLayout title="Edit Payment">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title="Edit Payment"
          description="Modify the payment details below."
        />

        <div className="p-6 bg-white shadow-md rounded-lg col-span-2">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="invoice_id" className="font-semibold mb-2">
                Invoice ID
              </label>
              <input
                id="invoice_id"
                type="text"
                value={paymentData.invoice_id}
                disabled
                onChange={(e) =>
                  setPaymentData({ ...paymentData, invoice_id: e.target.value })
                }
                placeholder="Enter invoice ID"
                className="p-inputtext w-full"
              />
              {errors.invoice_id && (
                <small className="p-error">{errors.invoice_id}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="amount" className="font-semibold mb-2">
                Amount
              </label>
              <input
                id="amount"
                type="number"
                value={paymentData.amount}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, amount: e.target.value })
                }
                placeholder="Enter amount"
                className="p-inputtext w-full"
              />
              {errors.amount && (
                <small className="p-error">{errors.amount}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="payment_date" className="font-semibold mb-2">
                Payment Date
              </label>
              <Calendar
                id="payment_date"
                value={paymentData.payment_date}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, payment_date: e.value })
                }
                placeholder="Select payment date"
                className="w-full"
              />
              {errors.payment_date && (
                <small className="p-error">{errors.payment_date}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="payment_method" className="font-semibold mb-2">
                Payment Method
              </label>
              <Dropdown
                id="payment_method"
                value={paymentData.payment_method}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, payment_method: e.value })
                }
                options={paymentMethods}
                optionLabel="name"
                optionValue="id"
                placeholder="Select a Payment Method"
                className="w-full"
              />
              {errors.payment_method && (
                <small className="p-error">{errors.payment_method}</small>
              )}
            </div>

            <Button
              label="Update"
              icon="pi pi-check"
              className="p-button-primary mt-4"
              type="submit"
              disabled={isSubmitting}
            />
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default EditPayment;
