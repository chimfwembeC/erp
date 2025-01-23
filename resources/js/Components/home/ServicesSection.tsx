import React from 'react'
import { Link } from '@inertiajs/react';
import { Cloud, Brain, Shield, Smartphone, Database, Globe, Cpu, Code } from 'lucide-react';
import ServiceCard from './ServiceCard';

const services = [
    {
        icon: <Cloud className="h-8 w-8" />,
        title: 'Cloud Solutions',
        description: 'Scalable cloud infrastructure and migration services',
        path: '/services/cloud-solutions',
    },
    {
        icon: <Brain className="h-8 w-8" />,
        title: 'AI & ML',
        description: 'Advanced artificial intelligence and machine learning solutions',
        path: '/services/ai-ml',
    },
    {
        icon: <Shield className="h-8 w-8" />,
        title: 'Cybersecurity',
        description: 'Comprehensive security solutions to protect your assets',
        path: '/services/cybersecurity',
    },
    {
        icon: <Smartphone className="h-8 w-8" />,
        title: 'Mobile Development',
        description: 'Cross-platform mobile applications development',
        path: '/services/mobile-development',
    },
    {
        icon: <Database className="h-8 w-8" />,
        title: 'Data Analytics',
        description: 'Transform raw data into actionable insights',
        path: '/services/data-analytics',
    },
    {
        icon: <Globe className="h-8 w-8" />,
        title: 'Web Development',
        description: 'Modern, responsive web applications',
        path: '/services/web-development',
    },
    {
        icon: <Cpu className="h-8 w-8" />,
        title: 'IoT Solutions',
        description: 'Connected device solutions and monitoring',
        path: '/services/iot-solutions',
    },
    {
        icon: <Code className="h-8 w-8" />,
        title: 'Custom Development',
        description: 'Tailored software solutions for your needs',
        path: '/services/custom-development',
    },
];

const ServicesSection = () => {
    return (
        <section className="py-[18px] bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-slideUp">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Tekrem?</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">We deliver innovative solutions that drive business growth</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
