import { Link } from '@inertiajs/react'
import React from 'react'

export default function CTA() {
    return (
        <div>   <section className="text-center py-16 bg-primary text-white">
            <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Business?
            </h2>
            <p className="mb-8">
                Start your free trial or contact us for a personalized demo.
            </p>
            <div className="flex justify-center space-x-4">
                <Link
                    href="/register"
                    className="px-6 py-3 bg-accent rounded-lg shadow-md hover:bg-accent-dark transition"
                >
                    Start Free Trial
                </Link>
                <Link
                    href="/contact"
                    className="px-6 py-3 bg-white text-primary rounded-lg shadow-md hover:bg-gray-200 transition"
                >
                    Contact Us
                </Link>
            </div>
        </section></div>
    )
}
