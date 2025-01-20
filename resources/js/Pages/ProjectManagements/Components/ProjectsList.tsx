import React from 'react';
import { Link, router } from '@inertiajs/react';
import { ChevronDown, Grid, MoreHorizontalIcon, PanelBottom, PanelBottomClose, PanelBottomOpen, PlusCircle } from 'lucide-react';
import { InputText } from 'primereact/inputtext';
import SortDropdown from './SortDropdown';

const ProjectsList = ({ projects }) => {
    console.log('project', projects);
    return (
        <div className="">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center w-98">
                    <InputText
                        className='rounded-lg w-full border border-gray-200 dark:border-gray-600'
                    />
                </div>
                <button
                    className="bg-indigo-500 text-white px-4 py-2 rounded-lg flex justify-center items-center gap-2"
                    onClick={() => router.get('/projects/create')}
                >
                    <PlusCircle size={20} /> <span> New Project</span>
                </button>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex justify-start items-center gap-2">
                        <button className="hover:underline flex justify-center items-center gap-1">
                            <PanelBottomOpen size={20} /> In Progress
                        </button>
                        <button className="hover:underline flex justify-center items-center gap-1">
                            <PanelBottomClose size={20} /> Completed
                        </button>
                    </div>

                    {/* Add Sort Dropdown */}
                    <SortDropdown />
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 -mx-6"></div>
                <div className="space-y-2 pt-2">
                    {projects.map(project => (
                        <div key={project.id} className="pt-2">
                            <div className="flex justify-between items-center">
                                <Link href={`/projects/${project.id}`} className="text-lg font-semibold text-white hover:underline text-2xl flex justify-start items-center gap-2">
                                    <PanelBottom size={20} /> {project.name}
                                </Link>
                                <button className="p-1 rounded-lg hover:bg-gray-600">
                                    <MoreHorizontalIcon size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectsList;
