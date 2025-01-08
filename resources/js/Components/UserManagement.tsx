import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Swal from 'sweetalert2';
import { InputSwitch } from 'primereact/inputswitch';
import axios from 'axios';  // Import axios to make HTTP requests
import { Dropdown } from 'primereact/dropdown';

export default function NotificationSettings() {
    // State to manage input values
    const [defualtUserRole, setDefualtUserRole] = useState('customer');
    const [allowUserRegisteration, setAllowUserRegisteration] = useState(false);
    const [userPasswordPinLength, setUserPasswordPinLength] = useState(false);


    // Fetch notification settings from the backend (Laravel)
    useEffect(() => {
        axios.get('/api/settings/users')
            .then((response) => {
                const settings = response.data;
                setDefualtUserRole(settings.default_user_role || 'user');
                setAllowUserRegisteration(settings.allow_user_registration || false);
                setUserPasswordPinLength(settings.user_password_min_length || '8');
            })
            .catch((error) => {
                console.error("There was an error fetching the notification settings:", error);
            });
    }, []);

    // Function to handle the form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Send the updated settings to the backend
        axios.post('/api/settings/users/update', {
            default_user_role: defualtUserRole,
            allow_user_registration: allowUserRegisteration,
            user_password_min_length: userPasswordPinLength,
        })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Settings Saved',
                    text: 'Your notification settings have been updated successfully.',
                });
            })
            .catch((error) => {
                console.error('Error updating settings:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'There was an issue saving your notification settings.',
                });
            });
    };

    return (
        <div>
            <h2>Users Settings</h2>
            <p>Manage how notifications are sent in your application.</p>

            <div>
                <form onSubmit={handleSubmit}>

                    {/* SMTP Settings for Email Notifications */}
                    {allowUserRegisteration && (
                        <div className="flex justify-end">
                            <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                                <label htmlFor="allow_user_registration" className="block text-md font-medium text-gray-700">
                                    Allow User Registration
                                </label>
                                <div className="text-sm text-gray-800">Allow user registration to system</div>
                                <InputSwitch
                                    id="allow_user_registration"
                                    name="allow_user_registration"
                                    checked={allowUserRegisteration}
                                    onChange={(e) => setAllowUserRegisteration(e.target.value)}
                                    className="mt-1"
                                    placeholder="Enter SMTP server"
                                />
                            </div>
                        </div>
                    )}

                    {/* Notifications Enabled (Switch) */}
                    {defualtUserRole && (
                        <div className="flex justify-end">
                            <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                                <label htmlFor="default_user_role" className="block text-md font-medium text-gray-700">
                                    Default user role
                                </label>
                                <div className="text-sm text-gray-800">The default user role</div>
                                <Dropdown
                                    id="default_user_role"
                                    name="default_user_role"
                                    options={['customer', 'admin', 'stuff']}
                                    value={defualtUserRole}
                                    onChange={(e) => setDefualtUserRole(e.value)}
                                    className="mt-1 rounded-lg w-full border border-gray-300"
                                />
                            </div>
                        </div>
                    )}

                    {/* Email Sender */}
                    {userPasswordPinLength && (
                        <div className="flex justify-end">
                            <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                                <label htmlFor="email_sender" className="block text-md font-medium text-gray-700">
                                    User Password Min Length
                                </label>
                                <div className="text-sm text-gray-800">The user password min length</div>
                                <InputText
                                    id="user_password_min_length"
                                    name="user_password_min_length"
                                    value={userPasswordPinLength}
                                    onChange={(e) => setUserPasswordPinLength(e.target.value)}
                                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                    placeholder="User Password Min Length"
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
