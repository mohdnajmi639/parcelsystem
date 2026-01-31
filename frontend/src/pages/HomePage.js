import React from 'react';
import { Link } from 'react-router-dom';
import HeroGraphics from '../components/HeroGraphics';

const HomePage = () => {
    // Partner logos (using placeholder icons/text)
    const partners = [
        { name: 'J&T Express', icon: '📦' },
        { name: 'Pos Laju', icon: '✉️' },
        { name: 'DHL', icon: '🚚' },
        { name: 'FedEx', icon: '📮' },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-primary-50/30 to-white dark:from-gray-900 dark:via-primary-900/10 dark:to-gray-900"></div>

                <div className="max-w-7xl mx-auto relative">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="z-10">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                                Quickest and easiest{' '}
                                <span className="text-gradient">parcel tracking</span>{' '}
                                platform for your needs.
                            </h1>

                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                                Track, claim, and manage all your parcels in one place.
                                Built for residents and administrators to streamline parcel management.
                            </p>

                            {/* Tracking Input Section */}
                            <div className="w-full max-w-lg mb-12">
                                <form className="flex items-center p-2 bg-white dark:bg-gray-800 rounded-full shadow-2xl border border-gray-100 dark:border-gray-700 relative z-20 transition-all hover:shadow-3xl focus-within:ring-4 focus-within:ring-primary-100 dark:focus-within:ring-primary-900/30">
                                    <div className="flex-1 relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            className="w-full pl-12 pr-4 py-3 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-lg outline-none"
                                            placeholder="Enter Tracking Number"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-full transition duration-200 shadow-md whitespace-nowrap"
                                    >
                                        Track Parcel
                                    </button>
                                </form>
                                <div className="mt-4 flex items-center justify-between pl-4 pr-2 text-sm">
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Note: Please copy and paste the tracking number or enter the full number above.
                                    </p>
                                </div>
                            </div>

                            {/* Trusted By Section */}
                            <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Trusted by leading carriers</p>
                                <div className="flex flex-wrap items-center gap-6">
                                    {partners.map((partner, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center space-x-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                        >
                                            <span className="text-2xl">{partner.icon}</span>
                                            <span className="font-semibold text-sm">{partner.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Graphics */}
                        <div className="hidden lg:block">
                            <HeroGraphics />
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-gray-900"></div>
            </section>

            {/* Features Preview Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Everything you need to manage parcels
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            A complete solution for both users and administrators
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="card group hover:-translate-y-2">
                            <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-500 transition-colors">
                                <svg className="w-7 h-7 text-primary-500 dark:text-primary-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Track Parcels</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Real-time tracking with instant notifications when your parcel arrives.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="card group hover:-translate-y-2">
                            <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500 transition-colors">
                                <svg className="w-7 h-7 text-green-500 dark:text-green-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Claim Easily</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Simple one-click claiming process with digital signatures.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="card group hover:-translate-y-2">
                            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500 transition-colors">
                                <svg className="w-7 h-7 text-purple-500 dark:text-purple-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Admin Dashboard</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Comprehensive dashboard for administrators to manage all parcels.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-900 dark:to-primary-800">
                <div className="max-w-7xl mx-auto">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        <div>
                            <p className="text-4xl sm:text-5xl font-bold text-white mb-2">10K+</p>
                            <p className="text-primary-200 dark:text-primary-300">Parcels Tracked</p>
                        </div>
                        <div>
                            <p className="text-4xl sm:text-5xl font-bold text-white mb-2">99.9%</p>
                            <p className="text-primary-200 dark:text-primary-300">Uptime</p>
                        </div>
                        <div>
                            <p className="text-4xl sm:text-5xl font-bold text-white mb-2">500+</p>
                            <p className="text-primary-200 dark:text-primary-300">Active Users</p>
                        </div>
                        <div>
                            <p className="text-4xl sm:text-5xl font-bold text-white mb-2">24/7</p>
                            <p className="text-primary-200 dark:text-primary-300">Support</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 dark:bg-black border-t border-gray-800">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
                    {/* Left Side - Copyright */}
                    <div className="order-2 md:order-1 w-full md:w-auto text-center md:text-left">
                        <p className="text-gray-400 text-sm">
                            © Copyright 2026. All rights reserved by ParcelHub.
                        </p>
                    </div>

                    {/* Right Side - Contact & Socials */}
                    <div className="flex flex-col items-center md:items-end gap-4 order-1 md:order-2 w-full md:w-auto">
                        {/* Social Icons */}
                        <div className="flex gap-3">
                            <a href="#" className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                </svg>
                            </a>
                            <a href="#" className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                </svg>
                            </a>
                            <a href="#" className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                    <circle cx="4" cy="4" r="2" />
                                </svg>
                            </a>
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-col items-center md:items-end gap-2 text-sm text-gray-400">
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
                                <span>contact@parcelhub.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
