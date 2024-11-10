import React, { useState, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import SectionTitle from '@/Components/SectionTitle';
import { Button } from 'primereact/button';
import useRoute from '@/Hooks/useRoute';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

const BankReconciliationForm = ({ bankAccounts, transactions, reconciliationData, isEdit = true }) => {
  const route = useRoute();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Accounting', href: '/accounting' },
    { label: 'Bank Reconciliation', href: '/accounting/bank-reconciliations' },
    { label: isEdit ? 'Edit' : 'Create' },
  ];

  const [formData, setFormData] = useState({
    bank_account_id: reconciliationData?.bank_account_id || '',
    opening_balance: reconciliationData?.opening_balance || '',
    closing_balance: reconciliationData?.closing_balance || '',
    statement_balance: reconciliationData?.statement_balance || '',
    ledger_balance: reconciliationData?.ledger_balance || '',
    transaction_id: reconciliationData?.transaction_id || '',
    reconciliation_date: reconciliationData?.reconciliation_date || '',
    status: reconciliationData?.status || 'pending',
    adjustments: reconciliationData?.adjustments || '',
    notes: reconciliationData?.notes || '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setFormData({
        bank_account_id: reconciliationData?.bank_account_id || '',
        opening_balance: reconciliationData?.opening_balance || '',
        closing_balance: reconciliationData?.closing_balance || '',
        statement_balance: reconciliationData?.statement_balance || '',
        ledger_balance: reconciliationData?.ledger_balance || '',
        transaction_id: reconciliationData?.transaction_id || '',
        reconciliation_date: reconciliationData?.reconciliation_date || '',
        status: reconciliationData?.status || 'pending',
        adjustments: reconciliationData?.adjustments || '',
        notes: reconciliationData?.notes || '',
      });
    }
  }, [isEdit, reconciliationData]);

  const validateForm = () => {
    const validationErrors = {};
    if (!formData.bank_account_id) validationErrors.bank_account_id = 'Bank account is required.';
    if (!formData.opening_balance) validationErrors.opening_balance = 'Opening balance is required.';
    if (!formData.closing_balance) validationErrors.closing_balance = 'Closing balance is required.';
    if (!formData.statement_balance) validationErrors.statement_balance = 'Statement balance is required.';
    if (!formData.ledger_balance) validationErrors.ledger_balance = 'Ledger balance is required.';
    // if (!formData.transaction_id) validationErrors.transaction_id = 'Transaction is required.';
    if (!formData.reconciliation_date) validationErrors.reconciliation_date = 'Reconciliation date is required.';

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to ${isEdit ? 'update' : 'create'} this bank reconciliation?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: `Yes, ${isEdit ? 'update' : 'create'} it!`,
        cancelButtonText: 'No, cancel',
      });

      if (result.isConfirmed) {
        setIsSubmitting(true);

        // const action = isEdit ? 'update' : 'store';
        router.put(route(`accounting.bank-reconciliations.update`, reconciliationData?.id || ''), formData, {
          onSuccess: () => {
            Swal.fire(
              `${isEdit ? 'Updated' : 'Created'}!`,
              `The bank reconciliation has been ${isEdit ? 'updated' : 'created'} successfully.`,
              'success',
            );
            setErrors({});
          },
          onError: (error) => {
            Swal.fire('Error', `There was an issue ${isEdit ? 'updating' : 'creating'} the bank reconciliation.`, 'error');
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
    <AppLayout title={`${isEdit ? 'Edit' : 'Create'} Bank Reconciliation`}>
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title={`${isEdit ? 'Edit' : 'Create'} Bank Reconciliation`}
          description="Fill in the details below to create or edit a bank reconciliation."
        />

        <div className="p-6 bg-white shadow-md rounded-lg col-span-2">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="bank_account_id" className="font-semibold mb-2">
                Bank Account
              </label>
              <Dropdown
                id="bank_account_id"
                value={formData.bank_account_id}
                onChange={e =>
                  setFormData({ ...formData, bank_account_id: e.target.value })
                }
                className="p-inputtext w-full border-2"
                placeholder="Select Bank Account"
                options={bankAccounts}
                optionLabel="account_name"
                optionValue="id"
              />
              {errors.bank_account_id && (
                <small className="p-error">{errors.bank_account_id}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="opening_balance" className="font-semibold mb-2">
                Opening Balance
              </label>
              <InputText
                id="opening_balance"
                type="number"
                value={formData.opening_balance}
                onChange={e =>
                  setFormData({
                    ...formData,
                    opening_balance: e.target.value,
                  })
                }
                placeholder="Enter opening balance"
                className="p-inputtext w-full"
              />
              {errors.opening_balance && (
                <small className="p-error">{errors.opening_balance}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="closing_balance" className="font-semibold mb-2">
                Closing Balance
              </label>
              <InputText
                id="closing_balance"
                type="number"
                value={formData.closing_balance}
                onChange={e =>
                  setFormData({
                    ...formData,
                    closing_balance: e.target.value,
                  })
                }
                placeholder="Enter closing balance"
                className="p-inputtext w-full"
              />
              {errors.closing_balance && (
                <small className="p-error">{errors.closing_balance}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="statement_balance" className="font-semibold mb-2">
                Statement Balance
              </label>
              <InputText
                id="statement_balance"
                type="number"
                value={formData.statement_balance}
                onChange={e =>
                  setFormData({
                    ...formData,
                    statement_balance: e.target.value,
                  })
                }
                placeholder="Enter statement balance"
                className="p-inputtext w-full"
              />
              {errors.statement_balance && (
                <small className="p-error">{errors.statement_balance}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="ledger_balance" className="font-semibold mb-2">
                Ledger Balance
              </label>
              <InputText
                id="ledger_balance"
                type="number"
                value={formData.ledger_balance}
                onChange={e =>
                  setFormData({
                    ...formData,
                    ledger_balance: e.target.value,
                  })
                }
                placeholder="Enter ledger balance"
                className="p-inputtext w-full"
              />
              {errors.ledger_balance && (
                <small className="p-error">{errors.ledger_balance}</small>
              )}
            </div>

            {/* <div className="field">
              <label htmlFor="transaction_id" className="font-semibold mb-2">
                Transaction
              </label>
              <Dropdown
                id="transaction_id"
                value={formData.transaction_id}
                onChange={e =>
                  setFormData({
                    ...formData,
                    transaction_id: e.target.value,
                  })
                }
                className="p-inputtext w-full"
                placeholder="Select transaction"
                options={transactions}
                optionLabel="transaction_id"
                optionValue="id"
              />
              {errors.transaction_id && (
                <small className="p-error">{errors.transaction_id}</small>
              )}
            </div> */}

            <div className="field">
              <label htmlFor="reconciliation_date" className="font-semibold mb-2">
                Reconciliation Date
              </label>
              <Calendar
                id="reconciliation_date"
                value={formData.reconciliation_date}
                inline
                disabled
                onChange={e =>
                  setFormData({
                    ...formData,
                    reconciliation_date: e.target.value,
                  })
                }
                dateFormat="yy-mm-dd"
                showIcon
                className="w-full"
              />
              {errors.reconciliation_date && (
                <small className="p-error">{errors.reconciliation_date}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="status" className="font-semibold mb-2">
                Status
              </label>
              <Dropdown
                id="status"
                value={formData.status}
                onChange={e =>
                  setFormData({ ...formData, status: e.target.value })
                }
                options={[
                  { label: 'Pending', value: 'pending' },
                  { label: 'Completed', value: 'completed' },
                ]}
                className="p-inputtext w-full"
              />
            </div>

            <div className="field">
              <label htmlFor="adjustments" className="font-semibold mb-2">
                Adjustments
              </label>
              <InputText
                id="adjustments"
                value={formData.adjustments}
                onChange={e =>
                  setFormData({
                    ...formData,
                    adjustments: e.target.value,
                  })
                }
                placeholder="Adjustments (if any)"
                className="p-inputtext w-full"
              />
              {errors.adjustments && (
                <small className="p-error">{errors.adjustments}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="notes" className="font-semibold mb-2">
                Notes
              </label>
              <InputText
                id="notes"
                value={formData.notes}
                onChange={e =>
                  setFormData({
                    ...formData,
                    notes: e.target.value,
                  })
                }
                placeholder="Enter any notes"
                className="p-inputtext w-full"
              />
              {errors.notes && <small className="p-error">{errors.notes}</small>}
            </div>

            <div className="field mt-4 flex justify-end">
              <Button
                label={isEdit ? 'Update Bank Reconciliation' : 'Create Bank Reconciliation'}
                icon="pi pi-check"
                className="p-button-success  bg-primary text-white p-2"
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting}
              />
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default BankReconciliationForm;
