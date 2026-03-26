import React from 'react';
import { motion } from 'framer-motion';
import { UserSearch, PenLine, Headphones, Target, Zap, DollarSign } from 'lucide-react';

const AIWorkers = () => {
  const workers = [
    {
      icon: <UserSearch size={36} />,
      title: 'B2B Lead Generator',
      tagline: 'Generate 50–100 qualified leads per week',
      input: 'Target industry + location',
      output: 'Verified leads with contact details',
      pricing: 'Pay per lead',
      accent: '#00FFA3',
      accentBg: 'rgba(0,255,163,0.1)'
    },
    {
      icon: <PenLine size={36} />,
      title: 'LinkedIn Content Engine',
      tagline: 'Create 30 high-quality posts every month',
      input: 'Topic + audience',
      output: 'Ready-to-publish posts',
      pricing: 'Monthly subscription',
      accent: '#818CF8',
      accentBg: 'rgba(129,140,248,0.1)'
    },
    {
      icon: <Headphones size={36} />,
      title: 'Customer Support AI',
      tagline: 'Automate 80% of customer queries',
      input: 'FAQs + product data',
      output: 'Real-time responses',
      pricing: 'Pay per usage',
      accent: '#F472B6',
      accentBg: 'rgba(244,114,182,0.1)'
    }
  ];

  return (
    <section id="ai-workers" className="section-padding">
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', fontWeight: 700, marginBottom: '1rem' }}
          >
            AI workers delivering <span className="text-emerald">real outcomes</span>
          </motion.h2>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {workers.map((worker, index) => (
            <motion.div 
              key={index}
              className="glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.02, y: -4 }}
              style={{ 
                padding: '2.5rem 2rem', 
                display: 'flex', 
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Accent glow */}
              <div style={{ 
                position: 'absolute', top: -60, right: -60, 
                width: 200, height: 200, 
                background: `radial-gradient(circle, ${worker.accentBg} 0%, transparent 70%)`, 
                filter: 'blur(30px)', pointerEvents: 'none' 
              }} />
              
              <div style={{ 
                width: 64, height: 64, borderRadius: '18px', 
                background: worker.accentBg, 
                border: `1px solid ${worker.accent}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                marginBottom: '1.5rem',
                color: worker.accent
              }}>
                {worker.icon}
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                {worker.title}
              </h3>
              <p style={{ color: 'var(--electric-emerald)', fontSize: '1rem', fontWeight: 500, marginBottom: '1.5rem' }}>
                {worker.tagline}
              </p>

              <div style={{ 
                display: 'flex', flexDirection: 'column', gap: '0.75rem',
                padding: '1.25rem 0', borderTop: '1px solid rgba(255,255,255,0.08)',
                marginTop: 'auto'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Target size={16} color="var(--text-muted)" />
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <strong style={{ color: 'white' }}>Input:</strong> {worker.input}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Zap size={16} color="var(--text-muted)" />
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <strong style={{ color: 'white' }}>Output:</strong> {worker.output}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <DollarSign size={16} color="var(--text-muted)" />
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <strong style={{ color: 'white' }}>Pricing:</strong> {worker.pricing}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AIWorkers;
