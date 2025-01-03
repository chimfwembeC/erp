import React from 'react';
import PlanCard from './PlanCard';

const plans = [
    {
        id: 1,
        name: "Starter Plan",
        price: "ZMW 300.00",
        billingCycle: "month",
        headings: {
            includes: "Starter Plan Includes:",
            functionality: "Basic Functionality Enabled:",
        },
        features: {
            included: ["5 Users", "Unlimited Customers", "Email Support", "500MB Storage"],
            functionality: ["CRM", "Accounting"],
        },
        link: "/register/starter",
    },
    {
        id: 2,
        name: "Business Plan",
        price: "ZMW 740.27",
        billingCycle: "month",
        headings: {
            includes: "Business Plan Includes:",
            functionality: "Enhanced Functionality Enabled:",
        },
        features: {
            included: ["10 Users", "Unlimited Customers", "Unlimited Suppliers", "1GB Storage"],
            functionality: ["CRM", "HRM", "Accounting", "POS"],
        },
        link: "/register/business",
    },
    {
        id: 3,
        name: "Enterprise Plan",
        price: "ZMW 1500.00",
        billingCycle: "month",
        headings: {
            includes: "Enterprise Plan Includes:",
            functionality: "Advanced Functionality Enabled:",
        },
        features: {
            included: ["Unlimited Users", "Priority Support", "10GB Storage"],
            functionality: ["CRM", "HRM", "Accounting", "Project Management", "POS"],
        },
        link: "/register/enterprise",
    },
];

export default function PlanGrid() {
    return (
        <section className="py-16 bg-gray-50">
            <h2 className="text-center text-3xl font-bold text-primary mb-8">
                Choose Your Plan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto px-6">
                {plans.map(plan => (
                    <PlanCard key={plan.id} plan={plan} />
                ))}
            </div>
        </section>
    );
}
