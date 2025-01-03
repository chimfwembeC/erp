import { Link } from '@inertiajs/react';
import React from 'react';

interface Plan {
    id: number;
    name: string;
    price: string; // e.g., "ZMW 740.27"
    billingCycle: string; // e.g., "month", "year"
    headings: {
        includes: string; // Custom heading for the included features
        functionality: string; // Custom heading for functionality
    };
    features: {
        included: string[]; // List of included features
        functionality: string[]; // List of enabled functionalities
    };
    link: string; // URL for "Get Started" link
}

interface Props {
    plan: Plan;
}

export default function PlanCard({ plan }: Props) {
    return (
        <div className="pt-8 bg-white rounded-lg shadow-md transform transition hover:scale-105">
            {/* Plan Header */}
            <div className="p-4 text-center">
                <h3 className="text-2xl font-semibold">{plan.name}</h3>
                <h4 className="text-md font-semibold">{plan.price}</h4>
                <div className="text-sm">{plan.billingCycle}</div>
            </div>
            <div className="border border-gray-200 m-2"></div>

            {/* Included Features */}
            <div className="p-4">
                <div className="font-semibold">{plan.headings.includes}</div>
                <ul className="text-sm text-gray-700 space-y-3 mt-4">
                    {plan.features.included.map((feature, index) => (
                        <li key={index}>
                            <i className="pi pi-check text-green-500"></i>
                            <span className="mx-4">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Functionality Features */}
            <div className="p-4">
                <div className="font-semibold">{plan.headings.functionality}</div>
                <ul className="text-sm text-gray-700 space-y-3 mt-4">
                    {plan.features.functionality.map((functionality, index) => (
                        <li key={index}>
                            <i className="pi pi-check text-green-500"></i>
                            <span className="mx-4">{functionality}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Get Started Button */}
            <div className="p-4">
                <Link
                    href={plan.link}
                    className="block w-full mt-4 px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-accent transition text-center"
                >
                    Get Started
                </Link>
            </div>
        </div>
    );
}
