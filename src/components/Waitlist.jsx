import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      setLoading(true);
      const scriptUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
      
      if (scriptUrl) {
        try {
          const formData = new FormData();
          formData.append('Email', email);
          formData.append('Timestamp', new Date().toISOString());
          
          await fetch(scriptUrl, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
          });
        } catch (error) {
          console.error('Error submitting email', error);
        }
      }
      
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setEmail('');
    }
  };

  return (
    <section id="waitlist" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(0,255,163,0.08) 0%, transparent 60%)', zIndex: -1, pointerEvents: 'none' }} />
      
      <div className="container" style={{ maxWidth: '700px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: '1rem' }}>
            The smartest companies are already hiring <span className="text-emerald">agents.</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '3rem', lineHeight: 1.6 }}>
            Secure your spot in the beta and get $500 in platform compute credits.
          </p>
          
          <form onSubmit={handleSubmit} style={{ position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
            <div className="glass" style={{ display: 'flex', padding: '6px', borderRadius: '40px', background: 'rgba(13, 22, 41, 0.8)' }}>
              <input 
                type="email" 
                placeholder="Enter your work email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'white',
                  padding: '12px 24px',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-sans)'
                }}
                required
              />
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.button 
                    key="submit-btn"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(0, 255, 163, 0.1)',
                      border: '1px solid rgba(0, 255, 163, 0.3)',
                      backdropFilter: 'blur(10px)',
                      color: 'var(--electric-emerald)',
                      padding: '10px 24px',
                      borderRadius: '30px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: 'inset 0 0 10px rgba(0,255,163,0.2), 0 0 15px rgba(0,255,163,0.1)',
                      transition: 'box-shadow 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'inset 0 0 15px rgba(0,255,163,0.4), 0 0 25px rgba(0,255,163,0.3)'}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'inset 0 0 10px rgba(0,255,163,0.2), 0 0 15px rgba(0,255,163,0.1)'}
                  >
                    Get Early Access <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                  </motion.button>
                ) : (
                  <motion.div
                    key="success-msg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'var(--electric-emerald)',
                      color: 'var(--deep-navy)',
                      padding: '10px 24px',
                      borderRadius: '30px',
                      fontWeight: 600,
                    }}
                  >
                    <CheckCircle2 size={18} style={{ marginRight: '8px' }} /> Added
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* The Liquid Glow underneath */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--electric-emerald)', filter: 'blur(20px)', opacity: 0.15, borderRadius: '40px', zIndex: -1, pointerEvents: 'none' }} />
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Waitlist;
