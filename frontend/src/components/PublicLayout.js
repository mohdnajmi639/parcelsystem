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
            {/* Background Decorations - Aurora Effect */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-dot-pattern text-slate-300 dark:text-slate-800/30 opacity-50"></div>

                {/* Aurora Beams */}
                <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 blur-[130px] animate-blob mix-blend-screen"></div>
                <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-r from-purple-400/20 via-fuchsia-500/20 to-pink-600/20 blur-[130px] animate-blob animation-delay-2000 mix-blend-screen"></div>
                <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-gradient-to-r from-blue-400/20 via-teal-500/20 to-emerald-600/20 blur-[130px] animate-blob animation-delay-4000 mix-blend-screen"></div>
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
