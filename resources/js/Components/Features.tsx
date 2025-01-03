import { Link } from '@inertiajs/react';
import React from 'react';

export default function Features() {
    return (
        <div>
            <section className="flex flex-col px-6 md:flex-row items-center gap-4 space-y-8 md:space-y-0 md:space-x-12 min:h-screen-70">
                {/* Grid Section for Feature Illustrations */}
                <div className="grid grid-cols-2 gap-4">
                    {[
                        {
                            src: 'assets/svgs/undraw_features_overview_re_2w78.svg',
                            alt: 'Project Management',
                            label: 'Project Management',
                        },
                        {
                            src: 'assets/svgs/undraw_features_overview_re_2w78.svg',
                            alt: 'Inventory Management',
                            label: 'Inventory Management',
                        },
                        {
                            src: 'assets/svgs/undraw_features_overview_re_2w78.svg',
                            alt: 'Accounting',
                            label: 'Accounting',
                        },
                        {
                            src: 'assets/svgs/undraw_features_overview_re_2w78.svg',
                            alt: 'Customer Relations',
                            label: 'Customer Relations',
                        },
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="border-2 p-4 rounded-lg hover:border-primary hover:scale-105 transition-transform duration-200 ease-out flex flex-col items-center"
                        >
                            <img
                                src={feature.src}
                                alt={feature.alt}
                                className="w-48 h-48 rounded-lg"
                            />
                            <p className="mt-2 text-primary font-medium">
                                {feature.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Text Content Section */}
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-primary">
                        Our Features
                    </h2>
                    <p className="mt-4 text-gray-700 leading-relaxed">
                        Explore the cutting-edge features of our ERP system, designed to
                        streamline operations, improve collaboration, and drive productivity.
                    </p>

                    <ul className="mt-4 text-gray-700">
                        <li><strong>Project Management:</strong> Keep your projects on track with detailed planning and real-time tracking tools.</li>
                        <li><strong>Inventory Management:</strong> Stay in control of your stock levels with smart inventory tools.</li>
                        <li><strong>Accounting:</strong> Manage your finances with ease, from invoices to payroll.</li>
                        <li><strong>Customer Relations:</strong> Build and maintain strong relationships with your customers using CRM tools.</li>
                    </ul>

                    <Link
                        href="/features"
                        className="mt-6 inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-accent transition-all"
                    >
                        Learn More
                    </Link>
                </div>
            </section>
        </div>
    );
}
