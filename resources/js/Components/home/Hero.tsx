import React from 'react';
import { ArrowRight, Facebook, Instagram, Linkedin, Users } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { FaWhatsapp } from 'react-icons/fa';

const Hero = () => {
    return (
        <header className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Hero Background"
                    className="w-full h-full object-cover opacity-90 dark:opacity-60"
                />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-gray-900/80 to-black dark:from-gray-800/80 dark:via-gray-700 dark:to-black"></div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 md:px-12 max-w-5xl mx-auto">
                {/* Tagline */}
                <p className="text-sm md:text-base font-medium text-gray-300 dark:text-gray-400 mb-4">
                    Get special offers for small businesses ✨
                </p>

                {/* Headline */}
                <h1 className="text-4xl md:text-6xl font-bold text-white dark:text-gray-100 mb-6 leading-tight">
                    Get back to growth with{' '}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-400 dark:from-indigo-400 dark:to-purple-300">
                        the zambia's #1
                    </span>{' '}
                    ERP
                </h1>

                {/* Subheading */}
                <p className="text-lg md:text-2xl text-gray-300 dark:text-gray-400 mb-10">
                    Salesforce is helping safeguard customer engagement with cutting-edge solutions.
                </p>

                {/* Call-to-Action Buttons */}
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Link
                        href="/get-started"
                        className="inline-flex items-center px-6 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 dark:hover:bg-orange-500 transition-all duration-300 hover:scale-105"
                    >
                        Start My Free Trial
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <button
                        className="inline-flex items-center px-6 py-3 rounded-full bg-gray-100 text-gray-900 font-semibold hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
                    >
                        Watch Video
                    </button>
                </div>
            </div>

            {/* Decorative Icons */}
            <div className="absolute flex gap-6 flex-wrap justify-center md:justify-end items-center bottom-12 md:bottom-16 right-0 px-4 md:px-12 max-w-md">
                <div className="bg-white/20 dark:bg-gray-800/50 hover:bg-accent dark:hover:bg-accent rounded-lg p-3 backdrop-blur-md">
                    {/* <img src="/assets/icons/slack.svg" alt="Slack" className="h-12 w-12" /> */}
                    <Instagram size={20} className='text-white' />
                </div>
                <div className="bg-white/20 dark:bg-gray-800/50 hover:bg-accent dark:hover:bg-accent rounded-lg p-3 backdrop-blur-md">
                    {/* <img src="/assets/icons/mandarin.svg" alt="Mandarin" className="h-12 w-12" /> */}
                    <FaWhatsapp size={20} className='text-white' />
                </div>
                <div className="bg-white/20 dark:bg-gray-800/50 hover:bg-accent dark:hover:bg-accent rounded-lg p-3 backdrop-blur-md">
                    {/* <img src="/assets/icons/zoom.svg" alt="Zoom" className="h-12 w-12" /> */}
                    <Facebook size={20} className='text-white' />
                </div>
                <div className="bg-white/20 dark:bg-gray-800/50 hover:bg-accent dark:hover:bg-accent rounded-lg p-3 backdrop-blur-md">
                    {/* <img src="/assets/icons/teams.svg" alt="Teams" className="h-12 w-12" /> */}
                    <Linkedin size={20} className='text-white' />
                </div>
            </div>
        </header>
    );
};

export default Hero;
