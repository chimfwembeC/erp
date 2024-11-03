import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import SectionTitle from '@/Components/SectionTitle';
import { Button } from 'primereact/button';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';

const CreateBankAccount = () => {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Accounting & Finance', href: '/accounting' },
    { label: 'Bank Accounts', href: '/accounting/bank-accounts' },
    { label: 'Create' },
  ];

  const [accountData, setAccountData] = useState({
    account_name: '',
    account_number: '',
    current_balance: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const validationErrors = {};
    if (!accountData.account_name)
      validationErrors.account_name = 'Account name is required.';
    if (!accountData.account_number)
      validationErrors.account_number = 'Account number is required.';
    if (!accountData.current_balance)
      validationErrors.current_balance = 'Current balance is required.';
    
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to create this bank account?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, create it!',
        cancelButtonText: 'No, cancel',
      });

      if (result.isConfirmed) {
        setIsSubmitting(true);

        router.post(route('accounting.bank-accounts.store'), accountData, {
          onSuccess: () => {
            Swal.fire(
              'Created!',
              'The bank account has been created successfully.',
              'success'
            ).then(() => {
              router.get(route('bank-accounts.index'));
            });
            setAccountData({
              account_name: '',
              account_number: '',
              current_balance: '',
            });
            setErrors({});
          },
          onError: () => {
            Swal.fire(
              'Error',
              'There was an issue creating the bank account.',
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
    <AppLayout title="Create Bank Account">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title="Create New Bank Account"
          description="Fill out the form below to create a new bank account."
        />

        <div className="p-6 bg-white shadow-md rounded-lg col-span-2">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="account_name" className="font-semibold mb-2">
                Account Name
              </label>
              <input
                id="account_name"
                type="text"
                value={accountData.account_name}
                onChange={(e) =>
                  setAccountData({ ...accountData, account_name: e.target.value })
                }
                placeholder="Enter account name"
                className="p-inputtext w-full"
              />
              {errors.account_name && (
                <small className="p-error">{errors.account_name}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="account_number" className="font-semibold mb-2">
                Account Number
              </label>
              <input
                id="account_number"
                type="text"
                value={accountData.account_number}
                onChange={(e) =>
                  setAccountData({ ...accountData, account_number: e.target.value })
                }
                placeholder="Enter account number"
                className="p-inputtext w-full"
              />
              {errors.account_number && (
                <small className="p-error">{errors.account_number}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="current_balance" className="font-semibold mb-2">
                Current Balance
              </label>
              <input
                id="current_balance"
                type="number"
                value={accountData.current_balance}
                onChange={(e) =>
                  setAccountData({ ...accountData, current_balance: e.target.value })
                }
                placeholder="Enter current balance"
                className="p-inputtext w-full"
              />
              {errors.current_balance && (
                <small className="p-error">{errors.current_balance}</small>
              )}
            </div>

            <div className="flex justify-end">

            <Button
              label="Submit"
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

export default CreateBankAccount;
