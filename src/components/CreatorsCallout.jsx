import React from 'react';
import { motion } from 'framer-motion';

const CreatorsCallout = () => {
  return (
    <section id="for-developers" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      
      <div style={{ position: 'absolute', top: '50%', right: '-10%', transform: 'translateY(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(0,255,163,0.1) 0%, transparent 60%)', zIndex: -1, pointerEvents: 'none' }} />
      
      <div className="container">
        <motion.div 
          className="glass-card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', flexWrap: 'wrap', overflow: 'hidden', padding: 0 }}
        >
          {/* Left / Top Side: Content */}
          <div style={{ flex: '1 1 50%', padding: '4rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 700, marginBottom: '1.5rem' }}>
              Build once. <br/><span className="text-emerald">Monetize endlessly.</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
              Are you an AI engineer building state-of-the-art RAG architectures or autonomous agents? Deploy your endpoint to <strong>cofoundr.world</strong>, set your price, and get instant distribution to enterprise budgets. We handle the billing, security, and sales.
            </p>
            <div>
              <a href="#submit-agent" className="btn-secondary" style={{ padding: '14px 32px' }}>Submit Your Agent</a>
            </div>
          </div>

          {/* Right / Bottom Side: Visual/Code Snippet */}
          <div style={{ flex: '1 1 50%', background: 'rgba(5, 11, 20, 0.5)', padding: '4rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ width: '100%', background: '#0D1629', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', gap: '8px', padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
              </div>
              <div style={{ padding: '20px', fontFamily: 'monospace', fontSize: '0.9rem', color: '#e2e8f0', lineHeight: 1.6, overflowX: 'auto' }}>
                <span style={{ color: '#c678dd' }}>import</span> {'{'} Sentinel {'}'} <span style={{ color: '#c678dd' }}>from</span> <span style={{ color: '#98c379' }}>'@cofoundr/sdk'</span>;<br/><br/>
                <span style={{ color: '#c678dd' }}>const</span> agent = <span style={{ color: '#c678dd' }}>new</span> <span style={{ color: '#e5c07b' }}>Sentinel</span>({'{\n'}
                &nbsp;&nbsp;endpoint: <span style={{ color: '#98c379' }}>'https://api.yourdomain.com/v1/run'</span>,\n
                &nbsp;&nbsp;pricePerCall: <span style={{ color: '#d19a66' }}>0.15</span>,\n
                &nbsp;&nbsp;authSecret: process.env.<span style={{ color: '#e06c75' }}>COFOUNDR_SECRET</span>\n
                {'}'});<br/><br/>
                agent.<span style={{ color: '#61afef' }}>deploy</span>().<span style={{ color: '#61afef' }}>then</span>(() <span style={{ color: '#c678dd' }}>=&gt;</span> console.<span style={{ color: '#61afef' }}>log</span>(<span style={{ color: '#98c379' }}>'Agent live.'</span>));
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default CreatorsCallout;
