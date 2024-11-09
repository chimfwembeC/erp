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
import { Dropdown } from 'primereact/dropdown'; // Assuming account IDs come from a list
import axios from 'axios';

const Create = ({ accounts }) => {
  const route = useRoute();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Accounting', href: '/accounting' },
    { label: 'Journal Entries', href: '/accounting/journal-entries' },
    { label: 'Create' },
  ];

  const [journalEntryData, setJournalEntryData] = useState({
    reference: '',
    description: '',
    total_credit: '',
    total_debit: '',
    entry_date: null,
  });

  const [itemsData, setItemsData] = useState([
    { account_id: '', debit: '', credit: '' },
  ]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const validationErrors = {};
    if (!journalEntryData.reference)
      validationErrors.reference = 'Reference is required.';
    if (!journalEntryData.description)
      validationErrors.description = 'Description is required.';
    if (!journalEntryData.total_credit)
      validationErrors.total_credit = 'Total credit is required.';
    if (!journalEntryData.total_debit)
      validationErrors.total_debit = 'Total debit is required.';

    itemsData.forEach((item, index) => {
      if (!item.account_id)
        validationErrors[`items[${index}].account_id`] =
          'Account ID is required.';
    });

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...itemsData];
    updatedItems[index][field] = value;
    setItemsData(updatedItems);
  };

  const addItem = () => {
    setItemsData([...itemsData, { account_id: '', debit: '', credit: '' }]);
  };

  const removeItem = index => {
    const updatedItems = itemsData.filter((_, i) => i !== index);
    setItemsData(updatedItems);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (validateForm()) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to create this Journal Entry?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, create it!',
        cancelButtonText: 'No, cancel',
      });

      if (result.isConfirmed) {
        setIsSubmitting(true);

        const submissionData = {
          ...journalEntryData,
          entry_date: journalEntryData.entry_date
            ? journalEntryData.entry_date.toISOString()
            : null,
          items: itemsData,
        };

        axios.post(route('accounting.journal-entries.store'), submissionData).then((response) => {
          Swal.fire(
            'Created!',
            'The journal entry has been created successfully.',
            'success',
          ).then(() => {
            router.get(route('accounting.journal-entries.index'));
          });
          setErrors({});
        }).catch((error) => {
          // console.log('error',error);
          if(error.response.data.message)
          {
            Swal.fire(
              'Error',
              `${error.response.data.message}`,
              'error',
            );
          }else{
            Swal.fire(
              'Error',
              `There was an issue creating the journal entry.`,
              'error',
            );
          }
         
          setErrors(error);
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
    <AppLayout title="Create Journal Entry">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title="Create Journal Entry"
          description="Fill in the details below to create a new journal entry."
        />

        <div className="p-6 bg-white shadow-md rounded-lg col-span-2">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            {/* Main Journal Entry Fields */}
            {/* Reference, Description, Total Debit, Total Credit, Entry Date fields... */}
            <div className="field">
              <label htmlFor="reference" className="font-semibold mb-2">
                Reference
              </label>
              <InputText
                id="reference"
                type="text"
                value={journalEntryData.reference}
                onChange={e =>
                  setJournalEntryData({
                    ...journalEntryData,
                    reference: e.target.value,
                  })
                }
                placeholder="Enter reference"
                className="p-inputtext w-full"
              />
              {errors.reference && (
                <small className="p-error">{errors.reference}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="description" className="font-semibold mb-2">
                Description
              </label>
              <InputText
                id="description"
                type="text"
                value={journalEntryData.description}
                onChange={e =>
                  setJournalEntryData({
                    ...journalEntryData,
                    description: e.target.value,
                  })
                }
                placeholder="Enter description"
                className="p-inputtext w-full"
              />
              {errors.description && (
                <small className="p-error">{errors.description}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="total_debit" className="font-semibold mb-2">
                Total Debit
              </label>
              <InputText
                id="total_debit"
                type="number"
                value={journalEntryData.total_debit}
                onChange={e =>
                  setJournalEntryData({
                    ...journalEntryData,
                    total_debit: e.target.value,
                  })
                }
                placeholder="Enter total debit"
                className="p-inputtext w-full"
              />
              {errors.total_debit && (
                <small className="p-error">{errors.total_debit}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="total_credit" className="font-semibold mb-2">
                Total Credit
              </label>
              <InputText
                id="total_credit"
                type="number"
                value={journalEntryData.total_credit}
                onChange={e =>
                  setJournalEntryData({
                    ...journalEntryData,
                    total_credit: e.target.value,
                  })
                }
                placeholder="Enter total credit"
                className="p-inputtext w-full"
              />
              {errors.total_credit && (
                <small className="p-error">{errors.total_credit}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="entry_date" className="font-semibold mb-2">
                Entry Date
              </label>
              <Calendar
                id="entry_date"
                inline
                disabled
                value={journalEntryData.entry_date}
                onChange={e =>
                  setJournalEntryData({
                    ...journalEntryData,
                    entry_date: e.value,
                  })
                }
                dateFormat="yy-mm-dd"
                placeholder="Select date"
                className="p-inputtext w-full"
              />
              {errors.entry_date && (
                <small className="p-error">{errors.entry_date}</small>
              )}
            </div>
            {/* Items Section */}
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Journal Entry Items</h3>
              {itemsData.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 gap-4 items-center"
                >
                  <Dropdown
                    value={item.account_id}
                    options={accounts}
                    optionLabel='account_name'
                    optionValue='id'
                    onChange={e =>
                      handleItemChange(index, 'account_id', e.value)
                    }
                    placeholder="Select Account"
                    className="p-inputtext w-full"
                  />
                  <InputText
                    value={item.debit}
                    onChange={e =>
                      handleItemChange(index, 'debit', e.target.value)
                    }
                    placeholder="Debit"
                    className="p-inputtext w-full"
                    type="number"
                  />
                  <InputText
                    value={item.credit}
                    onChange={e =>
                      handleItemChange(index, 'credit', e.target.value)
                    }
                    placeholder="Credit"
                    className="p-inputtext w-full"
                    type="number"
                  />
                  <Button
                    icon="pi pi-minus"
                    className="p-button-danger "
                    onClick={() => removeItem(index)}
                  />
                </div>
              ))}
              <Button
                label="Add Item"
                icon="pi pi-plus"
                type='button'
                className="p-button-secondary mt-2 bg-primary p-2 text-white"
                onClick={addItem}
              />
            </div>

            <div className="flex justify-end">
              <Button
                label="Create Journal Entry"
                icon="pi pi-save"
                className="p-button-primary mt-4 bg-primary p-2 text-white"
                type="submit"
                // disabled={isSubmitting}
              />
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default Create;
