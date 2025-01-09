import React, { useState, useEffect } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import Swal from 'sweetalert2';
import { InputSwitch } from 'primereact/inputswitch';
import axios from 'axios';

export default function SecuritySettings() {
    // State to manage input values
    const [enableTwoFactorAuth, setEnableTwoFactorAuth] = useState(false);
    const [passwordPolicy, setPasswordPolicy] = useState({ min_length: 8, uppercase: 1, numbers: 1 });

    // Fetch settings from the backend (Laravel)
    useEffect(() => {
        axios
            .get('/api/settings/security')
            .then((response) => {
                const settings = response.data;

                setEnableTwoFactorAuth(!!settings.enable_two_factor_auth);

                const policy = settings.password_policy
                    ? JSON.parse(settings.password_policy)
                    : { min_length: 8, uppercase: 1, numbers: 1 };

                setPasswordPolicy(policy);
            })
            .catch((error) => {
                console.error('Error fetching security settings:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Unable to load security settings.',
                });
            });
    }, []);

    // Function to handle the form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate password policy values
        if (
            passwordPolicy.min_length < 1 ||
            passwordPolicy.uppercase < 0 ||
            passwordPolicy.numbers < 0
        ) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Input',
                text: 'Password policy values must be valid and non-negative.',
            });
            return;
        }

        // Prepare the JSON policy for submission
        const policyJson = JSON.stringify(passwordPolicy);

        // Send the updated settings to the backend
        axios
            .post('/api/settings/security/update', {
                enable_two_factor_auth: enableTwoFactorAuth,
                password_policy: policyJson,
            })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Settings Saved',
                    text: 'Your security settings have been updated successfully.',
                });
            })
            .catch((error) => {
                console.error('Error updating security settings:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'There was an issue saving your security settings.',
                });
            });
    };

    return (
        <div>
            <h2>Security Settings</h2>
            <p>Manage security settings for your application.</p>

            <form onSubmit={handleSubmit}>
                {/* Enable Two-Factor Authentication Switch */}
                <div className="flex justify-end">
                    <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                        <label htmlFor="enable_two_factor_auth" className="block text-md font-medium text-gray-700">
                            Enable Two-Factor Authentication
                        </label>
                        <div className="text-sm text-gray-800">
                            Enable two-factor authentication for enhanced security.
                        </div>
                        <InputSwitch
                            id="enable_two_factor_auth"
                            checked={enableTwoFactorAuth}
                            onChange={(e) => setEnableTwoFactorAuth(e.value)}
                        />
                    </div>
                </div>

                {/* Password Policy Input */}
                <div className="flex justify-end">
                    <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                        <label htmlFor="password_policy" className="block text-md font-medium text-gray-700">
                            Password Policy
                        </label>
                        <div className="text-sm text-gray-800">Configure the password policy requirements.</div>

                        <div className="mt-4">
                            <label className="block mb-1">Minimum Length</label>
                            <InputNumber
                                value={passwordPolicy.min_length}
                                onValueChange={(e) =>
                                    setPasswordPolicy((prev) => ({ ...prev, min_length: e.value }))
                                }
                                className="w-full"
                                placeholder="Minimum Length"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block mb-1">Minimum Uppercase Characters</label>
                            <InputNumber
                                value={passwordPolicy.uppercase}
                                onValueChange={(e) =>
                                    setPasswordPolicy((prev) => ({ ...prev, uppercase: e.value }))
                                }
                                className="w-full"
                                placeholder="Uppercase Characters"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block mb-1">Minimum Numbers</label>
                            <InputNumber
                                value={passwordPolicy.numbers}
                                onValueChange={(e) =>
                                    setPasswordPolicy((prev) => ({ ...prev, numbers: e.value }))
                                }
                                className="w-full"
                                placeholder="Numbers"
                            />
                        </div>
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
