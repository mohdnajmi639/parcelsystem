import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const ManageParcels = () => {
    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [deleteModal, setDeleteModal] = useState({ open: false, parcel: null });
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchParcels();
    }, []);

    const fetchParcels = async () => {
        try {
            const res = await axios.get(`${API_URL}/parcels`);
            setParcels(res.data);
        } catch (error) {
            console.error('Failed to fetch parcels:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (parcelId, newStatus) => {
        try {
            await axios.put(`${API_URL}/parcels/${parcelId}`, { status: newStatus });
            setParcels(prev => prev.map(p =>
                p._id === parcelId ? { ...p, status: newStatus } : p
            ));
            setMessage({ type: 'success', text: `Status updated to ${newStatus}` });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update status' });
        }
    };

    const handleDelete = async () => {
        if (!deleteModal.parcel) return;

        try {
            await axios.delete(`${API_URL}/parcels/${deleteModal.parcel._id}`);
            setParcels(prev => prev.filter(p => p._id !== deleteModal.parcel._id));
            setDeleteModal({ open: false, parcel: null });
            setMessage({ type: 'success', text: 'Parcel deleted successfully' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to delete parcel' });
        }
    };

    const filteredParcels = parcels.filter(parcel => {
        const matchesSearch =
            parcel.trackingNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            parcel.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            parcel.courier?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' || parcel.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

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
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
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
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Manage Parcels</h1>
                <p className="text-gray-600 dark:text-gray-400">View and manage all parcels in the system.</p>
            </div>

            {/* Message */}
            {message.text && (
                <div className={`mb-6 p-4 rounded-xl flex items-center space-x-3 ${message.type === 'success'
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                        : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                    }`}>
                    {message.type === 'success' ? (
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                    <span className="font-medium">{message.text}</span>
                </div>
            )}

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search by tracking number, student, or courier..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div className="w-full md:w-48">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                        >
                            <option value="all">All Status</option>
                            <option value="Received">Received</option>
                            <option value="Collected">Collected</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tracking #</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Courier</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Shelf</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {filteredParcels.length > 0 ? (
                                filteredParcels.map((parcel) => (
                                    <tr key={parcel._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-sm text-gray-900 dark:text-white">{parcel.trackingNumber}</span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{parcel.studentName}</td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{parcel.courier}</td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{parcel.shelfLocation || '-'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(parcel.status)}`}>
                                                {parcel.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">{formatDate(parcel.createdAt)}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                {parcel.status === 'Received' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(parcel._id, 'Collected')}
                                                        className="px-3 py-1.5 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-700 dark:text-green-400 text-xs font-semibold rounded-lg transition-colors"
                                                    >
                                                        Mark Collected
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => setDeleteModal({ open: true, parcel })}
                                                    className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        <svg className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                        <p>{searchTerm || filterStatus !== 'all' ? 'No parcels match your search.' : 'No parcels yet.'}</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Table footer */}
                <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Showing {filteredParcels.length} of {parcels.length} parcels
                    </p>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 animate-[fadeIn_0.2s_ease-out]">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Delete Parcel</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">This action cannot be undone.</p>
                            </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Are you sure you want to delete parcel <span className="font-mono font-semibold">{deleteModal.parcel?.trackingNumber}</span>?
                        </p>

                        <div className="flex space-x-3">
                            <button
                                onClick={() => setDeleteModal({ open: false, parcel: null })}
                                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageParcels;
