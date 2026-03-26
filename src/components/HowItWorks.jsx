import React from 'react';
import { motion } from 'framer-motion';
import { MousePointerClick, FileInput, BotMessageSquare, PackageCheck } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <MousePointerClick size={32} color="var(--electric-emerald)" />,
      title: 'Choose a Task',
      description: 'Pick a business outcome you want to achieve'
    },
    {
      icon: <FileInput size={32} color="var(--electric-emerald)" />,
      title: 'Provide Inputs',
      description: 'Share basic details (target audience, data, preferences)'
    },
    {
      icon: <BotMessageSquare size={32} color="var(--electric-emerald)" />,
      title: 'AI Gets to Work',
      description: 'Your AI worker runs continuously to deliver results'
    },
    {
      icon: <PackageCheck size={32} color="var(--electric-emerald)" />,
      title: 'Get Results',
      description: 'Receive outputs directly—leads, content, reports, or actions'
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
            Simple. Fast. <span className="text-gradient">Autonomous.</span>
          </motion.h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', position: 'relative' }}>
          
          {/* Connecting line */}
          <div style={{ position: 'absolute', top: '40px', left: '10%', right: '10%', height: '2px', background: 'linear-gradient(to right, transparent, rgba(0,255,163,0.2), rgba(0,255,163,0.2), transparent)', zIndex: 0 }} />

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              style={{ padding: '2rem', position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div className="glass" style={{ 
                width: 80, height: 80, borderRadius: '50%', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                marginBottom: '1.5rem', 
                background: 'var(--deep-navy)', 
                border: '2px solid rgba(0,255,163,0.3)', 
                boxShadow: '0 0 20px rgba(0,255,163,0.1)',
                position: 'relative'
              }}>
                {/* Step number badge */}
                <div style={{
                  position: 'absolute', top: -6, right: -6,
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'var(--electric-emerald)', color: 'var(--deep-navy)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.8rem', fontWeight: 700,
                  boxShadow: '0 0 10px rgba(0,255,163,0.4)'
                }}>
                  {index + 1}
                </div>
                {step.icon}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                {step.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '280px' }}>
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
