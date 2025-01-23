import React from 'react'
import { ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';


const CTASection = () => {
    return (
        <section className="bg-primary dark:bg-gray-800 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slideUp">
                <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
                <p className="text-xl mb-8">Let's discuss how we can help you achieve your goals</p>
                <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 rounded-full bg-white text-primary font-semibold hover:bg-accent hover:text-white transition-all duration-300 hover:scale-105"
                >
                    Contact Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </div>
        </section>
    );
};

export default CTASection;
