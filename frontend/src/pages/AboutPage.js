import React from 'react';

const AboutPage = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section with Video Background */}
            <div className="relative overflow-hidden text-white py-20 px-4 sm:px-6 lg:px-8 mb-12 h-[400px] flex items-center justify-center">
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
                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">About JasHub</h1>
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
                        {/* Team Member 1 - Mr. Megat */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 group hover:shadow-xl transition-shadow">
                            <div className="h-80 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                <img
                                    src="/images/team/mr-megat.png"
                                    alt="Mr. Megat"
                                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Megat Naufal</h3>
                                <p className="text-primary-600 font-medium mb-3">Project Manager</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Oversees timeline and scope.</p>
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
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Amir Amsyar</h3>
                                <p className="text-primary-600 font-medium mb-3">Frontend Developer</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Focuses on user interface design and client-side functionality.</p>
                            </div>
                        </div>

                        {/* Team Member 3 - Mr. Najmi */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 group hover:shadow-xl transition-shadow">
                            <div className="h-80 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                <img
                                    src="/images/team/mr-najmi.png"
                                    alt="Mr. Najmi"
                                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Muhammad Najmi</h3>
                                <p className="text-primary-600 font-medium mb-3">Backend Developer</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Manages server-side logic and database architecture.</p>
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
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Faris Afizuan</h3>
                                <p className="text-primary-600 font-medium mb-3">System Analyst</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Analyzes system requirements to ensure efficient solutions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <footer className="py-8 px-4 sm:px-6 lg:px-8 glass border-t border-gray-100 dark:border-gray-800">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
                    {/* Left Side - Copyright */}
                    <div className="order-2 md:order-1 w-full md:w-auto text-center md:text-left">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            © Copyright 2026. All rights reserved by JasHub.
                        </p>
                    </div>

                    {/* Right Side - Contact & Socials */}
                    <div className="flex flex-col items-center md:items-end gap-4 order-1 md:order-2 w-full md:w-auto">
                        {/* Social Icons */}
                        <div className="flex gap-3">
                            {/* Instagram */}
                            <a href="https://www.instagram.com/najmii.exe/" target="_blank" rel="noopener noreferrer" className="group p-2 bg-gray-100 dark:bg-gray-800 rounded-lg transition-all relative">
                                <img src="/images/social media/instagram1.png" alt="Instagram" className="w-5 h-5 object-contain group-hover:opacity-0 transition-opacity" />
                                <img src="/images/social media/instagram.png" alt="Instagram" className="w-5 h-5 object-contain absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                            {/* Twitter/X */}
                            <a href="https://x.com/ameamsyr" target="_blank" rel="noopener noreferrer" className="group p-2 bg-gray-100 dark:bg-gray-800 rounded-lg transition-all relative">
                                <img src="/images/social media/twitter1.png" alt="Twitter" className="w-5 h-5 object-contain group-hover:opacity-0 transition-opacity" />
                                <img src="/images/social media/twitter.png" alt="Twitter" className="w-5 h-5 object-contain absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                            {/* TikTok */}
                            <a href="https://www.tiktok.com/@ameamsyr" target="_blank" rel="noopener noreferrer" className="group p-2 bg-gray-100 dark:bg-gray-800 rounded-lg transition-all relative">
                                <img src="/images/social media/tiktok1.png" alt="TikTok" className="w-5 h-5 object-contain group-hover:opacity-0 transition-opacity" />
                                <img src="/images/social media/tiktok.png" alt="TikTok" className="w-5 h-5 object-contain absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-col items-center md:items-end gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Jalan Pulau Angsa AU10/A Seksyen U10, UiTM Kampus Puncak Perdana</span>

                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>+60 (03) 3393 8996</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>contact@jashub.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AboutPage;
