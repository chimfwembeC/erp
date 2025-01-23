import { Link } from '@inertiajs/react';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import ParallaxSection from '@/Components/ParallaxSection';
import Hero from '@/Components/home/Hero';
import ServicesSection from '@/Components/home/ServicesSection';
import TeamSection from '@/Components/home/TeamSection';
import ProductsSection from '@/Components/home/ProductsSection';
import BlogSection from '@/Components/home/BlogSection';
import CTASection from '@/Components/home/CTASection';
import OrgChart from '@/Components/OrgChart';
import StackedCardScroll from '@/Components/StackedCardScroll';

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
    const posts = [
        {
            id: 1,
            title: "The Future of Cloud Computing",
            content: "Cloud computing continues to evolve at a rapid pace. In this article, we explore the latest trends and technologies shaping the future of cloud infrastructure...",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072",
            authorName: "Fackson Kangwa",
            createdAt: new Date("2024-03-01"),
        },
        {
            id: 2,
            title: "AI in Business: A Practical Guide",
            content: "Artificial Intelligence is transforming how businesses operate. Learn how to implement AI solutions in your organization effectively...",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2070",
            authorName: "Joseph Banda",
            createdAt: new Date("2024-02-28"),
        },
        {
            id: 3,
            title: "Cybersecurity Best Practices",
            content: "With increasing cyber threats, protecting your digital assets is more important than ever. Discover the essential cybersecurity practices...",
            image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&q=80&w=2070",
            authorName: "Chimfwembe Kangwa",
            createdAt: new Date("2024-02-25"),
        },
    ];

    return (
        <GuestLayout title={'welcome'}>
            <>
                {/* Hero Section */}
                <Hero />

                {/* Parallax Section 1: After Hero */}
                <ParallaxSection>
                    <h1 className="text-4xl font-bold text-white text-center">
                        Empowering Innovation for a Better Tomorrow
                    </h1>
                </ParallaxSection>

                {/* Services Section */}
                <ServicesSection />

                {/* Team Section */}
                <TeamSection />

                {/* Products Section */}
                <ProductsSection />


                {/* Blog Section */}
                <BlogSection posts={posts} />

                {/* Parallax Section 2: Before CTA */}
                <ParallaxSection>
                    <h2 className="text-3xl font-bold text-white text-center">
                        Ready to Transform Your Business?
                    </h2>
                </ParallaxSection>

                {/* CTA Section */}
                <CTASection />
            </>
        </GuestLayout >
    );
}
