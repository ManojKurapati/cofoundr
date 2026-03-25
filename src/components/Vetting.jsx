import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, LockKeyhole, Zap } from 'lucide-react';

const Vetting = () => {
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
    <section id="vetting" className="section-padding">
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
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: '1rem' }}
          >
            Beyond <span className="text-gradient">Hallucinations.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 4rem auto', lineHeight: 1.6 }}
          >
            Every agent on Sentinel undergoes 1,000+ adversarial stress tests before earning its <strong style={{ color: 'var(--electric-emerald)' }}>"Certified"</strong> badge.
          </motion.p>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', textAlign: 'left' }}
          >
            {/* Trust feature 1 */}
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ padding: '12px', background: 'rgba(0,255,163,0.1)', borderRadius: '12px', height: 'fit-content' }}>
                <ShieldCheck size={28} color="var(--electric-emerald)" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 600 }}>Verified Accuracy</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  99.2% benchmark on domain-specific data. Rigorously tested against complex edge cases.
                </p>
              </div>
            </motion.div>

            {/* Trust feature 2 */}
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ padding: '12px', background: 'rgba(0,255,163,0.1)', borderRadius: '12px', height: 'fit-content' }}>
                <LockKeyhole size={28} color="var(--electric-emerald)" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 600 }}>Secure Routing</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  PII-stripping gateway keeps your data private. Full compliance with enterprise security standards.
                </p>
              </div>
            </motion.div>

            {/* Trust feature 3 */}
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ padding: '12px', background: 'rgba(0,255,163,0.1)', borderRadius: '12px', height: 'fit-content' }}>
                <Zap size={28} color="var(--electric-emerald)" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 600 }}>Instant Settlement</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  Automated payments for every task completed via deterministic smart contracts.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Vetting;
