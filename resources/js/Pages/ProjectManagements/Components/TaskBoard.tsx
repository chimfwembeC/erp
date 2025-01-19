import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TaskBoard = ({ tasks, updateTaskStatus }) => {
    const onDragEnd = (result) => {
        if (!result.destination) return;
        const taskId = parseInt(result.draggableId);
        const newStatus = result.destination.droppableId;

        updateTaskStatus(taskId, newStatus);
    };

    const columns = [
        { id: 'pending', title: 'Todo', color: 'bg-green-100', description: "This item hasn't been started" },
        { id: 'in_progress', title: 'In Progress', color: 'bg-yellow-100', description: 'This is actively being worked on' },
        { id: 'completed', title: 'Done', color: 'bg-blue-100', description: 'This has been completed' },
    ];

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-3 gap-4">
                {columns.map((column) => (
                    <Droppable key={column.id} droppableId={column.id}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`rounded-lg h-96 shadow-md p-4 ${column.color}`}
                            >
                                <h2 className="text-lg font-semibold">{column.title}</h2>
                                <p className="text-sm text-gray-600">{column.description}</p>
                                <div className="space-y-2">
                                    {tasks
                                        .filter((task) => task.status === column.id)
                                        .map((task, index) => (
                                            <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="bg-white p-2 rounded shadow-sm"
                                                    >
                                                        {task.title}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </div>
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default TaskBoard;
