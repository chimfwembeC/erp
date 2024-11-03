import React, { useState, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import SectionTitle from '@/Components/SectionTitle';
import { Button } from 'primereact/button';
import useRoute from '@/Hooks/useRoute';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

const EditBudget = ({ budget, accounts }) => {
  const route = useRoute();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Accounting', href: '/accounting' },
    { label: 'Budgets', href: '/accounting/budgets' },
    { label: 'Edit' },
  ];

  const [budgetData, setBudgetData] = useState({
    account_id: budget.account_id || '',
    budgeted_amount: budget.budgeted_amount || '',
    actual_amount: budget.actual_amount || '',
    fiscal_year: new Date(budget.fiscal_year) || '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const validationErrors = {};
    if (!budgetData.account_id)
      validationErrors.account_id = 'Account is required.';
    if (!budgetData.budgeted_amount)
      validationErrors.budgeted_amount = 'Budgeted amount is required.';
    if (!budgetData.actual_amount)
      validationErrors.actual_amount = 'Actual amount is required.';
    if (!budgetData.fiscal_year)
      validationErrors.fiscal_year = 'Fiscal year is required.';

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (validateForm()) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update this budget?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, cancel',
      });

      if (result.isConfirmed) {
        setIsSubmitting(true);

        router.put(route('accounting.budgets.update', budget.id), budgetData, {
          onSuccess: () => {
            Swal.fire(
              'Updated!',
              'The budget has been updated successfully.',
              'success',
            ).then(() => {
              router.get(route('accounting.budgets.index'));
            });
            setErrors({});
          },
          onError: error => {
            Swal.fire(
              'Error',
              'There was an issue updating the budget.',
              'error',
            );
            setErrors(error);
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
    <AppLayout title="Edit Budget">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title="Edit Budget"
          description="Modify the fields below to update the budget."
        />

        <div className="p-6 bg-white shadow-md rounded-lg col-span-2">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="account_id" className="font-semibold mb-2">
                Account
              </label>
              <Dropdown
                id="account_id"
                value={budgetData.account_id}
                onChange={e =>
                  setBudgetData({ ...budgetData, account_id: e.target.value })
                }
                className="p-inputtext w-full border-2"
                placeholder="Select Account"
                options={accounts}
                optionLabel="account_name"
                optionValue="id"
              />
              {errors.account_id && (
                <small className="p-error">{errors.account_id}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="budgeted_amount" className="font-semibold mb-2">
                Budgeted Amount
              </label>
              <InputText
                id="budgeted_amount"
                type="number"
                value={budgetData.budgeted_amount}
                onChange={e =>
                  setBudgetData({
                    ...budgetData,
                    budgeted_amount: e.target.value,
                  })
                }
                placeholder="Enter budgeted amount"
                className="p-inputtext w-full"
              />
              {errors.budgeted_amount && (
                <small className="p-error">{errors.budgeted_amount}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="actual_amount" className="font-semibold mb-2">
                Actual Amount
              </label>
              <InputText
                id="actual_amount"
                type="number"
                value={budgetData.actual_amount}
                onChange={e =>
                  setBudgetData({
                    ...budgetData,
                    actual_amount: e.target.value,
                  })
                }
                placeholder="Enter actual amount"
                className="p-inputtext w-full"
              />
              {errors.actual_amount && (
                <small className="p-error">{errors.actual_amount}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="fiscal_year" className="font-semibold mb-2">
                Fiscal Year
              </label>
              <Calendar
                id="fiscal_year"
                value={budgetData.fiscal_year}
                onChange={e =>
                  setBudgetData({ ...budgetData, fiscal_year: e.value })
                }
                inline
                view="year"
                dateFormat="yy"
                placeholder="Select fiscal year"
                className="p-inputtext w-full border-2"
              />
              {errors.fiscal_year && (
                <small className="p-error">{errors.fiscal_year}</small>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                label="Update"
                icon="pi pi-save"
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

export default EditBudget;
