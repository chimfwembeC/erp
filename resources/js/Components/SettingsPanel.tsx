import { Link, usePage } from '@inertiajs/react';  // Import usePage for active link detection
import React from 'react';
import { useTranslation } from 'react-i18next';

const SettingsPanel = ({ settings }) => {
    const { t } = useTranslation();
    const { url } = usePage();  // Get the current URL from the page

    console.log('url', url);
    return (

        <div className="sticky top-0 p-4 bg-white h-[calc(100vh-8rem)] rounded-lg border">
            <div className="text-xl mb-2">
                Settings
            </div>

            <div className="h-[calc(70vh)] overflow-y-auto">
                <ul className="space-y-4">
                    {settings.map((item) => (
                        <li key={item.labelKey} className="flex items-center">
                            {/* Check if the current URL matches the link's href */}
                            <Link
                                href={item.href}
                                className={`flex items-center w-full p-2 border-2 border-gray-100 hover:bg-gray-100 text-gray-800 rounded-lg transition-colors ${url === item.href ? 'bg-gray-100' : ''  // Add the active class
                                    }`}
                            >
                                {item.icon}
                                <span className="ml-3 text-md font-medium">{t(item.labelKey)}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SettingsPanel;
