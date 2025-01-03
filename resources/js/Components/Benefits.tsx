import { Link } from '@inertiajs/react';
import React from 'react';

export default function Benefits() {
    return (
        <div>
            <section className="px-6 flex flex-col md:flex-row-reverse items-center space-y-8 gap-4 md:space-y-0 md:space-x-12 min:h-screen-70">
                {/* Image Section */}
                <div className="border-2 p-2 rounded-lg hover:border-primary hover:scale-105 transition-transform duration-200 ease-out">
                    <img
                        src="assets/svgs/undraw_selection_re_ycpo.svg"
                        alt="Benefits illustration"
                        className="w-64 h-64 rounded-lg"
                    />
                </div>

                {/* Text Content Section */}
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-primary">
                        Why Choose Our ERP System?
                    </h2>
                    <p className="mt-4 text-gray-700 leading-relaxed">
                        We are a dedicated software development team specializing in ERP systems tailored to your business needs. Our comprehensive ERP solution integrates all key aspects of your operations, enabling seamless collaboration and boosting productivity.
                    </p>

                    <h3 className="mt-6 text-xl font-semibold text-primary">
                        Core Modules:
                    </h3>
                    <ul className="mt-2 text-gray-700">
                        <li>📊 <span className="font-medium">Project Management:</span> Streamline tasks, timelines, and team collaboration.</li>
                        <li>💰 <span className="font-medium">Accounting:</span> Track finances, manage invoices, and ensure compliance.</li>
                        <li>📦 <span className="font-medium">Inventory Management:</span> Monitor stock levels, optimize warehouses, and prevent shortages.</li>
                        <li>🤝 <span className="font-medium">Customer Relations (CRM):</span> Build stronger customer relationships and manage leads.</li>
                        <li>🛒 <span className="font-medium">POS:</span> Simplify sales with an efficient point-of-sale solution.</li>
                        <li>🏷️ <span className="font-medium">Supplier Management:</span> Collaborate effectively with suppliers to enhance procurement.</li>
                    </ul>

                    <h3 className="mt-6 text-xl font-semibold text-primary">
                        Additional Services We Provide:
                    </h3>
                    <ul className="mt-2 text-gray-700">
                        <li>💻 <span className="font-medium">Custom Software Development:</span> Tailored applications for your business.</li>
                        <li>🌐 <span className="font-medium">Networking Solutions:</span> Reliable and secure IT infrastructure setup and management.</li>
                        <li>🛠️ <span className="font-medium">Helpdesk Support:</span> Timely and effective technical support to keep you running smoothly.</li>
                        <li>🎨 <span className="font-medium">Graphic Design:</span> Creative designs that capture your brand's identity.</li>
                    </ul>

                    <p className="mt-6 text-gray-700">
                        Whether you're a small business or a large enterprise, our ERP system scales with you to meet your growing needs.
                    </p>

                    <Link
                        href="/about"
                        className="mt-6 inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-accent transition-all"
                    >
                        Learn More
                    </Link>
                </div>
            </section>
        </div>
    );
}
