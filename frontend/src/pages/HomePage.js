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
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-primary-50/30 to-white"></div>

                <div className="max-w-7xl mx-auto relative">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="z-10">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                                Quickest and easiest{' '}
                                <span className="text-gradient">parcel tracking</span>{' '}
                                platform for your needs.
                            </h1>

                            <p className="text-lg text-gray-600 mb-8 max-w-lg">
                                Track, claim, and manage all your parcels in one place.
                                Built for residents and administrators to streamline parcel management.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4 mb-12">
                                <Link to="/register" className="btn-primary inline-flex items-center space-x-2">
                                    <span>Get Started</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                                <Link to="/features" className="btn-secondary inline-flex items-center space-x-2">
                                    <span>See Features</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>

                            {/* Trusted By Section */}
                            <div className="pt-8 border-t border-gray-100">
                                <p className="text-sm text-gray-500 mb-4">Trusted by leading carriers</p>
                                <div className="flex flex-wrap items-center gap-6">
                                    {partners.map((partner, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center space-x-2 text-gray-400 hover:text-gray-600 transition-colors"
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
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
            </section>

            {/* Features Preview Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Everything you need to manage parcels
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            A complete solution for both users and administrators
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="card group hover:-translate-y-2">
                            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-500 transition-colors">
                                <svg className="w-7 h-7 text-primary-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Track Parcels</h3>
                            <p className="text-gray-600">
                                Real-time tracking with instant notifications when your parcel arrives.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="card group hover:-translate-y-2">
                            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500 transition-colors">
                                <svg className="w-7 h-7 text-green-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Claim Easily</h3>
                            <p className="text-gray-600">
                                Simple one-click claiming process with digital signatures.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="card group hover:-translate-y-2">
                            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500 transition-colors">
                                <svg className="w-7 h-7 text-purple-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Admin Dashboard</h3>
                            <p className="text-gray-600">
                                Comprehensive dashboard for administrators to manage all parcels.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-primary-800">
                <div className="max-w-7xl mx-auto">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        <div>
                            <p className="text-4xl sm:text-5xl font-bold text-white mb-2">10K+</p>
                            <p className="text-primary-200">Parcels Tracked</p>
                        </div>
                        <div>
                            <p className="text-4xl sm:text-5xl font-bold text-white mb-2">99.9%</p>
                            <p className="text-primary-200">Uptime</p>
                        </div>
                        <div>
                            <p className="text-4xl sm:text-5xl font-bold text-white mb-2">500+</p>
                            <p className="text-primary-200">Active Users</p>
                        </div>
                        <div>
                            <p className="text-4xl sm:text-5xl font-bold text-white mb-2">24/7</p>
                            <p className="text-primary-200">Support</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-white">ParcelHub</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            © 2024 ParcelHub. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
