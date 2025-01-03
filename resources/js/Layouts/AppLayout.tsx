import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from './Sidebar';
import sidebarLinks from './sidebarLinks';
import { Menu } from 'lucide-react';

interface LayoutProps {
    title: string;
    children: React.ReactNode;
}

export default function AppLayout({ title, children }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <Head title={title} />
            <Sidebar links={sidebarLinks} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col lg:ml-64">
                <header className="fixed top-0 left-0 lg:left-64 right-0 z-40 bg-gray-100 p-4 flex items-center justify-between">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden p-2"
                    >
                        <i><Menu /></i>
                    </button>
                    <h1 className="text-sm md:text-md lg:text-xl font-semibold">{title}</h1>
                </header>
                <main className="flex-1 overflow-auto mt-16 md:p-6 bg-gray-100">{children}</main>
            </div>
        </div>
    );
}
