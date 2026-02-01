import React, { useState } from 'react';

const FAQPage = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "How do I track my parcel?",
            answer: "You can track your parcel by entering your tracking number on the 'Track Parcel' page. If you are a registered user, you can also see all your parcels in the Dashboard."
        },
        {
            question: "How long are parcels held at the center?",
            answer: "We hold parcels for up to 14 days. After 7 days, they are marked as 'Overdue'. If not collected within 30 days, they may be returned to the sender."
        },
        {
            question: "What ID do I need to collect my parcel?",
            answer: "You need to present your valid Student ID card or the digital collection code sent to your email."
        },
        {
            question: "Can someone else collect my parcel for me?",
            answer: "Yes, but they must have your written authorization and a copy of your Student ID, along with their own identification."
        },
        {
            question: "How do I register for an account?",
            answer: "Click on the 'Sign Up' button in the top right corner. You'll need your Student ID and university email address to register."
        },
        {
            question: "I forgot my password, what should I do?",
            answer: "Currently, you can reset your password by contacting the support desk or visiting the JasHub center in person."
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
            <div className="relative text-white py-16 px-4 mb-12 overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/banner/banner.png')" }}
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/30" />
                {/* Content */}
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
                    <p className="text-lg text-gray-200">Find answers to common questions about JasHub.</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
                    {faqs.map((faq, index) => (
                        <div key={index} className="group">
                            <button
                                className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className={`text-lg font-medium pr-8 ${activeIndex === index ? 'text-primary-600' : 'text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors'}`}>
                                    {faq.question}
                                </span>
                                <span className="flex-shrink-0 ml-2">
                                    <svg
                                        className={`w-6 h-6 transform transition-transform duration-200 ${activeIndex === index ? 'rotate-180 text-primary-600' : 'text-gray-400 group-hover:text-primary-600'}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="p-6 pt-0 text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 mb-20 text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Can't find what you're looking for?</p>
                    <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-primary-600 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors">
                        Contact Support
                    </a>
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

export default FAQPage;
