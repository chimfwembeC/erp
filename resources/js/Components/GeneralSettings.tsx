import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Swal from 'sweetalert2';
import { InputSwitch } from 'primereact/inputswitch';
import { FileUpload } from 'primereact/fileupload';
import axios from 'axios';  // Import axios to make HTTP requests

export default function GeneralSettings() {
    // State to manage input values
    const [siteName, setSiteName] = useState('');
    const [logo, setLogo] = useState(null);  // For file input (logo image)
    const [timezone, setTimezone] = useState('');  // Separate state for timezone
    const [maintenanceMode, setMaintenanceMode] = useState(false);  // Maintenance Mode (Switch)

    // Fetch settings from the backend (Laravel)
    useEffect(() => {
        axios.get('/api/general/settings')
            .then((response) => {
                const settings = response.data;
                setSiteName(settings.site_name || '');
                setTimezone(settings.timezone || '');
                setMaintenanceMode(settings.maintenance_mode || false);
            })
            .catch((error) => {
                console.error("There was an error fetching the settings:", error);
            });
    }, []);

    // Function to handle the form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Send the updated settings to the backend
        axios.post('/api/general/settings/update', {
            site_name: siteName,
            timezone: timezone,
            maintenance_mode: maintenanceMode,
            logo: logo,
        })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Settings Saved',
                    text: 'Your general settings have been updated successfully.',
                });
            })
            .catch((error) => {
                console.error('Error updating settings:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'There was an issue saving your settings.',
                });
            });
    };

    // Handle logo file change
    const handleLogoChange = (e) => {
        setLogo(e.files[0]);  // Use the correct `e.files` from the FileUpload component
    };

    return (
        <div>
            <h2>General Settings</h2>
            <p>Here you can manage general application settings.</p>

            <div>
                <form onSubmit={handleSubmit}>
                    {/* Site Name Input */}
                    <div className="flex justify-end">
                        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                            <label htmlFor="site_name" className="block text-md font-medium text-gray-700">
                                Site Name
                            </label>
                            <div className="text-sm text-gray-800">The name of your application</div>
                            <InputText
                                id="site_name"
                                name="site_name"
                                required
                                value={siteName}
                                onChange={(e) => setSiteName(e.target.value)}
                                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                placeholder="Enter your site name"
                            />
                        </div>
                    </div>

                    {/* Timezone Input */}
                    <div className="flex justify-end">
                        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                            <label htmlFor="timezone" className="block text-md font-medium text-gray-700">
                                Timezone
                            </label>
                            <div className="text-sm text-gray-800">Default timezone for the application</div>
                            <InputText
                                id="timezone"
                                name="timezone"
                                required
                                value={timezone}
                                onChange={(e) => setTimezone(e.target.value)}
                                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                placeholder="Enter your timezone"
                            />
                        </div>
                    </div>

                    {/* Maintenance Mode (Switch) */}
                    <div className="flex justify-end">
                        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                            <label htmlFor="maintenance_mode" className="block text-md font-medium text-gray-700">
                                Maintenance Mode
                            </label>
                            <div className="text-sm text-gray-800">Toggle to enable or disable maintenance mode</div>
                            <InputSwitch
                                id="maintenance_mode"
                                name="maintenance_mode"
                                checked={maintenanceMode}
                                onChange={(e) => setMaintenanceMode(e.value)}
                                className="mt-1"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-4 flex justify-end">
                        <Button label="Save Settings" type="submit" className="bg-primary p-2 text-white rounded-lg" />
                    </div>
                </form>
            </div>
        </div>
    );
}
