import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const sortOptions = [
    { label: 'Name', value: 'name' },
    { label: 'Newest', value: 'newest' },
    { label: 'Recently Updated', value: 'recently_updated' },
    { label: 'Lately Updated', value: 'lately_updated' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Date', value: 'date' },
];

const SortDropdown: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState<string>(''); // Track selected sort value
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Toggle the dropdown visibility
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Close the dropdown when clicking outside
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

    // Handle sort option change
    const handleSortChange = (value: string) => {
        setSelectedSort(value); // Update the selected sort value
        closeDropdown(); // Close the dropdown after selection
        // Add your sorting logic here
        console.log('Sorting by:', value); // Example of sorting action
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="hover:bg-gray-200 dark:hover:bg-gray-600 text-sm flex justify-start items-center gap-1 p-2 rounded-md"
                onClick={toggleDropdown}
            >
                Sort <ChevronDown size={20} />
            </button>

            {dropdownOpen && (
                <div className="absolute mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg right-0 rounded-lg w-56 py-2 z-50">
                    {sortOptions.map((option, index) => (
                        <button
                            key={index}
                            className={`block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-indigo-500 ${selectedSort === option.value ? 'bg-gray-100 dark:bg-indigo-500' : ''}`}
                            onClick={() => handleSortChange(option.value)}
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
