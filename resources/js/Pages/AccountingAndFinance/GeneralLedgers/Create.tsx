import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import SectionTitle from '@/Components/SectionTitle';
import { Button } from 'primereact/button';
import useRoute from '@/Hooks/useRoute';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

const CreateGeneralLedger = ({ accounts }) => {
  const route = useRoute();
  
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Accounting & Finance', href: '/accounting' },
    { label: 'General Ledger', href: '/accounting/general-ledgers' },
    { label: 'Create' },
  ];

  const [ledgerData, setLedgerData] = useState({
    name: '',
    description: '',
    account_id: '',
    amount: '',
    transaction_date: null,
    debit: '',
    credit: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setLedgerData(prevData => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to submit this entry?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit it!',
      cancelButtonText: 'No, cancel',
    });

    if (result.isConfirmed) {
      setIsSubmitting(true);

      router.post(route('accounting.general-ledgers.store'), ledgerData, {
        onSuccess: () => {
          Swal.fire('Created!', 'General ledger entry has been created successfully.', 'success');
          setLedgerData({
            name: '',
            description: '',
            account_id: '',
            amount: '',
            transaction_date: null,
            debit: '',
            credit: '',
          });
        },
        onError: (errors) => {
          // Display backend validation errors
          const errorMessage = errors ? Object.values(errors).join(', ') : 'There was an issue creating the General Ledger entry.';
          Swal.fire('Error', errorMessage, 'error');
        },
        onFinish: () => setIsSubmitting(false),
      });
    }
  };

  return (
    <AppLayout title="Create General Ledger Entry">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title="Create New General Ledger Entry"
          description="Fill out the form below to create a new ledger entry."
        />
        <div className="p-6 bg-white shadow-md rounded-lg col-span-2">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="account_id" className="font-semibold mb-2">Account</label>
              <Dropdown
                id="account_id"
                value={ledgerData.account_id}
                onChange={e => handleChange('account_id', e.value)}
                options={accounts}
                optionLabel="account_name"
                optionValue="id"
                placeholder="Select Account"
                className="w-full"
              />
            </div>

            <div className="field">
              <label htmlFor="name" className="font-semibold mb-2">Name</label>
              <InputText
                id="name"
                value={ledgerData.name}
                onChange={e => handleChange('name', e.target.value)}
                placeholder="Enter name"
                className="w-full"
              />
            </div>

            <div className="field">
              <label htmlFor="description" className="font-semibold mb-2">Description</label>
              <InputText
                id="description"
                value={ledgerData.description}
                onChange={e => handleChange('description', e.target.value)}
                placeholder="Enter description"
                className="w-full"
              />
            </div>

            <div className="field">
              <label htmlFor="debit" className="font-semibold mb-2">Debit</label>
              <InputText
                id="debit"
                type="number"
                value={ledgerData.debit}
                onChange={e => handleChange('debit', e.target.value)}
                placeholder="Enter debit amount"
                className="w-full"
              />
            </div>

            <div className="field">
              <label htmlFor="credit" className="font-semibold mb-2">Credit</label>
              <InputText
                id="credit"
                type="number"
                value={ledgerData.credit}
                onChange={e => handleChange('credit', e.target.value)}
                placeholder="Enter credit amount"
                className="w-full"
              />
            </div>

            <div className="field">
              <label htmlFor="transaction_date" className="font-semibold mb-2">Transaction Date</label>
              <Calendar
                id="transaction_date"
                value={ledgerData.transaction_date}
                onChange={e => handleChange('transaction_date', e.value)}
                placeholder="Select date"
                inline
                disabled
                className="w-full"
                dateFormat="yy-mm-dd"
              />
            </div>

            <div className="flex justify-end">
              <Button
                label="Submit"
                icon="pi pi-check"
                className="p-button-primary bg-primary text-white p-2 mt-4"
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

export default CreateGeneralLedger;
