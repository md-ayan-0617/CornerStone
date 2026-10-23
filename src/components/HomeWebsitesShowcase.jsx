import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CornerstoneMotif from './CornerstoneMotif';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FEATURED_WEBSITES = [
  {
    id: "live-noise-dept",
    number: "01",
    title: "Noise Dept.",
    category: "CREATIVE STUDIO",
    liveUrl: "https://noise-dept-six.vercel.app/",
    domain: "noise-dept-six.vercel.app",
    image: "/images/projects/noise-dept.jpg",
    tagline: "Controlled disorder, kinetic typography, and raw editorial brutalism.",
    badge: "01 // STUDIO"
  },
  {
    id: "live-spinform",
    number: "02",
    title: "Spinform™",
    category: "3D & CREATIVE TOOLS",
    liveUrl: "https://spinform-eight.vercel.app/",
    domain: "spinform-eight.vercel.app",
    image: "/images/projects/spinform.jpg",
    tagline: "Browser-based 3D brand extruder turning flat vectors into interactive form.",
    badge: "02 // 3D TOOL"
  },
  {
    id: "live-paloma-house",
    number: "03",
    title: "Paloma Social House",
    category: "HOSPITALITY & DINING",
    liveUrl: "https://paloma-socail-house.vercel.app/",
    domain: "paloma-socail-house.vercel.app",
    image: "/images/projects/paloma-house.jpg",
    tagline: "Lunch turns into late — multi-mood Mediterranean hospitality flagship.",
    badge: "03 // DINING"
  },
  {
    id: "live-vale-selvatico",
    number: "04",
    title: "Vale Selvatico",
    category: "BOTANICAL ESTATE",
    liveUrl: "https://vale-selvatico.vercel.app/",
    domain: "vale-selvatico.vercel.app",
    image: "/images/projects/vale-selvatico.jpg",
    tagline: "Sicilian botanical estate cultivating wild botanicals and small-batch apothecary.",
    badge: "04 // LUXURY"
  }
];

export const HomeWebsitesShowcase = ({ onNavigate }) => {
  const sectionRef = useRef(null);

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
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
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
              WEB / SELECTED DEMOS
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
            Four live digital flagship demonstrations engineered for culture, luxury, and conversion.
          </p>
        </div>

        {/* 4 Cards: 2x2 Grid on Desktop, 1-Column on Mobile */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: 'clamp(1.75rem, 3vw, 2.5rem)'
          }}
        >
          {FEATURED_WEBSITES.map((proj) => (
            <div
              key={proj.id}
              className="home-web-card group"
              style={{
                backgroundColor: '#0E0E0E',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 'clamp(18px, 2.2vw, 24px)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6)'
              }}
            >
              {/* Card Image Container with Click to Live Site */}
              <a
                href={proj.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 10',
                  overflow: 'hidden',
                  display: 'block',
                  backgroundColor: '#050505',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                <img
                  src={proj.image}
                  alt={proj.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="web-card-img"
                />

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.6) 100%)',
                    pointerEvents: 'none'
                  }}
                />

                {/* Top Corner Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    zIndex: 2
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      color: 'var(--color-lime)',
                      backgroundColor: 'rgba(10, 10, 10, 0.78)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      padding: '0.28rem 0.65rem',
                      borderRadius: '999px',
                      border: '1px solid rgba(184, 255, 61, 0.25)',
                      letterSpacing: '0.12em',
                      fontWeight: 600
                    }}
                  >
                    {proj.badge}
                  </span>
                </div>
              </a>

              {/* Card Body */}
              <div
                style={{
                  padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flex: 1
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      color: 'rgba(255, 255, 255, 0.55)',
                      letterSpacing: '0.12em',
                      marginBottom: '0.35rem'
                    }}
                  >
                    {proj.category}
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.25rem, 2vw, 1.55rem)',
                      fontWeight: 700,
                      color: 'var(--color-warm-white)',
                      margin: '0 0 0.45rem 0',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {proj.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.88rem',
                      color: 'var(--color-muted-gray)',
                      margin: 0,
                      lineHeight: 1.45
                    }}
                  >
                    {proj.tagline}
                  </p>
                </div>

                {/* Bottom Action: Minimal VIEW PROJECT */}
                <div
                  style={{
                    marginTop: '1.5rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--color-muted-gray)',
                      letterSpacing: '0.08em'
                    }}
                  >
                    {proj.domain}
                  </span>

                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cornerstone"
                    style={{
                      padding: '0.55rem 1.1rem',
                      fontSize: '0.72rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>VIEW PROJECT</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .home-web-card:hover {
          border-color: rgba(184, 255, 61, 0.4) !important;
          transform: translateY(-4px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.85), 0 0 35px -10px rgba(184, 255, 61, 0.15) !important;
        }
        .home-web-card:hover .web-card-img {
          transform: scale(1.035);
        }
      `}</style>
    </section>
  );
};

export default HomeWebsitesShowcase;
