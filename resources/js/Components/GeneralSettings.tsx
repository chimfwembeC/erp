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
    const [faceBookUrl, setFacebookUrl] = useState('');  // Separate state for facebook
    const [twitterUrl, setTwitter] = useState('');  // Separate state for facebook
    const [instagramUrl, setInstagramUrl] = useState('');  // Separate state for facebook
    const [lindedinUrl, setLinkedinUrl] = useState('');  // Separate state for facebook


    const [maintenanceMode, setMaintenanceMode] = useState(false);  // Maintenance Mode (Switch)

    // Fetch settings from the backend (Laravel)
    useEffect(() => {
        axios.get('/api/general/settings')
            .then((response) => {
                const settings = response.data;
                setSiteName(settings.site_name || '');
                setTimezone(settings.timezone || '');
                setMaintenanceMode(settings.maintenance_mode || false);
                setFacebookUrl(settings.site_facebook_url);
                setTwitter(settings.site_twitter_url);
                setInstagramUrl(settings.site_instagram_url);
                setLinkedinUrl(settings.site_linkedin_url);
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
            site_facebook_url: faceBookUrl,
            site_twitter_url: twitterUrl,
            site_linkedin_url: lindedinUrl,
            site_instagram_url: instagramUrl,
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
                        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-4 rounded-lg shadow-md my-4">
                            <label htmlFor="site_name" className="block text-md font-medium text-gray-700 dark:text-gray-200">
                                Site Name
                            </label>
                            <div className="text-sm text-gray-800 dark:text-gray-400">The name of your application</div>
                            <InputText
                                id="site_name"
                                name="site_name"
                                required
                                value={siteName}
                                onChange={(e) => setSiteName(e.target.value)}
                                className="w-full p-2 mt-1 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md"
                                placeholder="Enter your site name"
                            />
                        </div>
                    </div>

                    {/* Timezone Input */}
                    <div className="flex justify-end">
                        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-4 rounded-lg shadow-md my-4">
                            <label htmlFor="timezone" className="block text-md font-medium text-gray-700 dark:text-gray-200">
                                Timezone
                            </label>
                            <div className="text-sm text-gray-800 dark:text-gray-400">Default timezone for the application</div>
                            <InputText
                                id="timezone"
                                name="timezone"
                                required
                                value={timezone}
                                onChange={(e) => setTimezone(e.target.value)}
                                className="w-full p-2 mt-1  dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md"
                                placeholder="Enter your timezone"
                            />
                        </div>
                    </div>

                    {/* Maintenance Mode (Switch) */}
                    <div className="flex justify-end">
                        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-4 rounded-lg shadow-md my-4">
                            <label htmlFor="maintenance_mode" className="block text-md font-medium text-gray-700 dark:text-gray-200">
                                Maintenance Mode
                            </label>
                            <div className="text-sm text-gray-800 dark:text-gray-400">Toggle to enable or disable maintenance mode</div>
                            <InputSwitch
                                id="maintenance_mode"
                                name="maintenance_mode"
                                checked={maintenanceMode}
                                onChange={(e) => setMaintenanceMode(e.value)}
                                className="mt-1"
                            />
                        </div>
                    </div>

                    {/* Social Mode (Switch) */}
                    <div className="flex justify-end">
                        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-4 rounded-lg shadow-md my-4">
                            <div className="p-2 -m-4 rounded-t-lg bg-gray-200">
                                <label htmlFor="social_urls" className="block text-md font-medium text-gray-700 dark:text-gray-800">
                                    Social Urls
                                </label>
                                <div className="text-sm text-gray-800 dark:text-gray-600">Social media urls</div>
                            </div>

                            <div className="mt-6">
                                <label htmlFor="site_facebook_url" className="block text-md font-medium text-gray-700 dark:text-gray-200">
                                    Facebook
                                </label>
                                <InputText
                                    id="site_facebook_url"
                                    name="site_facebook_url"
                                    value={faceBookUrl}
                                    onChange={(e) => setFacebookUrl(e.target.value)}
                                    className="mt-1 text  dark:bg-gray-800 border border-gray-300 dark:border-gray-600 w-full rounded-lg"
                                />
                            </div>

                            <div className="mt-2">
                                <label htmlFor="site_twitter_url" className="block text-md font-medium text-gray-700 dark:text-gray-200">
                                    Twitter
                                </label>
                                <InputText
                                    id="site_twitter_url"
                                    name="site_twitter_url"
                                    value={twitterUrl}
                                    onChange={(e) => setTwitter(e.target.value)}
                                    className="mt-1 text  dark:bg-gray-800 border border-gray-300 dark:border-gray-600 w-full rounded-lg"
                                />
                            </div>

                            <div className="mt-2">
                                <label htmlFor="site_instagram_url" className="block text-md font-medium text-gray-700 dark:text-gray-200">
                                    Instagram
                                </label>
                                <InputText
                                    id="site_instagram_url"
                                    name="site_instagram_url"
                                    value={instagramUrl}
                                    onChange={(e) => setInstagramUrl(e.target.value)}
                                    className="mt-1 text  dark:bg-gray-800 border border-gray-300 dark:border-gray-600 w-full rounded-lg"
                                />
                            </div>

                            <div className="mt-2">
                                <label htmlFor="site_linkedin_url" className="block text-md font-medium text-gray-700 dark:text-gray-200">
                                    Linkedin
                                </label>
                                <InputText
                                    id="site_linkedin_url"
                                    name="site_linkedin_url"
                                    value={lindedinUrl}
                                    onChange={(e) => setLinkedinUrl(e.target.value)}
                                    className="mt-1 text  dark:bg-gray-800 border border-gray-300 dark:border-gray-600 w-full rounded-lg"
                                />
                            </div>
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
