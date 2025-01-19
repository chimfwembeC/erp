import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import { Circle, FilterIcon, PlusSquareIcon, X } from 'lucide-react';

const TaskBoard = ({ tasks, projectId, updateTaskStatus }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedType, setSelectedType] = useState('task'); // Default to 'task'
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        project_id: projectId,
        assignee_id: '',
        due_date: '',
        milestone_id: '',
    });

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const taskId = parseInt(result.draggableId);
        const newStatus = result.destination.droppableId;

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
            project_id: projectId,
            assignee_id: '',
            due_date: '',
            milestone_id: '',
        });
    };

    const handleSubmit = async () => {
        try {
            const type = selectedType; // 'task' or 'issue'
            const response = await axios.post(`/projects/${projectId}/${type}s`, formData);
            console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} created:`, response.data);
            handleCloseModal();
        } catch (error) {
            console.error('Failed to create:', error);
        }
    };

    const columns = [
        { id: 'pending', title: 'Todo', color: 'bg-gray-800', text: 'text-blue-500', description: "This item hasn't been started" },
        { id: 'in_progress', title: 'In Progress', color: 'bg-gray-800', text: 'text-orange-500', description: 'This is actively being worked on' },
        { id: 'completed', title: 'Done', color: 'bg-gray-800', text: 'text-green-500', description: 'This has been completed' },
    ];

    const getTaskCountForColumn = (status) => {
        return tasks.filter((task) => task.status === status).length;
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
                <div className="grid grid-cols-3 gap-4">
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
                                            <div className="flex justify-start items-center gap-1">
                                                {/* Dynamic icon color based on column status */}
                                                <Circle size={25} className={`font-bold ${column.text}`} />
                                                <h2 className="text-lg font-semibold">{column.title}</h2>
                                                {/* Dynamic task count */}
                                                <div className="flex justify-center items-center bg-gray-600 h-6 w-6 text-xs rounded-full p-2">
                                                    {getTaskCountForColumn(column.id)}
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-400">{column.description}</p>
                                        </div>
                                        <div className="space-y-2 p-2 max-h-64 overflow-y-auto">
                                            {tasks
                                                .filter((task) => task.status === column.id)
                                                .map((task, index) => (
                                                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className="bg-white text-black p-2 rounded shadow-sm"
                                                            >
                                                                {task.title}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                    {/* <button
                                        onClick={handleOpenModal}
                                        className={`text-white pl-4 text-start w-full mt-auto p-2`}
                                    >
                                        Add Item
                                    </button> */}
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
