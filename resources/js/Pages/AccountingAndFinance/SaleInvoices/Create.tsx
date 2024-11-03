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

const CreateInvoice = ({ customers }) => {
  const route = useRoute();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Accounting & Finance', href: '/accounting' },
    { label: 'Invoices', href: '/accounting/sales-invoices' },
    { label: 'Create Invoice' },
  ];

  const [invoiceData, setInvoiceData] = useState({
    customer_id: '',
    total_amount: '',
    tax_amount: '',
    discount_amount: '',
    invoice_date: null,
    due_date: null,
    status: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const validationErrors = {};
    if (!invoiceData.customer_id) validationErrors.customer_id = 'Customer is required.';
    if (!invoiceData.total_amount) validationErrors.total_amount = 'Total amount is required.';
    if (!invoiceData.invoice_date) validationErrors.invoice_date = 'Invoice date is required.';
    if (!invoiceData.due_date) validationErrors.due_date = 'Due date is required.';
    if (!invoiceData.status) validationErrors.status = 'Status is required.';

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to create this invoice?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, create it!',
        cancelButtonText: 'No, cancel',
      });

      if (result.isConfirmed) {
        setIsSubmitting(true);

        router.post(route('accounting.sales-invoices.store'), invoiceData, {
          onSuccess: () => {
            Swal.fire('Created!', 'The invoice has been created successfully.', 'success').then(() => {
              router.get(route('accounting.sales-invoices.index'));
            });
          },
          onError: () => {
            Swal.fire('Error', 'There was an issue creating the invoice.', 'error');
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
    <AppLayout title="Create Invoice">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle title="Create Invoice" description="Fill in the details to create a new invoice." />

        <div className="p-6 bg-white shadow-md rounded-lg col-span-2">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="customer_id" className="font-semibold mb-2">Customer</label>
              <Dropdown
                id="customer_id"
                options={customers}
                optionValue="id"
                optionLabel="name"
                value={invoiceData.customer_id}
                onChange={(e) => setInvoiceData({ ...invoiceData, customer_id: e.value })}
                placeholder="Select a Customer"
                className="p-inputtext w-full"
              />
              {errors.customer_id && <small className="p-error">{errors.customer_id}</small>}
            </div>

            <div className="field">
              <label htmlFor="total_amount" className="font-semibold mb-2">Total Amount</label>
              <input
                id="total_amount"
                type="number"
                value={invoiceData.total_amount}
                onChange={(e) => setInvoiceData({ ...invoiceData, total_amount: e.target.value })}
                placeholder="Enter total amount"
                className="p-inputtext w-full"
              />
              {errors.total_amount && <small className="p-error">{errors.total_amount}</small>}
            </div>

            <div className="field">
              <label htmlFor="tax_amount" className="font-semibold mb-2">Tax Amount</label>
              <input
                id="tax_amount"
                type="number"
                value={invoiceData.tax_amount}
                onChange={(e) => setInvoiceData({ ...invoiceData, tax_amount: e.target.value })}
                placeholder="Enter tax amount"
                className="p-inputtext w-full"
              />
            </div>

            <div className="field">
              <label htmlFor="discount_amount" className="font-semibold mb-2">Discount Amount</label>
              <input
                id="discount_amount"
                type="number"
                value={invoiceData.discount_amount}
                onChange={(e) => setInvoiceData({ ...invoiceData, discount_amount: e.target.value })}
                placeholder="Enter discount amount"
                className="p-inputtext w-full"
              />
            </div>

            <div className="field">
              <label htmlFor="invoice_date" className="font-semibold mb-2">Invoice Date</label>
              <Calendar
                id="invoice_date"
                value={invoiceData.invoice_date}
                onChange={(e) => setInvoiceData({ ...invoiceData, invoice_date: e.value })}
                inline
                placeholder="Select invoice date"
                className="w-full"
              />
              {errors.invoice_date && <small className="p-error">{errors.invoice_date}</small>}
            </div>

            <div className="field">
              <label htmlFor="due_date" className="font-semibold mb-2">Due Date</label>
              <Calendar
                id="due_date"
                value={invoiceData.due_date}
                onChange={(e) => setInvoiceData({ ...invoiceData, due_date: e.value })}
                placeholder="Select due date"                
                inline
                className="w-full"
              />
              {errors.due_date && <small className="p-error">{errors.due_date}</small>}
            </div>

            <div className="field">
              <label htmlFor="status" className="font-semibold mb-2">Status</label>
              <Dropdown
                id="status"
                options={[{ label: 'Pending', value: 'pending' }, { label: 'Paid', value: 'paid' }, { label: 'Overdue', value: 'overdue' }]}
                value={invoiceData.status}
                onChange={(e) => setInvoiceData({ ...invoiceData, status: e.value })}
                placeholder="Select status"
                className="w-full"
              />
              {errors.status && <small className="p-error">{errors.status}</small>}
            </div>

            <Button label="Create" icon="pi pi-check" className="p-button-primary mt-4" type="submit" disabled={isSubmitting} />
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default CreateInvoice;
