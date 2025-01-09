import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from 'primereact/inputswitch';
import { Button } from 'primereact/button';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function AccessControlSettings() {
    const [enableAccessControl, setEnableAccessControl] = useState(true);
    const [defaultRole, setDefaultRole] = useState('');
    const [sessionTimeout, setSessionTimeout] = useState(30);

    // Fetch access control settings
    useEffect(() => {
        axios
            .get('/api/settings/access-control')
            .then((response) => {
                const settings = response.data;
                setEnableAccessControl(!!settings.enable_access_control);
                setDefaultRole(settings.default_role || 'user');
                setSessionTimeout(settings.session_timeout || 30);
            })
            .catch((error) => {
                console.error('Error fetching access control settings:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Unable to load access control settings.',
                });
            });
    }, []);

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post('/api/settings/access-control/update', {
                enable_access_control: enableAccessControl,
                default_role: defaultRole,
                session_timeout: sessionTimeout,
            })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Settings Saved',
                    text: 'Access control settings updated successfully.',
                });
            })
            .catch((error) => {
                console.error('Error updating access control settings:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to save access control settings.',
                });
            });
    };

    return (
        <div>
            <h2>Access Control Settings</h2>
            <p>Configure global access control settings.</p>

            <form onSubmit={handleSubmit}>
                {/* Enable Access Control */}
                {/* <div className="flex justify-end">
                    <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                        <label htmlFor="enable_access_control" className="block text-md font-medium text-gray-700">
                            Enable Access Control
                        </label>
                        <div className="text-sm text-gray-800">
                            Toggle to enable or disable global access control.
                        </div>
                        <InputSwitch
                            id="enable_access_control"
                            checked={enableAccessControl}
                            onChange={(e) => setEnableAccessControl(e.value)}
                        />
                    </div>
                </div> */}

                {/* Default Role */}
                {/* <div className="flex justify-end">
                    <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                        <label htmlFor="default_role" className="block text-md font-medium text-gray-700">
                            Default Role for New Users
                        </label>
                        <InputText
                            id="default_role"
                            value={defaultRole}
                            onChange={(e) => setDefaultRole(e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                            placeholder="Default Role (e.g., user)"
                        />
                    </div>
                </div> */}

                {/* Session Timeout */}
                <div className="flex justify-end">
                    <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                        <label htmlFor="session_timeout" className="block text-md font-medium text-gray-700">
                            Session Timeout (minutes)
                        </label>
                        <InputText
                            id="session_timeout"
                            type="number"
                            value={sessionTimeout}
                            onChange={(e) => setSessionTimeout(e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                            placeholder="Session Timeout"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-4 flex justify-end">
                    <Button label="Save Settings" type="submit" className="bg-primary text-white p-2 rounded-lg" />
                </div>
            </form>
        </div>
    );
}
