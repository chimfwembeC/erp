import AppLayout from '@/Layouts/AppLayout'
import React from 'react'
import ProjectsList from './Components/ProjectsList'
import { Link } from '@inertiajs/react'
import { Inspect, Milestone } from 'lucide-react'
import { FaTasks } from 'react-icons/fa'

export default function Index({ projects }) {
    return (
        <AppLayout title="Projects">
            <div className="space-y-4 pt-12">
                {/* Welcome Section */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                    <h1 className="text-3xl font-bold dark:text-gray-200 ">Welcome to projects</h1>
                    <p className="text-gray-400 dark:text-gray-200  mt-2">
                        Built like a spreadsheet, project tables give you a live canvas to filter and sort.
                    </p>
                    <button className="mt-4 bg-indigo-500 dark:bg-indigo-500 text-white hover:bg-indigo-600 px-4 py-2 rounded-lg">Learn more</button>
                </div>

                {/* Navigation Links */}
                <div className="flex space-x-4 items-center">
                    <Link href="/projects/issues" className="flex items-center  bg-indigo-500 text-white hover:bg-indigo-600 text-white px-4 py-2 rounded-lg">
                        <Inspect className="mr-2" size={20} />
                        Issues
                    </Link>
                    <Link href="/projects/milestones" className="flex items-center  bg-indigo-500 text-white hover:bg-indigo-600 text-white px-4 py-2 rounded-lg">
                        <Milestone className="mr-2" size={20} />
                        Milestones
                    </Link>
                    <Link href="/projects/tasks" className="flex items-center  bg-indigo-500 text-white hover:bg-indigo-600 text-white px-4 py-2 rounded-lg">
                        <FaTasks className="mr-2" size={20} />
                        Tasks
                    </Link>
                </div>

                {/* Project List */}
                <ProjectsList projects={projects} />
            </div>
        </AppLayout>
    );
}
