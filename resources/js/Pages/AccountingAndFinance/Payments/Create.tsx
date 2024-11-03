import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import SectionTitle from '@/Components/SectionTitle';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import useRoute from '@/Hooks/useRoute';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';

const CreatePayment = ({ invoices }) => {
  const route = useRoute();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Accounting & Finance', href: '/accounting' },
    { label: 'Payments', href: '/accounting/payments' },
    { label: 'Create Payment' },
  ];

  const paymentMethods = [
    { id: 'cash', name: 'Cash' },
    { id: 'bank', name: 'Bank' },
    { id: 'online_banking', name: 'Online Banking' },
    { id: 'money_money', name: 'Money Money' },
  ];

  const [paymentData, setPaymentData] = useState({
    invoice_id: '',
    amount: '',
    payment_date: null,
    payment_method: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [remainingAmount, setRemainingAmount] = useState(null); // New state for remaining amount

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
      const totalAmount = selectedInvoice.total_amount; // Get the total amount from the selected invoice
      const paymentAmount = parseFloat(paymentData.amount); // Parse the payment amount as a float

      if (paymentAmount > totalAmount) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Payment amount cannot exceed the total invoice amount.',
        });
        return;
      }

      const remaining = totalAmount - paymentAmount; // Calculate remaining amount
      setRemainingAmount(remaining); // Update remaining amount state

      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to create this payment?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, create it!',
        cancelButtonText: 'No, cancel',
      });

      if (result.isConfirmed) {
        setIsSubmitting(true);

        router.post(route('accounting.payments.store'), paymentData, {
          onSuccess: () => {
            Swal.fire(
              'Created!',
              'The payment has been created successfully.',
              'success'
            ).then(() => {
              router.get(route('payments.index'));
            });
          },
          onError: () => {
            Swal.fire(
              'Error',
              'There was an issue creating the payment.',
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
    <AppLayout title="Create Payment">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title="Create Payment"
          description="Fill in the details to create a new payment."
        />

        <div className="p-6 bg-white shadow-md rounded-lg col-span-2">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="invoice_id" className="font-semibold mb-2">
                Invoice ID
              </label>
              <Dropdown
                id="invoice_id"
                options={invoices}
                optionValue='id'
                optionLabel="total_amount"
                value={selectedInvoice ? selectedInvoice.id : null} // Update value to selectedInvoice ID
                onChange={(e) => {
                  setPaymentData({ ...paymentData, invoice_id: e.value });
                  const selected = invoices.find(invoice => invoice.id === e.value);
                  setSelectedInvoice(selected); // Set selected invoice details
                  setRemainingAmount(selected ? selected.total_amount : null); // Reset remaining amount to the selected invoice total
                }}
                placeholder="Select an Invoice ID"
                className="p-inputtext w-full"
              />
              {errors.invoice_id && (
                <small className="p-error">{errors.invoice_id}</small>
              )}
            </div>

            {/* Display selected invoice details */}
            {selectedInvoice && (
              <div className="selected-invoice-info p-4 border rounded bg-gray-100">
                <h3 className="font-semibold">Selected Invoice Details:</h3>
                <p><strong>Invoice ID:</strong> {selectedInvoice.id}</p>
                <p><strong>Customer Name:</strong> {selectedInvoice.customer.name}</p>
                <p><strong>Customer Email:</strong> {selectedInvoice.customer.email}</p>
                <p><strong>Amount:</strong> {selectedInvoice.total_amount}</p>
                <p><strong>Tax Amount:</strong> {selectedInvoice.tax_amount}</p>
                <p><strong>Discount Amount:</strong> {selectedInvoice.discount_amount}</p>
                <p><strong>Invoice Date:</strong> {selectedInvoice.invoice_date}</p>
                <p><strong>Due Date:</strong> {selectedInvoice.due_date}</p>            
                <p><strong>Status:</strong> {selectedInvoice.status}</p>                
                {remainingAmount !== null && (
                  <p><strong>Remaining Amount:</strong> {remainingAmount}</p> // Display remaining amount
                )}
              </div>
            )}

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
                // disabled
                inline
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
              label="Create"
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

export default CreatePayment;
