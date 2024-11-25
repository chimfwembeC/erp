import Breadcrumb from '@/Components/Breadcrumb';
import AppLayout from '@/Layouts/AppLayout';
import React, { useState } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import axios from 'axios';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import useRoute from '@/Hooks/useRoute';

export default function Show({ order, products }) {
    const route = useRoute();
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [orderItems, setOrderItems] = useState(order.order_items || []);

    const items = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Order Management', href: '/sale-orders/orders' },
        { label: 'Orders' },
    ];

    // Handle adding selected products to order items
    const handleAddItems = () => {
        const newItems = selectedProducts.map((product) => ({
            id: Date.now() + Math.random(), // Generate a unique ID for new items
            product_id: product.id,
            product: product,
            quantity: 1, // Default quantity
            price: product.price,
        }));

        setOrderItems((prev) => [...prev, ...newItems]);
        setSelectedProducts([]); // Clear selected products
    };

    // Handle deleting an order item
    const handleDeleteItem = async (id) => {

        const result = Swal.fire({
            icon: 'question',
            title: 'Are you sure!',
            text: 'you want to delete this order item?',
            showConfirmButton: true,
            confirmButtonText: 'Yes'
        });

        if((await result).isConfirmed)
        {
            const response =  router.delete(route(`sale-orders.order-items.destroy`,id))
            // .then(() => {
            //     Swal.fire({
            //         icon: 'success',
            //         title: 'Successful',
            //         text: 'Item deleted successfully!',
            //     }).then(() => router.get('/sale-orders/orders'));

            //     setOrderItems((prev) => prev.filter((item) => item.id !== id));
            // })
            // .catch(() => {
            //     Swal.fire({
            //         icon: 'error',
            //         title: 'Error',
            //         text: 'Failed to remove itme',
            //     });
            // });
        }


    };

    // Filter out already selected products
    const availableProducts = products.filter(
        (product) => !orderItems.some((item) => item.product_id === product.id)
    );

    // Submit the order items to the server
    const handleSubmitOrder = async () => {
        try {
            const response = await axios.post(`/sale-orders/orders/addItems/${order.id}`, {
                order_id: order.id,
                order_items: orderItems,
            });
            // Handle successful submission
            console.log('Order updated successfully', response.data);
        } catch (error) {
            // Handle error
            console.error('Error updating order:', error);
        }
    };

    return (
        <AppLayout title="Order Details">
            <Breadcrumb items={items} />

            <div className="px-4">
                <div className="p-4 bg-white rounded-md w-1/2">
                    <div>
                        <div className="text-xl font-bold">User: </div>
                        {order.customer.name}
                    </div>
                    <div>
                        <div className="text-xl font-bold">Total Price: </div>
                        {order.total_price}
                    </div>
                    <div>
                        <div className="text-xl font-bold">Status: </div>
                        {order.status}
                    </div>
                </div>

                <div className="text-2xl font-bold my-4">Order Items</div>

                {/* Add new order items */}
                <div className="bg-white rounded-md p-4 mb-4">
                    <MultiSelect
                        value={selectedProducts}
                        options={availableProducts}
                        onChange={(e) => setSelectedProducts(e.value)}
                        optionLabel="name"
                        placeholder="Select Products"
                        className="w-full mb-2"
                    />
                    <Button
                        label="Add Items"
                        icon="pi pi-plus"
                        onClick={handleAddItems}
                        disabled={!selectedProducts.length}
                        className="p-button-success"
                    />
                </div>

                {/* Display order items */}
                <div className="bg-white rounded-md p-4">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-200 p-2 rounded-md">
                                <th>NO#</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderItems.map((item, index) => (
                                <tr key={item.id} className="border-b">
                                    <td>{index + 1}</td>
                                    <td>{item.product.name}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            min="1"
                                            onChange={(e) =>
                                                setOrderItems((prev) =>
                                                    prev.map((oItem) =>
                                                        oItem.id === item.id
                                                            ? {
                                                                  ...oItem,
                                                                  quantity: Number(e.target.value),
                                                              }
                                                            : oItem
                                                    )
                                                )
                                            }
                                            className="p-1 border rounded-md w-16 text-center"
                                        />
                                    </td>
                                    <td>{item.price}</td>
                                    <td>
                                        <Button
                                            icon="pi pi-trash"
                                            className="p-button-danger p-button-sm"
                                            onClick={() => handleDeleteItem(item.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Submit Order */}
             <div className="flex justify-end">
             <Button
                    label="Submit Order"
                    icon="pi pi-check"
                    onClick={handleSubmitOrder}
                    className="bg-primary mt-4 p-2 text-white rounded-md"
                />
             </div>
            </div>
        </AppLayout>
    );
}
