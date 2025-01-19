import { Link } from '@inertiajs/react';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';
import React from 'react';

const ProjectDetails = ({ project }) => {
    return (
        <div className="bg-gray-800 text-white rounded-lg p-6 shadow mb-4">
            <div className="h-10 w-10">
                <Link href='/projects'>
                    <CircleArrowLeft size={25} />
                </Link>
            </div>
            <h1 className="text-2xl font-semibold mb-2">{project.name}</h1>
            <p className="text-gray-200">Project ID: {project.id}</p>
        </div>
    );
};

export default ProjectDetails;
