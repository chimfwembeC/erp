import React from 'react';
import { OrganizationChart } from 'primereact/organizationchart';

const orgStructure = [
    {
        label: (
            <div className="text-center">
                <img
                    src="/assets/team/ck.png"
                    alt="Chimfwembe Kangwa"
                    className="w-16 h-16 rounded-full mx-auto mb-2"
                />
                <h3 className="text-sm font-bold text-gray-900">Chimfwembe Kangwa</h3>
                <p className="text-xs text-gray-600">Founder/CTO/Developer</p>
            </div>
        ),
        children: [
            {
                label: (
                    <div className="text-center">
                        <img
                            src="/assets/team/jb.png"
                            alt="Joseph Banda"
                            className="w-16 h-16 rounded-full mx-auto mb-2"
                        />
                        <h3 className="text-sm font-bold text-gray-900">Joseph Banda</h3>
                        <p className="text-xs text-gray-600">Co Founder/Operations Manager/Developer</p>
                    </div>
                ),
                children: [
                    {
                        label: (
                            <div className="text-center">
                                <img
                                    src="/assets/team/fk.png"
                                    alt="Fackson Kangwa"
                                    className="w-16 h-16 rounded-full mx-auto mb-2"
                                />
                                <h3 className="text-sm font-bold text-gray-900">Fackson Kangwa</h3>
                                <p className="text-xs text-gray-600">UI/UX Designer/Developer</p>
                            </div>
                        ),
                    },
                ],
            },
            {
                label: (
                    <div className="text-center">
                        <img
                            src="/assets/team/jc.png"
                            alt="Joel Chabana"
                            className="w-16 h-16 rounded-full mx-auto mb-2"
                        />
                        <h3 className="text-sm font-bold text-gray-900">Joel Chabana</h3>
                        <p className="text-xs text-gray-600">Marketing Manager/Finance</p>
                    </div>
                ),
            },
            {
                label: (
                    <div className="text-center">
                        <img
                            src="/assets/team/jb98.png"
                            alt="Joseph Banda"
                            className="w-16 h-16 rounded-full mx-auto mb-2"
                        />
                        <h3 className="text-sm font-bold text-gray-900">Joseph Banda</h3>
                        <p className="text-xs text-gray-600">Sales Representative/Finance</p>
                    </div>
                ),
            },
        ],
    },
];

const OrgChart = () => {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Organization Chart</h2>
                    <p className="text-xl text-gray-600">Discover our team structure</p>
                </div>
                <div className="flex justify-center">
                    <OrganizationChart value={orgStructure} className="p-organizationchart" />
                </div>
            </div>
        </section>
    );
};

export default OrgChart;
