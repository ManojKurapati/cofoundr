import React from 'react';
import { motion } from 'framer-motion';
import { Search, FlaskConical, Code } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search size={32} color="var(--electric-emerald)" />,
      title: 'Search the Network',
      description: 'Use semantic search to describe your business problem. Our embedding engine matches you with the exact right agent.'
    },
    {
      icon: <FlaskConical size={32} color="var(--electric-emerald)" />,
      title: 'Test in the Sandbox',
      description: 'Run dummy data through the agent in our secure environment to verify the output formatting and accuracy.'
    },
    {
      icon: <Code size={32} color="var(--electric-emerald)" />,
      title: 'Integrate the API',
      description: 'Copy one line of code. Route your workflow through our gateway and let the agent do the heavy lifting.'
    }
  ];

  return (
    <section id="how-it-works" className="section-padding">
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', fontWeight: 700, marginBottom: '1rem' }}
          >
            From discovery to <span className="text-gradient">deployment in minutes.</span>
          </motion.h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', position: 'relative' }}>
          
          {/* Decorative Connecting Line (Desktop only) */}
          <div className="how-it-works-line" style={{ position: 'absolute', top: '40px', left: '10%', right: '10%', height: '2px', background: 'rgba(255,255,255,0.05)', zIndex: 0 }} />

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              style={{ padding: '2rem', position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div className="glass" style={{ width: 80, height: 80, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', background: 'var(--deep-navy)', border: '2px solid rgba(0,255,163,0.3)', boxShadow: '0 0 20px rgba(0,255,163,0.1)' }}>
                {step.icon}
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem' }}>
                <span style={{ color: 'var(--text-muted)', marginRight: '8px' }}>{index + 1}.</span> 
                {step.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '300px' }}>
                {step.description}
              </p>
            </motion.div>
          ))}
          
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
