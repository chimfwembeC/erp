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
                {/* Hero Section */}
                <Hero />

                {/* Main Content */}
                <main className="pt-10">
                    <div className="space-y-16">
                        {/* Features Section */}
                        {/* <Features /> */}

                        {/* Pricing Plans Section */}
                        {/* <PlanGrid /> */}

                        {/* Benefits Section */}
                        <Benefits />


                        <Testimonials />


                        <FAQ />


                        {/* Call to Action Section */}
                        <CTA />
                    </div>
                </main>
            </>
        </GuestLayout>
    );
}
