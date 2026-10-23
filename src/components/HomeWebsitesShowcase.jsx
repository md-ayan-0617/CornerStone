import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CornerstoneMotif from './CornerstoneMotif';
import WebsitePreviewFrame from './WebsitePreviewFrame';
import PreviewLightboxModal from './PreviewLightboxModal';
import { LIVE_WEBSITE_PROJECTS } from '../data/siteContent';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Curated 4 flagship live websites for homepage showcase:
// Noise Dept., Spinform™, Paloma Social House, Vale Selvatico
const FEATURED_WEBSITES = [
  LIVE_WEBSITE_PROJECTS.find((p) => p.title === 'Noise Dept.') || LIVE_WEBSITE_PROJECTS[0],
  LIVE_WEBSITE_PROJECTS.find((p) => p.title === 'Spinform™') || LIVE_WEBSITE_PROJECTS[1],
  LIVE_WEBSITE_PROJECTS.find((p) => p.title === 'Paloma Social House') || LIVE_WEBSITE_PROJECTS[2],
  LIVE_WEBSITE_PROJECTS.find((p) => p.title === 'Vale Selvatico') || LIVE_WEBSITE_PROJECTS[3]
];

export const HomeWebsitesShowcase = ({ onNavigate }) => {
  const sectionRef = useRef(null);
  const [zoomedProject, setZoomedProject] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set('.home-web-reveal, .home-web-card', {
          opacity: 1,
          y: 0,
          scale: 1,
          clearProps: 'all'
        });
        return;
      }

      gsap.fromTo(
        '.home-web-reveal',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        '.home-web-card',
        { opacity: 0, y: 35, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home-websites-showcase"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#0A0A0A',
        borderBottom: '1px solid var(--color-border-gray)',
        paddingTop: 'clamp(4.5rem, 8vw, 7rem)',
        paddingBottom: 'clamp(4.5rem, 8vw, 7rem)',
        overflow: 'hidden'
      }}
    >
      <div className="site-container">
        {/* Minimal Section Header */}
        <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
          <div
            className="home-web-reveal"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.65rem' }}
          >
            <CornerstoneMotif size={14} variant="bracket" />
            <span
              className="micro-label"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--color-lime)',
                letterSpacing: '0.14em',
                fontWeight: 600
              }}
            >
              WEB // SELECTED PRODUCTION DEMOS
            </span>
          </div>

          <div
            className="home-web-reveal"
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <h2
              className="display-large"
              style={{
                margin: 0,
                fontSize: 'clamp(1.9rem, 3.8vw, 3rem)',
                lineHeight: 1.1,
                whiteSpace: 'nowrap'
              }}
            >
              SELECTED WEBSITE DEMOS
            </h2>

            {onNavigate && (
              <button
                onClick={() => onNavigate('/work')}
                className="btn-cornerstone-ghost"
                style={{
                  padding: '0.55rem 1.15rem',
                  fontSize: '0.72rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>EXPLORE ALL WORK</span>
                <ArrowUpRight size={13} />
              </button>
            )}
          </div>

          <p
            className="home-web-reveal"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              color: 'var(--color-muted-gray)',
              margin: '0.65rem 0 0 0'
            }}
          >
            Four live digital flagship demonstrations engineered for culture, luxury, and conversion. Hover to scroll and explore inside each live deployment.
          </p>
        </div>

        {/* 4 Cards: Balanced 2-Column Grid on Desktop, 1-Column on Mobile */}
        <div
          className="home-web-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: 'clamp(2rem, 3.5vw, 3rem)'
          }}
        >
          {FEATURED_WEBSITES.map((proj) => (
            <div
              key={proj.id}
              className="home-web-card"
              style={{
                backgroundColor: '#0E0E0E',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 16px 36px rgba(0, 0, 0, 0.65)',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              {/* 1. Status Bar Header */}
              <div
                style={{
                  padding: '0.75rem 1.15rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  backgroundColor: '#121212',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: proj.accentColor || 'var(--color-lime)',
                      letterSpacing: '0.08em'
                    }}
                  >
                    {proj.number}
                  </span>
                  <div style={{ height: '10px', width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: '#10B981',
                        boxShadow: '0 0 6px #10B981'
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        letterSpacing: '0.08em',
                        color: 'var(--color-warm-white)',
                        textTransform: 'uppercase'
                      }}
                    >
                      LIVE DEMO
                    </span>
                  </div>
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    color: 'var(--color-muted-gray)',
                    letterSpacing: '0.04em'
                  }}
                >
                  {proj.domain}
                </span>
              </div>

              {/* 2. Dominant 16:10 Live Interactive Website Preview */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 10',
                  minHeight: 'clamp(340px, 44vh, 480px)',
                  maxHeight: '520px',
                  backgroundColor: '#070707',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: 'clamp(4px, 0.8vw, 8px)',
                  display: 'flex',
                  flexDirection: 'column',
                  boxSizing: 'border-box',
                  overflow: 'hidden'
                }}
                className="home-preview-wrapper"
              >
                <WebsitePreviewFrame
                  project={proj}
                  height="100%"
                  minHeight="0"
                  onOpenFullscreen={setZoomedProject}
                />
              </div>

              {/* 3. Compact Supporting Information Body Below */}
              <div
                style={{
                  padding: 'clamp(1rem, 1.6vw, 1.35rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '0.85rem',
                  flex: 1
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        color: proj.accentColor || 'var(--color-lime)',
                        textTransform: 'uppercase'
                      }}
                    >
                      {proj.category}
                    </span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.25)', fontSize: '0.6rem' }}>•</span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        color: 'var(--color-muted-gray)',
                        letterSpacing: '0.06em'
                      }}
                    >
                      {proj.industry}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.15rem, 1.5vw, 1.35rem)',
                      fontWeight: 700,
                      color: 'var(--color-warm-white)',
                      margin: '0 0 0.35rem 0',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.2
                    }}
                  >
                    {proj.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.82rem',
                      color: 'var(--color-muted-gray)',
                      margin: '0 0 0.75rem 0',
                      lineHeight: 1.5
                    }}
                  >
                    {proj.shortDescription || proj.tagline}
                  </p>

                  {/* Compact Tech Stack Labels */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {proj.techStack?.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          padding: '2px 7px',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.58rem',
                          color: '#AAA',
                          letterSpacing: '0.04em',
                          borderRadius: '2px'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div
                  style={{
                    paddingTop: '0.75rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px',
                    flexWrap: 'wrap'
                  }}
                >
                  <button
                    onClick={() => setZoomedProject(proj)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--color-warm-white)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '4px 0',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = proj.accentColor || 'var(--color-lime)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-warm-white)';
                    }}
                  >
                    <span>EXPAND PREVIEW</span>
                    <ArrowUpRight size={12} />
                  </button>

                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cornerstone"
                    style={{
                      padding: '0.5rem 1rem',
                      fontSize: '0.68rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>OPEN LIVE SITE</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Fullscreen Preview Modal */}
      {zoomedProject && (
        <PreviewLightboxModal
          project={zoomedProject}
          onClose={() => setZoomedProject(null)}
        />
      )}

      <style>{`
        .home-web-card:hover {
          border-color: rgba(184, 255, 61, 0.35) !important;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.8), 0 0 25px -8px rgba(184, 255, 61, 0.12) !important;
        }
      `}</style>
    </section>
  );
};

export default HomeWebsitesShowcase;
