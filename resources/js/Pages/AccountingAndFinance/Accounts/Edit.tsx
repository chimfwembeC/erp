import React, { useState, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import SectionTitle from '@/Components/SectionTitle';
import { Button } from 'primereact/button';
import useRoute from '@/Hooks/useRoute';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';

const EditAccount = ({ account }) => {
  const route = useRoute();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Accounting', href: '/accounting' },
    { label: 'Accounts', href: '/accounting/accounts' },
    { label: 'Edit' },
  ];

  const [accountData, setAccountData] = useState({
    account_name: account.account_name || '',
    account_type: account.account_type || '',
    account_number: account.account_number || '',
    parent_account_id: account.parent_account_id || null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const validationErrors = {};
    if (!accountData.account_name) 
      validationErrors.account_name = 'Account name is required.';
    if (!accountData.account_type) 
      validationErrors.account_type = 'Account type is required.';
    if (!accountData.account_number) 
      validationErrors.account_number = 'Account number is required.';

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update this account?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, cancel',
      });

      if (result.isConfirmed) {
        setIsSubmitting(true);

        router.put(route('accounting.accounts.update', account.id), accountData, {
          onSuccess: () => {
            Swal.fire(
              'Updated!',
              'The account has been updated successfully.',
              'success'
            );
            // .then(() => {
            //   router.get(route('accounting.accounts.index'));
            // });
            setErrors({});
          },
          onError: () => {
            Swal.fire(
              'Error',
              'There was an issue updating the account.',
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
    <AppLayout title="Edit Account">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title="Edit Account"
          description="Update the details of the account."
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
              <label htmlFor="account_type" className="font-semibold mb-2">
                Account Type
              </label>
              <input
                id="account_type"
                type="text"
                value={accountData.account_type}
                onChange={(e) =>
                  setAccountData({ ...accountData, account_type: e.target.value })
                }
                placeholder="Enter account type"
                className="p-inputtext w-full"
              />
              {errors.account_type && (
                <small className="p-error">{errors.account_type}</small>
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

export default EditAccount;
