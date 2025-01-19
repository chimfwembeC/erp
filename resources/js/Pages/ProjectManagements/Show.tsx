import React, { useState } from 'react';
import axios from 'axios';
import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ProjectDetails from './Components/ProjectDetails';
import TaskBoard from './Components/TaskBoard';

interface Props {
    project: {
        id: number;
        name: string;
        tasks: { id: number; title: string; status: string }[];
    };
}

export default function Show({ project }: Props) {
    // Initialize state for the project, including tasks
    const [projectState, setProjectState] = useState(project);

    // Handle updating task status
    const handleUpdateTaskStatus = async (taskId: number, newStatus: string) => {
        console.log(`Task ${taskId} moved to ${newStatus}`);

        try {
            const response = await axios.put(`/projects/${projectState.id}/tasks/${taskId}/status`, {
                status: newStatus,
            });

            // Handle success response
            console.log('Task updated:', response.data);

            // Update local state to reflect task status change
            const updatedTasks = projectState.tasks.map(task =>
                task.id === taskId ? { ...task, status: newStatus } : task
            );

            // Update the project state with the modified task list
            setProjectState({
                ...projectState,
                tasks: updatedTasks,
            });

        } catch (error) {
            // Handle error response
            console.error('Failed to update task status:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <AppLayout title="Project Details">
            <div className="p-2">
                <ProjectDetails project={projectState} />
                <TaskBoard projectId={project.id} tasks={projectState.tasks} updateTaskStatus={handleUpdateTaskStatus} />
            </div>
        </AppLayout>
    );
}
