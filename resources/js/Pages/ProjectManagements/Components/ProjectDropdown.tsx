import React, { useState, useRef } from 'react';
import { MoreHorizontalIcon, Edit, Trash } from 'lucide-react';
import { Toast } from 'primereact/toast';

const ProjectDropdown = ({ projectId }) => {
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
                className={`p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 ${dropdownOpen ? "bg-gray-200 dark:bg-gray-600" : ""}`}
                onClick={toggleDropdown}
            >
                <MoreHorizontalIcon size={20} />
            </button>

            {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600  rounded-md shadow-lg w-40 z-50">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                        <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-indigo-500"
                            onClick={handleEdit}
                        >
                            <Edit size={16} className="inline mr-2" /> Edit Details
                        </button>
                        <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-indigo-500"
                            onClick={handleDelete}
                        >
                            <Trash size={16} className="inline mr-2" /> Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDropdown;
