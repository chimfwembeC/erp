import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import Modal from './Modal';
import { Circle } from 'lucide-react';

const TaskBoard = ({ tasks, projectId, updateTaskStatus }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedType, setSelectedType] = useState('');
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

    // const handleOpenModal = () => {
    //     setIsModalOpen(true);
    // };

    // const handleCloseModal = () => {
    //     setIsModalOpen(false);
    //     setSelectedType('');
    //     setFormData({
    //         title: '',
    //         description: '',
    //         assignee_id: '',
    //         project_id: projectId,
    //         due_date: '',
    //         milestone_id: '',
    //     });
    // };

    // const handleSubmit = async (type, formData) => {
    //     try {
    //         if (type === 'issue') {
    //             const response = await axios.post(`/projects/${projectId}/issues`, formData);
    //             console.log('Issue created:', response.data);
    //         } else if (type === 'task') {
    //             const response = await axios.post(`/projects/${projectId}/tasks`, formData);
    //             console.log('Task created:', response.data);
    //         }
    //         // Close modal and reset state
    //         handleCloseModal();
    //     } catch (error) {
    //         console.error('Failed to create:', error);
    //     }
    // };

    const columns = [
        { id: 'pending', title: 'Todo', color: 'bg-gray-800', text: 'text-blue-500', description: "This item hasn't been started" },
        { id: 'in_progress', title: 'In Progress', color: 'bg-gray-800', text: 'text-orange-500', description: 'This is actively being worked on' },
        { id: 'completed', title: 'Done', color: 'bg-gray-800', text: 'text-green-500', description: 'This has been completed' },
    ];

    // Function to calculate task counts in each column
    const getTaskCountForColumn = (status) => {
        return tasks.filter((task) => task.status === status).length;
    };

    return (
        <div className="">

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
                                                <Circle size={25} className={`${column.text}`} />
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
                                    {/* Add Item button positioned at the bottom */}
                                    <button
                                        className={`text-white pl-4 text-start w-full mt-auto p-2`}
                                    >
                                        Add Item
                                    </button>
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default TaskBoard;
