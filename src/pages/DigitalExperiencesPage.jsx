import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LIVE_WEBSITE_PROJECTS, FEATURED_PROJECTS } from '../data/siteContent';
import LiveProjectCard from '../components/LiveProjectCard';
import PreviewLightboxModal from '../components/PreviewLightboxModal';
import ProjectModal from '../components/ProjectModal';
import FinalCTA from '../components/FinalCTA';
import CornerstoneMotif from '../components/CornerstoneMotif';
import {
  Globe,
  ExternalLink,
  Layers,
  Filter,
  Sparkles,
  ArrowUpRight,
  Code2,
  ShieldCheck,
  LayoutGrid,
  Grid3X3,
  Cpu
} from 'lucide-react';

export const DigitalExperiencesPage = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [layoutMode, setLayoutMode] = useState("bento");
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [zoomedProject, setZoomedProject] = useState(null);

  const heroRef = useRef(null);

  const categories = [
    { label: "ALL", count: LIVE_WEBSITE_PROJECTS.length },
    { label: "LUXURY & E-COMMERCE", count: LIVE_WEBSITE_PROJECTS.filter((p) => p.categoryFilter === "LUXURY & E-COMMERCE").length },
    { label: "HOSPITALITY & DINING", count: LIVE_WEBSITE_PROJECTS.filter((p) => p.categoryFilter === "HOSPITALITY & DINING").length },
    { label: "CREATIVE STUDIOS", count: LIVE_WEBSITE_PROJECTS.filter((p) => p.categoryFilter === "CREATIVE STUDIOS").length },
    { label: "3D & WEB TECH", count: LIVE_WEBSITE_PROJECTS.filter((p) => p.categoryFilter === "3D & WEB TECH").length },
    { label: "AUTOMOTIVE", count: LIVE_WEBSITE_PROJECTS.filter((p) => p.categoryFilter === "AUTOMOTIVE").length }
  ];

  const filteredProjects = activeCategory === "ALL"
    ? LIVE_WEBSITE_PROJECTS
    : LIVE_WEBSITE_PROJECTS.filter((p) => p.categoryFilter === activeCategory);

  // GSAP scroll trigger entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.dx-hero-reveal',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out'
        }
      );

      gsap.fromTo('.dx-project-card',
        { opacity: 0, y: 32, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#digital-grid-wrap',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [activeCategory, layoutMode]);

  return (
    <div ref={heroRef} style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>

      {/* =========================================================================
          1. HERO SECTION — Generous Spacing & Editorial Heading
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '82vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 'clamp(8rem, 16vh, 12rem)',
          paddingBottom: 'clamp(5rem, 10vh, 8rem)',
          backgroundColor: 'var(--color-near-black)',
          borderBottom: '1px solid var(--color-border-gray)',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Architectural Grid Lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            pointerEvents: 'none'
          }}
        />

        <div className="site-container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="dx-hero-reveal" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.75rem' }}>
            <CornerstoneMotif size={18} variant="bracket" />
            <span className="micro-label-lime">
              WEB // INTERACTIVE WEBSITES • DIGITAL EXPERIENCES • WEB APPLICATIONS
            </span>
          </div>

          <h1
            className="display-mega dx-hero-reveal"
            style={{
              margin: '0 0 clamp(1.5rem, 3vw, 2.5rem) 0',
              fontSize: 'clamp(2.4rem, 5.6vw, 5.2rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.035em',
              maxWidth: '22ch'
            }}
          >
            ENGINEERED TO CONVERT.{' '}
            <span style={{ color: 'var(--color-warm-white)', WebkitTextFillColor: 'initial', display: 'block' }}>
              DESIGNED TO INSPIRE.
            </span>
          </h1>

          <div
            className="dx-hero-reveal"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: 'clamp(2rem, 4vw, 4rem)',
              maxWidth: '1100px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '2rem'
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.05rem, 1.8vw, 1.32rem)',
                lineHeight: 1.55,
                color: 'var(--color-muted-gray)',
                maxWidth: '52ch',
                margin: 0
              }}
            >
              Interactive flagship websites, bespoke web platforms, and digital brand architecture engineered to attract, engage, and convert.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  border: '1px solid var(--color-border-gray)',
                  backgroundColor: '#121212',
                  padding: '8px 14px',
                  color: 'var(--color-warm-white)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span className="lime-dot" style={{ width: '6px', height: '6px' }} />
                <span>{LIVE_WEBSITE_PROJECTS.length} LIVE PRODUCTION PLATFORMS</span>
              </span>

              <button
                onClick={() => onNavigate && onNavigate('/contact')}
                className="btn-cornerstone"
                style={{ padding: '0.85rem 1.6rem', fontSize: '0.78rem' }}
              >
                <span>COMMISSION A WEBSITE</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. FILTER & LAYOUT CONTROL BAR
          ========================================================================= */}
      <section
        style={{
          backgroundColor: 'var(--color-charcoal)',
          borderBottom: '1px solid var(--color-border-gray)',
          position: 'sticky',
          top: '68px',
          zIndex: 400,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          paddingTop: '0.85rem',
          paddingBottom: '0.85rem'
        }}
      >
        <div className="site-container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            {/* Category Chips */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                paddingBottom: '2px',
                scrollbarWidth: 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: '0.5rem' }}>
                <Filter size={13} color="var(--color-accent-lime)" />
                <span className="micro-label" style={{ fontSize: '0.68rem', color: 'var(--color-warm-white)' }}>
                  DISCIPLINE:
                </span>
              </div>

              {categories.map((cat) => {
                const isActive = activeCategory === cat.label;
                return (
                  <button
                    key={cat.label}
                    onClick={() => setActiveCategory(cat.label)}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      padding: '6px 12px',
                      borderRadius: 0,
                      backgroundColor: isActive ? 'var(--color-accent-lime)' : 'transparent',
                      color: isActive ? 'var(--color-near-black)' : 'var(--color-muted-gray)',
                      border: isActive ? '1px solid var(--color-accent-lime)' : '1px solid var(--color-border-gray)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>{cat.label}</span>
                    <span style={{ fontSize: '0.62rem', opacity: isActive ? 0.9 : 0.6 }}>
                      ({cat.count})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Layout Toggle (Bento / Grid) */}
            <div style={{ display: 'none', alignItems: 'center', gap: '6px' }} className="dx-layout-toggle">
              <button
                onClick={() => setLayoutMode('bento')}
                style={{
                  background: layoutMode === 'bento' ? '#222' : 'transparent',
                  border: '1px solid var(--color-border-gray)',
                  color: layoutMode === 'bento' ? 'var(--color-accent-lime)' : 'var(--color-muted-gray)',
                  padding: '6px 10px',
                  cursor: 'pointer'
                }}
                title="Bento Editorial Layout"
              >
                <LayoutGrid size={14} />
              </button>
              <button
                onClick={() => setLayoutMode('grid')}
                style={{
                  background: layoutMode === 'grid' ? '#222' : 'transparent',
                  border: '1px solid var(--color-border-gray)',
                  color: layoutMode === 'grid' ? 'var(--color-accent-lime)' : 'var(--color-muted-gray)',
                  padding: '6px 10px',
                  cursor: 'pointer'
                }}
                title="Standard Uniform Grid"
              >
                <Grid3X3 size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. DIGITAL EXPERIENCES PORTFOLIO GRID — Generous Spacing
          ========================================================================= */}
      <section
        id="digital-grid-wrap"
        style={{
          paddingTop: 'clamp(5rem, 10vw, 8rem)',
          paddingBottom: 'clamp(6rem, 12vw, 9rem)',
          backgroundColor: 'var(--color-near-black)',
          borderBottom: '1px solid var(--color-border-gray)'
        }}
      >
        <div className="site-container">
          {/* Header Metric */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
              borderBottom: '1px solid var(--color-border-gray)',
              paddingBottom: '1.5rem'
            }}
          >
            <div>
              <span className="micro-label" style={{ display: 'block', marginBottom: '0.4rem' }}>
                SHOWING {filteredProjects.length} DIGITAL FLAGSHIPS
              </span>
              <h2
                className="display-large"
                style={{
                  fontSize: 'clamp(1.75rem, 3.2vw, 2.6rem)',
                  margin: 0
                }}
              >
                {activeCategory === "ALL" ? "ACTIVE PRODUCTION DEPLOYMENTS" : activeCategory}
              </h2>
            </div>

            <span className="micro-label" style={{ border: '1px solid var(--color-border-gray)', padding: '4px 10px' }}>
              DIRECT LIVE LINKS VERIFIED
            </span>
          </div>

          {/* Bento / Grid Architecture */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: layoutMode === 'bento'
                ? 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))'
                : 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              gap: 'clamp(2rem, 4vw, 3.25rem)'
            }}
          >
            {filteredProjects.map((project, index) => {
              const isFeatured = project.layoutSpan === "span-2" || index === 0;

              return (
                <div
                  key={project.id}
                  className="dx-project-card"
                  style={{
                    gridColumn: isFeatured && layoutMode === 'bento' ? 'span 1' : 'span 1'
                  }}
                >
                  <LiveProjectCard
                    project={project}
                    onOpenModal={() => setActiveModalProject(project)}
                    onOpenZoom={() => setZoomedProject(project)}
                    featured={isFeatured}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. BENCHMARK CONCEPTS & SYSTEM BLUEPRINTS — Generous Spacing
          ========================================================================= */}
      <section
        style={{
          paddingTop: 'clamp(5rem, 9vw, 7.5rem)',
          paddingBottom: 'clamp(5rem, 9vw, 7.5rem)',
          backgroundColor: '#0C0C0C',
          borderBottom: '1px solid var(--color-border-gray)'
        }}
      >
        <div className="site-container">
          <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 3.75rem)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
              <CornerstoneMotif size={14} variant="mark" />
              <span className="micro-label" style={{ color: 'var(--color-muted-gray)' }}>
                SECTION 02 // RESEARCH BENCHMARKS &amp; ARCHITECTURAL BLUEPRINTS
              </span>
            </div>
            <h2
              className="display-large"
              style={{
                margin: '0 0 0.5rem 0',
                fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)'
              }}
            >
              SYSTEM SPECIFICATIONS &amp; PIPELINES
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--color-muted-gray)',
                maxWidth: '56ch',
                margin: 0
              }}
            >
              Autonomous AI receptionist dispatch trees, WhatsApp routing graphs, and high-velocity asset generators designed as benchmark systems.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(1.5rem, 3vw, 2.25rem)'
            }}
          >
            {FEATURED_PROJECTS.map((concept) => (
              <div
                key={concept.id}
                className="arch-box"
                style={{
                  padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                  backgroundColor: '#111111',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div className="corner-bracket-tl" />

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <span className="micro-label-lime">{concept.category}</span>
                    <span className="micro-label" style={{ color: '#666' }}>{concept.number}</span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--color-warm-white)',
                      margin: '0 0 0.5rem 0'
                    }}
                  >
                    {concept.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.88rem',
                      lineHeight: 1.6,
                      color: 'var(--color-muted-gray)',
                      margin: '0 0 1.5rem 0'
                    }}
                  >
                    {concept.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.5rem' }}>
                    {concept.deliverables?.slice(0, 3).map((deliv, i) => (
                      <span
                        key={i}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          padding: '3px 7px',
                          backgroundColor: '#181818',
                          border: '1px solid var(--color-border-gray)',
                          color: '#C0C0C0'
                        }}
                      >
                        {deliv}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span className="micro-label" style={{ fontSize: '0.62rem', color: 'var(--color-accent-lime)' }}>
                    {concept.metricsHighlight || 'PRODUCTION BENCHMARK'}
                  </span>
                  <button
                    onClick={() => onNavigate && onNavigate('/contact')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-warm-white)',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem'
                    }}
                  >
                    <span>SPECIFY</span>
                    <ArrowUpRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. GLOBAL EDITORIAL FINAL CTA
          ========================================================================= */}
      <FinalCTA onStartProject={() => onNavigate && onNavigate('/contact')} />

      {/* Interactive Project Detail Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
          onStartProject={() => {
            setActiveModalProject(null);
            onNavigate && onNavigate('/contact');
          }}
        />
      )}

      {/* Fullscreen Live Preview Lightbox */}
      {zoomedProject && (
        <PreviewLightboxModal
          project={zoomedProject}
          onClose={() => setZoomedProject(null)}
        />
      )}

      <style>{`
        @media (min-width: 768px) {
          .dx-layout-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DigitalExperiencesPage;
