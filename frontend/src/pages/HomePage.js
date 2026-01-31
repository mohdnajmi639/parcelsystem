import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeroGraphics from '../components/HeroGraphics';

const HomePage = () => {
    const navigate = useNavigate();
    // Partner logos (using placeholder icons/text)
    const partners = [
        { name: 'J&T Express', icon: '📦' },
        { name: 'Pos Laju', icon: '✉️' },
        { name: 'DHL', icon: '🚚' },
        { name: 'FedEx', icon: '📮' },
    ];

    // UI States
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    const [trackingNumber, setTrackingNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [trackingResult, setTrackingResult] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success
    const [paymentMethod, setPaymentMethod] = useState(''); // 'banking', 'counter'
    const [selectedBank, setSelectedBank] = useState('');

    const banks = [
        { name: 'Maybank', color: 'bg-yellow-400 text-black' },
        { name: 'CIMB Clicks', color: 'bg-red-600 text-white' },
        { name: 'Bank Islam', color: 'bg-red-800 text-white' },
        { name: 'RHB Online', color: 'bg-blue-600 text-white' },
        { name: 'Public Bank', color: 'bg-red-500 text-white' },
        { name: 'AmBank', color: 'bg-red-600 text-white' }
    ];

    const handlePayment = (method, bank = '') => {
        setPaymentMethod(method);
        setSelectedBank(bank);
        setPaymentStatus('processing');

        // Simulate payment processing then update DB
        setTimeout(async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const userId = user ? (user.id || user._id) : null;

                if (!userId) {
                    alert("Session invalid. Please login again.");
                    setPaymentStatus('idle');
                    return;
                }

                await axios.put(`http://localhost:5000/api/parcels/${trackingResult._id}`, {
                    status: 'Collected',
                    collectedBy: userId // Link parcel to user
                });

                setPaymentStatus('success');
                // Update local status so UI reflects change immediately if they close/reopen
                setTrackingResult(prev => ({ ...prev, status: 'Collected' }));
            } catch (error) {
                console.error("Payment update failed", error);
                setPaymentStatus('idle');
                alert("Payment processed but failed to update system. Please contact admin.");
            }
        }, 1500);
    };

    const resetTracking = () => {
        setTrackingResult(null);
        setPaymentStatus('idle');
        setPaymentMethod('');
        setSelectedBank('');
    };

    const handleTrack = async (e) => {
        e.preventDefault();
        if (!trackingNumber.trim()) {
            setError('Please enter a tracking number');
            return;
        }

        // Check if user is logged in
        const user = localStorage.getItem('user');
        if (!user) {
            setLoginModalOpen(true);
            return;
        }

        setLoading(true);
        setError('');
        setTrackingResult(null);
        setPaymentStatus('idle'); // Reset payment on new track

        try {
            const response = await axios.get(`http://localhost:5000/api/parcels/track/${trackingNumber}`);
            setTrackingResult(response.data);
        } catch (err) {
            setError(err.response?.data?.error || 'Parcel not found or validation failed.');
        } finally {
            setLoading(false);
        }
    };

    const StatusBadge = ({ status }) => {
        const colors = {
            'Received': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
            'Collected': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
            'Overdue': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
        };
        return (
            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            {/* Login Required Modal */}
            {loginModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-6 transform transition-all scale-100">
                        <div className="text-center mb-6">
                            <div className="mx-auto w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Login Required</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                You need to be logged in to track parcels and view your history.
                            </p>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setLoginModalOpen(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium shadow-lg shadow-primary-500/30 transition-all transform hover:scale-105"
                            >
                                Login Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
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

                            <div className="w-full max-w-lg mb-12">
                                <form onSubmit={handleTrack} className="flex items-center p-2 bg-white dark:bg-gray-800 rounded-full shadow-2xl border border-gray-100 dark:border-gray-700 relative z-20 transition-all hover:shadow-3xl focus-within:ring-4 focus-within:ring-primary-100 dark:focus-within:ring-primary-900/30">
                                    <div className="flex-1 relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            value={trackingNumber}
                                            onChange={(e) => setTrackingNumber(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-lg outline-none"
                                            placeholder="Enter Tracking Number"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-full transition duration-200 shadow-md whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Searching...' : 'Track Parcel'}
                                    </button>
                                </form>
                                <div className="mt-4 flex flex-col pl-4 pr-2">
                                    {error ? (
                                        <p className="text-red-500 font-medium animate-pulse">{error}</p>
                                    ) : (
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                                            Note: Please copy and paste the tracking number or enter the full number above.
                                        </p>
                                    )}
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

            {/* Tracking Result Modal */}
            {
                trackingResult && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white relative">
                                <button
                                    onClick={resetTracking}
                                    className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <div className="flex items-center space-x-3 mb-2">
                                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold">Parcel Found!</h3>
                                </div>
                                <p className="text-primary-100 text-sm font-mono opacity-90 tracking-wider">
                                    #{trackingResult.trackingNumber}
                                </p>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">
                                <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-700">
                                    <span className="text-gray-500 dark:text-gray-400 font-medium">Status</span>
                                    <StatusBadge status={trackingResult.status} />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Owner</h4>
                                        <p className="font-semibold text-gray-900 dark:text-white text-lg">
                                            {trackingResult.studentName}
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Courier</h4>
                                        <p className="font-semibold text-gray-900 dark:text-white text-lg">
                                            {trackingResult.courier}
                                        </p>
                                    </div>
                                </div>

                                {/* Shelf Location Highlight */}
                                <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-xl p-4 flex items-center justify-between">
                                    <div>
                                        <h4 className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-1">PICKUP LOCATION / SHELF</h4>
                                        <div className="flex items-center space-x-2 text-primary-800 dark:text-primary-200">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="font-bold text-lg">{trackingResult.shelfLocation || 'Consult Admin'}</span>
                                        </div>
                                    </div>
                                    <div className="h-10 w-10 bg-primary-200 dark:bg-primary-700 rounded-full flex items-center justify-center text-primary-700 dark:text-white font-bold">
                                        {trackingResult.shelfLocation ? trackingResult.shelfLocation.charAt(0) : '?'}
                                    </div>
                                </div>

                                <div className="pt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                                    Arrived on: {new Date(trackingResult.createdAt).toLocaleDateString()}
                                </div>

                                {/* Payment Section */}
                                <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                                    {trackingResult.status === 'Collected' && paymentStatus !== 'success' ? (
                                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 text-center border border-gray-100 dark:border-gray-600">
                                            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <svg className="w-6 h-6 text-gray-500 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">Parcel Collected</h4>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                                This parcel has already been paid for and collected.
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Make Payment</h3>

                                            {/* Success State */}
                                            {paymentStatus === 'success' ? (
                                                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center animate-fade-in-up">
                                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                                        <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-2">Payment Successful!</h3>
                                                    <p className="text-green-600 dark:text-green-400 mb-4">
                                                        Parcel collected successfully. It has been recorded in your dashboard history.
                                                    </p>
                                                    <p className="text-green-700 dark:text-green-400">
                                                        {paymentMethod === 'banking' ? `Paid via ${selectedBank}` : 'Pay at Counter option selected'}
                                                    </p>
                                                    <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-green-100 dark:border-green-900/50">
                                                        <p className="text-sm font-mono text-gray-500 dark:text-gray-400">Transaction ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                                                    </div>
                                                    <p className="text-xs text-green-600 dark:text-green-500 mt-4">Status updated to 'Collected'</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    {/* Payment Method Selection */}
                                                    {paymentStatus === 'processing' ? (
                                                        <div className="flex flex-col items-center justify-center py-8 space-y-4">
                                                            <svg className="animate-spin h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            <p className="text-gray-600 dark:text-gray-300 animate-pulse">Processing Payment...</p>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {/* Option 1: Internet Banking */}
                                                            <div>
                                                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Option 1: Internet Banking</p>
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    {banks.map((bank) => (
                                                                        <button
                                                                            key={bank.name}
                                                                            onClick={() => handlePayment('banking', bank.name)}
                                                                            className={`${bank.color} hover:opacity-90 py-2 px-3 rounded-lg text-sm font-semibold transition-transform active:scale-95`}
                                                                        >
                                                                            {bank.name}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            <div className="relative flex py-2 items-center">
                                                                <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                                                                <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase">Or</span>
                                                                <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                                                            </div>

                                                            {/* Option 2: Pay at Counter */}
                                                            <div>
                                                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Option 2: Cash</p>
                                                                <button
                                                                    onClick={() => handlePayment('counter')}
                                                                    className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors border-2 border-dashed border-gray-300 dark:border-gray-600"
                                                                >
                                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                                                    </svg>
                                                                    <span>Pay at Counter</span>
                                                                </button>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 flex justify-center">
                                <button
                                    onClick={resetTracking}
                                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium text-sm transition-colors"
                                >
                                    Close Details
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default HomePage;
