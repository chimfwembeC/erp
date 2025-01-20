import React, { useState, useEffect, useRef } from 'react';
import i18n from '../i18n';
import { Globe } from 'lucide-react';
import { Toast } from 'primereact/toast';

const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'bem', label: 'Bemba', flag: '🇿🇲' },
    { code: 'nya', label: 'Nyanja', flag: '🇿🇲' },
];

const LanguageSelector: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<string>(i18n.language);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const toastRef = useRef<any>(null);

    useEffect(() => {
        const handleLanguageChange = (lng: string) => {
            setSelectedLanguage(lng);
        };

        i18n.on('languageChanged', handleLanguageChange);

        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                closeDropdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
        closeDropdown();

        toastRef.current?.show({
            severity: 'success',
            summary: 'Language Changed',
            detail: `Language changed to ${languages.find((lang) => lang.code === lng)?.label}`,
            life: 3000,
        });
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <Toast ref={toastRef} position="bottom-right" />

            <button
                className={`text-gray-700 bg-white dark:bg-gray-600 dark:text-white p-2 flex items-center space-x-2 rounded-full focus:outline-none hover:bg-gray-100 ${dropdownOpen ? 'bg-gray-100' : ''}`}
                onClick={toggleDropdown}
            >
                <Globe size={24} />
                <span>{selectedLanguage.toUpperCase()}</span>
            </button>

            {dropdownOpen && (
                <div className="absolute right-0 top-16 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg w-40 py-2 z-50">
                    <h3 className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200">Languages</h3>
                    <div className="border-t dark:border-gray-600"></div>
                    {languages.map((lang, index) => (
                        <React.Fragment key={lang.code}>
                            <button
                                className={`block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-indigo-500 space-x-3 ${selectedLanguage === lang.code && 'bg-gray-100 dark:bg-indigo-500'}`}
                                onClick={() => changeLanguage(lang.code)}
                            >
                                <span>{lang.flag}</span>
                                <span>{lang.label}</span>
                            </button>

                            {/* Dynamically render border-t except for the last language */}
                            {index < languages.length - 1 && (
                                <div className="border-t dark:border-gray-600"></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
