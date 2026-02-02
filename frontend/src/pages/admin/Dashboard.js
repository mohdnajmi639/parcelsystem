import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const Dashboard = () => {
    const [stats, setStats] = useState({
        parcelsToday: 0,
        pendingCollection: 0,
        overdue: 0,
        totalParcels: 0
    });
    const [recentParcels, setRecentParcels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCard, setActiveCard] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [statsRes, parcelsRes] = await Promise.all([
                axios.get(`${API_URL}/stats`),
                axios.get(`${API_URL}/parcels/recent`)
            ]);
            setStats(statsRes.data);
            setRecentParcels(parcelsRes.data);
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const statsCards = [
        {
            title: 'Parcels Today',
            value: stats.parcelsToday,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
            color: 'blue',
            bgColor: 'bg-blue-500',
            lightBg: 'bg-blue-50 dark:bg-blue-900/20',
            textColor: 'text-blue-600 dark:text-blue-400',
            ringColor: 'ring-blue-500'
        },
        {
            title: 'Pending Collection',
            value: stats.pendingCollection,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: 'yellow',
            bgColor: 'bg-amber-500',
            lightBg: 'bg-amber-50 dark:bg-amber-900/20',
            textColor: 'text-amber-600 dark:text-amber-400',
            ringColor: 'ring-amber-500'
        },
        {
            title: 'Overdue / Unclaimed',
            value: stats.overdue,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            ),
            color: 'red',
            bgColor: 'bg-red-500',
            lightBg: 'bg-red-50 dark:bg-red-900/20',
            textColor: 'text-red-600 dark:text-red-400',
            ringColor: 'ring-red-500'
        },
        {
            title: 'Total Parcels',
            value: stats.totalParcels,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            color: 'green',
            bgColor: 'bg-emerald-500',
            lightBg: 'bg-emerald-50 dark:bg-emerald-900/20',
            textColor: 'text-emerald-600 dark:text-emerald-400',
            ringColor: 'ring-emerald-500'
        }
    ];

    const getStatusBadge = (status) => {
        const statusStyles = {
            'Received': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
            'Collected': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
        };
        return statusStyles[status] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString('en-MY', {
            timeZone: 'Asia/Kuala_Lumpur',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 text-glow">Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-300">Welcome back! Here's your parcel activity overview.</p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* 1. Quick Action Card (Col-span-8) */}
                <div className="col-span-12 md:col-span-12 lg:col-span-8 relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-500 to-primary-600 shadow-2xl hover:shadow-primary-500/30 transition-all duration-300 group cursor-pointer"
                    onClick={() => document.getElementById('add-parcel-link').click()}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 transform transition-transform group-hover:scale-110"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

                    <div className="relative p-8 h-full flex flex-col justify-between items-start">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Ready to receive?</h2>
                            <p className="text-blue-100 max-w-md text-lg">Scan a new parcel and add it to the system instantly.</p>
                        </div>
                        <Link
                            id="add-parcel-link"
                            to="/admin/receive"
                            className="mt-6 inline-flex items-center space-x-2 bg-white text-primary-600 font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Receive Parcel</span>
                        </Link>
                    </div>
                </div>

                {/* 2. Total Parcels Card (Col-span-4) */}
                <div className="col-span-12 md:col-span-6 lg:col-span-4 glass rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                        <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-500">
                            {statsCards[3].icon}
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium mb-1">Total Parcels</p>
                        <h3 className="text-5xl font-bold text-gray-900 dark:text-white">{statsCards[3].value}</h3>
                    </div>
                    <div className="mt-4">
                        <span className="text-emerald-500 font-medium flex items-center text-sm">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            Updated just now
                        </span>
                    </div>
                </div>

                {/* 3. Sub Stats (3 Columns) */}
                {statsCards.slice(0, 3).map((card, index) => (
                    <div
                        key={index}
                        className={`col-span-12 md:col-span-4 glass rounded-3xl p-6 transition-all duration-300 hover:bg-white/20 dark:hover:bg-gray-800/60 group cursor-pointer ${activeCard === index ? `ring-2 ${card.ringColor}` : ''}`}
                        onClick={() => setActiveCard(activeCard === index ? null : index)}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 font-medium text-sm mb-1">{card.title}</p>
                                <h3 className={`text-3xl font-bold ${card.textColor}`}>{card.value}</h3>
                            </div>
                            <div className={`p-3 rounded-2xl ${card.lightBg} group-hover:scale-110 transition-transform duration-300`}>
                                <span className={card.textColor}>{card.icon}</span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* 4. Recent Activity Table (Full Width) */}
                <div className="col-span-12 glass rounded-3xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
                    <div className="p-6 border-b border-white/10 dark:border-gray-700/50 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Latest parcels added to the system</p>
                        </div>
                        <Link
                            to="/admin/parcels"
                            className="bg-white/50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-xl font-medium text-sm transition-all"
                        >
                            View All
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tracking #</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Courier</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100/50 dark:divide-gray-700/50">
                                {recentParcels.length > 0 ? (
                                    recentParcels.map((parcel) => (
                                        <tr key={parcel._id} className="hover:bg-primary-50/30 dark:hover:bg-primary-900/10 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">{parcel.trackingNumber}</span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{parcel.studentName}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                                    <span className="text-gray-600 dark:text-gray-300">{parcel.courier}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${parcel.status === 'Received' ? 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' :
                                                    parcel.status === 'Collected' ? 'bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:border-green-800' :
                                                        'bg-gray-50 text-gray-600 border-gray-200'
                                                    }`}>
                                                    {parcel.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">{formatDate(parcel.createdAt)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                    </svg>
                                                </div>
                                                <p className="text-lg font-medium">No parcels yet</p>
                                                <p className="text-sm">Add your first parcel to get started!</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
