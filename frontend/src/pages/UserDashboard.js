import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expandedBox, setExpandedBox] = useState(null);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [parcelHistory, setParcelHistory] = useState([]);

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

        const userData = JSON.parse(storedUser);
        setUser(userData);
        setLoading(false);

        const userId = userData.id || userData._id;
        if (!userId) {
            console.error("User ID not found in storage");
            return;
        }

        // Fetch parcel history using the dedicated, secure endpoint
        setHistoryLoading(true);
        axios.get(`http://localhost:5000/api/users/${userId}/parcels`)
            .then(res => {
                setParcelHistory(res.data);
            })
            .catch(err => {
                console.error("Failed to fetch history", err);
            })
            .finally(() => {
                setHistoryLoading(false);
            });
    }, [navigate]);



    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                        Welcome, <span className="text-primary-600">{user?.fullName}</span>
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your parcels and track deliveries</p>
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Personal Information</h2>
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
                                <p className={`text-lg font-semibold text-gray-900 dark:text-white ${expandedBox === 'parcels' ? 'break-all' : 'truncate'}`}>{parcelHistory.length}</p>
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


                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Parcel History</h2>

                    {historyLoading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
                        </div>
                    ) : parcelHistory.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-700/50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tracking Number</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Courier</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {parcelHistory.map((parcel) => (
                                        <tr key={parcel._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                {parcel.trackingNumber}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {parcel.courier}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {parcel.shelfLocation || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${parcel.status === 'Collected' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                                    parcel.status === 'Received' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {parcel.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(parcel.updatedAt || parcel.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No parcels found</h3>
                            <p className="text-gray-500 dark:text-gray-400">Parcels you claim will appear here.</p>
                        </div>
                    )}
                </div>

                {/* Support Messages Section */}
                <SupportMessages email={user?.email} />
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

const SupportMessages = ({ email }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!email) return;

        axios.get(`http://localhost:5000/api/messages/user/${email}`)
            .then(res => setMessages(res.data))
            .catch(err => console.error("Failed to fetch messages", err))
            .finally(() => setLoading(false));
    }, [email]);

    if (loading) return null; // Or a small spinner

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Support Messages</h2>
            <div className="space-y-4">
                {messages.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4 italic">You haven't sent any messages yet.</p>
                ) : (
                    messages.map((msg) => (
                        <div key={msg._id} className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-gray-900 dark:text-white">{msg.subject}</h3>
                                <span className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{msg.message}</p>

                            {msg.replyMessage ? (
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30">
                                    <p className="text-xs font-semibold text-blue-800 dark:text-blue-300 mb-1">Admin Reply:</p>
                                    <p className="text-sm text-gray-800 dark:text-gray-200">{msg.replyMessage}</p>
                                    <p className="text-xs text-gray-400 mt-1">{new Date(msg.replyDate).toLocaleDateString()}</p>
                                </div>
                            ) : (
                                <div className="text-xs text-gray-400 italic">Waiting for reply...</div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UserDashboard;
