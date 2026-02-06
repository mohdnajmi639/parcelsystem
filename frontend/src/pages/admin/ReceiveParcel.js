import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const ReceiveParcel = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [formData, setFormData] = useState({
        trackingNumber: '',
        studentName: '',
        phone: '',
        categories: [],
        courier: '',
        shelfLocation: ''
    });

    const [availableCategories, setAvailableCategories] = useState([]);

    const [couriers, setCouriers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [couriersRes, categoriesRes] = await Promise.all([
                    axios.get(`${API_URL}/couriers`),
                    axios.get(`${API_URL}/categories`)
                ]);
                setCouriers(couriersRes.data.map(c => c.name));
                setAvailableCategories(categoriesRes.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        fetchData();
    }, []);

    // Group categories
    const categoryGroups = [
        { name: 'Weight', items: availableCategories.filter(c => c.group === 'Weight') },
        { name: 'Month', items: availableCategories.filter(c => c.group === 'Month') },
        { name: 'Parcel Type', items: availableCategories.filter(c => c.group === 'Parcel Type') }
    ];



    const getColorClasses = (color, isSelected) => {
        const colors = {
            purple: isSelected
                ? 'bg-purple-500 text-white shadow-md'
                : 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 border border-purple-300 dark:border-purple-600 hover:border-purple-400',
            blue: isSelected
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-600 hover:border-blue-400',
            orange: isSelected
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-white dark:bg-gray-700 text-orange-600 dark:text-orange-400 border border-orange-300 dark:border-orange-600 hover:border-orange-400'
        };
        return colors[color] || colors.purple;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCategoryToggle = (category) => {
        setFormData(prev => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...prev.categories, category]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            await axios.post(`${API_URL}/parcels`, formData);
            setMessage({ type: 'success', text: 'Parcel added successfully!' });
            setFormData({
                trackingNumber: '',
                studentName: '',
                phone: '',
                categories: [],
                courier: '',
                shelfLocation: ''
            });

            // Redirect to manage parcels after 2 seconds
            setTimeout(() => {
                navigate('/admin/parcels');
            }, 2000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to add parcel. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Receive Parcel</h1>
                <p className="text-gray-600 dark:text-gray-400">Add a new parcel to the system.</p>
            </div>

            {/* Form Card - Full Width */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* Message */}
                {message.text && (
                    <div className={`p-4 flex items-center space-x-3 ${message.type === 'success'
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-b border-green-200 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-b border-red-200 dark:border-red-800'
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

                <form onSubmit={handleSubmit} className="p-6">
                    {/* Row 1: Tracking Number, Student Name, Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label htmlFor="trackingNumber" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Tracking Number *
                            </label>
                            <input
                                type="text"
                                id="trackingNumber"
                                name="trackingNumber"
                                value={formData.trackingNumber}
                                onChange={handleChange}
                                required
                                placeholder="e.g., JT1234567890"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                        <div>
                            <label htmlFor="studentName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Student Name *
                            </label>
                            <input
                                type="text"
                                id="studentName"
                                name="studentName"
                                value={formData.studentName}
                                onChange={handleChange}
                                required
                                placeholder="e.g., Ahmad bin Ali"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="e.g., 012-3456789"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Row 2: Courier, Shelf Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="courier" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Courier *
                            </label>
                            <select
                                id="courier"
                                name="courier"
                                value={formData.courier}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                            >
                                <option value="">Select a courier</option>
                                {couriers.map((courier) => (
                                    <option key={courier} value={courier}>{courier}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="shelfLocation" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Shelf Location
                            </label>
                            <input
                                type="text"
                                id="shelfLocation"
                                name="shelfLocation"
                                value={formData.shelfLocation}
                                onChange={handleChange}
                                placeholder="e.g., A-12, B-3"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Row 3: Categories - Full Width */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                            Categories
                        </label>
                        <div className="border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 overflow-hidden">
                            <table className="w-full">
                                <tbody>
                                    {categoryGroups.map((group, idx) => (
                                        <tr key={group.name} className={idx !== categoryGroups.length - 1 ? 'border-b border-gray-200 dark:border-gray-600' : ''}>
                                            <td className="px-4 py-3 w-32 bg-gray-100 dark:bg-gray-700/70">
                                                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{group.name}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-wrap gap-2">
                                                    {group.items.length > 0 ? (
                                                        group.items.map((item) => (
                                                            <button
                                                                key={item._id}
                                                                type="button"
                                                                onClick={() => handleCategoryToggle(item.name)}
                                                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${getColorClasses(item.color, formData.categories.includes(item.name))}`}
                                                            >
                                                                {formData.categories.includes(item.name) && (
                                                                    <span className="mr-1">✓</span>
                                                                )}
                                                                {item.name}
                                                            </button>
                                                        ))
                                                    ) : (
                                                        <span className="text-gray-400 text-sm italic">No options available</span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {formData.categories.length > 0 && (
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Selected: {formData.categories.join(', ')}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center space-x-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Adding Parcel...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span>Add Parcel</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReceiveParcel;
