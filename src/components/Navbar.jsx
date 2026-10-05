import React, { useState, useEffect } from 'react';
import CornerstoneMotif from './CornerstoneMotif';
import { ArrowUpRight, X, ChevronRight, Briefcase, Cpu, Info, MessageSquare } from 'lucide-react';

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
    { label: "WORK", path: "/work", number: "01", icon: Briefcase, desc: "Selected systems & case studies" },
    { label: "SERVICES", path: "/services", number: "02", icon: Cpu, desc: "Four foundational disciplines" },
    { label: "ABOUT", path: "/about", number: "03", icon: Info, desc: "Studio architecture & philosophy" },
    { label: "CONTACT", path: "/contact", number: "04", icon: MessageSquare, desc: "Direct project consultation" }
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
          zIndex: 990,
          transition: 'background-color 0.25s ease, border-color 0.25s ease, backdrop-filter 0.25s ease',
          backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-border-gray)' : '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        <div className="site-container-fluid" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          
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
              <span className="micro-label" style={{ fontSize: '0.52rem', letterSpacing: '0.16em', color: 'var(--color-muted-gray)' }}>
                SYSTEMS &amp; CREATIVE
              </span>
            </div>
          </button>

          {/* Center Navigation Links (Desktop only) */}
          <nav className="desktop-nav-cluster">
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

          {/* Right Actions */}
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
                padding: '0.7rem 1.25rem',
                fontSize: '0.72rem'
              }}
              data-cursor="BUILD"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={13} />
            </button>

            {/* Modern Mobile Menu Pill Toggle (Mobile only) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="mobile-pill-toggle"
              aria-label="Open navigation menu"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '16px' }}>
                <span style={{ display: 'block', height: '2px', width: '16px', backgroundColor: 'var(--color-accent-lime)' }} />
                <span style={{ display: 'block', height: '2px', width: '10px', backgroundColor: 'var(--color-warm-white)' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 600, color: 'var(--color-warm-white)', letterSpacing: '0.08em' }}>
                MENU
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* Modern High-End Mobile Navigation Overlay Sheet */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(10, 10, 10, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: '1.25rem',
            paddingLeft: '1.25rem',
            paddingRight: '1.25rem',
            paddingBottom: 'max(1.75rem, env(safe-area-inset-bottom, 24px))',
            height: '100dvh',
            overflowY: 'auto',
            animation: 'mobileMenuFadeIn 0.22s ease-out'
          }}
        >
          {/* Top Bar of Mobile Menu */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-gray)', paddingBottom: '1rem', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CornerstoneMotif size={18} variant="mark" />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-warm-white)' }}>
                CORNERSTONE
              </span>
              <span className="lime-dot" style={{ width: '5px', height: '5px' }} />
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              style={{
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--color-charcoal)',
                border: '1px solid var(--color-border-gray)',
                borderRadius: '50%',
                color: 'var(--color-warm-white)',
                cursor: 'pointer'
              }}
              aria-label="Close menu"
            >
              <X size={18} color="var(--color-accent-lime)" />
            </button>
          </div>

          {/* Middle: Clean Interactive Navigation List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', margin: 'auto 0', padding: '1.5rem 0', flexShrink: 0 }}>
            {navLinks.map((item) => {
              const isActive = currentPath === item.path;
              const Icon = item.icon;

              return (
                <button
                  key={item.path}
                  onClick={() => handleLinkClick(item.path)}
                  style={{
                    background: isActive ? 'rgba(184, 255, 61, 0.06)' : 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--color-accent-lime)' : 'var(--color-border-gray)',
                    borderRadius: '8px',
                    padding: '1rem 1.15rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '6px',
                        backgroundColor: isActive ? 'var(--color-accent-lime)' : 'var(--color-charcoal)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon size={16} color={isActive ? '#0A0A0A' : 'var(--color-warm-white)'} />
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--color-accent-lime)' }}>
                          {item.number}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.25rem',
                            fontWeight: 800,
                            letterSpacing: '-0.02em',
                            color: isActive ? 'var(--color-accent-lime)' : 'var(--color-warm-white)'
                          }}
                        >
                          {item.label}
                        </span>
                      </div>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-muted-gray)' }}>
                        {item.desc}
                      </span>
                    </div>
                  </div>

                  <ChevronRight size={16} color={isActive ? 'var(--color-accent-lime)' : 'var(--color-muted-gray)'} />
                </button>
              );
            })}
          </div>

          {/* Bottom Action Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flexShrink: 0 }}>
            <button
              onClick={() => handleLinkClick('/contact')}
              className="btn-cornerstone"
              style={{
                width: '100%',
                padding: '1.1rem',
                fontSize: '0.85rem',
                borderRadius: '8px',
                backgroundColor: 'var(--color-accent-lime)',
                color: '#0A0A0A',
                fontWeight: 700
              }}
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={16} color="#0A0A0A" />
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.4rem 0.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="lime-dot" style={{ width: '6px', height: '6px' }} />
                <span className="micro-label-lime" style={{ fontSize: '0.62rem' }}>SYSTEM ONLINE</span>
              </div>
              <span className="micro-label" style={{ fontSize: '0.62rem' }}>CORNERSTONE STUDIO 2026</span>
            </div>
          </div>

        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        .desktop-nav-cluster {
          display: none;
          align-items: center;
          gap: 2.5rem;
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
        .mobile-pill-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 7px 12px;
          background: var(--color-charcoal);
          border: 1px solid var(--color-border-gray);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .mobile-pill-toggle:hover {
          border-color: var(--color-accent-lime);
        }

        @media (min-width: 901px) {
          .desktop-nav-cluster {
            display: flex !important;
          }
          .status-pill-desktop {
            display: inline-flex !important;
          }
          .header-cta-desktop {
            display: inline-flex !important;
          }
          .mobile-pill-toggle {
            display: none !important;
          }
        }

        @keyframes mobileMenuFadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default Navbar;
