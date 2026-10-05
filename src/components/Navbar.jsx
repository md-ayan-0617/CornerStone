import React, { useState, useEffect } from 'react';
import CornerstoneMotif from './CornerstoneMotif';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export const Navbar = ({ currentPath = "/", onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "WORK", path: "/work" },
    { label: "SERVICES", path: "/services" },
    { label: "ABOUT", path: "/about" },
    { label: "CONTACT", path: "/contact" }
  ];

  const handleLinkClick = (path) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 900,
          transition: 'background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
          backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-border-gray)' : '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        <div className="site-container-fluid" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>

          {/* Brand Logo & Architectural Mark */}
          <button
            onClick={() => handleLinkClick('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'inherit',
              padding: 0
            }}
            data-cursor="HOME"
          >
            <CornerstoneMotif size={22} variant="mark" />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.05rem',
                  letterSpacing: '0.04em',
                  color: 'var(--color-warm-white)'
                }}
              >
                CORNERSTONE
              </span>
              <span className="micro-label" style={{ fontSize: '0.58rem', letterSpacing: '0.18em', color: 'var(--color-muted-gray)' }}>
                SYSTEMS & CREATIVE
              </span>
            </div>
          </button>

          {/* Center Navigation Links (Desktop) */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '2.5rem'
            }}
            className="desktop-nav-cluster"
          >
            {navLinks.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleLinkClick(item.path)}
                  style={{
                    position: 'relative',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    color: isActive ? 'var(--color-warm-white)' : 'var(--color-muted-gray)',
                    transition: 'color 0.2s ease',
                    padding: '8px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-warm-white)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? 'var(--color-warm-white)' : 'var(--color-muted-gray)')}
                >
                  {isActive && <span className="lime-dot" style={{ width: '4px', height: '4px' }} />}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Telemetry + Primary CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {/* Live Status indicator (Desktop only) */}
            <div
              className="status-pill-desktop"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                border: '1px solid var(--color-border-gray)',
                borderRadius: '0px',
                backgroundColor: 'rgba(20, 20, 20, 0.6)'
              }}
            >
              <span className="pulse-indicator">
                <span className="lime-dot" style={{ width: '6px', height: '6px' }} />
              </span>
              <span className="micro-label" style={{ fontSize: '0.65rem', color: 'var(--color-warm-white)' }}>
                SYSTEM ACTIVE
              </span>
            </div>

            {/* Primary CTA: START A PROJECT */}
            <button
              onClick={() => handleLinkClick('/contact')}
              className="btn-cornerstone"
              style={{
                padding: '0.75rem 1.35rem',
                fontSize: '0.75rem'
              }}
              data-cursor="BUILD"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={14} />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-toggle"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                background: 'var(--color-charcoal)',
                border: '1px solid var(--color-border-gray)',
                color: 'var(--color-warm-white)',
                cursor: 'pointer'
              }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* Full-Screen Mobile Architectural Overlay Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 890,
            backgroundColor: 'var(--color-near-black)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '6.5rem 1.5rem 2.5rem 1.5rem',
            animation: 'fadeIn 0.25s ease-out'
          }}
        >
          {/* Top Architectural Grid Info */}
          <div style={{ borderBottom: '1px solid var(--color-border-gray)', paddingBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="micro-label">NAVIGATION MATRIX</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="lime-dot" style={{ width: '6px', height: '6px' }} />
              <span className="micro-label-lime">LIVE</span>
            </div>
          </div>

          {/* Navigation Links in Massive Typography */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', margin: 'auto 0' }}>
            {navLinks.map((item, idx) => (
              <button
                key={item.path}
                onClick={() => handleLinkClick(item.path)}
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  padding: '0.6rem 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    color: currentPath === item.path ? 'var(--color-accent-lime)' : 'var(--color-warm-white)'
                  }}
                >
                  {item.label}
                </span>
                <span className="micro-label">0{idx + 1}</span>
              </button>
            ))}
          </div>

          {/* Bottom Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              onClick={() => handleLinkClick('/contact')}
              className="btn-cornerstone"
              style={{ width: '100%', justifyContent: 'center', padding: '1.15rem' }}
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={16} />
            </button>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem' }}>
              <span className="micro-label">CORNERSTONE DIGITAL</span>
              <span className="micro-label">© 2026</span>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Media Query Styles */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav-cluster {
            display: flex !important;
          }
          .status-pill-desktop {
            display: inline-flex !important;
          }
          .mobile-menu-toggle {
            display: none !important;
          }
        }
        @media (max-width: 899px) {
          .mobile-menu-toggle {
            display: flex !important;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default Navbar;
