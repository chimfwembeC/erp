import React from 'react';
import { Link, router } from '@inertiajs/react';

const ProjectsList = ({ projects }) => {
    return (
        <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Projects</h2>
                <button
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    onClick={() => router.get('/projects/create')}
                >
                    + New Project
                </button>
            </div>
            <ul className="space-y-2">
                {projects.map(project => (
                    <li key={project.id} className="p-4 border rounded-lg hover:bg-gray-100">
                        <Link href={`/projects/${project.id}`} className="text-lg font-semibold text-primary">
                            {project.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectsList;
