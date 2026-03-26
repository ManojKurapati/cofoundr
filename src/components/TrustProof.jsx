import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, HeadphonesIcon, FileText } from 'lucide-react';

const TrustProof = () => {
  const metrics = [
    {
      icon: <TrendingUp size={28} />,
      stat: '200+',
      label: 'leads generated in 2 weeks',
      accent: '#00FFA3'
    },
    {
      icon: <HeadphonesIcon size={28} />,
      stat: '70%',
      label: 'reduction in support workload',
      accent: '#818CF8'
    },
    {
      icon: <FileText size={28} />,
      stat: '100+',
      label: 'content pieces created automatically',
      accent: '#F472B6'
    }
  ];

  return (
    <section id="trust-proof" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{ 
        position: 'absolute', top: '50%', left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: '600px', height: '600px', 
        background: 'radial-gradient(circle, rgba(0,255,163,0.06) 0%, transparent 60%)', 
        pointerEvents: 'none' 
      }} />

      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', fontWeight: 700, marginBottom: '1rem' }}
          >
            Real results from <span className="text-emerald">AI workers</span>
          </motion.h2>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2rem' 
        }}>
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className="glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
              style={{ 
                padding: '2.5rem 2rem', 
                textAlign: 'center',
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div style={{ 
                width: 60, height: 60, borderRadius: '50%', 
                background: `${metric.accent}1A`, 
                border: `1px solid ${metric.accent}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: metric.accent,
                boxShadow: `0 0 20px ${metric.accent}15`
              }}>
                {metric.icon}
              </div>
              <div style={{ 
                fontSize: '3rem', fontWeight: 800, 
                color: metric.accent,
                textShadow: `0 0 20px ${metric.accent}40`,
                lineHeight: 1
              }}>
                {metric.stat}
              </div>
              <p style={{ 
                color: 'var(--text-muted)', fontSize: '1.05rem', 
                lineHeight: 1.5, textTransform: 'capitalize' 
              }}>
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrustProof;
