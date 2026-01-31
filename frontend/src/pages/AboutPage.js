import React from 'react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section with Video Background */}
            <div className="relative overflow-hidden text-white py-20 px-4 sm:px-6 lg:px-8 mb-12 h-[500px] flex items-center justify-center -mt-20">
                {/* YouTube Video Background */}
                <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                    <iframe
                        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 scale-[2.5]"
                        src="https://www.youtube.com/embed/UtrbnCYow_s?autoplay=1&mute=1&loop=1&playlist=UtrbnCYow_s&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
                        title="Background Video"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    ></iframe>
                </div>
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>
                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto text-center pt-20">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">About ParcelHub</h1>
                    <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Team Member 1 - Mr. Najmi */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 group hover:shadow-xl transition-shadow">
                            <div className="h-80 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                <img
                                    src="/images/team/mr-najmi.png"
                                    alt="Mr. Najmi"
                                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Mr. Najmi</h3>
                                <p className="text-primary-600 font-medium mb-3">CEO & Founder</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Leading the vision and strategic direction of ParcelHub.</p>
                            </div>
                        </div>

                        {/* Team Member 2 - Mr. Amsyar */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 group hover:shadow-xl transition-shadow">
                            <div className="h-80 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                <img
                                    src="/images/team/mr-amsyar.png"
                                    alt="Mr. Amsyar"
                                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Mr. Amsyar</h3>
                                <p className="text-primary-600 font-medium mb-3">System Developer</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Building robust and scalable systems for seamless operations.</p>
                            </div>
                        </div>

                        {/* Team Member 3 - Mr. Megat */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 group hover:shadow-xl transition-shadow">
                            <div className="h-80 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                <img
                                    src="/images/team/mr-megat.png"
                                    alt="Mr. Megat"
                                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Mr. Megat</h3>
                                <p className="text-primary-600 font-medium mb-3">Operations Manager</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Ensuring smooth daily operations and logistics.</p>
                            </div>
                        </div>

                        {/* Team Member 4 - Mr. Faris */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 group hover:shadow-xl transition-shadow">
                            <div className="h-80 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                <img
                                    src="/images/team/mr-faris.png"
                                    alt="Mr. Faris"
                                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Mr. Faris</h3>
                                <p className="text-primary-600 font-medium mb-3">System Analyst</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Analyzing requirements and optimizing system performance.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
