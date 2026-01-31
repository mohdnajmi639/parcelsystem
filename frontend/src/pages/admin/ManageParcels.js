import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const ManageParcels = () => {
    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [deleteModal, setDeleteModal] = useState({ open: false, parcel: null });
    const [viewModal, setViewModal] = useState({ open: false, parcel: null });
    const [editModal, setEditModal] = useState({ open: false, parcel: null });
    const [editForm, setEditForm] = useState({
        trackingNumber: '',
        studentName: '',
        phone: '',
        categories: [],
        courier: '',
        shelfLocation: '',
        status: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    const couriers = [
        'J&T Express',
        'Pos Laju',
        'DHL',
        'FedEx',
        'Ninja Van',
        'Shopee Express',
        'Lazada Express',
        'Other'
    ];

    const categoryOptions = [
        { group: 'Weight', items: ['1kg', '3kg', '5kg', 'Above 5kg'], color: 'purple' },
        { group: 'Month', items: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], color: 'blue' },
        { group: 'Parcel Type', items: ['Fragile', 'Electronics', 'General'], color: 'orange' }
    ];

    const getCategoryColor = (category) => {
        for (const group of categoryOptions) {
            if (group.items.includes(category)) {
                return group.color;
            }
        }
        return 'gray';
    };

    const getCategoryBadgeClass = (category) => {
        const color = getCategoryColor(category);
        const classes = {
            purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
            blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
            orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
        };
        return classes[color] || classes.purple;
    };

    const getColorClasses = (color, isSelected) => {
        const colors = {
            purple: isSelected
                ? 'bg-purple-500 text-white'
                : 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 border border-purple-300 dark:border-purple-600',
            blue: isSelected
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-600',
            orange: isSelected
                ? 'bg-orange-500 text-white'
                : 'bg-white dark:bg-gray-700 text-orange-600 dark:text-orange-400 border border-orange-300 dark:border-orange-600'
        };
        return colors[color] || colors.purple;
    };

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

    const openEditModal = (parcel) => {
        setEditForm({
            trackingNumber: parcel.trackingNumber || '',
            studentName: parcel.studentName || '',
            phone: parcel.phone || '',
            categories: parcel.categories || [],
            courier: parcel.courier || '',
            shelfLocation: parcel.shelfLocation || '',
            status: parcel.status || 'Received'
        });
        setEditModal({ open: true, parcel });
    };

    const handleCategoryToggle = (category) => {
        setEditForm(prev => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...prev.categories, category]
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editModal.parcel) return;

        try {
            await axios.put(`${API_URL}/parcels/${editModal.parcel._id}`, editForm);
            setParcels(prev => prev.map(p =>
                p._id === editModal.parcel._id ? { ...p, ...editForm } : p
            ));
            setEditModal({ open: false, parcel: null });
            setMessage({ type: 'success', text: 'Parcel updated successfully' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update parcel' });
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
        return date.toLocaleString('en-MY', {
            timeZone: 'Asia/Kuala_Lumpur',
            year: 'numeric',
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
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Categories</th>
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
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{parcel.phone || '-'}</td>
                                        <td className="px-6 py-4">
                                            {parcel.categories && parcel.categories.length > 0 ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {parcel.categories.slice(0, 2).map((cat) => (
                                                        <span key={cat} className={`px-2 py-0.5 rounded text-xs ${getCategoryBadgeClass(cat)}`}>
                                                            {cat}
                                                        </span>
                                                    ))}
                                                    {parcel.categories.length > 2 && (
                                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 rounded text-xs">
                                                            +{parcel.categories.length - 2}
                                                        </span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{parcel.courier}</td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{parcel.shelfLocation || '-'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(parcel.status)}`}>
                                                {parcel.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">{formatDate(parcel.createdAt)}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-1">
                                                {/* View Button */}
                                                <button
                                                    onClick={() => setViewModal({ open: true, parcel })}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>

                                                {/* Edit Button */}
                                                <button
                                                    onClick={() => openEditModal(parcel)}
                                                    className="p-2 text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
                                                    title="Edit Parcel"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => setDeleteModal({ open: true, parcel })}
                                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                    title="Delete Parcel"
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
                                    <td colSpan="9" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
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

            {/* View Details Modal */}
            {viewModal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-lg w-full mx-4 animate-[fadeIn_0.2s_ease-out]">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Parcel Details</h3>
                            </div>
                            <button
                                onClick={() => setViewModal({ open: false, parcel: null })}
                                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Tracking Number</label>
                                    <p className="font-mono text-gray-900 dark:text-white mt-1">{viewModal.parcel?.trackingNumber}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Status</label>
                                    <p className="mt-1">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(viewModal.parcel?.status)}`}>
                                            {viewModal.parcel?.status}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Student Name</label>
                                    <p className="text-gray-900 dark:text-white mt-1">{viewModal.parcel?.studentName}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Phone</label>
                                    <p className="text-gray-900 dark:text-white mt-1">{viewModal.parcel?.phone || '-'}</p>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Categories</label>
                                {viewModal.parcel?.categories && viewModal.parcel.categories.length > 0 ? (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {viewModal.parcel.categories.map((cat) => (
                                            <span key={cat} className={`px-3 py-1 rounded-lg text-sm ${getCategoryBadgeClass(cat)}`}>
                                                {cat}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 mt-1">-</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Courier</label>
                                    <p className="text-gray-900 dark:text-white mt-1">{viewModal.parcel?.courier}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Shelf Location</label>
                                    <p className="text-gray-900 dark:text-white mt-1">{viewModal.parcel?.shelfLocation || '-'}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Created At</label>
                                    <p className="text-gray-900 dark:text-white mt-1">{formatDate(viewModal.parcel?.createdAt)}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Updated At</label>
                                    <p className="text-gray-900 dark:text-white mt-1">{formatDate(viewModal.parcel?.updatedAt)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex space-x-3">
                            {viewModal.parcel?.status === 'Received' && (
                                <button
                                    onClick={() => {
                                        handleStatusUpdate(viewModal.parcel._id, 'Collected');
                                        setViewModal({ open: false, parcel: null });
                                    }}
                                    className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors"
                                >
                                    Mark as Collected
                                </button>
                            )}
                            <button
                                onClick={() => setViewModal({ open: false, parcel: null })}
                                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editModal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-lg w-full mx-4 animate-[fadeIn_0.2s_ease-out]">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Edit Parcel</h3>
                            </div>
                            <button
                                onClick={() => setEditModal({ open: false, parcel: null })}
                                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Tracking Number
                                </label>
                                <input
                                    type="text"
                                    value={editForm.trackingNumber}
                                    onChange={(e) => setEditForm({ ...editForm, trackingNumber: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Student Name
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.studentName}
                                        onChange={(e) => setEditForm({ ...editForm, studentName: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.phone}
                                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                        placeholder="e.g., 012-3456789"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* Categories - Multi-select */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                    Categories
                                </label>
                                <div className="space-y-3 p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 max-h-48 overflow-y-auto">
                                    {categoryOptions.map((group) => (
                                        <div key={group.group}>
                                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">{group.group}</p>
                                            <div className="flex flex-wrap gap-1">
                                                {group.items.map((item) => (
                                                    <button
                                                        key={item}
                                                        type="button"
                                                        onClick={() => handleCategoryToggle(item)}
                                                        className={`px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${getColorClasses(group.color, editForm.categories.includes(item))}`}
                                                    >
                                                        {editForm.categories.includes(item) && <span className="mr-1">✓</span>}
                                                        {item}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Courier
                                    </label>
                                    <select
                                        value={editForm.courier}
                                        onChange={(e) => setEditForm({ ...editForm, courier: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                                    >
                                        <option value="">Select courier</option>
                                        {couriers.map((c) => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Shelf Location
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.shelfLocation}
                                        onChange={(e) => setEditForm({ ...editForm, shelfLocation: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Status
                                </label>
                                <select
                                    value={editForm.status}
                                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                                >
                                    <option value="Received">Received</option>
                                    <option value="Collected">Collected</option>
                                </select>
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setEditModal({ open: false, parcel: null })}
                                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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
