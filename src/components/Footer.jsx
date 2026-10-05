import React from 'react';
import CornerstoneMotif from './CornerstoneMotif';
import { ArrowUpRight } from 'lucide-react';

export const Footer = ({ onNavigate }) => {
  const currentYear = 2026;

  const handleNav = (path) => {
    if (onNavigate) {
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden',
        backgroundColor: '#070707',
        color: 'var(--color-warm-white)',
        paddingTop: 'clamp(4.5rem, 9vw, 7.5rem)',
        paddingBottom: 'clamp(5.5rem, 11vw, 7.5rem)',
        borderTop: '1px solid var(--color-border-gray)'
      }}
    >
      <div className="site-container">
        
        {/* Top Massive Brand Wordmark */}
        <div style={{ borderBottom: '1px solid var(--color-border-gray)', paddingBottom: 'clamp(2rem, 5vw, 4rem)', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CornerstoneMotif size={28} variant="mark" />
              <span className="micro-label" style={{ letterSpacing: '0.2em', color: 'var(--color-warm-white)' }}>
                THE DIGITAL FOUNDATION FOR MODERN BUSINESS
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="lime-dot" style={{ width: '6px', height: '6px' }} />
              <span className="micro-label-lime">SYSTEMS ONLINE</span>
            </div>
          </div>

          <h2
            className="display-mega"
            style={{
              color: 'var(--color-warm-white)',
              margin: 0,
              letterSpacing: '-0.04em'
            }}
          >
            CORNERSTONE
          </h2>
        </div>

        {/* 4 Architectural Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            marginBottom: 'clamp(3rem, 6vw, 5rem)'
          }}
        >
          {/* Col 1: Capabilities */}
          <div>
            <span className="micro-label" style={{ display: 'block', marginBottom: '1.25rem' }}>
              01 / CAPABILITIES
            </span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {["AI SYSTEMS", "DIGITAL EXPERIENCES", "CREATIVE INFRASTRUCTURE", "GROWTH AUTOMATION"].map((item) => (
                <li key={item} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-warm-white)' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <span className="micro-label" style={{ display: 'block', marginBottom: '1.25rem' }}>
              02 / DIRECTORY
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { label: "WORK", path: "/work" },
                { label: "SERVICES", path: "/services" },
                { label: "ABOUT", path: "/about" },
                { label: "CONTACT", path: "/contact" }
              ].map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  style={{
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    color: 'var(--color-muted-gray)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'color 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#B8FF3D')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted-gray)')}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={12} />
                </button>
              ))}
            </div>
          </div>

          {/* Col 3: Direct Inquiries */}
          <div>
            <span className="micro-label" style={{ display: 'block', marginBottom: '1.25rem' }}>
              03 / INQUIRIES
            </span>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--color-muted-gray)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
              For architectural consultations, enterprise systems deployment, and strategic creative:
            </p>
            <a
              href="mailto:hello@cornerstone.build"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: 'var(--color-accent-lime)',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              hello@cornerstone.build
            </a>
          </div>

          {/* Col 4: Network & Protocols */}
          <div>
            <span className="micro-label" style={{ display: 'block', marginBottom: '1.25rem' }}>
              04 / NETWORK
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-muted-gray)' }}>
                LinkedIn [Agency Archive]
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-muted-gray)' }}>
                Instagram [Visual Direction]
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-muted-gray)' }}>
                GitHub [Technical Standards]
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Coordinates, Legal */}
        <div
          style={{
            borderTop: '1px solid var(--color-border-gray)',
            paddingTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CornerstoneMotif size={16} variant="foundation" />
            <span className="micro-label" style={{ color: 'var(--color-warm-white)' }}>
              © {currentYear} CORNERSTONE. ALL RIGHTS RESERVED.
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span className="micro-label">PRIVACY PROTOCOL</span>
            <span className="micro-label">TERMS OF ARCHITECTURE</span>
            <span className="micro-label" style={{ color: 'var(--color-accent-lime)' }}>GMT+05:30</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
