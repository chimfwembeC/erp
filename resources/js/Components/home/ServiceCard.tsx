import React from 'react'
import { Link } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    path: string;
    index: number;
}

const ServiceCard = ({ icon, title, description, path, index }: ServiceCardProps) => {
    return (
        <Link
            href={path}
            className="group bg-white dark:bg-gray-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fadeIn"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary dark:text-white transition-colors">
                {title}
            </h3>
            <p className="text-gray-600">{description}</p>
        </Link>
    );
};

export default ServiceCard;
