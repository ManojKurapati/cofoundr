import React from 'react';
import { motion } from 'framer-motion';
import { UserSearch, PenTool, Headphones, Settings } from 'lucide-react';

const WhatYouCanDo = () => {
  const cards = [
    {
      icon: <UserSearch size={32} color="var(--electric-emerald)" />,
      title: 'Lead Generation',
      description: 'Get qualified leads delivered to your inbox every week',
      gradient: 'linear-gradient(135deg, rgba(0,255,163,0.15) 0%, rgba(0,255,163,0.02) 100%)'
    },
    {
      icon: <PenTool size={32} color="var(--electric-emerald)" />,
      title: 'Content Creation',
      description: 'Generate blogs, social posts, and marketing content automatically',
      gradient: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.02) 100%)'
    },
    {
      icon: <Headphones size={32} color="var(--electric-emerald)" />,
      title: 'Customer Support',
      description: 'Handle customer queries 24/7 without hiring support teams',
      gradient: 'linear-gradient(135deg, rgba(244,114,182,0.15) 0%, rgba(244,114,182,0.02) 100%)'
    },
    {
      icon: <Settings size={32} color="var(--electric-emerald)" />,
      title: 'Operations Automation',
      description: 'Automate repetitive workflows across your business',
      gradient: 'linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(251,191,36,0.02) 100%)'
    }
  ];

  return (
    <section id="what-you-can-do" className="section-padding">
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', fontWeight: 700, marginBottom: '1rem' }}
          >
            What can you <span className="text-emerald">automate today?</span>
          </motion.h2>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {cards.map((card, index) => (
            <motion.div 
              key={index}
              className="glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.03, y: -5 }}
              style={{ 
                padding: '2.5rem 2rem', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                textAlign: 'center',
                background: card.gradient,
                cursor: 'default'
              }}
            >
              <div style={{ 
                width: 72, height: 72, borderRadius: '20px', 
                background: 'rgba(0,255,163,0.1)', 
                border: '1px solid rgba(0,255,163,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                marginBottom: '1.5rem',
                boxShadow: '0 0 20px rgba(0,255,163,0.1)'
              }}>
                {card.icon}
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                {card.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhatYouCanDo;
