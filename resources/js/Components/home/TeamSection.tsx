import React from 'react';
import { Link } from '@inertiajs/react';

const team = [
    {
        name: 'Chimfwembe Kangwa',
        role: 'Founder/CTO/Developer',
        image: '/assets/team/ck.png',
    },
    {
        name: 'Joseph Banda',
        role: 'Co Founder/Operations Manager/Developer',
        image: '/assets/team/jb.png',
    },
    {
        name: 'Temwani Tembo',
        role: 'Project Manager/Marketing',
        image: '/assets/team/jb98.png',
    },
    {
        name: 'Fackson Kangwa',
        role: 'UI/UX Designer/Developer',
        image: '/assets/team/fk.png',
    },
    {
        name: 'Joel Chabana',
        role: 'Marketing Manager/Finance',
        image: '/assets/team/jc.png',
    },
    {
        name: 'Joseph Banda',
        role: 'Sales Representative/Finance',
        image: '/assets/team/jb98.png',
    },

];

const TeamSection = () => {
    return (
        <section className="py-20 bg-white dark:bg-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-slideUp">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Team</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">Meet the experts behind our success</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="relative group text-center animate-fadeIn transition-transform duration-300 hover:scale-150 hover:z-50"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="relative mb-4 aspect-square overflow-hidden rounded-xl">
                                <img
                                    loading="lazy"
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-gray-900/80 to-black dark:from-gray-800/80 dark:via-gray-700 dark:to-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <div className="text-white text-center p-4">
                                        <h3 className="text-xl font-semibold">{member.name}</h3>
                                        <p className="text-xs">{member.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
