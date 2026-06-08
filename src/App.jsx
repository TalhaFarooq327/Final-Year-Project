import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Shared */
import Navbar from './components/Navbar';
import Footer from './components/Footer';

/* Landing page sections */
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import QuickInsight from './components/QuickInsight';
import EarlyDetection from './components/EarlyDetection';
import Reviews from './components/Reviews';
import AIDermatologist from './components/AIDermatologist';
import Statistics from './components/Statistics';
import FAQs from './components/FAQs';

/* Auth pages */
import Login from './pages/Login';
import Register from './pages/Register';

/* Analysis workflow */
import SkinAnalysis from './pages/SkinAnalysis';

import './App.css';

/* ── Landing page ── */
const LandingPage = () => (
  <main>
    <Hero />
    <HowItWorks />
    <AIDermatologist />
    <QuickInsight />
    <EarlyDetection />
    <Reviews />
    <Statistics />
    <FAQs />
  </main>
);

function App() {
  return (
    <BrowserRouter>
      {/* Navbar is OUTSIDE Routes — always visible on every page */}
      <Navbar />

      <Routes>
        <Route path="/" element={
          <div className="app">
            <LandingPage />
            <Footer />
          </div>
        } />

        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/analyze"  element={<SkinAnalysis />} />

        {/* Placeholder dashboard */}
        <Route path="/dashboard" element={
          <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Inter, sans-serif',
            flexDirection: 'column',
            gap: 16,
            background: '#F7FAFC',
            paddingTop: 80,
          }}>
            <div style={{
              background: 'white',
              borderRadius: 20,
              padding: '48px 56px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              textAlign: 'center',
              border: '1px solid #E2E8F0',
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1A202C', margin: '0 0 8px' }}>
                Welcome to Psoriasis AI
              </h1>
              <p style={{ color: '#718096', fontSize: 15, margin: '0 0 24px' }}>
                Dashboard coming soon — connect your Flask backend to get started.
              </p>
              <a href="/login" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(135deg,#3182CE,#2563EB)',
                color: 'white', padding: '12px 28px', borderRadius: 12,
                fontWeight: 600, fontSize: 14, textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(49,130,206,0.38)',
              }}>
                ← Back to Login
              </a>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
