import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Dropdown } from 'primereact/dropdown';
import { Editor } from 'primereact/editor';

export default function CustomizationSettings() {
    const [brandingLogo, setBrandingLogo] = useState('');
    const [brandingFavicon, setBrandingFavicon] = useState('');
    const [uiPrimaryColor, setUiPrimaryColor] = useState('blue-100');
    const [uiSecondaryColor, setUiSecondaryColor] = useState('yellow-100');
    const [uiNeutralColor, setUiNeutralColor] = useState('gray-100');
    const [uiFontFamily, setUiFontFamily] = useState('Arial, sans-serif');
    const [enableDarkMode, setEnableDarkMode] = useState(true);
    const [uiLayoutType, setUiLayoutType] = useState('fixed');
    const [showFooter, setShowFooter] = useState(true);
    const [footerText, setFooterText] = useState('My Application. All rights reserved.');
    const [enableCustomCss, setEnableCustomCss] = useState(true);
    const [customCssPath, setCustomCssPath] = useState('uploads/custom.css');
    const [enableCustomJs, setEnableCustomJs] = useState(true);
    const [customJsPath, setCustomJsPath] = useState('uploads/custom.js');

    useEffect(() => {
        // Fetch current customization settings from the backend
        axios.get('/api/settings/customization')
            .then(response => {
                const data = response.data;
                setBrandingLogo(data.branding_logo);
                setBrandingFavicon(data.branding_favicon);
                setUiPrimaryColor(data.ui_primary_color);
                setUiSecondaryColor(data.ui_secondary_color);
                setUiNeutralColor(data.ui_neutral_color);
                setUiFontFamily(data.ui_font_family);
                setEnableDarkMode(data.enable_dark_mode === '1');
                setUiLayoutType(data.ui_layout_type);
                setShowFooter(data.show_footer === '1');
                setFooterText(data.footer_text);
                setEnableCustomCss(data.enable_custom_css === '1');
                setCustomCssPath(data.custom_css_path);
                setEnableCustomJs(data.enable_custom_js === '1');
                setCustomJsPath(data.custom_js_path);
            })
            .catch(error => {
                console.error("Error fetching customization settings:", error);
            });
    }, []);

    const handleFileChange = async (event, fileType) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append(fileType, file);

            try {
                const response = await axios.post('/api/settings/upload-files', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data[fileType]) {
                    // Update the state with the uploaded file URL
                    if (fileType === 'branding_logo') setBrandingLogo(response.data[fileType]);
                    if (fileType === 'branding_favicon') setBrandingFavicon(response.data[fileType]);
                    if (fileType === 'custom_css_path') setCustomCssPath(response.data[fileType]);
                    if (fileType === 'custom_js_path') setCustomJsPath(response.data[fileType]);
                }

            } catch (error) {
                console.error('Error uploading file:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Upload Failed',
                    text: 'There was an issue uploading the file.',
                });
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Send updated customization settings to the backend
        axios.post('/api/settings/customization/update', {
            branding_logo: brandingLogo,
            branding_favicon: brandingFavicon,
            ui_primary_color: uiPrimaryColor,
            ui_secondary_color: uiSecondaryColor,
            ui_neutral_color: uiNeutralColor,
            ui_font_family: uiFontFamily,
            enable_dark_mode: enableDarkMode ? '1' : '0',
            ui_layout_type: uiLayoutType,
            show_footer: showFooter ? '1' : '0',
            footer_text: footerText,
            enable_custom_css: enableCustomCss ? '1' : '0',
            custom_css_path: customCssPath,
            enable_custom_js: enableCustomJs ? '1' : '0',
            custom_js_path: customJsPath
        })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Customization Settings Saved',
                    text: 'Your customization settings have been updated successfully.',
                });
            })
            .catch((error) => {
                console.error('Error saving customization settings:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'There was an issue saving your customization settings.',
                });
            });
    };

    // Color palettes
    const colorPalettes = {
        primary: ['blue-100', 'blue-200', 'blue-300', 'blue-400', 'blue-500', 'blue-600', 'blue-700', 'blue-800', 'blue-900'],
        secondary: ['yellow-100', 'yellow-200', 'yellow-300', 'yellow-400', 'yellow-500', 'yellow-600', 'yellow-700', 'yellow-800', 'yellow-900'],
        neutral: ['gray-100', 'gray-200', 'gray-300', 'gray-400', 'gray-500', 'gray-600', 'gray-700', 'gray-800', 'gray-900'],
    };




    return (
        <div>
            <h2>Customization Settings</h2>
            <p>Customize the appearance and branding of your application.</p>

            <form onSubmit={handleSubmit}>
                {/* Branding Logo */}
                <div className="flex justify-end">
                    <div className="w-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-4 rounded-lg shadow-md my-4">
                        {brandingLogo && (
                            <div className="w-48 h-48 rounded-2xl dark:bg-gray-600 border border-gray-200 dark:border-gray-600">
                                <img src={brandingLogo} className='h-48 h-48' alt="Brand Logo" />
                            </div>
                        )}
                        <label htmlFor="branding_logo" className="block text-md font-medium text-gray-700 dark:text-gray-200">
                            Branding Logo
                        </label>
                        <input
                            type="file"
                            id="branding_logo"
                            onChange={(e) => handleFileChange(e, 'branding_logo')}
                            className="w-full p-2 mt-1 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md"
                        />

                        <input
                            type="text"
                            id="branding_logo"
                            value={brandingLogo}
                            disabled
                            className="w-full p-2 mt-1  dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md"
                        />
                    </div>
                </div>

                {/* Branding Favicon */}
                <div className="flex justify-end">
                    <div className="w-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-4 rounded-lg shadow-md my-4">
                        {brandingFavicon && (
                            <div className="w-24 h-24 rounded-2xl dark:bg-gray-600 border border-gray-200 dark:border-gray-600">
                                <img src={brandingFavicon} className='h-24 w-24' alt="Brand Favicon" />
                            </div>
                        )}
                        <label htmlFor="branding_favicon" className="block text-md font-medium text-gray-700 dark:text-gray-200">
                            Branding Favicon
                        </label>
                        <input
                            type="file"
                            id="branding_favicon"
                            onChange={(e) => handleFileChange(e, 'branding_favicon')}
                            className="w-full p-2 mt-1  dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md"
                        />

                        <input
                            type="text"
                            id="branding_favicon"
                            value={brandingFavicon}
                            disabled
                            readOnly
                            className="w-full p-2 mt-1 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md"
                        />
                    </div>
                </div>


                <div className="space-y-6">
                    {/* UI Primary Color */}
                    <div className="flex justify-end">
                        <div className="w-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-4 rounded-lg shadow-md my-4">
                            <label htmlFor="ui_primary_color" className="block text-md font-medium text-gray-700 dark:text-gray-200">
                                UI Primary Color
                            </label>
                            <div className="flex space-x-2">
                                {colorPalettes.primary.map((shade) => (
                                    <div
                                        key={shade}
                                        onClick={() => setUiPrimaryColor(shade)}
                                        className={`w-12 h-12 rounded-lg cursor-pointer transition-all duration-300 ease-in-out bg-${shade} ${uiPrimaryColor === shade ? 'ring-4 ring-blue-500' : 'hover:ring-2 hover:ring-gray-300'
                                            }`}
                                    ></div>
                                ))}
                            </div>
                            {/* Display the Selected Primary Color */}
                            <div className="mt-4">
                                <p className="text-md font-medium">Selected Primary Color:</p>
                                <div className={`w-24 h-24 mt-2 rounded-lg bg-${uiPrimaryColor || 'bg-white'}`}></div>
                            </div>
                        </div>
                    </div>

                    {/* UI Secondary Color */}
                    <div className="flex justify-end">
                        <div className="w-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-4 rounded-lg shadow-md my-4">
                            <label htmlFor="ui_secondary_color" className="block text-md font-medium text-gray-700 dark:text-gray-200">
                                UI Secondary Color
                            </label>
                            <div className="flex space-x-2">
                                {colorPalettes.secondary.map((shade) => (
                                    <div
                                        key={shade}
                                        onClick={() => setUiSecondaryColor(shade)}
                                        className={`w-12 h-12 rounded-lg cursor-pointer transition-all duration-300 ease-in-out bg-${shade} ${uiSecondaryColor === shade ? 'ring-4 ring-blue-500' : 'hover:ring-2 hover:ring-gray-300'
                                            }`}
                                    ></div>
                                ))}
                            </div>
                            {/* Display the Selected Secondary Color */}
                            <div className="mt-4">
                                <p className="text-md font-medium">Selected Secondary Color:</p>
                                <div className={`w-24 h-24 mt-2 rounded-lg bg-${uiSecondaryColor || 'bg-white'}`}></div>
                            </div>
                        </div>
                    </div>

                    {/* UI Neutral Color */}
                    <div className="flex justify-end">
                        <div className="w-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-4 rounded-lg shadow-md my-4">
                            <label htmlFor="ui_neutral_color" className="block text-md font-medium text-gray-700 dark:text-gray-200">
                                UI Neutral Color
                            </label>
                            <div className="flex space-x-2">
                                {colorPalettes.neutral.map((shade) => (
                                    <div
                                        key={shade}
                                        onClick={() => setUiNeutralColor(shade)}
                                        className={`w-12 h-12 rounded-lg cursor-pointer transition-all duration-300 ease-in-out bg-${shade} ${uiNeutralColor === shade ? 'ring-4 ring-blue-500' : 'hover:ring-2 hover:ring-gray-300'
                                            }`}
                                    ></div>
                                ))}
                            </div>
                            {/* Display the Selected Neutral Color */}
                            <div className="mt-4">
                                <p className="text-md font-medium">Selected Neutral Color:</p>
                                <div className={`w-24 h-24 mt-2 rounded-lg bg-${uiNeutralColor || 'bg-white'}`}></div>
                            </div>
                        </div>
                    </div>
                </div>




                {/* Enable Dark Mode */}
                <div className="flex justify-end">
                    <div className="w-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-4 rounded-lg shadow-md my-4">
                        <label htmlFor="enable_dark_mode" className="block text-md font-medium text-gray-700 dark:text-gray-200">
                            Enable Dark Mode
                        </label>
                        <InputSwitch
                            id="enable_dark_mode"
                            checked={enableDarkMode}
                            onChange={(e) => setEnableDarkMode(e.value)}
                            className="mt-1"
                        />
                    </div>
                </div>

                {/* UI Layout Type */}
                {/* <div className="flex justify-end">
                    <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                        <label htmlFor="ui_layout_type" className="block text-md font-medium text-gray-700">
                            UI Layout Type
                        </label>
                        <Dropdown
                            id="ui_layout_type"
                            value={uiLayoutType}
                            onChange={(e) => setUiLayoutType(e.value)}
                            options={[
                                { label: 'Fixed', value: 'fixed' },
                                { label: 'Fluid', value: 'fluid' },
                            ]}
                            className="w-full border border-gray-300 rounded-lg mt-1"
                        />
                    </div>
                </div> */}

                {/* Show Footer */}
                <div className="flex justify-end">
                    <div className="w-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-4 rounded-lg shadow-md my-4">
                        <label htmlFor="show_footer" className="block text-md font-medium text-gray-700 dark:text-gray-200">
                            Show Footer
                        </label>
                        <InputSwitch
                            id="show_footer"
                            checked={showFooter}
                            onChange={(e) => setShowFooter(e.value)}
                            className="mt-1"
                        />
                    </div>
                </div>

                {/* Footer Text */}
                <div className="flex justify-end">
                    <div className="w-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-4 rounded-lg shadow-md my-4">
                        <label htmlFor="footer_text" className="block text-md font-medium text-gray-700 dark:text-gray-200">
                            Footer Text
                        </label>
                        <InputText
                            id="footer_text"
                            value={footerText}
                            onChange={(e) => setFooterText(e.target.value)}
                            className="w-full mt-1 p-2 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md"
                        />
                    </div>
                </div>

                {/* Enable Custom CSS */}
                {/* <div className="flex justify-end">
                    <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                        <label htmlFor="enable_custom_css" className="block text-md font-medium text-gray-700">
                            Enable Custom CSS
                        </label>
                        <InputSwitch
                            id="enable_custom_css"
                            checked={enableCustomCss}
                            onChange={(e) => setEnableCustomCss(e.value)}
                            className=" mt-1"
                        />
                    </div>
                </div> */}

                {/* Custom CSS Path */}
                {/* <div className="flex justify-end">
                    <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                        <label htmlFor="custom_css_path" className="block text-md font-medium text-gray-700">
                            Custom CSS
                        </label>
                        <input
                            type="file"
                            id="custom_css_path"
                            onChange={(e) => handleFileChange(e, 'custom_css_path')}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                        />
                        <input
                            type="text"
                            id="custom_css_path"
                            value={customCssPath}
                            disabled
                            onChange={(e) => setCustomCssPath(e.target.value)}
                            className="w-full p-2 mt-1 bg-gray-300 rounded-md"
                        />
                    </div>
                </div> */}

                {/* Enable Custom JS */}
                {/* <div className="flex justify-end">
                    <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                        <label htmlFor="enable_custom_js" className="block text-md font-medium text-gray-700">
                            Enable Custom JS
                        </label>

                        <InputSwitch
                            id="enable_custom_js"
                            checked={enableCustomJs}
                            onChange={(e) => setEnableCustomJs(e.value)}
                            className="mt-1"
                        />
                    </div>
                </div> */}


                {/* Custom JS Path */}
                {/* <div className="flex justify-end">
                    <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                        <label htmlFor="custom_js_path" className="block text-md font-medium text-gray-700">
                            Custom JS Path
                        </label>
                        <input
                            type="file"
                            id="custom_js_path"
                            onChange={(e) => handleFileChange(e, 'custom_js_path')}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                        />
                        <input
                            type="text"
                            id="custom_js_path"
                            value={customJsPath}
                            disabled
                            onChange={(e) => setCustomJsPath(e.target.value)}
                            className="w-full p-2 mt-1 bg-gray-300 rounded-md"
                        />
                    </div>
                </div> */}


                {/* Submit Button */}
                <div className="mt-4 flex justify-end">
                    <Button label="Save Settings" type="submit" className="bg-primary p-2 text-white rounded-lg" />
                </div>
            </form>
        </div>
    );
}
