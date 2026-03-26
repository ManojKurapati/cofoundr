import React from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, UserX, Cpu } from 'lucide-react';

const WhyCofoundr = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const differentiators = [
    {
      icon: <Target size={28} color="var(--electric-emerald)" />,
      title: 'Outcome-Driven',
      description: "You don't pay for tools—you pay for results"
    },
    {
      icon: <Clock size={28} color="var(--electric-emerald)" />,
      title: 'Always Running',
      description: 'AI workers operate 24/7 without supervision'
    },
    {
      icon: <UserX size={28} color="var(--electric-emerald)" />,
      title: 'No Hiring Needed',
      description: 'Replace repetitive roles instantly'
    },
    {
      icon: <Cpu size={28} color="var(--electric-emerald)" />,
      title: 'Built by Experts',
      description: 'AI engineers create and optimize every workflow'
    }
  ];

  return (
    <section id="why-cofoundr" className="section-padding">
      <div className="container">
        
        <motion.div 
          className="glass-card" 
          style={{ padding: '4rem 2rem', textAlign: 'center' }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: '4rem' }}
          >
            Why <span className="text-emerald">Cofoundr.world</span>?
          </motion.h2>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', textAlign: 'center' }}
          >
            {differentiators.map((item, index) => (
              <motion.div key={index} variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '16px', background: 'rgba(0,255,163,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.icon}
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{item.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '250px' }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyCofoundr;
