import React, { useState, useEffect, useRef } from 'react';
import i18n from '../i18n';
import { Globe } from 'lucide-react';
import { Toast } from 'primereact/toast';

const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    // { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'bem', label: 'Bemba', flag: '🇿🇲' },
    { code: 'nya', label: 'Nyanja', flag: '🇿🇲' },
    { code: 'toi', label: 'Tonga', flag: '🇿🇲' },
    { code: 'loz', label: 'Lozi', flag: '🇿🇲' },
    { code: 'knd', label: 'Kaonde', flag: '🇿🇲' },
    { code: 'lun', label: 'Lunda', flag: '🇿🇲' },
    { code: 'lue', label: 'Luvale', flag: '🇿🇲' },
    { code: 'tum', label: 'Tumbuka', flag: '🇿🇲' },
];
const LanguageSelector: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<string>(i18n.language); // Initialize with i18n's current language
    const dropdownRef = useRef<HTMLDivElement>(null); // Reference to the dropdown element
    const toastRef = useRef<any>(null); // Reference for the Toast

    // Update the selected language in state when it changes in i18n
    useEffect(() => {
        const handleLanguageChange = (lng: string) => {
            setSelectedLanguage(lng);
        };

        i18n.on('languageChanged', handleLanguageChange);

        // Cleanup event listener on component unmount
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

    // Close dropdown when clicking outside
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
        localStorage.setItem('language', lng); // Save language preference in local storage
        closeDropdown(); // Close dropdown after selection

        // Show toast notification
        toastRef.current?.show({
            severity: 'success',
            summary: 'Language Changed',
            detail: `Language changed to ${languages.find((lang) => lang.code === lng)?.label}`,
            life: 3000,
        });
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* PrimeReact Toast */}
            <Toast ref={toastRef} />

            {/* Language Selector */}
            <button
                className="text-gray-700 flex items-center space-x-2 focus:outline-none"
                onClick={toggleDropdown}
            >
                <Globe size={24} />
                <span>{selectedLanguage.toUpperCase()}</span> {/* Display selected language */}
            </button>
            {dropdownOpen && (
                <div className="absolute right-0 top-10 bg-white shadow-lg rounded-lg w-48 py-2 z-50">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            className="flex items-center space-x-2 w-full text-left px-4 py-2 hover:bg-gray-200"
                            onClick={() => changeLanguage(lang.code)}
                        >
                            <span>{lang.flag}</span>
                            <span>{lang.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
