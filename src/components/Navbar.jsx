import React, { useState, useEffect } from 'react';
import CornerstoneMotif from './CornerstoneMotif';
import {
  ArrowUpRight,
  Home,
  Briefcase,
  Cpu,
  Info,
  MessageSquare,
  Globe,
  Film,
  Menu,
  X
} from 'lucide-react';

export const Navbar = ({ currentPath = "/", onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
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

  // The 6 exact navigation items required in exact order
  const navLinks = [
    { label: "HOME", path: "/", number: "01", icon: Home },
    { label: "SERVICES", path: "/services", number: "02", icon: Cpu },
    {
      label: "WEB",
      path: "/web",
      altPaths: ["/work/digital-experiences", "/digital-experiences", "/work"],
      number: "03",
      icon: Globe
    },
    {
      label: "ADS",
      path: "/ads",
      altPaths: ["/work/visual-campaigns", "/visual-campaigns"],
      number: "04",
      icon: Film
    },
    { label: "ABOUT", path: "/about", number: "05", icon: Info },
    { label: "CONTACT", path: "/contact", number: "06", icon: MessageSquare }
  ];

  const isLinkActive = (item) => {
    if (currentPath === item.path) return true;
    if (item.altPaths && item.altPaths.includes(currentPath)) return true;
    return false;
  };

  const handleLinkClick = (path) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <>
      {/* Top Header Bar */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 990,
          transition: 'background-color 0.25s ease, border-color 0.25s ease, backdrop-filter 0.25s ease',
          backgroundColor: scrolled || mobileMenuOpen ? 'rgba(10, 10, 10, 0.94)' : 'transparent',
          backdropFilter: scrolled || mobileMenuOpen ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled || mobileMenuOpen ? 'blur(16px)' : 'none',
          borderBottom: scrolled || mobileMenuOpen ? '1px solid var(--color-border-gray)' : '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        <div
          className="site-container-fluid"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '68px'
          }}
        >
          {/* Brand Logo & Architectural Mark */}
          <button
            onClick={() => handleLinkClick('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'inherit',
              padding: 0
            }}
            data-cursor="HOME"
            aria-label="Cornerstone Home"
          >
            <CornerstoneMotif size={20} variant="mark" />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(0.95rem, 3.2vw, 1.08rem)',
                  letterSpacing: '0.04em',
                  color: 'var(--color-warm-white)',
                  lineHeight: 1.15
                }}
              >
                CORNERSTONE
              </span>
              <span
                className="micro-label"
                style={{ fontSize: '0.52rem', letterSpacing: '0.16em', color: 'var(--color-muted-gray)' }}
              >
                AI • WEBSITES • CREATIVE
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links (All 6 in exact order) */}
          <nav className="desktop-nav-cluster" aria-label="Main Navigation">
            {navLinks.map((item) => {
              const active = isLinkActive(item);
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
                    fontSize: '0.73rem',
                    fontWeight: 600,
                    letterSpacing: '0.09em',
                    color: active ? 'var(--color-warm-white)' : 'var(--color-muted-gray)',
                    transition: 'color 0.2s ease',
                    padding: '8px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-warm-white)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = active ? 'var(--color-warm-white)' : 'var(--color-muted-gray)')}
                >
                  {active && <span className="lime-dot" style={{ width: '4px', height: '4px' }} />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Header Content */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Live Status indicator (Desktop only) */}
            <div className="status-pill-desktop">
              <span className="pulse-indicator">
                <span className="lime-dot" style={{ width: '6px', height: '6px' }} />
              </span>
              <span className="micro-label" style={{ fontSize: '0.65rem', color: 'var(--color-warm-white)' }}>
                SYSTEM ACTIVE
              </span>
            </div>

            {/* Primary CTA (Desktop only) */}
            <button
              onClick={() => handleLinkClick('/contact')}
              className="btn-cornerstone header-cta-desktop"
              style={{
                padding: '0.65rem 1.2rem',
                fontSize: '0.72rem'
              }}
              data-cursor="BUILD"
            >
              <span>DISCUSS YOUR PROJECT</span>
              <ArrowUpRight size={13} />
            </button>

            {/* Clean Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-toggle"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: '#141414',
                border: '1px solid var(--color-border-gray)',
                color: 'var(--color-warm-white)',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.1em'
              }}
            >
              {mobileMenuOpen ? <X size={15} color="#B8FF3D" /> : <Menu size={15} color="#B8FF3D" />}
              <span>{mobileMenuOpen ? 'CLOSE' : 'MENU'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Architectural Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            top: '68px',
            backgroundColor: '#0A0A0A',
            zIndex: 989,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 'clamp(1.5rem, 5vw, 2.5rem)',
            overflowY: 'auto',
            animation: 'mobileMenuFadeIn 0.25s ease-out'
          }}
        >
          {/* Subtle Grid Background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              pointerEvents: 'none'
            }}
          />

          {/* Navigation Links List */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <span
              className="micro-label"
              style={{ display: 'block', marginBottom: '1.5rem', color: 'var(--color-muted-gray)' }}
            >
              NAVIGATION DIRECTORY // 06 CHANNELS
            </span>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navLinks.map((item) => {
                const active = isLinkActive(item);
                const Icon = item.icon;

                return (
                  <button
                    key={item.path}
                    onClick={() => handleLinkClick(item.path)}
                    style={{
                      background: active ? '#141414' : 'transparent',
                      border: active ? '1px solid rgba(184, 255, 61, 0.3)' : '1px solid transparent',
                      padding: '12px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                      width: '100%'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          color: active ? 'var(--color-accent-lime)' : '#555'
                        }}
                      >
                        {item.number}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.2rem',
                          fontWeight: 700,
                          letterSpacing: '-0.01em',
                          color: active ? 'var(--color-warm-white)' : 'var(--color-muted-gray)'
                        }}
                      >
                        {item.label}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {active && <span className="lime-dot" style={{ width: '6px', height: '6px' }} />}
                      <Icon size={16} color={active ? 'var(--color-accent-lime)' : '#555'} />
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Mobile Action & Telemetry */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              paddingTop: '2rem',
              borderTop: '1px solid var(--color-border-gray)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}
          >
            <button
              onClick={() => handleLinkClick('/contact')}
              className="btn-cornerstone"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '14px'
              }}
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={14} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="lime-dot" style={{ width: '5px', height: '5px' }} />
                <span className="micro-label" style={{ fontSize: '0.62rem' }}>
                  SYSTEM CORE ONLINE
                </span>
              </div>
              <span className="micro-label" style={{ fontSize: '0.62rem', color: '#666' }}>
                CORNERSTONE © 2026
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        .desktop-nav-cluster {
          display: none;
          align-items: center;
          gap: clamp(1rem, 1.6vw, 2rem);
        }
        .status-pill-desktop {
          display: none;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border: 1px solid var(--color-border-gray);
          background-color: rgba(20, 20, 20, 0.6);
        }
        .header-cta-desktop {
          display: none;
        }
        .mobile-menu-toggle {
          display: flex;
        }

        @keyframes mobileMenuFadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Desktop Breakpoint: Reveal compact 6-item nav */
        @media (min-width: 1040px) {
          .desktop-nav-cluster {
            display: flex !important;
          }
          .status-pill-desktop {
            display: inline-flex !important;
          }
          .header-cta-desktop {
            display: inline-flex !important;
          }
          .mobile-menu-toggle {
            display: none !important;
          }
          .mobile-menu-overlay {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
