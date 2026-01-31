import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expandedBox, setExpandedBox] = useState(null);

    const toggleExpand = (boxName) => {
        setExpandedBox(expandedBox === boxName ? null : boxName);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (!token || !storedUser) {
            navigate('/login');
            return;
        }

        setUser(JSON.parse(storedUser));
        setLoading(false);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                        Welcome, <span className="text-primary-600">{user?.fullName}</span>
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your parcels and track deliveries</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div
                        className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 cursor-pointer transition-all duration-300 hover:shadow-xl ${expandedBox === 'email' ? 'ring-2 ring-orange-500' : ''}`}
                        onClick={() => toggleExpand('email')}
                    >
                        <div className="flex items-center space-x-4 min-w-0">
                            <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                                <p className={`text-lg font-semibold text-gray-900 dark:text-white ${expandedBox === 'email' ? 'break-all' : 'truncate'}`}>{user?.email}</p>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 cursor-pointer transition-all duration-300 hover:shadow-xl ${expandedBox === 'studentId' ? 'ring-2 ring-primary-500' : ''}`}
                        onClick={() => toggleExpand('studentId')}
                    >
                        <div className="flex items-center space-x-4 min-w-0">
                            <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0c0 .883-.393 1.627-1.08 1.998" />
                                </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Student ID</p>
                                <p className={`text-lg font-semibold text-gray-900 dark:text-white ${expandedBox === 'studentId' ? 'break-all' : 'truncate'}`}>{user?.studentId}</p>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 cursor-pointer transition-all duration-300 hover:shadow-xl ${expandedBox === 'phone' ? 'ring-2 ring-green-500' : ''}`}
                        onClick={() => toggleExpand('phone')}
                    >
                        <div className="flex items-center space-x-4 min-w-0">
                            <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                                <p className={`text-lg font-semibold text-gray-900 dark:text-white ${expandedBox === 'phone' ? 'break-all' : 'truncate'}`}>{user?.phoneNumber}</p>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 cursor-pointer transition-all duration-300 hover:shadow-xl ${expandedBox === 'parcels' ? 'ring-2 ring-purple-500' : ''}`}
                        onClick={() => toggleExpand('parcels')}
                    >
                        <div className="flex items-center space-x-4 min-w-0">
                            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total Parcels</p>
                                <p className={`text-lg font-semibold text-gray-900 dark:text-white ${expandedBox === 'parcels' ? 'break-all' : 'truncate'}`}>0</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link to="/" className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">Track Parcel</span>
                            </div>
                        </Link>

                        <Link to="/settings" className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">Settings</span>
                            </div>
                        </Link>

                        <button onClick={handleLogout} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow text-left">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">Logout</span>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Parcels</h2>
                    <div className="text-center py-12">
                        <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No parcels yet</h3>
                        <p className="text-gray-500 dark:text-gray-400">Track your first parcel to see it here</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
