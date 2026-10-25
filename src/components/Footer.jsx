import React, { useState } from 'react';
import { Mail, ArrowUpRight, ArrowUp } from 'lucide-react';

export const Footer = ({ onNavigate, currentPath }) => {
  const currentYear = 2026;
  const [activeBarHover, setActiveBarHover] = useState(false);

  const handleNav = (path) => {
    if (onNavigate) {
      onNavigate(path);
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: false, duration: 1.1 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.location.href = path;
    }
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, {
          duration: 1.3,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const exploreLinks = [
    { label: "Work", path: "/work" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Contact", path: "/contact" }
  ];

  return (
    <footer className="cornerstone-footer" role="contentinfo" aria-label="Cornerstone Studio Footer">
      {/* Ambient background architectural glow */}
      <div className="footer-ambient-glow" aria-hidden="true" />

      <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Top CTA Row */}
        <div className="footer-cta-row">
          <div className="footer-cta-left">
            <div className="footer-micro-kicker">
              <span className="footer-kicker-bar" aria-hidden="true" />
              <span className="footer-kicker-text">HAVE A PROJECT IN MIND?</span>
            </div>
            
            <h2 className="footer-cta-heading">
              LET’S BUILD SOMETHING<span className="footer-heading-break"><br /></span>THAT MATTERS
              <span className="footer-lime-dot">.</span>
            </h2>
          </div>

          <div className="footer-cta-right">
            <button
              onClick={() => handleNav('/contact')}
              className="footer-cta-button"
              aria-label="Start a project with Cornerstone"
              data-cursor="START"
            >
              <span className="footer-cta-button-text">START A PROJECT</span>
              <span className="footer-cta-icon-wrapper" aria-hidden="true">
                <ArrowUpRight size={17} className="footer-cta-icon" strokeWidth={2.2} />
              </span>
            </button>
          </div>
        </div>

        {/* Divider 1 */}
        <div className="footer-divider" aria-hidden="true" />

        {/* Three Columns Grid */}
        <div className="footer-columns-grid">
          
          {/* Column 1: Brand */}
          <div className="footer-col footer-col-brand">
            <button
              onClick={() => handleNav('/')}
              className="footer-brand-button"
              aria-label="Cornerstone Home"
              data-cursor="HOME"
            >
              <span className="footer-brand-wordmark">
                CORNERST
                <span className="footer-brand-o">
                  O
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="footer-brand-sparkle"
                    aria-hidden="true"
                  >
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                  </svg>
                </span>
                NE
                <span className="footer-brand-dot">.</span>
              </span>
            </button>

            <p className="footer-brand-tagline">
              Independent digital experiences, built with intent.
            </p>

            {/* Interactive Telemetry / Status Indicator Bars */}
            <div
              className="footer-status-wrapper"
              onMouseEnter={() => setActiveBarHover(true)}
              onMouseLeave={() => setActiveBarHover(false)}
            >
              <div
                className="footer-status-bars"
                role="img"
                aria-label="Systems operational • 24/7 continuous deployment"
              >
                <span className="footer-bar footer-bar-active" />
                <span className={`footer-bar ${activeBarHover ? 'footer-bar-subtle-glow' : ''}`} />
                <span className={`footer-bar ${activeBarHover ? 'footer-bar-subtle-glow' : ''}`} />
              </div>
              <span className={`footer-telemetry-text ${activeBarHover ? 'footer-telemetry-visible' : ''}`}>
                SYS.ONLINE • 24/7 AUTONOMOUS
              </span>
            </div>
          </div>

          {/* Column 2: Explore Navigation */}
          <div className="footer-col footer-col-explore">
            <h3 className="footer-col-title">EXPLORE</h3>
            <nav className="footer-nav-list" aria-label="Footer Explore Navigation">
              {exploreLinks.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNav(item.path)}
                    className={`footer-nav-item ${isActive ? 'footer-nav-item-active' : ''}`}
                    aria-label={`Navigate to ${item.label}`}
                    data-cursor="VIEW"
                  >
                    <span className="footer-nav-item-inner">
                      <span className="footer-nav-label">{item.label}</span>
                      <ArrowUpRight size={13} className="footer-nav-arrow" aria-hidden="true" />
                    </span>
                    <span className="footer-nav-line" aria-hidden="true" />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Column 3: Connect */}
          <div className="footer-col footer-col-connect">
            <h3 className="footer-col-title">CONNECT</h3>
            <ul className="footer-connect-list">
              <li>
                <a
                  href="mailto:hello@cornerstone.build"
                  className="footer-connect-link"
                  aria-label="Email Cornerstone at hello@cornerstone.build"
                  data-cursor="EMAIL"
                >
                  <span className="footer-connect-icon-box">
                    <Mail size={16} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span>Email</span>
                  <ArrowUpRight size={12} className="footer-connect-arrow" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-connect-link"
                  aria-label="Cornerstone on Instagram"
                  data-cursor="INSTAGRAM"
                >
                  <span className="footer-connect-icon-box">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </span>
                  <span>Instagram</span>
                  <ArrowUpRight size={12} className="footer-connect-arrow" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-connect-link"
                  aria-label="Cornerstone on LinkedIn"
                  data-cursor="LINKEDIN"
                >
                  <span className="footer-connect-icon-box">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.44 8.5h4.12v14.5H.44V8.5zm6.75 0h3.94v1.98h.06c.55-1.04 1.89-2.14 3.9-2.14 4.17 0 4.94 2.75 4.94 6.32v8.34h-4.12v-7.39c0-1.76-.03-4.03-2.45-4.03-2.46 0-2.83 1.92-2.83 3.91v7.51H7.19V8.5z" />
                    </svg>
                  </span>
                  <span>LinkedIn</span>
                  <ArrowUpRight size={12} className="footer-connect-arrow" aria-hidden="true" />
                </a>
              </li>
            </ul>

            <div className="footer-availability" title="Studio is currently onboarding Q2/Q3 projects">
              <span className="footer-avail-radar">
                <span className="footer-avail-ping" aria-hidden="true" />
                <span className="footer-avail-dot" aria-hidden="true" />
              </span>
              <span className="footer-avail-text">AVAILABLE FOR SELECT PROJECTS</span>
            </div>
          </div>

        </div>

        {/* Divider 2 */}
        <div className="footer-divider" aria-hidden="true" />

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-left">
            <span>© {currentYear} CORNERSTONE STUDIO</span>
            {/* Discreet Admin Portal access to preserve maintenance route */}
            <button
              onClick={() => handleNav('/admin/9827988375')}
              className="footer-admin-dot"
              aria-label="Staff Administration Portal"
              title="Staff Administration Portal"
            >
              •
            </button>
          </div>

          <span className="footer-bottom-separator" aria-hidden="true" />

          <div className="footer-bottom-center">
            <span>BUILT WITH INTENTION</span>
          </div>

          <span className="footer-bottom-separator" aria-hidden="true" />

          <div className="footer-bottom-right">
            <button
              onClick={scrollToTop}
              className="footer-back-to-top"
              aria-label="Back to top of page"
              data-cursor="TOP"
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={14} className="footer-top-icon" aria-hidden="true" strokeWidth={2.4} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
