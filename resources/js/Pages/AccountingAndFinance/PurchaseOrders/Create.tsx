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

const CreatePurchaseOrder = ({ suppliers }) => {
  const route = useRoute();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Purchase Orders', href: '/purchase-orders' },
    { label: 'Create Purchase Order' },
  ];

  const [purchaseOrderData, setPurchaseOrderData] = useState({
    supplier_id: '',
    total_amount: '',
    tax_amount: '',
    discount_amount: '',
    order_date: null,
    delivery_date: null,
    status: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const validationErrors = {};
    if (!purchaseOrderData.supplier_id)
      validationErrors.supplier_id = 'Supplier is required.';
    if (!purchaseOrderData.total_amount)
      validationErrors.total_amount = 'Total amount is required.';
    if (!purchaseOrderData.tax_amount)
      validationErrors.tax_amount = 'Tax amount is required.';
    if (!purchaseOrderData.discount_amount)
      validationErrors.discount_amount = 'Discount amount is required.';
    if (!purchaseOrderData.order_date)
      validationErrors.order_date = 'Order date is required.';
    if (!purchaseOrderData.delivery_date)
      validationErrors.delivery_date = 'Delivery date is required.';
    if (!purchaseOrderData.status)
      validationErrors.status = 'Status is required.';

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to create this purchase order?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, create it!',
        cancelButtonText: 'No, cancel',
      });

      if (result.isConfirmed) {
        setIsSubmitting(true);

        router.post(route('accounting.purchase-orders.store'), purchaseOrderData, {
          onSuccess: () => {
            Swal.fire(
              'Created!',
              'The purchase order has been created successfully.',
              'success'
            ).then(() => {
              router.get(route('accounting.purchase-orders.index'));
            });
          },
          onError: () => {
            Swal.fire(
              'Error',
              'There was an issue creating the purchase order.',
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
    <AppLayout title="Create Purchase Order">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title="Create Purchase Order"
          description="Fill in the details to create a new purchase order."
        />

        <div className="p-6 bg-white shadow-md rounded-lg col-span-2">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="supplier_id" className="font-semibold mb-2">
                Supplier
              </label>
              <Dropdown
                id="supplier_id"
                options={suppliers}
                optionValue="id"
                optionLabel="name"
                value={purchaseOrderData.supplier_id}
                onChange={(e) =>
                  setPurchaseOrderData({
                    ...purchaseOrderData,
                    supplier_id: e.value,
                  })
                }
                placeholder="Select a Supplier"
                className="p-inputtext w-full border-2"
              />
              {errors.supplier_id && (
                <small className="p-error">{errors.supplier_id}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="total_amount" className="font-semibold mb-2">
                Total Amount
              </label>
              <input
                id="total_amount"
                type="number"
                value={purchaseOrderData.total_amount}
                onChange={(e) =>
                  setPurchaseOrderData({
                    ...purchaseOrderData,
                    total_amount: e.target.value,
                  })
                }
                placeholder="Enter total amount"
                className="p-inputtext w-full"
              />
              {errors.total_amount && (
                <small className="p-error">{errors.total_amount}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="tax_amount" className="font-semibold mb-2">
                Tax Amount
              </label>
              <input
                id="tax_amount"
                type="number"
                value={purchaseOrderData.tax_amount}
                onChange={(e) =>
                  setPurchaseOrderData({
                    ...purchaseOrderData,
                    tax_amount: e.target.value,
                  })
                }
                placeholder="Enter tax amount"
                className="p-inputtext w-full"
              />
              {errors.tax_amount && (
                <small className="p-error">{errors.tax_amount}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="discount_amount" className="font-semibold mb-2">
                Discount Amount
              </label>
              <input
                id="discount_amount"
                type="number"
                value={purchaseOrderData.discount_amount}
                onChange={(e) =>
                  setPurchaseOrderData({
                    ...purchaseOrderData,
                    discount_amount: e.target.value,
                  })
                }
                placeholder="Enter discount amount"
                className="p-inputtext w-full"
              />
              {errors.discount_amount && (
                <small className="p-error">{errors.discount_amount}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="order_date" className="font-semibold mb-2">
                Order Date
              </label>
              <Calendar
                id="order_date"
                value={purchaseOrderData.order_date}
                inline
                onChange={(e) =>
                  setPurchaseOrderData({ ...purchaseOrderData, order_date: e.value })
                }
                placeholder="Select order date"
                className="w-full border-2"
              />
              {errors.order_date && (
                <small className="p-error">{errors.order_date}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="delivery_date" className="font-semibold mb-2">
                Delivery Date
              </label>
              <Calendar
                id="delivery_date"
                value={purchaseOrderData.delivery_date}
                inline
                onChange={(e) =>
                  setPurchaseOrderData({ ...purchaseOrderData, delivery_date: e.value })
                }
                placeholder="Select delivery date"
                className="w-full border-2"
              />
              {errors.delivery_date && (
                <small className="p-error">{errors.delivery_date}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="status" className="font-semibold mb-2">
                Status
              </label>
              <Dropdown
                id="status"
                value={purchaseOrderData.status}
                onChange={(e) =>
                  setPurchaseOrderData({ ...purchaseOrderData, status: e.value })
                }
                options={[
                  { id: 'pending', name: 'Pending' },
                  { id: 'completed', name: 'Completed' },
                  { id: 'cancelled', name: 'Cancelled' },
                ]}
                optionLabel="name"
                optionValue="id"
                placeholder="Select order status"
                className="w-full border-2"
              />
              {errors.status && <small className="p-error">{errors.status}</small>}
            </div>

           <div className="flex justify-end">
            <div className="">
            <Button
              label="Create Purchase Order"
              icon="pi pi-check"
              className="p-button-primary mt-4  bg-primary p-2 text-white"
              type="submit"
              disabled={isSubmitting}
            />
            </div>
           </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default CreatePurchaseOrder;
