import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'AI Workers', href: '#ai-workers' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'For Builders', href: '#for-builders' },
    { label: 'Pricing', href: '#pricing' }
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 100,
        padding: scrolled ? '1rem 0' : '1.5rem 0',
        background: scrolled ? 'rgba(5, 11, 20, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Logo */}
        <div style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
          Cofoundr<span className="text-emerald">.world</span>
        </div>

        {/* Links (Desktop) */}
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-main)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Primary CTA */}
        <motion.a 
          href="#waitlist"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            background: 'var(--electric-emerald)',
            color: 'var(--deep-navy)',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '0.9rem',
            boxShadow: '0 0 15px var(--emerald-glow), inset 0 0 10px rgba(255,255,255,0.4)',
            transition: 'box-shadow 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 25px var(--emerald-glow), inset 0 0 15px rgba(255,255,255,0.8)'}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 15px var(--emerald-glow), inset 0 0 10px rgba(255,255,255,0.4)'}
        >
          Get Started
        </motion.a>

      </div>
    </motion.header>
  );
};

export default Navigation;
