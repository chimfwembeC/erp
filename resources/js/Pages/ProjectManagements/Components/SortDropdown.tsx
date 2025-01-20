import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const sortOptions = [
    { label: 'Name', value: 'name' },
    { label: 'Newest', value: 'newest' },
    { label: 'Recently Updated', value: 'recently_updated' },
    { label: 'Lately Updated', value: 'lately_updated' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Date', value: 'date' },
];

const SortDropdown: React.FC<{ onSortChange: (value: string) => void }> = ({ onSortChange }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Toggle the dropdown visibility
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Close the dropdown when clicking outside
    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    // Detect click outside the dropdown
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            closeDropdown();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className={`hover:bg-gray-200 dark:hover:bg-gray-600 text-sm flex justify-start items-center gap-1 p-2 rounded-md ${dropdownOpen ? "bg-gray-200 dark:bg-gray-600" : ""}`}
                onClick={toggleDropdown}
            >
                Sort <ChevronDown size={20} />
            </button>

            {dropdownOpen && (
                <div className="absolute mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg right-0 rounded-lg w-56 py-2 z-50">
                    {sortOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => {
                                onSortChange(option.value);
                                closeDropdown(); // Close dropdown after selection
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-indigo-500"
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SortDropdown;
