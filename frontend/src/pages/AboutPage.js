import React from 'react';

const AboutPage = () => {
    return (
        <div className="min-h-screen pt-20 pb-12 bg-gray-50 dark:bg-gray-900">
            {/* Hero Section */}
            <div className="bg-primary-600 text-white py-20 px-4 sm:px-6 lg:px-8 mb-12">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">About ParcelHub</h1>
                    <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
                        We are revolutionizing campus logistics with smart, secure, and seamless parcel tracking solutions.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                        <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                            <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            To provide students and faculty with a reliable, efficient, and user-friendly system for managing mail and packages. We aim to eliminate lost parcels and reduce wait times through innovative technology.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                        <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6">
                            <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            A campus where logistics are invisible and effortless. We envision a future where every delivery is tracked in real-time and collected within minutes of arrival.
                        </p>
                    </div>
                </div>

                {/* Team Section */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Meet the Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Team Member 1 */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 group hover:shadow-xl transition-shadow">
                            <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Alex Johnson</h3>
                                <p className="text-primary-600 font-medium mb-3">CEO & Founder</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Passionate about logistics and student welfare.</p>
                            </div>
                        </div>

                        {/* Team Member 2 */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 group hover:shadow-xl transition-shadow">
                            <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Sarah Lee</h3>
                                <p className="text-primary-600 font-medium mb-3">Lead Developer</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Building robust and scalable systems.</p>
                            </div>
                        </div>

                        {/* Team Member 3 */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 group hover:shadow-xl transition-shadow">
                            <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Mike Brown</h3>
                                <p className="text-primary-600 font-medium mb-3">Operations Manager</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Ensuring smooth daily operations.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
