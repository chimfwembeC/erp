import { Link } from '@inertiajs/react';
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function GuestLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Floating Navbar */}
      <header className="fixed top-0 left-0 w-full bg-primary text-white shadow-lg z-50">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <a href="#" className="text-2xl font-bold text-white hover:text-accent">
            Tekrem Erp
          </a>

          {/* Navbar Links */}
          <nav className="space-x-6 hidden md:flex items-center">
            <Link href="/" className="text-white hover:text-accent transition duration-200">
              Home
            </Link>
            <Link href="/about" className="text-white hover:text-accent transition duration-200">
              About
            </Link>
            <Link href="/features" className="text-white hover:text-accent transition duration-200">
              Features
            </Link>
            <Link href="/contact" className="text-white hover:text-accent transition duration-200">
              Contact
            </Link>
          </nav>

          {/* Login and Register Buttons */}
          <div className="space-x-4 hidden md:flex">
            <Link
              href="/login"
              className="px-4 py-2 border border-white hover:border-accent text-white rounded hover:bg-accent hover:text-white transition duration-200"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-accent text-white rounded hover:bg-primary-dark transition duration-200"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            {/* Add mobile menu icon here */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        <div className="container mx-auto px-6 py-10">{children}</div>
      </main>

      {/* Footer with Social Links */}
      <footer className="bg-primary-dark text-white py-6 mt-10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm mb-4">
            &copy; 2023 ERP System. All rights reserved.
          </p>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent transition duration-200"
              aria-label="Facebook"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent transition duration-200"
              aria-label="Twitter"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent transition duration-200"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent transition duration-200"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
