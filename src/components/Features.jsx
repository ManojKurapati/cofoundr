import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Clock, Coins, Briefcase, Zap } from 'lucide-react';

const Features = () => {
  return (
    <section id="discover-agents" className="section-padding">
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', fontWeight: 700, marginBottom: '1rem' }}
          >
            Specialized agents for <span className="text-gradient">specialized problems.</span>
          </motion.h2>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(12, 1fr)', 
          gap: '1.5rem',
          gridAutoRows: 'auto'
        }}>
          
          {/* Card 1: Compliance Focus */}
          <motion.div 
            className="glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            style={{ gridColumn: 'span 12', '@media(min-width: 768px)': { gridColumn: 'span 12' }, padding: '2.5rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, background: 'radial-gradient(circle, rgba(0,255,163,0.1) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
            
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: 64, height: 64, borderRadius: '20px', background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', flexShrink: 0 }}>
                  <Briefcase size={32} color="white" />
                </div>
                <div>
                  <div style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase' }}>
                    Legal & Compliance
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>UAE AML Regulatory Oracle</h3>
                </div>
              </div>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '800px', lineHeight: 1.6, marginBottom: '2rem' }}>
              An advanced RAG pipeline that ingests raw transaction data and cross-references it against live UAE Anti-Money Laundering frameworks to flag compliance risks.
            </p>

            <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}><Target size={14} /> Accuracy Benchmark</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>99.8%</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> Latency</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--electric-emerald)' }}>850ms</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}><Coins size={14} /> Cost</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>$0.15 / Query</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Finance Focus */}
          <motion.div 
            className="glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            style={{ gridColumn: 'span 12', '@media(min-width: 768px)': { gridColumn: 'span 6' }, padding: '2rem', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', width: 'fit-content' }}>
              Quantitative / Web3
            </div>
            <h4 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem' }}>Tokenized Asset Auditor</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Audits smart contracts for tokenized real-world assets, verifying reserve data and flagging liquidity vulnerabilities.
            </p>
            
            <div style={{ display: 'flex', gap: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.25rem', marginTop: 'auto', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Tasks Completed</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>12k</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Latency</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--electric-emerald)' }}>1.2s</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Cost</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>$2.50 / Audit</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Data Focus */}
          <motion.div 
            className="glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            style={{ gridColumn: 'span 12', '@media(min-width: 768px)': { gridColumn: 'span 6' }, padding: '2rem', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', width: 'fit-content' }}>
              Data Engineering
            </div>
            <h4 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem' }}>Unstructured Data Synthesizer</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Extracts, cleans, and structures messy PDF and image-based reports into clean JSON formats for your data warehouse.
            </p>
            
            <div style={{ display: 'flex', gap: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.25rem', marginTop: 'auto', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Pages Parsed</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>1.5M</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Latency</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--electric-emerald)' }}>400ms</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Cost</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>$0.02 / Page</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Features;
