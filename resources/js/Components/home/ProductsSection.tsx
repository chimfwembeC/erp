import React from 'react'
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

const products = [
    {
        name: 'CloudManager Pro',
        description: 'Complete cloud infrastructure management solution',
        features: ['Resource Monitoring', 'Cost Optimization', 'Security Management'],
    },
    {
        name: 'DataInsight Analytics',
        description: 'Advanced data analytics and visualization platform',
        features: ['Real-time Analytics', 'Custom Dashboards', 'Predictive Insights'],
    },
    {
        name: 'SecureGuard',
        description: 'Enterprise-grade security management system',
        features: ['Threat Detection', 'Access Control', '24/7 Monitoring'],
    },
];

const ProductsSection = () => {
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-slideUp">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Products</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">Enterprise-grade SaaS solutions</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fadeIn"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mb-4">{product.name}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">{product.description}</p>
                            <ul className="space-y-2">
                                {product.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center text-gray-600 dark:text-gray-200">
                                        <ArrowRight className="h-4 w-4 text-primary mr-2" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductsSection;
