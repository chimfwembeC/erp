import React from 'react'

export default function Testimonials() {
    return (
        <section className="h-screen-70 px-8">
            {/* Testimonials */}
            <div className="text-center bg-gray-100 rounded-lg shadow-md py-12 px-4">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-8 ">
                    <h2 className="text-2xl font-bold text-primary">
                        What Our Clients Say
                    </h2>
                    <p className="mt-2 text-gray-700">
                        Real stories from our satisfied clients
                    </p>
                </div>
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
    )
}
