import React from 'react';

const HeroGraphics = () => {
    return (
        <div className="relative w-full h-full min-h-[500px]">
            {/* Background Decorative Elements */}
            <div className="absolute top-10 right-0 w-72 h-72 bg-primary-100 dark:bg-primary-900/40 rounded-full opacity-50 blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-48 h-48 bg-primary-200 dark:bg-primary-800/40 rounded-full opacity-40 blur-2xl"></div>

            {/* Main Phone Mockup */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 animate-float">
                <div className="bg-white dark:bg-gray-800 rounded-[40px] shadow-2xl p-3 w-72 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                    {/* Phone Notch */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full"></div>

                    {/* Phone Screen */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-[32px] p-4 pt-8 transition-colors duration-300">
                        {/* Header */}
                        <div className="text-center mb-4">
                            <h4 className="font-bold text-gray-900 dark:text-white">History</h4>
                        </div>

                        {/* Pie Chart */}
                        <div className="flex justify-center mb-4">
                            <div className="relative w-32 h-32">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" fill="none" class="stroke-gray-200 dark:stroke-gray-700" strokeWidth="8" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="8" strokeDasharray="100" strokeDashoffset="25" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="8" strokeDasharray="75" strokeDashoffset="50" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="8" strokeDasharray="50" strokeDashoffset="75" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="8" strokeDasharray="25" strokeDashoffset="100" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">24</span>
                                </div>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                                <span className="text-gray-600 dark:text-gray-400">Delivered</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="text-gray-600 dark:text-gray-400">In Transit</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                <span className="text-gray-600 dark:text-gray-400">Pending</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <span className="text-gray-600 dark:text-gray-400">Claimed</span>
                            </div>
                        </div>

                        {/* Recent Items */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm transition-colors duration-300">
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white text-sm">Amazon</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">9:42 AM</p>
                                </div>
                                <span className="text-green-500 font-semibold text-sm">Delivered</span>
                            </div>
                            <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm transition-colors duration-300">
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white text-sm">Shopee</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">8:26 AM</p>
                                </div>
                                <span className="text-yellow-500 font-semibold text-sm">Pending</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Credit Card */}
            <div className="absolute left-0 top-1/3 animate-float-delayed">
                <div className="relative">
                    {/* Card */}
                    <div className="w-64 h-40 rounded-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-5 shadow-2xl transform -rotate-6">
                        {/* Card Chip */}
                        <div className="w-10 h-8 rounded bg-yellow-400/80 mb-4"></div>

                        {/* Card Pattern */}
                        <div className="absolute top-4 right-4 opacity-20">
                            <svg className="w-16 h-16" viewBox="0 0 100 100" fill="currentColor">
                                <circle cx="30" cy="50" r="25" className="text-white" />
                                <circle cx="70" cy="50" r="25" className="text-white" />
                            </svg>
                        </div>

                        {/* Card Details */}
                        <div className="absolute bottom-5 left-5 right-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/60 text-xs">Tracking ID</p>
                                    <p className="text-white font-mono text-sm">PKG-2024-001</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Second Card (background) */}
                    <div className="absolute -bottom-4 -right-4 w-64 h-40 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 shadow-xl transform rotate-3 -z-10"></div>
                </div>
            </div>

            {/* Floating Cloud with Boxes */}
            <div className="absolute top-20 left-1/3 animate-float">
                <div className="relative">
                    {/* Cloud */}
                    <div className="w-48 h-28 bg-gradient-to-b from-primary-100 to-primary-200 rounded-full relative">
                        <div className="absolute -top-8 left-8 w-20 h-20 bg-gradient-to-b from-primary-100 to-primary-200 rounded-full"></div>
                        <div className="absolute -top-4 right-6 w-16 h-16 bg-gradient-to-b from-primary-100 to-primary-200 rounded-full"></div>
                    </div>

                    {/* Package Icons on Cloud */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        <div className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
                            </svg>
                        </div>
                        <div className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Dots */}
            <div className="absolute bottom-20 right-20 grid grid-cols-3 gap-2">
                {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-primary-200"></div>
                ))}
            </div>
        </div>
    );
};

export default HeroGraphics;
