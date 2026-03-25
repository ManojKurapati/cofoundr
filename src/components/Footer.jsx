import React from 'react';
import { MessageCircle, Globe, Share2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ padding: '3rem 0', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
        
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a href="#" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--electric-emerald)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
            <MessageCircle size={24} />
          </a>
          <a href="#" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--electric-emerald)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
            <Globe size={24} />
          </a>
          <a href="#" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--electric-emerald)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
            <Share2 size={24} />
          </a>
        </div>
        
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} CoFoundr.world. All rights reserved.
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
