import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import GuestLayout from '@/Layouts/GuestLayout';

const Contact = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <GuestLayout title='Contact'>
            <div >
                {/* Hero Section */}
                <section className="pt-[200px] bg-primary dark:bg-gray-800 text-white py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 mt-8 text-white dark:text-gray-200">Contact Us</h1>
                            <p className="text-xl md:text-2xl mb-8 text-white dark:text-gray-600">
                                Get in touch with our team of experts
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Contact Information */}
                            <div>
                                <h2 className="text-3xl font-bold mb-8 ">Get in Touch</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <Mail className="h-6 w-6 text-primary mt-1" />
                                        <div>
                                            <h3 className="font-semibold mb-1">Email</h3>
                                            <p className="text-gray-600">tekremsolutions@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <Phone className="h-6 w-6 text-primary mt-1" />
                                        <div>
                                            <h3 className="font-semibold mb-1">Phone</h3>
                                            <p className="text-gray-600">(260) 976-607-840</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <MapPin className="h-6 w-6 text-primary mt-1" />
                                        <div>
                                            <h3 className="font-semibold mb-1">Address</h3>
                                            <p className="text-gray-600">
                                                Lusaka<br />
                                                Zambia.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="bg-white dark:bg-gray-800 text-white p-8 rounded-xl shadow-lg">
                                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Send us a Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                            required
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-accent transition-colors"
                                    >
                                        Send Message
                                        <Send className="ml-2 h-5 w-5" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </GuestLayout>
    );
};

export default Contact;
