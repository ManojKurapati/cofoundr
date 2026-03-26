import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Zap, Bot, Sparkles } from 'lucide-react';

const Hero = () => {
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const smoothX = useSpring(cardX, springConfig);
  const smoothY = useSpring(cardY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cardX.set(e.clientX / rect.width - 0.5);
    cardY.set(e.clientY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };

  return (
    <section className="section-padding" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', paddingTop: '8rem' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '2rem', width: '100%' }}>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ maxWidth: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
        >
          {/* Pre-header badge */}
          <div style={{ 
            display: 'inline-flex', padding: '6px 16px', background: 'rgba(0,255,163,0.1)', border: '1px solid rgba(0,255,163,0.3)', 
            borderRadius: '20px', color: 'var(--electric-emerald)', fontSize: '0.85rem', fontWeight: 600, boxShadow: '0 0 10px rgba(0,255,163,0.15)' 
          }}>
            Built by AI engineers. Designed for founders and operators.
          </div>

          <h1 style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            Replace repetitive work with <span className="text-emerald">AI workers</span> that deliver real results
          </h1>
          
          <p style={{ fontSize: '1.3rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '750px', margin: '0 auto' }}>
            Generate leads, automate workflows, and get business tasks done—without hiring or managing teams.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}
        >
          <a href="#waitlist" className="btn-primary" style={{ padding: '16px 36px', fontSize: '1.1rem' }}>Get Started <span style={{ marginLeft: '8px' }}>→</span></a>
          <a href="#how-it-works" className="btn-secondary" style={{ padding: '16px 32px', fontSize: '1rem' }}>See How It Works</a>
        </motion.div>

        {/* 3D Abstract Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, type: 'spring' }}
          style={{ perspective: 1000, marginTop: '4rem', width: '100%', maxWidth: '800px', height: '300px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            style={{
              width: '100%',
              height: '100%',
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              position: 'relative'
            }}
          >
            {/* Central Glow */}
            <motion.div style={{ position: 'absolute', top: '50%', left: '50%', width: 120, height: 120, x: '-50%', y: '-50%', translateZ: 40, borderRadius: '50%', background: 'radial-gradient(circle, var(--electric-emerald) 0%, transparent 70%)', filter: 'blur(10px)' }} />
            <motion.div className="glass" style={{ position: 'absolute', top: '50%', left: '50%', width: 100, height: 100, x: '-50%', y: '-50%', translateZ: 60, borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,255,163,0.5)', background: 'rgba(13,22,41,0.8)', boxShadow: '0 0 30px rgba(0,255,163,0.2)' }}>
              <Zap size={40} color="var(--electric-emerald)" />
            </motion.div>
            
            {/* Floating nodes */}
            <motion.div style={{ position: 'absolute', top: '20%', left: '15%', width: 60, height: 60, translateZ: 20, borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={24} color="var(--text-muted)" />
            </motion.div>
            <motion.div style={{ position: 'absolute', top: '70%', left: '10%', width: 50, height: 50, translateZ: 10, borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
            
            <motion.div style={{ position: 'absolute', top: '30%', right: '15%', width: 70, height: 70, translateZ: 30, borderRadius: '16px', background: 'linear-gradient(135deg, rgba(0,255,163,0.1), rgba(0,0,0,0))', border: '1px solid rgba(0,255,163,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={30} color="var(--text-main)" />
            </motion.div>
            <motion.div style={{ position: 'absolute', top: '65%', right: '20%', width: 40, height: 40, translateZ: 50, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(0,255,163,0.1), rgba(0,0,0,0))', border: '1px solid rgba(0,255,163,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={18} color="var(--text-main)" />
            </motion.div>

            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', translateZ: 0, pointerEvents: 'none' }}>
              <path d="M 120 100 Q 250 150 400 150" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 100 230 Q 250 150 400 150" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 400 150 Q 550 150 680 120" fill="none" stroke="rgba(0,255,163,0.3)" strokeWidth="2" />
              <path d="M 400 150 Q 550 150 640 220" fill="none" stroke="rgba(0,255,163,0.3)" strokeWidth="2" />
            </svg>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
