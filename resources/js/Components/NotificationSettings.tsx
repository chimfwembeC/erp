import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Swal from 'sweetalert2';
import { InputSwitch } from 'primereact/inputswitch';
import axios from 'axios';  // Import axios to make HTTP requests

export default function NotificationSettings() {
    // State to manage input values
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [notificationEmail, setNotificationEmail] = useState();
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [smtpServer, setSmtpServer] = useState('');
    const [smtpPort, setSmtpPort] = useState('');
    const [emailSender, setEmailSender] = useState('');

    // Fetch notification settings from the backend (Laravel)
    useEffect(() => {
        axios.get('/api/notification/settings')
            .then((response) => {
                const settings = response.data;
                setNotificationsEnabled(!!settings.notifications_enabled);
                setEmailNotifications(!!settings.sms_notifications_enabled);
                setNotificationEmail(settings.notification_email);
                setSmsNotifications(!!settings.email_notifications_enabled);
                setPushNotifications(!!settings.push_notifications);
                setSmtpServer(settings.smtp_server || '');
                setSmtpPort(settings.smtp_port || '');
                setEmailSender(settings.email_sender || '');
            })
            .catch((error) => {
                console.error("There was an error fetching the notification settings:", error);
            });
    }, []);

    // Function to handle the form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Send the updated settings to the backend
        axios.post('/api/notification/settings/update', {
            notifications_enabled: notificationsEnabled,
            email_notifications_enabled: emailNotifications,
            notification_email: notificationEmail,
            sms_notifications_enabled: smsNotifications,
            push_notifications: pushNotifications,
            smtp_server: smtpServer,
            smtp_port: smtpPort,
            email_sender: emailSender,
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
            <h2>Notification Settings</h2>
            <p>Manage how notifications are sent in your application.</p>

            <div>
                <form onSubmit={handleSubmit}>
                    {/* Notifications Enabled (Switch) */}
                    <div className="flex justify-end">
                        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                            <label htmlFor="notifications_enabled" className="block text-md font-medium text-gray-700">
                                Enable Notifications
                            </label>
                            <div className="text-sm text-gray-800">Toggle to enable or disable notifications</div>
                            <InputSwitch
                                id="notifications_enabled"
                                name="notifications_enabled"
                                checked={notificationsEnabled}
                                onChange={(e) => setNotificationsEnabled(e.value)}
                                className="mt-1"
                            />
                        </div>
                    </div>

                    {/* Email Notifications (Switch) */}
                    {notificationsEnabled && (
                        <>
                            <div className="flex justify-end">
                                <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                                    <label htmlFor="email_notifications" className="block text-md font-medium text-gray-700">
                                        Enable Email Notifications
                                    </label>
                                    <div className="text-sm text-gray-800">Toggle to enable or disable email notifications</div>
                                    <InputSwitch
                                        id="email_notifications"
                                        name="email_notifications"
                                        checked={emailNotifications}
                                        onChange={(e) => setEmailNotifications(e.value)}
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            {emailNotifications && (
                                <div className={`${emailNotifications ? 'p-4 border rounded-lg border-gray-300' : ''}`}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Notification Email Settings for Email Notifications */}
                                        <div className="bg-white p-4 rounded-lg shadow-md">
                                            <label htmlFor="notification_email" className="block text-md font-medium text-gray-700">
                                                Notification Email
                                            </label>
                                            <div className="text-sm text-gray-800">Toggle to enable or disable email notifications</div>
                                            <InputText
                                                id="notification_email"
                                                name="notification_email"
                                                type='email'
                                                placeholder="Enter Notification Email"
                                                required
                                                value={notificationEmail}
                                                onChange={(e) => setNotificationEmail(e.value)}
                                                className="mt-1 w-full rounded border border-gray-300"
                                            />
                                        </div>

                                        {/* SMTP Settings for Email Notifications */}
                                        <div className="bg-white p-4 rounded-lg shadow-md">
                                            <label htmlFor="smtp_server" className="block text-md font-medium text-gray-700">
                                                SMTP Server
                                            </label>
                                            <div className="text-sm text-gray-800">SMTP server for sending emails</div>
                                            <InputText
                                                id="smtp_server"
                                                name="smtp_server"
                                                value={smtpServer}
                                                onChange={(e) => setSmtpServer(e.target.value)}
                                                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                                placeholder="Enter SMTP server"
                                            />
                                        </div>

                                        {/* SMTP Port */}
                                        <div className="bg-white p-4 rounded-lg shadow-md">
                                            <label htmlFor="smtp_port" className="block text-md font-medium text-gray-700">
                                                SMTP Port
                                            </label>
                                            <div className="text-sm text-gray-800">Port for the SMTP server</div>
                                            <InputText
                                                id="smtp_port"
                                                name="smtp_port"
                                                value={smtpPort}
                                                onChange={(e) => setSmtpPort(e.target.value)}
                                                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                                placeholder="Enter SMTP port"
                                            />
                                        </div>

                                        {/* Email Sender */}
                                        <div className="bg-white p-4 rounded-lg shadow-md">
                                            <label htmlFor="email_sender" className="block text-md font-medium text-gray-700">
                                                Email Sender
                                            </label>
                                            <div className="text-sm text-gray-800">The default sender email address</div>
                                            <InputText
                                                id="email_sender"
                                                name="email_sender"
                                                value={emailSender}
                                                onChange={(e) => setEmailSender(e.target.value)}
                                                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                                placeholder="Enter sender email address"
                                            />
                                        </div>

                                    </div>
                                </div>
                            )}
                        </>
                    )}



                    {/* SMS Notifications (Switch) */}
                    {notificationsEnabled && (
                        <div className="flex justify-end">
                            <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                                <label htmlFor="sms_notifications" className="block text-md font-medium text-gray-700">
                                    Enable SMS Notifications
                                </label>
                                <div className="text-sm text-gray-800">Toggle to enable or disable SMS notifications</div>
                                <InputSwitch
                                    id="sms_notifications"
                                    name="sms_notifications"
                                    checked={smsNotifications}
                                    onChange={(e) => setSmsNotifications(e.value)}
                                    className="mt-1"
                                />
                            </div>
                        </div>
                    )}

                    {/* Push Notifications (Switch) */}
                    {notificationsEnabled && (
                        <div className="flex justify-end">
                            <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                                <label htmlFor="push_notifications" className="block text-md font-medium text-gray-700">
                                    Enable Push Notifications
                                </label>
                                <div className="text-sm text-gray-800">Toggle to enable or disable push notifications</div>
                                <InputSwitch
                                    id="push_notifications"
                                    name="push_notifications"
                                    checked={pushNotifications}
                                    onChange={(e) => setPushNotifications(e.value)}
                                    className="mt-1"
                                />
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="mt-4 mb-4 flex justify-end">
                        <Button label="Save Settings" type="submit" className="bg-primary p-2 text-white rounded-lg" />
                    </div>
                </form>
            </div>
        </div>
    );
}
