import React, { useState, useRef } from 'react';
import { MoreHorizontalIcon, Edit, Trash, PlusSquareIcon } from 'lucide-react';
import { Toast } from 'primereact/toast';
import Swal from 'sweetalert2';
import axios from 'axios';
import AddTaskDropdown from './AddTaskDropdown';

const AddTaskDropdownInput = ({ projectId }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const toastRef = useRef<any>(null);
    const [selectedType, setSelectedType] = useState('task'); // Default to 'task'
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        project_id: projectId,
        assignee_id: '',
        due_date: '',
        milestone_id: '',
    });
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

    // const handleOpenModal = () => {
    //     setIsModalOpen(true);
    // };

    // const handleCloseModal = () => {
    //     setIsModalOpen(false);
    //     setFormData({
    //         title: '',
    //         description: '',
    //         project_id: project.id,
    //         assignee_id: '',
    //         due_date: '',
    //         milestone_id: '',
    //     });
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const type = selectedType; // 'task' or 'issue'
            const result = await Swal.fire({
                title: "Create task?",
                text: 'Are you sure you want to create the task',
                icon: 'question',
                confirmButtonText: 'Yes',
                showCancelButton: true,
                cancelButtonText: 'No'
            });

            if (result.isConfirmed) {
                const response = await axios.post(`/projects/${projectId}/${type}s`, formData).then(() => (
                    Swal.fire({
                        title: 'Task created successfully',
                        icon: 'success',
                        position: 'bottom-left',
                        timer: 2000
                    })
                ));
                console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} created:`, response.data);

                // Update local state to reflect task status change
                // const updatedTasks = project.tasks.map(task =>
                //     task.id === taskId ? { ...task } : task
                // );

                // setTaskState({
                //     ...project,
                //     tasks: updatedTasks
                // })
            } else {
                Swal.fire({
                    title: 'Error while creating task',
                    icon: 'success',
                    position: 'bottom-left',
                    timer: 2000
                })
            }

            closeDropdown();

        } catch (error) {
            console.error('Failed to create:', error);
        }
    };

    // Handle edit details action
    // const handleEdit = () => {
    //     console.log(`Editing task with ID: ${taskId}`);
    //     // Implement the edit logic (e.g., navigating to the edit page)
    //     closeDropdown();
    //     toastRef.current?.show({
    //         severity: 'info',
    //         summary: 'Editing task',
    //         detail: `task ${taskId} is being edited.`,
    //         life: 3000,
    //     });
    // };

    // Handle delete task action
    // const handleDelete = () => {
    //     console.log(`Deleting task with ID: ${taskId}`);
    //     // Implement the delete logic (e.g., show confirmation dialog)
    //     closeDropdown();
    //     toastRef.current?.show({
    //         severity: 'warn',
    //         summary: 'task Deleted',
    //         detail: `task ${taskId} has been deleted.`,
    //         life: 3000,
    //     });
    // };

    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <Toast ref={toastRef} position="bottom-right" />

            {/* <button
                className={`p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 ${dropdownOpen ? "bg-gray-200 dark:bg-gray-600" : ""}`}
            >
                <MoreHorizontalIcon className='dark:text-gray-200' size={20} />
            </button> */}

            <button
                onClick={toggleDropdown}
                className={`text-gray-400 pl-4 text-start w-full hover:bg-indigo-500 hover:text-white rounded-sm mt-auto p-2  ${dropdownOpen ? "bg-indigo-500" : ""}`}
            >
                Add Item
            </button>

            {dropdownOpen && (
                <div className="absolute right-0 -mt-14 w-full z-50">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                        <div className="w-full mt-4">
                            <form onSubmit={handleSubmit}>
                                <div className="w-full flex justify-between items-center  border-2 border-gray-400 dark:border-gray-600  ring rounded-2xl">
                                    {/* Submit button */}
                                    <AddTaskDropdown projectId={projectId} />

                                    {/* Input field for task title */}
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Enter task title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="text-white dark:text-gray-200 w-full h-12 bg-gray-200 border-none dark:bg-gray-800 p-4 rounded-r-2xl"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddTaskDropdownInput;
