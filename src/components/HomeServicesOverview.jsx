import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CornerstoneMotif from './CornerstoneMotif';
import { ArrowUpRight, Cpu, Globe, Film } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SERVICES_DATA = [
  {
    id: "service-ai-automation",
    number: "01",
    code: "AI AUTOMATION",
    title: "AI AUTOMATION",
    tagline: "AI voice receptionists and automated WhatsApp workflows that capture inquiries and book appointments 24/7.",
    icon: Cpu,
    highlights: ["AI Call Answering", "WhatsApp Messaging", "Automated Booking"],
    path: "/services"
  },
  {
    id: "service-websites",
    number: "02",
    code: "WEBSITES",
    title: "WEBSITES",
    tagline: "Modern business websites and high-converting landing pages built to turn visitors into clients.",
    icon: Globe,
    highlights: ["Business Websites", "Landing Pages", "Fast Performance & SEO"],
    path: "/work"
  },
  {
    id: "service-creative-production",
    number: "03",
    code: "CREATIVE PRODUCTION",
    title: "CREATIVE PRODUCTION",
    tagline: "Commercial product visuals, virtual model photography, and vertical video ads for digital advertising.",
    icon: Film,
    highlights: ["Product & Model Visuals", "Vertical Video Ads", "Multi-Placement Suites"],
    path: "/work#ads"
  }
];

export const HomeServicesOverview = ({ onNavigate }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set('.home-services-reveal, .home-service-card', {
          opacity: 1,
          y: 0,
          clearProps: 'all'
        });
        return;
      }

      gsap.fromTo(
        '.home-services-reveal',
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
        '.home-service-card',
        { opacity: 0, y: 35, scale: 0.98 },
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
      id="home-services-overview"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#070707',
        borderBottom: '1px solid var(--color-border-gray)',
        paddingTop: 'clamp(4.5rem, 8vw, 6.5rem)',
        paddingBottom: 'clamp(4.5rem, 8vw, 6.5rem)',
        overflow: 'hidden'
      }}
    >
      <div className="site-container">
        {/* Minimal Section Header */}
        <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
          <div
            className="home-services-reveal"
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
              SERVICES / CORE CAPABILITIES
            </span>
          </div>

          <div
            className="home-services-reveal"
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
              WHAT CORNERSTONE BUILDS.
            </h2>

            {onNavigate && (
              <button
                onClick={() => onNavigate('/services')}
                className="btn-cornerstone-ghost"
                style={{
                  padding: '0.55rem 1.15rem',
                  fontSize: '0.72rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>VIEW ALL CAPABILITIES</span>
                <ArrowUpRight size={13} />
              </button>
            )}
          </div>

          <p
            className="home-services-reveal"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              color: 'var(--color-muted-gray)',
              margin: '0.65rem 0 0 0'
            }}
          >
            Three foundational disciplines engineered to attract audience, convert visitors, and automate operations.
          </p>
        </div>

        {/* 3-Card Minimal Responsive Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)'
          }}
        >
          {SERVICES_DATA.map((srv) => {
            const IconComponent = srv.icon;

            return (
              <div
                key={srv.id}
                onClick={() => onNavigate && onNavigate(srv.path)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onNavigate && onNavigate(srv.path);
                  }
                }}
                className="home-service-card group"
                style={{
                  backgroundColor: '#0E0E0E',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 'clamp(18px, 2.2vw, 24px)',
                  padding: 'clamp(1.75rem, 3vw, 2.25rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '340px',
                  cursor: 'pointer',
                  transition: 'border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)'
                }}
              >
                <div>
                  {/* Top Header: Number + Icon */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.75rem'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: 'var(--color-lime)',
                        letterSpacing: '0.12em',
                        fontWeight: 600
                      }}
                    >
                      {srv.number} // {srv.code}
                    </span>

                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: '#141414',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-warm-white)'
                      }}
                    >
                      <IconComponent size={16} />
                    </div>
                  </div>

                  {/* Title & One-Line Description */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.35rem, 2.2vw, 1.65rem)',
                      fontWeight: 700,
                      color: 'var(--color-warm-white)',
                      margin: '0 0 0.75rem 0',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {srv.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.92rem',
                      lineHeight: 1.5,
                      color: 'var(--color-muted-gray)',
                      margin: 0
                    }}
                  >
                    {srv.tagline}
                  </p>
                </div>

                {/* Bottom Tags & Action Indicator */}
                <div style={{ marginTop: '2rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      marginBottom: '1.25rem'
                    }}
                  >
                    {srv.highlights.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.62rem',
                          color: '#A0A0A0',
                          backgroundColor: '#161616',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '4px',
                          padding: '3px 8px',
                          letterSpacing: '0.04em'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '0.85rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: 'var(--color-warm-white)',
                        letterSpacing: '0.1em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>EXPLORE DISCIPLINE</span>
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="card-arrow"
                      style={{
                        color: 'var(--color-lime)',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .home-service-card:hover {
          border-color: rgba(184, 255, 61, 0.35) !important;
          transform: translateY(-4px);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.75), 0 0 30px -10px rgba(184, 255, 61, 0.12) !important;
        }
        .home-service-card:hover .card-arrow {
          transform: translate(2px, -2px);
        }
      `}</style>
    </section>
  );
};

export default HomeServicesOverview;
