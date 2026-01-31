import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminLayout from './components/AdminLayout';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/UserDashboard';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import Dashboard from './pages/admin/Dashboard';
import ReceiveParcel from './pages/admin/ReceiveParcel';
import ManageParcels from './pages/admin/ManageParcels';
import ManageUsers from './pages/admin/ManageUsers';
import ManageCategories from './pages/admin/ManageCategories';
import Reports from './pages/admin/Reports';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="receive" element={<ReceiveParcel />} />
          <Route path="parcels" element={<ManageParcels />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="categories" element={<ManageCategories />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* Public Routes */}
        <Route path="/*" element={
          <div className="min-h-screen bg-white">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/tracking" element={<PlaceholderPage title="Track Parcel" />} />
              <Route path="/services" element={<PlaceholderPage title="Services" />} />
              <Route path="/pricing" element={<PlaceholderPage title="Pricing" />} />
              <Route path="/features" element={<PlaceholderPage title="Features" />} />
            </Routes>
          </div>
        } />
      </Routes>
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