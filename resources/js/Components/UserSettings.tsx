import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Swal from 'sweetalert2';
import { InputSwitch } from 'primereact/inputswitch';
import axios from 'axios'; // Import axios to make HTTP requests
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';

export default function UserSettings() {
    // State to manage input values
    const [defaultUserRole, setDefaultUserRole] = useState('customer');
    const [allowUserRegistration, setAllowUserRegistration] = useState(false);
    const [userPasswordPinLength, setUserPasswordPinLength] = useState(8);

    const roleOptions = [
        { label: 'Customer', value: 'customer' },
        { label: 'Admin', value: 'admin' },
        { label: 'Staff', value: 'staff' },
    ];

    // Fetch settings from the backend (Laravel)
    useEffect(() => {
        axios.get('/api/settings/users')
            .then((response) => {
                const settings = response.data;
                setDefaultUserRole(settings.default_user_role || 'customer');
                setAllowUserRegistration(!!settings.allow_user_registration);
                setUserPasswordPinLength(settings.user_password_min_length || '8');
            })
            .catch((error) => {
                console.error('Error fetching user settings:', error);
            });
    }, []);

    // Function to handle the form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        if (isNaN(userPasswordPinLength) || userPasswordPinLength < 0) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Input',
                text: 'Password length must be a positive number.',
            });
            return;
        }

        // Send the updated settings to the backend
        axios.post('/api/settings/users/update', {
            default_user_role: defaultUserRole,
            allow_user_registration: allowUserRegistration,
            user_password_min_length: userPasswordPinLength,
        })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Settings Saved',
                    text: 'Your user settings have been updated successfully.',
                });
            })
            .catch((error) => {
                console.error('Error updating settings:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'There was an issue saving your user settings.',
                });
            });
    };

    return (
        <div>
            <h2>User Settings</h2>
            <p>Manage how users are registered and handled in your application.</p>

            <div>
                <form onSubmit={handleSubmit}>
                    {/* Allow User Registration Switch */}
                    <div className="flex justify-end">
                        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                            <label htmlFor="allow_user_registration" className="block text-md font-medium text-gray-700">
                                Allow User Registration
                            </label>
                            <div className="text-sm text-gray-800">Allow user registration to the system.</div>
                            <InputSwitch
                                id="allow_user_registration"
                                name="allow_user_registration"
                                checked={allowUserRegistration}
                                onChange={(e) => setAllowUserRegistration(e.value)}
                            />
                        </div>
                    </div>

                    {/* Default User Role Dropdown */}
                    <div className="flex justify-end">
                        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                            <label htmlFor="default_user_role" className="block text-md font-medium text-gray-700">
                                Default User Role
                            </label>
                            <div className="text-sm text-gray-800">The default user role assigned to new users.</div>
                            <Dropdown
                                id="default_user_role"
                                name="default_user_role"
                                options={roleOptions}
                                value={defaultUserRole}
                                onChange={(e) => setDefaultUserRole(e.value)}
                                className="mt-1 rounded-lg w-full border border-gray-300"
                            />
                        </div>
                    </div>

                    {/* User Password Min Length Input */}
                    <div className="flex justify-end">
                        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                            <label htmlFor="user_password_min_length" className="block text-md font-medium text-gray-700">
                                User Password Min Length
                            </label>
                            <div className="text-sm text-gray-800">The minimum length for user passwords.</div>
                            <InputNumber
                                id="user_password_min_length"
                                name="user_password_min_length"
                                value={userPasswordPinLength}
                                onChange={(e) => setUserPasswordPinLength(e.target.value)}
                                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                placeholder="User Password Min Length"
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
