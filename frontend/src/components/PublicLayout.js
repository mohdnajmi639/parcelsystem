import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import PageTransition from './PageTransition';

const PublicLayout = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
            {/* Background Decorations */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-dot-pattern text-gray-300 dark:text-gray-800 opacity-80"></div>
                {/* Gradient Blobs */}
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary-400/30 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen opacity-90 animate-blob"></div>
                <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-purple-400/30 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen opacity-90 animate-blob animation-delay-2000"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                <Navbar />
                <AnimatePresence mode="wait">
                    <PageTransition key={location.pathname}>
                        <Outlet />
                    </PageTransition>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default PublicLayout;
