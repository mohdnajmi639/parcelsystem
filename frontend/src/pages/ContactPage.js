import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setFormData(prev => ({
                    ...prev,
                    name: user.fullName || '',
                    email: user.email || ''
                }));
            } catch (error) {
                console.error("Error parsing user data", error);
            }
        }
    }, []);

    const handleAuthCheck = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login', { state: { message: "Please log in to send a message." } });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/messages', formData);
            setStatus('success');
            // Keep name and email, just clear subject and message
            setFormData(prev => ({ ...prev, subject: '', message: '' }));
        } catch (err) {
            console.error('Failed to send message:', err);
            // Optionally set error status
        }

        setTimeout(() => setStatus(null), 5000);
    };

    return (
        <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
            <div className="bg-primary-600 text-white py-16 px-4 mb-12">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                    <p className="text-lg text-primary-100">We'd love to hear from you. Get in touch with us.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h2>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Visit Us</h3>
                                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                                            Jalan Pulau Angsa AU10/A Seksyen U10, UiTM Kampus Puncak Perdana
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Email Us</h3>
                                        <p className="text-gray-600 dark:text-gray-400 mt-1">contact@jashub.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Call Us</h3>
                                        <p className="text-gray-600 dark:text-gray-400 mt-1">+60 (03) 3393 8996</p>
                                        <p className="text-gray-600 dark:text-gray-400">Mon-Fri: 9am - 5pm</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div
                        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all"
                        onClickCapture={handleAuthCheck}
                    >
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h2>
                        {status === 'success' && (
                            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl text-green-600 dark:text-green-400 text-sm">
                                Thank you! Your message has been sent successfully.
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        readOnly
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 cursor-not-allowed focus:outline-none"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        readOnly
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 cursor-not-allowed focus:outline-none"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    placeholder="How can we help?"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    placeholder="Write your message here..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
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
                            <button className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-primary-500 hover:text-white transition-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                </svg>
                            </button>
                            <button className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-primary-500 hover:text-white transition-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                </svg>
                            </button>
                            <button className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-primary-500 hover:text-white transition-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                    <circle cx="4" cy="4" r="2" />
                                </svg>
                            </button>
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

export default ContactPage;
