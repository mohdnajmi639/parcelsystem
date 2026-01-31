import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Placeholder routes for future pages */}
          <Route path="/login" element={<PlaceholderPage title="Sign In" />} />
          <Route path="/register" element={<PlaceholderPage title="Sign Up" />} />
          <Route path="/tracking" element={<PlaceholderPage title="Track Parcel" />} />
          <Route path="/services" element={<PlaceholderPage title="Services" />} />
          <Route path="/pricing" element={<PlaceholderPage title="Pricing" />} />
          <Route path="/contact" element={<PlaceholderPage title="Contact" />} />
          <Route path="/features" element={<PlaceholderPage title="Features" />} />
        </Routes>
      </div>
    </Router>
  );
}

// Temporary placeholder component for routes not yet implemented
const PlaceholderPage = ({ title }) => (
  <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-gray-600">This page is coming soon.</p>
    </div>
  </div>
);

export default App;