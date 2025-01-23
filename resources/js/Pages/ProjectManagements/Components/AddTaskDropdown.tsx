import React, { useState, useRef } from 'react';
import { MoreHorizontalIcon, Edit, Trash, Inspect, PlusSquareIcon } from 'lucide-react';
import { Toast } from 'primereact/toast';
import { FaTasks } from 'react-icons/fa';

const AddTaskDropdown = ({ projectId }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const toastRef = useRef<any>(null);

    // Toggle the dropdown visibility
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Close the dropdown when clicking outside
    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            closeDropdown();
        }
    };

    // Handle edit details action
    const handleEdit = () => {
        console.log(`Editing project with ID: ${projectId}`);
        // Implement the edit logic (e.g., navigating to the edit page)
        closeDropdown();
        toastRef.current?.show({
            severity: 'info',
            summary: 'Editing Project',
            detail: `Project ${projectId} is being edited.`,
            life: 3000,
        });
    };

    // Handle delete project action
    const handleDelete = () => {
        console.log(`Deleting project with ID: ${projectId}`);
        // Implement the delete logic (e.g., show confirmation dialog)
        closeDropdown();
        toastRef.current?.show({
            severity: 'warn',
            summary: 'Project Deleted',
            detail: `Project ${projectId} has been deleted.`,
            life: 3000,
        });
    };

    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <Toast ref={toastRef} position="bottom-right" />

            <button
                type='button'
                onClick={toggleDropdown}
                className={`w-12 h-12 p-2 text-xs rounded-l-xl
                            hover:bg-indigo-500 hover:text-white
                            border-r border-gray-200 dark:border-gray-600
                            flex justify-center items-center bg-gray-200
                            dark:bg-gray-800 text-gray-400 dark:text-gray-200
                            ${dropdownOpen ? "bg-gray-200 dark:bg-gray-600" : ""}
                            `}
            >
                <PlusSquareIcon size={20} />
            </button>

            {dropdownOpen && (
                <div className="absolute left-0 -top-40 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600  rounded-md shadow-lg w-40 z-50">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                        <div className="px-4 mb-2">
                            <div className="text-xs">Default (create task)</div>
                        </div>
                        <div className="border-t border-gray-400 dark:border-gray-600"></div>
                        <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-indigo-500"
                            onClick={handleEdit}
                        >
                            <Inspect size={16} className="inline mr-2" /> Create Issue
                        </button>
                        <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-indigo-500"
                            onClick={handleDelete}
                        >
                            <FaTasks size={16} className="inline mr-2" /> Create Task
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddTaskDropdown;
