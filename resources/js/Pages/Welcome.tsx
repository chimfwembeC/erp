import { Link } from '@inertiajs/react';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import PlanCards from '@/Components/PlanCard';
import PlanCard from '@/Components/PlanCard';
import PlanGrid from '@/Components/PlanGrid';
import FAQ from '@/Components/FAQ';
import Testimonials from '@/Components/Testimonials';
import CTA from '@/Components/CTA';
import Benefits from '@/Components/Benefits';
import Features from '@/Components/Features';
import Hero from '@/Components/Hero';

interface Props {
    canLogin: boolean;
    canRegister: boolean;
    laravelVersion: string;
    phpVersion: string;
}

export default function Welcome({
    canLogin,
    canRegister,
    laravelVersion,
    phpVersion,
}: Props) {
    const route = useRoute();
    const page = useTypedPage();

    return (
        <GuestLayout>
            <>
                <Head title="Welcome" />

                {/* Wrapper for Stacked Scroll */}
                <div className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
                    {/* Hero Section */}
                    <section className="h-screen snap-start flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                        {/* <Hero /> */}
                        <div className="text-center">
                            <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
                            <p className="text-lg">Discover amazing features and solutions tailored for your needs.</p>
                        </div>
                    </section>

                    {/* Benefits Section */}
                    <section className="h-screen snap-start bg-gray-100 flex items-center justify-center">
                        {/* <Benefits /> */}
                        <div className="text-center max-w-xl">
                            <h2 className="text-3xl font-semibold mb-4">Why Choose Us?</h2>
                            <ul className="list-disc list-inside text-left">
                                <li>Benefit 1: Unparalleled Performance</li>
                                <li>Benefit 2: Reliable and Secure</li>
                                <li>Benefit 3: 24/7 Customer Support</li>
                            </ul>
                        </div>
                    </section>

                    {/* Testimonials Section */}
                    <section className="h-screen snap-start bg-white flex flex-col items-center justify-center">
                        {/* <Testimonials /> */}
                        <div className="text-center max-w-2xl">
                            <h2 className="text-3xl font-semibold mb-4">What Our Users Say</h2>
                            <blockquote className="italic">"This platform has transformed the way we work! Highly recommended."</blockquote>
                            <cite className="block mt-2">- Jane Doe, CEO of ExampleCorp</cite>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="h-screen snap-start bg-gray-50 flex flex-col items-center justify-center">
                        {/* <FAQ /> */}
                        <div className="text-center max-w-3xl">
                            <h2 className="text-3xl font-semibold mb-4">Frequently Asked Questions</h2>
                            <p className="mb-2"><strong>Q:</strong> How do I get started?<br /><strong>A:</strong> Sign up for a free account and explore our features.</p>
                            <p><strong>Q:</strong> Is there a free trial?<br /><strong>A:</strong> Yes, we offer a 14-day free trial with no credit card required.</p>
                        </div>
                    </section>

                    {/* Call to Action Section */}
                    <section className="h-screen snap-start bg-indigo-600 flex items-center justify-center text-white">
                        {/* <CTA /> */}
                        <div className="text-center max-w-xl">
                            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                            <p className="mb-6">Sign up now and take your productivity to the next level.</p>
                            <button className="bg-white text-indigo-600 px-6 py-3 rounded-md shadow-md hover:bg-gray-200">Get Started</button>
                        </div>
                    </section>
                </div>
            </>
        </GuestLayout>
    );
}
