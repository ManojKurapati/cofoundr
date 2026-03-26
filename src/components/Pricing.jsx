import React from 'react';
import { motion } from 'framer-motion';
import { Tag, CalendarRange, Activity, CheckCircle } from 'lucide-react';

const Pricing = () => {
  const models = [
    {
      icon: <Tag size={28} />,
      title: 'Pay per result',
      description: 'Only pay when AI workers deliver tangible outputs'
    },
    {
      icon: <CalendarRange size={28} />,
      title: 'Monthly subscriptions',
      description: 'Predictable pricing for ongoing automation needs'
    },
    {
      icon: <Activity size={28} />,
      title: 'Usage-based pricing',
      description: 'Scale costs with your actual consumption'
    }
  ];

  return (
    <section id="pricing" className="section-padding">
      <div className="container" style={{ maxWidth: '900px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', fontWeight: 700, marginBottom: '1rem' }}
          >
            Simple, <span className="text-emerald">transparent</span> pricing
          </motion.h2>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {models.map((model, index) => (
            <motion.div
              key={index}
              className="glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
              style={{ 
                padding: '2rem 1.5rem', 
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div style={{ 
                width: 56, height: 56, borderRadius: '16px',
                background: 'rgba(0,255,163,0.1)', 
                border: '1px solid rgba(0,255,163,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--electric-emerald)'
              }}>
                {model.icon}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{model.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                {model.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ 
            textAlign: 'center', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '0.75rem' 
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--electric-emerald)', fontWeight: 600, fontSize: '1rem' }}>
            <CheckCircle size={18} /> No upfront commitments
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Pay only for value delivered.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default Pricing;
