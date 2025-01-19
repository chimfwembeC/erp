import React from 'react';

const ProjectDetails = ({ project }) => {
    return (
        <div className="bg-gray-800 text-white rounded-lg p-6 shadow mb-4">
            <h1 className="text-2xl font-semibold mb-2">{project.name}</h1>
            <p className="text-gray-200">Project ID: {project.id}</p>
        </div>
    );
};

export default ProjectDetails;
