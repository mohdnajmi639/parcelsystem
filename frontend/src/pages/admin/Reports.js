import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const Reports = () => {
    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        parcelsToday: 0,
        pendingCollection: 0,
        overdue: 0,
        totalParcels: 0
    });
    const [activeCard, setActiveCard] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [parcelsRes, statsRes] = await Promise.all([
                axios.get(`${API_URL}/parcels`),
                axios.get(`${API_URL}/stats`)
            ]);
            setParcels(parcelsRes.data);
            setStats(statsRes.data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate last 7 days data
    const getLast7DaysData = () => {
        const days = [];
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            date.setHours(0, 0, 0, 0);

            const nextDate = new Date(date);
            nextDate.setDate(nextDate.getDate() + 1);

            const count = parcels.filter(p => {
                const parcelDate = new Date(p.createdAt);
                return parcelDate >= date && parcelDate < nextDate;
            }).length;

            days.push({
                label: date.toLocaleDateString('en-US', { weekday: 'short' }),
                date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                count
            });
        }

        return days;
    };

    // Calculate courier distribution
    const getCourierData = () => {
        const courierCounts = {};
        parcels.forEach(p => {
            const courier = p.courier || 'Unknown';
            courierCounts[courier] = (courierCounts[courier] || 0) + 1;
        });

        const colors = [
            { bg: 'bg-blue-500', text: 'text-blue-500' },
            { bg: 'bg-green-500', text: 'text-green-500' },
            { bg: 'bg-purple-500', text: 'text-purple-500' },
            { bg: 'bg-amber-500', text: 'text-amber-500' },
            { bg: 'bg-pink-500', text: 'text-pink-500' },
            { bg: 'bg-cyan-500', text: 'text-cyan-500' },
            { bg: 'bg-red-500', text: 'text-red-500' },
            { bg: 'bg-indigo-500', text: 'text-indigo-500' },
        ];

        return Object.entries(courierCounts).map(([name, count], index) => ({
            name,
            count,
            percentage: parcels.length > 0 ? ((count / parcels.length) * 100).toFixed(1) : 0,
            ...colors[index % colors.length]
        }));
    };

    const last7Days = getLast7DaysData();
    const courierData = getCourierData();
    const maxDayCount = Math.max(...last7Days.map(d => d.count), 1);

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Reports</h1>
                <p className="text-gray-600 dark:text-gray-400">Analytics and insights for parcel management.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    {
                        title: 'Total Parcels',
                        value: stats.totalParcels,
                        icon: (
                            <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        ),
                        bgIcon: 'bg-primary-100 dark:bg-primary-900/30',
                        textColor: 'text-gray-900 dark:text-white',
                        ringColor: 'ring-primary-500'
                    },
                    {
                        title: 'Collection Rate',
                        value: `${stats.totalParcels > 0 ? (((stats.totalParcels - stats.pendingCollection) / stats.totalParcels) * 100).toFixed(0) : 0}%`,
                        icon: (
                            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ),
                        bgIcon: 'bg-green-100 dark:bg-green-900/30',
                        textColor: 'text-green-600 dark:text-green-400',
                        ringColor: 'ring-green-500'
                    },
                    {
                        title: 'Pending',
                        value: stats.pendingCollection,
                        icon: (
                            <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ),
                        bgIcon: 'bg-amber-100 dark:bg-amber-900/30',
                        textColor: 'text-amber-600 dark:text-amber-400',
                        ringColor: 'ring-amber-500'
                    },
                    {
                        title: 'Overdue',
                        value: stats.overdue,
                        icon: (
                            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        ),
                        bgIcon: 'bg-red-100 dark:bg-red-900/30',
                        textColor: 'text-red-600 dark:text-red-400',
                        ringColor: 'ring-red-500'
                    }
                ].map((card, index) => (
                    <div
                        key={index}
                        className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-xl transition-all duration-300 ${activeCard === index ? `ring-2 ${card.ringColor}` : ''}`}
                        onClick={() => setActiveCard(activeCard === index ? null : index)}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{card.title}</p>
                                <p className={`text-3xl font-bold ${card.textColor}`}>{card.value}</p>
                            </div>
                            <div className={`w-12 h-12 ${card.bgIcon} rounded-xl flex items-center justify-center`}>
                                {card.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bar Chart - Parcels per Day */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Parcels Received (Last 7 Days)</h2>

                    <div className="space-y-4">
                        {last7Days.map((day, index) => (
                            <div key={index} className="flex items-center space-x-4">
                                <div className="w-16 text-sm text-gray-500 dark:text-gray-400">{day.label}</div>
                                <div className="flex-1">
                                    <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden relative">
                                        <div
                                            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg transition-all duration-500 flex items-center justify-end pr-3"
                                            style={{ width: `${Math.max((day.count / maxDayCount) * 100, day.count > 0 ? 10 : 0)}%` }}
                                        >
                                            {day.count > 0 && (
                                                <span className="text-white text-xs font-semibold">{day.count}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-20 text-xs text-gray-400">{day.date}</div>
                            </div>
                        ))}
                    </div>

                    {parcels.length === 0 && (
                        <p className="text-center text-gray-400 dark:text-gray-500 mt-4">No parcel data available yet.</p>
                    )}
                </div>

                {/* Pie Chart - Courier Distribution */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Parcels by Courier</h2>

                    {courierData.length > 0 ? (
                        <div className="space-y-4">
                            {courierData.map((courier, index) => (
                                <div key={index} className="flex items-center space-x-4">
                                    <div className={`w-3 h-3 rounded-full ${courier.bg}`}></div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{courier.name}</span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">{courier.count} ({courier.percentage}%)</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${courier.bg} rounded-full transition-all duration-500`}
                                                style={{ width: `${courier.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <p className="text-gray-400 dark:text-gray-500">No courier data available yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reports;
