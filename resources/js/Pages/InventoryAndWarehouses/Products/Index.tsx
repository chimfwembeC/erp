import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { router } from '@inertiajs/react';
import { Paginator } from 'primereact/paginator';

const Index = ({ products }) => {
  const [isGridView, setIsGridView] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(6); // Number of items per page for grid view

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Inventory', href: '/inventory' },
    { label: 'Products' },
  ];

  const toggleLayout = () => {
    setIsGridView(prevView => !prevView);
  };

  const handleDelete = id => {
    if (confirm('Are you sure you want to delete this product?')) {
      router.delete(`/inventory/products/${id}`);
    }
  };

  const actionBodyTemplate = rowData => (
    <div className="flex gap-2 justify-center">
      <Button
        icon="pi pi-eye"
        className="p-button-info p-button-sm"
        onClick={() => router.get(`/inventory/products/${rowData.id}`)}
      />
      <Button
        icon="pi pi-pencil"
        className="p-button-warning p-button-sm"
        onClick={() => router.get(`/inventory/products/${rowData.id}/edit`)}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-danger p-button-sm"
        onClick={() => handleDelete(rowData.id)}
      />
    </div>
  );

  const onPageChange = e => {
    setFirst(e.first);
    setRows(e.rows);
  };

  return (
    <AppLayout title="Product Management">
      <Breadcrumb items={breadcrumbItems} />
      <div className="px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Product List</h1>
          <div className="flex items-center gap-4">
            <Button
              label="Add Product"
              icon="pi pi-plus"
              className="p-button-primary bg-primary p-2 text-white"
              onClick={() => router.get('/inventory/products/create')}
            />
            <Button
              label={
                isGridView ? 'Switch to Table View' : 'Switch to Grid View'
              }
              icon={isGridView ? 'pi pi-table' : 'pi pi-th-large'}
              className="p-button-secondary bg-primary p-2 text-white"
              onClick={toggleLayout}
            />
          </div>
        </div>

        {isGridView ? (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-4">
              {products.slice(first, first + rows).map(product => (
                <div
                  key={product.id}
                  className="bg-white relative shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="h-52">
                    <div className="inset-0 bg-primary h-48 top-0 absolute rounded-t-lg"></div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800">
                      {product.name}
                    </h2>
                    <p className="mt-2 text-gray-600">{product.description}</p>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Price:</span> $
                        {product.price}
                      </p>
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Stock:</span>{' '}
                        {product.stock}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end p-4 border-t border-gray-200">
                    <Button
                      icon="pi pi-eye"
                      className="p-button-text text-blue-600"
                      onClick={() =>
                        router.get(`/inventory/products/${product.id}`)
                      }
                    />
                    <Button
                      icon="pi pi-pencil"
                      className="p-button-text text-yellow-500"
                      onClick={() =>
                        router.get(`/inventory/products/${product.id}/edit`)
                      }
                    />
                    <Button
                      icon="pi pi-trash"
                      className="p-button-text text-red-600"
                      onClick={() => handleDelete(product.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Paginator
              first={first}
              rows={rows}
              totalRecords={products.length}
              onPageChange={onPageChange}
            />
          </>
        ) : (
          <DataTable
            value={products}
            paginator
            rows={10}
            stripedRows
            className="p-datatable-lg"
          >
            <Column field="name" header="Product Name" sortable />
            <Column
              field="price"
              header="Price"
              body={rowData => `$${rowData.price}`}
              sortable
            />
            <Column field="stock" header="Stock" sortable />
            {/* <Column field="description" header="Description" sortable /> */}
            <Column
              header="Actions"
              body={actionBodyTemplate}
              style={{ textAlign: 'center', width: '12rem' }}
            />
          </DataTable>
        )}
      </div>
    </AppLayout>
  );
};

export default Index;
