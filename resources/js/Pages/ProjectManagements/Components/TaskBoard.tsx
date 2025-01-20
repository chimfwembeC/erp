import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import { Circle, CircleAlertIcon, CircleCheck, CircleDot, CircleDotDashed, FilterIcon, MoreHorizontal, PlusSquareIcon, X } from 'lucide-react';
import { Avatar } from 'primereact/avatar';
import Swal from 'sweetalert2';

const TaskBoard = ({ project, updateTaskStatus }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskState, setTaskState] = useState(project?.tasks);
    const [selectedType, setSelectedType] = useState('task'); // Default to 'task'
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        project_id: project.id,
        assignee_id: '',
        due_date: '',
        milestone_id: '',
    });

    const tasks = project?.tasks;

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

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({
            title: '',
            description: '',
            project_id: project.id,
            assignee_id: '',
            due_date: '',
            milestone_id: '',
        });
    };

    const handleSubmit = async () => {
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
                const response = await axios.post(`/projects/${project.id}/${type}s`, formData).then(() => (
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

            handleCloseModal();
        } catch (error) {
            console.error('Failed to create:', error);
        }
    };



    const columns = [
        { id: 'pending', title: 'Todo', color: 'bg-gray-800', text: 'text-blue-500', icon: <CircleDotDashed size={20} />, description: "This item hasn't been started" },
        { id: 'in_progress', title: 'In Progress', color: 'bg-gray-800', text: 'text-orange-500', icon: <CircleDot size={20} />, description: 'This is actively being worked on' },
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
                            className="w-10 h-10 p-2 border-2 border-gray-800 flex justify-center rounded-l-lg items-center bg-gray-800 text-white"
                        >
                            <FilterIcon size={45} />
                        </div>
                        {/* Input field for task title */}
                        <input
                            type="text"
                            name="search"
                            placeholder="Filter by keyword or by field"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="text-white w-full bg-gray-800 p-2 rounded-r-lg"
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
                                    className={`rounded-lg min-h-96 shadow-md border border-gray-200 flex flex-col ${column.color}`}
                                >
                                    <div className="text-white">
                                        <div className="p-4">
                                            <div className="flex justify-between items-center">
                                                <div className="flex justify-start items-center gap-1">
                                                    {/* Dynamic icon color based on column status */}
                                                    <Circle size={25} className={`font-bold ${column.text}`} />
                                                    <h2 className="text-lg font-semibold">{column.title}</h2>
                                                    {/* Dynamic task count */}
                                                    <div className="flex justify-center items-center bg-gray-600 h-6 w-6 text-xs rounded-full p-2">
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
                                                                className="bg-gray-700 border border-gray-400 p-2 rounded shadow-sm"
                                                            >
                                                                <div className="flex justify-between items-center">
                                                                    <div className="flex justify-start items-center gap-1">
                                                                        <span className={`${column.text}`}>
                                                                            {column.icon}
                                                                        </span>
                                                                        <span className='hover:underline'>
                                                                            erp #4
                                                                        </span>
                                                                    </div>
                                                                    <div className="">
                                                                        <Avatar className='h-6 w-6 rounded-full text-xs text-black'>ck</Avatar>
                                                                    </div>
                                                                </div>
                                                                <span className="hover:underline cursor-pointer line-clamp-1">
                                                                    {task.title}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                    <button
                                        className={`text-white pl-4 text-start w-full hover:bg-gray-700 rounded-lg mt-auto p-2`}
                                    >
                                        Add Item
                                    </button>
                                </div>
                            )}
                        </Droppable>
                    ))}

                </div>
            </DragDropContext>
            <div className="w-full mt-4">
                <div className="bg-white w-full flex justify-between items-center">
                    {/* Submit button */}
                    <div
                        onClick={handleSubmit}
                        className="w-10 h-10 p-2 border-2 border-gray-800 rounded-l-lg flex justify-center items-center bg-gray-800 text-white"
                    >
                        <PlusSquareIcon size={45} />
                    </div>

                    {/* Input field for task title */}
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter task title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="text-white w-full bg-gray-800 p-2 rounded-r-lg"
                    />
                </div>
            </div>
        </div >
    );
};

export default TaskBoard;
