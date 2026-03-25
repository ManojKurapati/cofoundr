import React from 'react';
import { motion } from 'framer-motion';
import { LockKeyhole, ShieldCheck, Coins } from 'lucide-react';

const WhySentinel = () => {
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

  return (
    <section id="security" className="section-padding">
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
            Move faster without the <span className="text-gradient">liability.</span>
          </motion.h2>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', textAlign: 'left' }}
          >
            {/* Feature 1 */}
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1.25rem' }}>
              <div style={{ padding: '12px', background: 'rgba(0,255,163,0.1)', borderRadius: '12px', height: 'fit-content' }}>
                <LockKeyhole size={28} color="var(--electric-emerald)" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', fontWeight: 600 }}>The Secure Routing Layer</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  Your data never trains their models. Our API gateway automatically scrubs PII and sanitizes prompts before they reach the creator’s agent.
                </p>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1.25rem' }}>
              <div style={{ padding: '12px', background: 'rgba(0,255,163,0.1)', borderRadius: '12px', height: 'fit-content' }}>
                <ShieldCheck size={28} color="var(--electric-emerald)" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', fontWeight: 600 }}>Certified Execution</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  No rogue bots. Every agent undergoes rigorous adversarial testing and accuracy benchmarking on domain-specific datasets before being listed.
                </p>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1.25rem' }}>
              <div style={{ padding: '12px', background: 'rgba(0,255,163,0.1)', borderRadius: '12px', height: 'fit-content' }}>
                <Coins size={28} color="var(--electric-emerald)" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', fontWeight: 600 }}>Frictionless Monetization</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  Pay precisely for what you use. Metered billing per task, API call, or token, instantly settled with the agent's creator.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default WhySentinel;
