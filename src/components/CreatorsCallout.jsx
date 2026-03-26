import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, ArrowRight, Repeat, DollarSign } from 'lucide-react';

const CreatorsCallout = () => {
  return (
    <section id="for-builders" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      
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
          {/* Left: Content */}
          <div style={{ flex: '1 1 50%', padding: '4rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: '300px' }}>
            <div style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 14px', background: 'rgba(0,255,163,0.1)', 
              border: '1px solid rgba(0,255,163,0.3)', borderRadius: '20px', 
              color: 'var(--electric-emerald)', fontSize: '0.8rem', fontWeight: 600, 
              marginBottom: '1.5rem', width: 'fit-content'
            }}>
              <Hammer size={14} /> For AI Builders
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 700, marginBottom: '1.5rem' }}>
              Build AI workers. <br/><span className="text-emerald">Earn continuously.</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Turn your AI workflows into income-generating products. Deploy once. Get paid every time it runs.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <Repeat size={16} color="var(--electric-emerald)" /> Recurring revenue
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <DollarSign size={16} color="var(--electric-emerald)" /> Set your own pricing
              </div>
            </div>

            <div>
              <a href="#waitlist" className="btn-primary" style={{ padding: '14px 32px' }}>
                Start Building <ArrowRight size={18} style={{ marginLeft: '8px' }} />
              </a>
            </div>
          </div>

          {/* Right: Visual */}
          <div style={{ flex: '1 1 50%', background: 'rgba(5, 11, 20, 0.5)', padding: '4rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid rgba(255,255,255,0.05)', minWidth: '300px' }}>
            <div style={{ width: '100%', background: '#0D1629', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', gap: '8px', padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
              </div>
              <div style={{ padding: '20px', fontFamily: 'monospace', fontSize: '0.9rem', color: '#e2e8f0', lineHeight: 1.6, overflowX: 'auto' }}>
                <span style={{ color: '#c678dd' }}>import</span> {'{'} CofoundrWorker {'}'} <span style={{ color: '#c678dd' }}>from</span> <span style={{ color: '#98c379' }}>'@cofoundr/sdk'</span>;<br/><br/>
                <span style={{ color: '#c678dd' }}>const</span> worker = <span style={{ color: '#c678dd' }}>new</span> <span style={{ color: '#e5c07b' }}>CofoundrWorker</span>({'{\n'}
                &nbsp;&nbsp;name: <span style={{ color: '#98c379' }}>'lead-generator'</span>,\n
                &nbsp;&nbsp;task: <span style={{ color: '#98c379' }}>'B2B lead generation'</span>,\n
                &nbsp;&nbsp;pricing: <span style={{ color: '#98c379' }}>'per_result'</span>\n
                {'}'});<br/><br/>
                worker.<span style={{ color: '#61afef' }}>deploy</span>().<span style={{ color: '#61afef' }}>then</span>(() <span style={{ color: '#c678dd' }}>=&gt;</span> console.<span style={{ color: '#61afef' }}>log</span>(<span style={{ color: '#98c379' }}>'Worker live!'</span>));
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default CreatorsCallout;
