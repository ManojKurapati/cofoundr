import React from 'react';
import BackgroundMesh from './components/BackgroundMesh';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import WhySentinel from './components/WhySentinel';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import CreatorsCallout from './components/CreatorsCallout';
import Waitlist from './components/Waitlist';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <BackgroundMesh />
      <Navigation />
      
      <main style={{ position: 'relative', zIndex: 1, paddingTop: '60px' }}>
        <Hero />
        <TrustBar />
        <WhySentinel />
        <Features />
        <HowItWorks />
        <CreatorsCallout />
        <Waitlist />
      </main>
      
      <Footer />
    </>
  );
}

export default App;
