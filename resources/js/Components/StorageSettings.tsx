import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Swal from 'sweetalert2';
import { InputSwitch } from 'primereact/inputswitch';
import axios from 'axios'; // Import axios to make HTTP requests
import { Dropdown } from 'primereact/dropdown';

export default function StorageSettings() {
    // State to manage input values
    const [uploadStoragePath, setUploadStoragePath] = useState('storage/app/uploads');
    const [maxUploadSizeMb, setMaxUploadSizeMb] = useState('');
    const [allowedFileTypes, setAllowedFileTypes] = useState('');
    const [enableCloudStorage, setEnableCloudStorage] = useState(false);
    const [cloudStorageProvider, setCloudStorageProvider] = useState('');

    const cloudProviders = [
        { label: 'AWS S3', value: 'aws_s3' },
        { label: 'Google Cloud Storage', value: 'gcs' },
        { label: 'Azure Blob Storage', value: 'azure_blob' },
    ];

    // Fetch storage settings from the backend (Laravel)
    useEffect(() => {
        axios.get('/api/settings/storage')
            .then((response) => {
                const settings = response.data;
                setUploadStoragePath(settings.upload_storage_path || 'storage/app/uploads');
                setMaxUploadSizeMb(settings.max_upload_size_mb || '10');
                setAllowedFileTypes(settings.allowed_file_types || 'jpg,png,pdf');
                setEnableCloudStorage(settings.enable_cloud_storage || false);
                setCloudStorageProvider(settings.cloud_storage_provider || '');
            })
            .catch((error) => {
                console.error("There was an error fetching the storage settings:", error);
            });
    }, []);

    // Function to handle the form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Validation for maxUploadSizeMb
        if (isNaN(maxUploadSizeMb) || maxUploadSizeMb <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Input',
                text: 'Max upload size must be a positive number.',
            });
            return;
        }

        // Send the updated settings to the backend
        axios.post('/api/settings/storage/update', {
            upload_storage_path: uploadStoragePath,
            max_upload_size_mb: maxUploadSizeMb,
            allowed_file_types: allowedFileTypes,
            enable_cloud_storage: enableCloudStorage,
            cloud_storage_provider: cloudStorageProvider,
        })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Settings Saved',
                    text: 'Your storage settings have been updated successfully.',
                });
            })
            .catch((error) => {
                console.error('Error updating settings:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'There was an issue saving your storage settings.',
                });
            });
    };

    return (
        <div>
            <h2>Storage Settings</h2>
            <p>Manage file storage options and restrictions for your application.</p>

            <div>
                <form onSubmit={handleSubmit}>
                    {/* Upload Storage Path */}
                    <div className="flex justify-end">
                        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                            <label htmlFor="upload_storage_path" className="block text-md font-medium text-gray-700">
                                Upload Storage Path
                            </label>
                            <div className="text-sm text-gray-800">Path where files will be stored on the server.</div>
                            <InputText
                                id="upload_storage_path"
                                name="upload_storage_path"
                                value={uploadStoragePath}
                                onChange={(e) => setUploadStoragePath(e.target.value)}
                                className="mt-1 w-full border border-gray-300 rounded-lg"
                                placeholder="e.g., storage/app/uploads"
                            />
                        </div>
                    </div>

                    {/* Max Upload Size */}
                    <div className="flex justify-end">
                        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                            <label htmlFor="max_upload_size_mb" className="block text-md font-medium text-gray-700">
                                Max Upload Size (MB)
                            </label>
                            <div className="text-sm text-gray-800">Maximum file upload size in megabytes.</div>
                            <InputText
                                id="max_upload_size_mb"
                                name="max_upload_size_mb"
                                value={maxUploadSizeMb}
                                onChange={(e) => setMaxUploadSizeMb(e.target.value)}
                                className="mt-1 w-full border border-gray-300 rounded-lg"
                                placeholder="e.g., 10"
                            />
                        </div>
                    </div>

                    {/* Allowed File Types */}
                    <div className="flex justify-end">
                        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                            <label htmlFor="allowed_file_types" className="block text-md font-medium text-gray-700">
                                Allowed File Types
                            </label>
                            <div className="text-sm text-gray-800">Comma-separated list of allowed file extensions.</div>
                            <InputText
                                id="allowed_file_types"
                                name="allowed_file_types"
                                value={allowedFileTypes}
                                onChange={(e) => setAllowedFileTypes(e.target.value)}
                                className="mt-1 w-full border border-gray-300 rounded-lg"
                                placeholder="e.g., jpg,png,pdf"
                            />
                        </div>
                    </div>

                    {/* Enable Cloud Storage */}
                    <div className="flex justify-end">
                        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                            <label htmlFor="enable_cloud_storage" className="block text-md font-medium text-gray-700">
                                Enable Cloud Storage
                            </label>
                            <div className="text-sm text-gray-800">Enable or disable cloud storage integration.</div>
                            <InputSwitch
                                id="enable_cloud_storage"
                                name="enable_cloud_storage"
                                checked={enableCloudStorage}
                                onChange={(e) => setEnableCloudStorage(e.value)}
                            />
                        </div>
                    </div>

                    {/* Cloud Storage Provider */}
                    {enableCloudStorage && (
                        <div className="flex justify-end">
                            <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                                <label htmlFor="cloud_storage_provider" className="block text-md font-medium text-gray-700">
                                    Cloud Storage Provider
                                </label>
                                <div className="text-sm text-gray-800">Select a cloud storage provider.</div>
                                <Dropdown
                                    id="cloud_storage_provider"
                                    name="cloud_storage_provider"
                                    options={cloudProviders}
                                    value={cloudStorageProvider}
                                    onChange={(e) => setCloudStorageProvider(e.value)}
                                    className="mt-1 w-full border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="mt-4 flex justify-end">
                        <Button label="Save Settings" type="submit" className="bg-primary p-2 text-white rounded-lg" />
                    </div>
                </form>
            </div>
        </div>
    );
}
