import React from 'react'
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';




const BlogSection = ({ posts }) => {
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-slideUp">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Latest Insights</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-200">Stay updated with our latest tech articles and news</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <article
                            key={post.id}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fadeIn"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {post.image && (
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-200">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                    {post.content}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500">
                                            {format(post.createdAt, 'MMM d, yyyy')}
                                        </span>
                                        <span className="text-sm text-primary">
                                            {post.authorName}
                                        </span>
                                    </div>
                                    <Link
                                        href={`/blog/${post.id}`}
                                        className="inline-flex items-center text-primary hover:text-accent transition-colors"
                                    >
                                        Read more
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Link
                        href="/blog"
                        className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-accent transition-all duration-300 hover:scale-105"
                    >
                        View All Posts
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
