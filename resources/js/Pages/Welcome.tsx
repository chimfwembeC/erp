import { Link } from '@inertiajs/react';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Accordion, AccordionTab } from 'primereact/accordion';

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
        <section className="relative pt-24 pb-24 text-white text-center  h-screen-70">
          {/* Background Image */}
          <img
            src="assets/imgs/hero-section-background.jpeg"
            alt="Background with abstract graphics representing ERP system"
            className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-lg"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-primary opacity-75 rounded-lg" />

          {/* Hero Content */}
          <div className="relative z-10 px-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide">
              Welcome to Our ERP System
            </h1>
            <p className="mt-4 text-lg sm:max-w-lg mx-auto">
              Streamline your business operations with an efficient ERP system
              that grows with you.
            </p>

            {/* Buttons */}

            <div className="mt-8 flex flex-col lg:flex-row justify-center space-y-4 lg:space-y-0 lg:space-x-4">
              <Link
                href="/about"
                className="px-6 sm:px-8 py-3 bg-accent text-white font-semibold rounded-lg shadow-md hover:bg-accent-dark transition duration-200"
              >
                Learn More
              </Link>
              <Link
                href="/register"
                className="px-6 sm:px-8 py-3 bg-white text-primary font-semibold rounded-lg shadow-md hover:bg-gray-200 transition duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="pt-10 bg-background">
          <div className="container mx-auto px-6 py-10 space-y-16">
            {/* Features Section */}
            <section className="flex flex-col md:flex-row items-center gap-4 space-y-8 md:space-y-0 md:space-x-12  h-screen-70">
              <img
                src="assets/svgs/undraw_features_overview_re_2w78.svg"
                alt="Feature illustration"
                className="w-full md:w-1/3 rounded-lg"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-primary">
                  Our Features
                </h2>
                <p className="mt-4 text-gray-700">
                  Discover the powerful tools and features of our ERP system
                  that help you manage resources effectively.
                </p>
                <Link
                  href="/features"
                  className="mt-4 inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-accent"
                >
                  Learn More
                </Link>
              </div>
            </section>

            {/* Plan Benefits Section */}
            <section className="py-16 container mx-auto px-6">
              <h2 className="text-3xl font-bold text-primary text-center mb-8">
                Features & Benefits
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="flex items-start space-x-4">
                  <span className="text-primary-dark text-3xl">✓</span>
                  <div>
                    <h4 className="text-lg font-semibold">
                      Comprehensive Analytics
                    </h4>
                    <p className="text-gray-700">
                      Track and analyze key business metrics in real-time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <span className="text-primary-dark text-3xl">✓</span>
                  <div>
                    <h4 className="text-lg font-semibold">
                      24/7 Customer Support
                    </h4>
                    <p className="text-gray-700">
                      Our team is here to support you around the clock.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <span className="text-primary-dark text-3xl">✓</span>
                  <div>
                    <h4 className="text-lg font-semibold">
                      Secure Data Storage
                    </h4>
                    <p className="text-gray-700">
                      Your data is protected with industry-standard security
                      measures.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Pricing Plans Section */}
            <section className="py-16 bg-gray-50">
              <h2 className="text-center text-3xl font-bold text-primary mb-8">
                Choose Your Plan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto px-6">
                {/* Basic Plan */}
                <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition hover:scale-105">
                  <h3 className="text-2xl font-semibold text-primary mb-4">
                    Basic
                  </h3>
                  <p className="text-gray-800 font-bold text-3xl mb-4">
                    $10<span className="text-lg text-gray-500">/month</span>
                  </p>
                  <ul className="text-gray-700 space-y-3 mb-6">
                    <li>
                      <i className="pi pi-check text-green-500"></i> Basic
                      feature access
                    </li>
                    <li>
                      <i className="pi pi-check text-green-500"></i> Email
                      support
                    </li>
                    <li>
                      <i className="pi pi-check text-green-500"></i> 1GB storage
                    </li>
                  </ul>
                  <Link
                    href="/register"
                    className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-accent transition"
                  >
                    Get Started
                  </Link>
                </div>

                {/* Pro Plan (Highlighted) */}
                <div className="bg-primary text-white p-8 rounded-lg shadow-lg text-center transform scale-105 border-4 border-accent">
                  <h3 className="text-2xl font-semibold mb-4">Pro</h3>
                  <p className="font-bold text-3xl mb-4">
                    $30<span className="text-lg text-gray-300">/month</span>
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li>
                      <i className="pi pi-check"></i> All basic features
                    </li>
                    <li>
                      <i className="pi pi-check"></i> Priority support
                    </li>
                    <li>
                      <i className="pi pi-check"></i> 5GB storage
                    </li>
                  </ul>
                  <Link
                    href="/register"
                    className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-200 transition"
                  >
                    Get Started
                  </Link>
                </div>

                {/* Enterprise Plan */}
                <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition hover:scale-105">
                  <h3 className="text-2xl font-semibold text-primary mb-4">
                    Enterprise
                  </h3>
                  <p className="text-gray-800 font-bold text-3xl mb-4">
                    Contact Us
                  </p>
                  <ul className="text-gray-700 space-y-3 mb-6">
                    <li>
                      <i className="pi pi-check text-green-500"></i> All Pro
                      features
                    </li>
                    <li>
                      <i className="pi pi-check text-green-500"></i> Dedicated
                      support
                    </li>
                    <li>
                      <i className="pi pi-check text-green-500"></i> Unlimited
                      storage
                    </li>
                  </ul>
                  <Link
                    href="/contact"
                    className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-accent transition"
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="flex flex-col md:flex-row-reverse items-center space-y-8 gap-4 md:space-y-0 md:space-x-12  h-screen-70">
              <img
                src="assets/svgs/undraw_selection_re_ycpo.svg"
                alt="Benefits illustration"
                className="w-full md:w-1/3 rounded-lg"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-primary">
                  Why Choose Us?
                </h2>
                <p className="mt-4 text-gray-700">
                  Our ERP system integrates all aspects of your business to
                  ensure seamless collaboration and productivity.
                </p>
                <Link
                  href="/about"
                  className="mt-4 inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-accent"
                >
                  Learn More
                </Link>
              </div>
            </section>

            {/* Call to Action Section */}
            <section className="text-center py-16 bg-primary text-white">
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
            </section>

            {/* Testimonials Section */}
            <section className="h-screen-70">
              {/* Header */}
              <div className="flex flex-col items-center text-center mb-8 ">
                <h2 className="text-2xl font-bold text-primary">
                  What Our Clients Say
                </h2>
                <p className="mt-2 text-gray-700">
                  Real stories from our satisfied clients
                </p>
              </div>

              {/* Testimonials */}
              <div className="text-center bg-gray-100 rounded-lg shadow-md py-12 px-4">
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {/* Testimonial 1 */}
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                    <p className="text-gray-700">
                      "The ERP system has transformed our business efficiency."
                    </p>
                    <span className="block mt-4 font-semibold text-primary-dark">
                      - Client Name
                    </span>
                  </div>

                  {/* Testimonial 2 */}
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                    <p className="text-gray-700">
                      "Highly recommend! It’s streamlined our workflow
                      tremendously."
                    </p>
                    <span className="block mt-4 font-semibold text-primary-dark">
                      - Another Client
                    </span>
                  </div>

                  {/* Testimonial 3 */}
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                    <p className="text-gray-700">
                      "We have saved so much time and resources with this ERP
                      solution."
                    </p>
                    <span className="block mt-4 font-semibold text-primary-dark">
                      - Happy Customer
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-50">
              <h2 className="text-3xl font-bold text-primary text-center mb-8">
                Frequently Asked Questions
              </h2>
              <div className="max-w-2xl mx-auto">
                <Accordion>
                  <AccordionTab header="What is included in the free trial?">
                    <p className="text-gray-700 mt-2">
                      The free trial gives you access to all features for a
                      limited time.
                    </p>
                  </AccordionTab>
                  <AccordionTab header="Can I cancel my subscription?">
                    <p className="text-gray-700 mt-2">
                      Yes, you can cancel your subscription at any time from
                      your account settings.
                    </p>
                  </AccordionTab>
                  <AccordionTab header="Is my data secure with your platform?">
                    <p className="text-gray-700 mt-2">
                      Absolutely. We use industry-standard security measures to
                      protect your data.
                    </p>
                  </AccordionTab>
                  <AccordionTab header="Do you offer customer support?">
                    <p className="text-gray-700 mt-2">
                      Yes, we offer 24/7 support to assist you with any issues.
                    </p>
                  </AccordionTab>
                </Accordion>
              </div>
            </section>

            {/* Call to Action Section */}
            <section className="text-center py-16 bg-primary text-white">
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
            </section>
          </div>
        </main>
      </>
    </GuestLayout>
  );
}
