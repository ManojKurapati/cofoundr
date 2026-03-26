import React from 'react';
import BackgroundMesh from './components/BackgroundMesh';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import WhatYouCanDo from './components/WhatYouCanDo';
import HowItWorks from './components/HowItWorks';
import AIWorkers from './components/AIWorkers';
import WhyCofoundr from './components/WhyCofoundr';
import TrustProof from './components/TrustProof';
import CreatorsCallout from './components/CreatorsCallout';
import Pricing from './components/Pricing';
import Waitlist from './components/Waitlist';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <BackgroundMesh />
      <Navigation />
      
      <main style={{ position: 'relative', zIndex: 1, paddingTop: '60px' }}>
        <Hero />
        <WhatYouCanDo />
        <HowItWorks />
        <AIWorkers />
        <WhyCofoundr />
        <TrustProof />
        <CreatorsCallout />
        <Pricing />
        <Waitlist />
      </main>
      
      <Footer />
    </>
  );
}

export default App;
