import React, { useState, useMemo } from 'react';
import { Link, router } from '@inertiajs/react';
import { ChevronDown, MoreHorizontalIcon, PanelBottom, PanelBottomOpen, PanelBottomClose, PlusCircle } from 'lucide-react';
import { InputText } from 'primereact/inputtext';
import SortDropdown from './SortDropdown';
import ProjectDropdown from './ProjectDropdown';

const ProjectsList = ({ projects }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('name'); // default sorting by name

    // Filter and sort projects based on the search term and selected sort option
    const filteredAndSortedProjects = useMemo(() => {
        const filteredProjects = projects.filter(project =>
            project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return filteredProjects.sort((a, b) => {
            switch (sortOption) {
                case 'newest':
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                case 'oldest':
                    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                case 'date':
                    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
                case 'name':
                default:
                    return a.name.localeCompare(b.name);
            }
        });
    }, [projects, searchTerm, sortOption]);

    // Count completed and in progress projects
    const inProgressCount = filteredAndSortedProjects.filter(project => project.status === 'in_progress').length;
    const completedCount = filteredAndSortedProjects.filter(project => project.status === 'completed').length;

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (value) => {
        setSortOption(value);
    };

    return (
        <div>
            {/* Search and New Project Button */}
            <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
                <div className="flex items-center w-full sm:w-2/3 md:w-1/2">
                    <InputText
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="rounded-lg w-full border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                        placeholder="Search projects"
                    />
                </div>
                <button
                    className="bg-indigo-500 text-white px-6 py-3 rounded-lg flex justify-center items-center gap-3 hover:bg-indigo-600 transition-colors duration-300 ease-in-out"
                    onClick={() => router.get('/projects/create')}
                >
                    <PlusCircle size={22} /> <span className="font-semibold">New Project</span>
                </button>
            </div>

            {/* Projects Filter, Sort and Stats */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex justify-start items-center gap-2">
                        <button className="hover:underline flex justify-center items-center gap-1">
                            <PanelBottomOpen size={20} /> In Progress ({inProgressCount})
                        </button>
                        <button className="hover:underline flex justify-center items-center gap-1">
                            <PanelBottomClose size={20} /> Completed ({completedCount})
                        </button>
                    </div>

                    {/* Add Sort Dropdown */}
                    <SortDropdown onSortChange={handleSortChange} />
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 -mx-6"></div>

                {/* List of Projects */}
                <div className="space-y-2 pt-2">
                    {filteredAndSortedProjects.map(project => (
                        <div key={project.id} className="pt-2">
                            <div className="flex justify-between items-center">
                                <Link href={`/projects/${project.id}`} className="text-lg font-semibold dark:text-white hover:underline text-black text-2xl flex justify-start items-center gap-2">
                                    <PanelBottom size={20} /> {project.name}
                                </Link>
                                {/* Project Dropdown */}
                                <ProjectDropdown projectId={project.id} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectsList;
