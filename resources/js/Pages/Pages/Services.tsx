import React from 'react'
import { Cloud, Database, Lock, Code, Brain, Smartphone, Globe, Cpu, } from 'lucide-react';
import { Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

const Services = () => {
    const services = [
        {
            icon: <Cloud className="h-12 w-12" />,
            title: 'Cloud Solutions',
            description: 'Scalable cloud infrastructure and migration services.',
            path: '/services/cloud-solutions'
        },
        {
            icon: <Brain className="h-12 w-12" />,
            title: 'AI & Machine Learning',
            description: 'Advanced AI solutions for process automation.',
            path: '/services/ai-ml'
        },
        {
            icon: <Lock className="h-12 w-12" />,
            title: 'Cybersecurity',
            description: 'Comprehensive security solutions for your infrastructure.',
            path: '/services/cybersecurity'
        },
        {
            icon: <Smartphone className="h-12 w-12" />,
            title: 'Mobile Development',
            description: 'Cross-platform mobile applications development.',
            path: '/services/mobile-development'
        },
        {
            icon: <Database className="h-12 w-12" />,
            title: 'Data Analytics',
            description: 'Transform raw data into actionable insights.',
            path: '/services/data-analytics'
        },
        {
            icon: <Globe className="h-12 w-12" />,
            title: 'Web Development',
            description: 'Modern, responsive web applications.',
            path: '/services/web-development'
        },
        {
            icon: <Cpu className="h-12 w-12" />,
            title: 'IoT Solutions',
            description: 'Connected device solutions and monitoring.',
            path: '/services/iot-solutions'
        },
        {
            icon: <Code className="h-12 w-12" />,
            title: 'Custom Development',
            description: 'Tailored software solutions for your needs.',
            path: '/services/custom-development'
        }
    ];

    return (
        <GuestLayout title='Services'>
            <div className=''>
                <section className="pt-[200px] bg-primary dark:bg-gray-800 text-white py-20 transition-all transition-colors duration-300">
                    <div className="absolute inset-0 overflow-hidden">
                    </div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl text-white font-bold mb-6">Our Services</h1>
                            <p className="text-xl md:text-2xl text-white  dark:text-gray-600 mb-8">
                                Comprehensive technology solutions for your business needs
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <Link
                                    key={index}
                                    href={service.path}
                                    className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="text-primary dark:text-white mb-4">{service.icon}</div>
                                    <h3 className="text-2xl font-semibold dark:text-gray-200 mb-4">{service.title}</h3>
                                    <p className="text-gray-600 mb-4 dark:text-gray-400 ">{service.description}</p>
                                    <span className="text-primary font-semibold">Learn more →</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </GuestLayout>
    );
};

export default Services;
