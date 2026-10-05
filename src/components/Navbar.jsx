import React, { useState, useEffect } from 'react';
import CornerstoneMotif from './CornerstoneMotif';
import { ArrowUpRight, Home, Briefcase, Cpu, Info, MessageSquare } from 'lucide-react';

export const Navbar = ({ currentPath = "/", onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "WORK", path: "/work", number: "01", icon: Briefcase },
    { label: "SERVICES", path: "/services", number: "02", icon: Cpu },
    { label: "ABOUT", path: "/about", number: "03", icon: Info },
    { label: "CONTACT", path: "/contact", number: "04", icon: MessageSquare }
  ];

  const mobileTabs = [
    { label: "HOME", path: "/", icon: Home },
    { label: "WORK", path: "/work", icon: Briefcase },
    { label: "SERVICES", path: "/services", icon: Cpu },
    { label: "ABOUT", path: "/about", icon: Info },
    { label: "INQUIRE", path: "/contact", icon: MessageSquare, isHighlight: true }
  ];

  const handleLinkClick = (path) => {
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
          backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.92)' : 'transparent',
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
                padding: '0.7rem 1.25rem',
                fontSize: '0.72rem'
              }}
              data-cursor="BUILD"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={13} />
            </button>

            {/* Clean Mobile Header Status (Replaces Hamburger/Menu completely) */}
            <div className="mobile-header-status">
              <span className="lime-dot" style={{ width: '5px', height: '5px' }} />
              <span className="micro-label" style={{ fontSize: '0.62rem', color: 'var(--color-accent-lime)', letterSpacing: '0.12em' }}>
                ONLINE
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* Floating Architectural Bottom Tab Bar for Mobile */}
      <nav className="mobile-bottom-dock" aria-label="Mobile Navigation Dock">
        <div className="mobile-dock-inner">
          {mobileTabs.map((tab) => {
            const isActive = currentPath === tab.path;
            const Icon = tab.icon;

            return (
              <button
                key={tab.path}
                onClick={() => handleLinkClick(tab.path)}
                className={`mobile-tab-item ${isActive ? 'is-active' : ''} ${tab.isHighlight ? 'is-highlight' : ''}`}
                aria-label={tab.label}
              >
                <div className="mobile-tab-icon-wrap">
                  <Icon size={18} strokeWidth={isActive ? 2.3 : 1.75} />
                </div>
                <span className="mobile-tab-label">{tab.label}</span>
                {isActive && !tab.isHighlight && <span className="mobile-tab-active-dot" />}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Responsive Styles & Dock Transitions */}
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
        .mobile-header-status {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border: 1px solid var(--color-border-gray);
          background-color: rgba(20, 20, 20, 0.7);
          border-radius: 12px;
        }

        /* Mobile Bottom Floating Glass Dock */
        .mobile-bottom-dock {
          position: fixed;
          bottom: max(12px, env(safe-area-inset-bottom, 12px));
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 24px);
          max-width: 440px;
          z-index: 998;
          pointer-events: auto;
          animation: dockSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mobile-dock-inner {
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 6px 8px;
          background: rgba(14, 14, 14, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 20px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.85), 0 0 20px rgba(184, 255, 61, 0.08);
        }

        .mobile-tab-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 6px 2px;
          background: transparent;
          border: 1px solid transparent;
          color: var(--color-muted-gray);
          cursor: pointer;
          position: relative;
          border-radius: 14px;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          -webkit-tap-highlight-color: transparent;
        }

        .mobile-tab-item:active {
          transform: scale(0.9);
        }

        .mobile-tab-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 20px;
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mobile-tab-label {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          margin-top: 3px;
          line-height: 1;
          transition: color 0.2s ease;
        }

        .mobile-tab-item.is-active {
          color: var(--color-accent-lime);
        }

        .mobile-tab-item.is-active .mobile-tab-icon-wrap {
          transform: translateY(-2px);
        }

        .mobile-tab-active-dot {
          position: absolute;
          bottom: 2px;
          width: 3.5px;
          height: 3.5px;
          border-radius: 50%;
          background-color: var(--color-accent-lime);
          box-shadow: 0 0 6px var(--color-accent-lime-glow);
        }

        /* Distinct Highlight for Inquire Tab */
        .mobile-tab-item.is-highlight {
          background: rgba(184, 255, 61, 0.08);
          border: 1px solid rgba(184, 255, 61, 0.24);
          color: var(--color-warm-white);
        }

        .mobile-tab-item.is-highlight.is-active {
          background: var(--color-accent-lime);
          color: #0A0A0A;
          border-color: var(--color-accent-lime);
          box-shadow: 0 0 14px rgba(184, 255, 61, 0.35);
        }

        .mobile-tab-item.is-highlight.is-active .mobile-tab-label {
          color: #0A0A0A;
          font-weight: 700;
        }

        @keyframes dockSlideUp {
          from {
            opacity: 0;
            transform: translate(-50%, 16px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
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
          .mobile-header-status {
            display: none !important;
          }
          .mobile-bottom-dock {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
