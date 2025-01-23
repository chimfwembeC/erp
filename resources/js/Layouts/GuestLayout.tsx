import Navbar from '@/Components/home/Navbar';
import useTypedPage from '@/Hooks/useTypedPage';
import { Head, Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaFacebook } from 'react-icons/fa';

export default function GuestLayout({ title, children }) {
    const page = useTypedPage();
    const [showFooter, setShowFooter] = useState(true);
    const [footerText, setFooterText] = useState();

    useEffect(() => {
        // Fetch current customization settings from the backend
        setShowFooter(page.props.footer?.show_footer === '1' ? true : false)
        setFooterText(page.props.footer?.footer_text)
    }, []);
    return (
        <div className="relative min-h-screen bg-background">
            <Head title={title} />
            {/* Floating Navbar */}
            <header className="fixed top-0 left-0 w-full bg-primary text-white shadow-lg z-50">
                <div className="bg-primary-dark dark:bg-gray-800 transition-all transition-colors duration-300 p-2">
                    <div className="flex justify-between items-center px-4">
                        <div className="flex justify-start space-x-2 text-md">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-accent transition duration-200"
                                aria-label="Facebook"
                            >
                                tekremsolutions@gmail.com
                            </a>
                            <div className="">
                                (260) 976-607-840
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-accent transition duration-200"
                                aria-label="Facebook"
                            >
                                <FaFacebookF size={15} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-accent transition duration-200"
                                aria-label="Twitter"
                            >
                                <FaTwitter size={15} />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-accent transition duration-200"
                                aria-label="Instagram"
                            >
                                <FaInstagram size={15} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-accent transition duration-200"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedinIn size={15} />
                            </a>
                        </div>
                    </div>
                </div>
                <Navbar />
            </header>

            {/* Main Content */}
            <main className="">
                {children}

                {/* Footer */}
                {showFooter && (
                    <div className="">
                        <footer className="p-4  bottom-0 right-0 left-0 bg-primary dark:bg-gray-700">
                            <div className="container mx-auto px-6 text-center">
                                <p className="text-sm mb-4 text-gray-800 dark:text-gray-400">
                                    &copy; {footerText}
                                </p>

                                <div className="flex justify-center space-x-4">
                                    <a
                                        href={page.props.socials?.site_facebook_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-accent transition duration-200"
                                        aria-label="Facebook"
                                    >
                                        <FaFacebookF size={20} className='text-gray-800 dark:text-gray-200 hover:text-accent' />
                                    </a>
                                    <a
                                        href={page.props.socials?.site_twitter_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-accent transition duration-200"
                                        aria-label="Twitter"
                                    >
                                        <FaTwitter size={20} className='text-gray-800 dark:text-gray-200 hover:text-accent' />
                                    </a>
                                    <a
                                        href={page.props.socials?.site_instagram_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-accent transition duration-200"
                                        aria-label="Instagram"
                                    >
                                        <FaInstagram size={20} className='text-gray-800 dark:text-gray-200 hover:text-accent' />
                                    </a>
                                    <a
                                        href={page.props.socials?.site_linkedin_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-accent transition duration-200"
                                        aria-label="LinkedIn"
                                    >
                                        <FaLinkedinIn size={20} className='text-gray-800 dark:text-gray-200 hover:text-accent' />
                                    </a>
                                </div>
                            </div>
                        </footer>
                    </div>
                )}
            </main>

        </div>
    );
}
