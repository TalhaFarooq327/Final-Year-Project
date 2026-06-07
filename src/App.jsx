import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import QuickInsight from './components/QuickInsight';
import EarlyDetection from './components/EarlyDetection';
import Reviews from './components/Reviews';
import AIDermatologist from './components/AIDermatologist';
import Statistics from './components/Statistics';
import FAQs from './components/FAQs';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
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
      <Footer />
    </div>
  );
}

export default App;
