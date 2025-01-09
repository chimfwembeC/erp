import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from 'primereact/inputswitch';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function IntegrationSettings() {
    const [settings, setSettings] = useState({
        api_key: '',
        third_party_integration_enabled: false,

        // Authentication
        oauth_google_enabled: false,
        oauth_github_enabled: false,

        // Communication
        email_service_provider: 'smtp',
        sms_service_provider: '',

        // Monitoring and Error Reporting
        error_reporting_enabled: false,
        error_reporting_tool: '',

        // Analytics
        analytics_enabled: false,
        analytics_tool: 'matomo',

        // Storage
        storage_driver: 'local',
        storage_max_size: 10485760,

        // Security
        firewall_enabled: false,
        captcha_enabled: false,

        // Open-Source Integrations
        openai_enabled: false,
        openai_api_key: '',
        chatbot_enabled: false,
    });

    // Fetch integration settings
    useEffect(() => {
        axios
            .get('/api/settings/integrations')
            .then((response) => {
                const fetchedSettings = response.data;
                setSettings((prev) => ({
                    ...prev,
                    ...fetchedSettings,
                }));
            })
            .catch((error) => {
                console.error('Error fetching integration settings:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Unable to load integration settings.',
                });
            });
    }, []);

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post('/api/settings/integrations/update', settings)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Settings Saved',
                    text: 'Integration settings updated successfully.',
                });
            })
            .catch((error) => {
                console.error('Error updating integration settings:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to save integration settings.',
                });
            });
    };

    // Render input fields for settings
    return (
        <div>
            <h2>Integration Settings</h2>
            <p>Manage integration and configuration settings.</p>

            <form onSubmit={handleSubmit}>
                {/* API Key */}
                <SettingInputText
                    label="API Key"
                    value={settings.api_key}
                    onChange={(value) => setSettings((prev) => ({ ...prev, api_key: value }))}
                />

                {/* Enable Third-Party Integration */}
                <SettingInputSwitch
                    label="Enable Third-Party Integration"
                    checked={settings.third_party_integration_enabled}
                    onChange={(value) => setSettings((prev) => ({ ...prev, third_party_integration_enabled: value }))}
                />

                {/* Authentication */}
                <SettingInputSwitch
                    label="Enable Google OAuth"
                    checked={settings.oauth_google_enabled}
                    onChange={(value) => setSettings((prev) => ({ ...prev, oauth_google_enabled: value }))}
                />
                <SettingInputSwitch
                    label="Enable GitHub OAuth"
                    checked={settings.oauth_github_enabled}
                    onChange={(value) => setSettings((prev) => ({ ...prev, oauth_github_enabled: value }))}
                />

                {/* Communication */}
                <SettingInputText
                    label="Email Service Provider"
                    value={settings.email_service_provider}
                    onChange={(value) => setSettings((prev) => ({ ...prev, email_service_provider: value }))}
                />
                <SettingInputText
                    label="SMS Service Provider"
                    value={settings.sms_service_provider}
                    onChange={(value) => setSettings((prev) => ({ ...prev, sms_service_provider: value }))}
                />

                {/* Monitoring and Error Reporting */}
                <SettingInputSwitch
                    label="Enable Error Reporting"
                    checked={settings.error_reporting_enabled}
                    onChange={(value) => setSettings((prev) => ({ ...prev, error_reporting_enabled: value }))}
                />
                <SettingInputText
                    label="Error Reporting Tool"
                    value={settings.error_reporting_tool}
                    onChange={(value) => setSettings((prev) => ({ ...prev, error_reporting_tool: value }))}
                />

                {/* Analytics */}
                <SettingInputSwitch
                    label="Enable Analytics"
                    checked={settings.analytics_enabled}
                    onChange={(value) => setSettings((prev) => ({ ...prev, analytics_enabled: value }))}
                />
                <SettingInputText
                    label="Analytics Tool"
                    value={settings.analytics_tool}
                    onChange={(value) => setSettings((prev) => ({ ...prev, analytics_tool: value }))}
                />

                {/* Storage */}
                <SettingInputText
                    label="Storage Driver"
                    value={settings.storage_driver}
                    onChange={(value) => setSettings((prev) => ({ ...prev, storage_driver: value }))}
                />
                <SettingInputNumber
                    label="Storage Max Size (bytes)"
                    value={settings.storage_max_size}
                    onChange={(value) => setSettings((prev) => ({ ...prev, storage_max_size: value }))}
                />

                {/* Security */}
                <SettingInputSwitch
                    label="Enable Firewall"
                    checked={settings.firewall_enabled}
                    onChange={(value) => setSettings((prev) => ({ ...prev, firewall_enabled: value }))}
                />
                <SettingInputSwitch
                    label="Enable CAPTCHA"
                    checked={settings.captcha_enabled}
                    onChange={(value) => setSettings((prev) => ({ ...prev, captcha_enabled: value }))}
                />

                {/* Open-Source Integrations */}
                <SettingInputSwitch
                    label="Enable OpenAI Integration"
                    checked={settings.openai_enabled}
                    onChange={(value) => setSettings((prev) => ({ ...prev, openai_enabled: value }))}
                />
                <SettingInputText
                    label="OpenAI API Key"
                    value={settings.openai_api_key}
                    onChange={(value) => setSettings((prev) => ({ ...prev, openai_api_key: value }))}
                />
                <SettingInputSwitch
                    label="Enable Chatbot Integration"
                    checked={settings.chatbot_enabled}
                    onChange={(value) => setSettings((prev) => ({ ...prev, chatbot_enabled: value }))}
                />

                {/* Submit Button */}
                <div className="mt-4 flex justify-end">
                    <Button label="Save Settings" type="submit" className="bg-primary text-white p-2 rounded-lg" />
                </div>
            </form>
        </div>
    );
}

// Helper Components for Reusability
const SettingInputText = ({ label, value, onChange }) => (
    <div className="flex justify-end">
        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
            <label className="block text-md font-medium text-gray-700">{label}</label>
            <InputText
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                placeholder={`Enter ${label}`}
            />
        </div>
    </div>
);

const SettingInputSwitch = ({ label, checked, onChange }) => (
    <div className="flex justify-end">
        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
            <label className="block text-md font-medium text-gray-700">{label}</label>
            <InputSwitch checked={checked} onChange={(e) => onChange(e.value)} />
        </div>
    </div>
);

const SettingInputNumber = ({ label, value, onChange }) => (
    <div className="flex justify-end">
        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
            <label className="block text-md font-medium text-gray-700">{label}</label>
            <InputNumber
                value={value}
                onValueChange={(e) => onChange(e.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            />
        </div>
    </div>
);
