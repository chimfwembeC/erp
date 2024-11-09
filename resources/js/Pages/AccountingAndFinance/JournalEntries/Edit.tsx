import React, { useState } from 'react';
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

const Edit = ({ journalEntry, accounts }) => {
  const route = useRoute();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Accounting', href: '/accounting' },
    { label: 'Journal Entries', href: '/accounting/journal-entries' },
    { label: 'Edit' },
  ];

  const [journalEntryData, setJournalEntryData] = useState({
    reference: journalEntry.reference || '',
    description: journalEntry.description || '',
    total_credit: journalEntry.total_credit || '',
    total_debit: journalEntry.total_debit || '',
    entry_date: new Date(journalEntry.entry_date) || '',
    items: journalEntry.journal_items || [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
console.log('journalEntry',journalEntry);
  const validateForm = () => {
    const validationErrors = {};
    if (!journalEntryData.reference) validationErrors.reference = 'Reference is required.';
    if (!journalEntryData.description) validationErrors.description = 'Description is required.';
    if (!journalEntryData.total_credit) validationErrors.total_credit = 'Total credit is required.';
    if (!journalEntryData.total_debit) validationErrors.total_debit = 'Total debit is required.';

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update this journal entry?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, cancel',
      });

      if (result.isConfirmed) {
        setIsSubmitting(true);

        router.put(route('accounting.journal-entries.update', journalEntry.id), journalEntryData, {
          onSuccess: () => {
            Swal.fire('Updated!', 'The journal entry has been updated successfully.', 'success');
            setErrors({});
          },
          onError: (error) => {
            Swal.fire('Error', 'There was an issue updating the journal entry.', 'error');
            setErrors(error);
          },
          onFinish: () => setIsSubmitting(false),
        });
      }
    } else {
      Swal.fire({ icon: 'error', title: 'Validation Error', text: 'Please fill in all required fields.' });
    }
  };

  const handleInputChange = (field, value) => {
    setJournalEntryData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...journalEntryData.items];
    updatedItems[index][field] = value;
    setJournalEntryData((prevData) => ({ ...prevData, items: updatedItems }));
  };

  const addItem = () => {
    setJournalEntryData((prevData) => ({
      ...prevData,
      items: [...prevData.items, { account_id: '', debit: '', credit: '' }],
    }));
  };

  const removeItem = (index) => {
    const updatedItems = journalEntryData.items.filter((_, i) => i !== index);
    setJournalEntryData((prevData) => ({
      ...prevData,
      items: updatedItems,
    }));
  };

  const FormField = ({ id, label, value, onChange, placeholder, type = "text" }) => (
    <div className="field">
      <label htmlFor={id} className="font-semibold mb-2">{label}</label>
      <InputText
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        placeholder={placeholder}
        className="p-inputtext w-full"
      />
      {errors[id] && <small className="p-error">{errors[id]}</small>}
    </div>
  );

  return (
    <AppLayout title="Edit Journal Entry">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title="Edit Journal Entry"
          description="Update the details below to modify this journal entry."
        />
        <div className="p-6 bg-white shadow-md rounded-lg col-span-2">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <FormField
              id="reference"
              label="Reference"
              value={journalEntryData.reference}
              onChange={handleInputChange}
              placeholder="Enter reference"
            />
            <FormField
              id="description"
              label="Description"
              value={journalEntryData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
            />
            <FormField
              id="total_debit"
              label="Total Debit"
              value={journalEntryData.total_debit}
              onChange={handleInputChange}
              placeholder="Enter total debit"
              type="number"
            />
            <FormField
              id="total_credit"
              label="Total Credit"
              value={journalEntryData.total_credit}
              onChange={handleInputChange}
              placeholder="Enter total credit"
              type="number"
            />
            <div className="field">
              <label htmlFor="entry_date" className="font-semibold mb-2">Entry Date</label>
              <Calendar
                id="entry_date"
                value={journalEntryData.entry_date}
                inline
                onChange={(e) => handleInputChange('entry_date', e.value)}
                dateFormat="dd-mm-yyyy"
                disabled
                placeholder="Select entry date"
                className="p-inputtext w-full border-2"
              />
              {errors.entry_date && <small className="p-error">{errors.entry_date}</small>}
            </div>

            <div className="field">
              <h4 className="font-semibold mb-4">Journal Items</h4>
              {journalEntryData.items.map((item, index) => (
                <div key={index} className="grid grid-cols-4 gap-2 mb-4">
                  <Dropdown
                    value={item.account_id}
                    options={accounts}
                    onChange={(e) => handleItemChange(index, 'account_id', e.value)}
                    optionLabel="account_name"
                    optionValue='id'
                    placeholder="Select Account"
                    className="col-span-1 border-2"
                  />
                  <InputText
                    value={item.debit}
                    onChange={(e) => handleItemChange(index, 'debit', e.target.value)}
                    placeholder="Debit"
                    type="number"
                    className="p-inputtext col-span-1"
                  />
                  <InputText
                    value={item.credit}
                    onChange={(e) => handleItemChange(index, 'credit', e.target.value)}
                    placeholder="Credit"
                    type="number"
                    className="p-inputtext col-span-1"
                  />
                  <Button                    
                    icon="pi pi-minus"
                    rounded
                    className="p-button-danger p-button-outlined col-span-1 "
                    onClick={() => removeItem(index)}
                  />
                </div>
              ))}
              <Button
                label="Add Item"
                type='button'
                icon="pi pi-plus"
                className="p-button-success mt-4 bg-primary p-2 text-white"
                onClick={addItem}
              />
            </div>

            <div className="flex justify-end">
              <Button
                label="Update Journal Entry"
                icon="pi pi-save"
                className="p-button-primary mt-4 bg-primary p-2 text-white"
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

export default Edit;
