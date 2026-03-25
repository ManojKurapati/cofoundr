import React from 'react';
import { Shield, Calculator, FileText, Blocks } from 'lucide-react';

const TrustBar = () => {
  const badges = [
    { label: 'FinTech', icon: <Calculator size={18} /> },
    { label: 'Legal & Compliance', icon: <Shield size={18} /> },
    { label: 'Quantitative Analysis', icon: <FileText size={18} /> },
    { label: 'Web3 Smart Contracts', icon: <Blocks size={18} /> }
  ];

  return (
    <section className="section-padding" style={{ paddingBottom: '4rem', paddingTop: '0rem' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2rem', fontWeight: 600 }}>
          Built for high-stakes execution in:
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', alignItems: 'center' }}>
          {badges.map((badge, index) => (
            <div 
              key={index} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                color: 'var(--text-muted)', 
                opacity: 0.8,
                filter: 'grayscale(100%)',
                transition: 'all 0.3s ease',
                cursor: 'default'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.filter = 'grayscale(0%)'; e.currentTarget.style.color = 'var(--text-main)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.filter = 'grayscale(100%)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
            >
              <div style={{ color: 'var(--electric-emerald)' }}>
                {badge.icon}
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{badge.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrustBar;
