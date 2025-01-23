import { Link } from '@inertiajs/react';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';
import React from 'react';

const ProjectDetails = ({ project }) => {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-white rounded-lg p-6 shadow mb-4">
            <div className="h-10 w-10 p-2 hover:bg-indigo-500 text-black dark:text-white hover:text-white rounded-lg">
                <Link href='/projects' className=''>
                    <CircleArrowLeft className='' size={25} />
                </Link>
            </div>
            <h1 className="text-2xl font-semibold mb-2 text-black dark:text-gray-200">{project.name}</h1>
            <p className="text-gray-600 dark:text-gray-200">Project ID: {project.id}</p>
        </div>
    );
};

export default ProjectDetails;
