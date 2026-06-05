import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
<<<<<<< HEAD
import WhyUse from './components/WhyUse';
=======
>>>>>>> 38ef449 ( updated UI)
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
<<<<<<< HEAD
        <WhyUse />
        <QuickInsight />
        <EarlyDetection />
        <Reviews />
        <AIDermatologist />
=======
        <AIDermatologist />
        <QuickInsight />
        <EarlyDetection />
        <Reviews />
>>>>>>> 38ef449 ( updated UI)
        <Statistics />
        <FAQs />
      </main>
      <Footer />
    </div>
  );
}

export default App;
