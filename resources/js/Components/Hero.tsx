import { Link } from '@inertiajs/react';
import React from 'react';

export default function Hero() {
    return (
        <section className="relative flex justify-center items-center h-screen bg-gradient-to-b from-blue-50 to-gray-100 pb-24">
            {/* Hero Content */}
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                    {/* Text Section */}
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide text-primary">
                            Welcome to Our ERP System
                        </h1>
                        <p className="mt-6 text-lg text-gray-700 sm:max-w-lg mx-auto md:mx-0 tracking-wide leading-relaxed">
                            Streamline your business operations with a powerful and intuitive ERP system designed to grow with your needs.
                            Manage everything in one place—faster, smarter, and more efficiently.
                        </p>
                        {/* Buttons */}
                        <div className="mt-8 flex flex-col md:flex-row justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4">
                            <Link
                                href="/about"
                                className="px-6 sm:px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-accent transition duration-200"
                            >
                                Learn More
                            </Link>
                            <Link
                                href="/register"
                                className="px-6 sm:px-8 py-3 bg-white text-primary font-semibold rounded-lg shadow-md hover:bg-gray-100 border border-primary transition duration-200"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="relative">
                        <div className="relative w-full  ">
                            <img
                                src="assets/imgs/erp dashboard screenshot.png"
                                alt="ERP Dashboard Illustration"
                                className="w-full h-[20rem] rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
