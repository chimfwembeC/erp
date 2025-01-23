import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import { Circle, CircleAlertIcon, CircleCheck, CircleDot, CircleDotDashed, Clock4Icon, FilterIcon, MoreHorizontal, PlusSquareIcon, X } from 'lucide-react';
import { Avatar } from 'primereact/avatar';
import Swal from 'sweetalert2';
import TaskDropdown from './TaskDropdown';
import AddTaskDropdownInput from './AddTaskDropdownInput';

const TaskBoard = ({ project, updateTaskStatus }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskState, setTaskState] = useState(project?.tasks);
    // const tasks = project?.tasks;

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const taskId = parseInt(result.draggableId);
        const newStatus = result.destination.droppableId;

        // Update task state locally
        const updatedTasks = taskState.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
        );

        setTaskState(updatedTasks);

        // Optionally update the backend
        updateTaskStatus(taskId, newStatus);
    };

    console.log('project', project);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const columns = [
        { id: 'pending', title: 'Todo', color: 'bg-gray-800', text: 'text-blue-500', icon: <CircleDotDashed size={20} />, description: "This item hasn't been started" },
        { id: 'in_progress', title: 'In Progress', color: 'bg-gray-800', text: 'text-orange-500', icon: <Clock4Icon size={20} />, description: 'This is actively being worked on' },
        // { id: 'review', title: 'Review', color: 'bg-gray-800', text: 'text-yellow-500', icon: <CircleAlertIcon size={20} />, description: 'This has been completed' },
        { id: 'completed', title: 'Done', color: 'bg-gray-800', text: 'text-green-500', icon: <CircleCheck size={20} />, description: 'This has been completed' },
    ];

    const getTaskCountForColumn = (status) => {
        return taskState?.filter((task) => task.status === status).length;
    };

    return (
        <div className="">
            <div className="my-4">
                <div className="w-full  flex justify-between items-center gap-4 ">
                    <div className="w-full flex justify-center items-center">
                        <div
                            className="w-10 h-10 p-2 border border-gray-300 dark:border-gray-800 flex justify-center rounded-l-lg items-center bg-gray-200 dark:bg-gray-800 text-white"
                        >
                            <FilterIcon size={45} />
                        </div>
                        {/* Input field for task title */}
                        <input
                            type="text"
                            name="search"
                            placeholder="Filter by keyword or by field"
                            // value={formData.title}
                            // onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="text-white w-full bg-gray-200 border border-gray-300 dark:bg-gray-800  p-2 rounded-r-lg"
                        />
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        <button
                            className="p-2 rounded-lg flex justify-center items-center bg-gray-500 text-white"
                            disabled
                        >
                            Discard
                        </button>
                        {/* Submit button */}
                        <button
                            className="p-2 bg-green-500 rounded-lg flex justify-center items-center text-white"
                            disabled
                        >
                            Save
                        </button>
                    </div>

                </div>
            </div>
            {/* Task Board */}
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {columns.map((column) => (
                        <Droppable key={column.id} droppableId={column.id}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={`rounded-lg min-h-96 shadow-md flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600`}
                                >
                                    <div className="text-white">
                                        <div className="p-4">
                                            <div className="flex justify-between items-center text-black dark:text-white">
                                                <div className="flex justify-start items-center gap-1">
                                                    {/* Dynamic icon color based on column status */}
                                                    <Circle size={25} className={`font-bold ${column.text}`} />
                                                    <h2 className="text-lg font-semibold">{column.title}</h2>
                                                    {/* Dynamic task count */}
                                                    <div className="flex justify-center items-center text-white dark:text-gray-200 bg-gray-600 h-6 w-6 text-xs rounded-full p-2">
                                                        {getTaskCountForColumn(column.id)}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-400">{column.description}</p>
                                        </div>
                                        <div className="space-y-2 p-2 max-h-64 overflow-y-auto">
                                            {taskState
                                                .filter((task) => task.status === column.id)
                                                .map((task, index) => (
                                                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className="bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-2 rounded shadow-sm text-black"
                                                            >
                                                                <div className="flex justify-between items-center">
                                                                    <div className="flex justify-start items-center gap-1">
                                                                        <span className={`${column.text}`}>
                                                                            {column.icon}
                                                                        </span>
                                                                        <span className='hover:underline text-black dark:text-white'>
                                                                            {task.issue?.title}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex justify-between items-center gap-2 ">
                                                                        <img
                                                                            src={task.assignee ? `https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=${task.assignee?.name}` : `https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=${""}`}
                                                                            alt="User Avatar"
                                                                            className="w-6 h-6 text-xs rounded-full"
                                                                        />
                                                                        <TaskDropdown taskId={task.id} />
                                                                    </div>
                                                                </div>
                                                                <span className="hover:underline cursor-pointer line-clamp-1  text-black dark:text-white">
                                                                    {task.title}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                    <div className="mt-auto">
                                        <AddTaskDropdownInput projectId={project.id} />
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))}

                </div>
            </DragDropContext>
        </div >
    );
};

export default TaskBoard;
