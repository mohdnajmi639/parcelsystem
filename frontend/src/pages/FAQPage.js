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
            answer: "Currently, you can reset your password by contacting the support desk or visiting the ParcelHub center in person."
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen pt-20 pb-12 bg-gray-50 dark:bg-gray-900">
            <div className="bg-primary-600 text-white py-16 px-4 mb-12">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
                    <p className="text-lg text-primary-100">Find answers to common questions about ParcelHub.</p>
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

                <div className="mt-12 text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Can't find what you're looking for?</p>
                    <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-primary-600 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors">
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
