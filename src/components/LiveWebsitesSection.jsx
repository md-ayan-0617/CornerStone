import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LIVE_WEBSITE_PROJECTS } from '../data/siteContent';
import LiveProjectCard from './LiveProjectCard';
import PreviewLightboxModal from './PreviewLightboxModal';
import CornerstoneMotif from './CornerstoneMotif';
import { LayoutGrid, Grid3X3, Filter, ExternalLink, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export const LiveWebsitesSection = ({ onSelectProject, onStartProject }) => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [layoutMode, setLayoutMode] = useState("bento"); // 'bento' or 'grid'
  const [zoomedProject, setZoomedProject] = useState(null);
  const sectionRef = useRef(null);

  const categories = [
    { label: "ALL", count: LIVE_WEBSITE_PROJECTS.length },
    { label: "LUXURY & E-COMMERCE", count: LIVE_WEBSITE_PROJECTS.filter(p => p.categoryFilter === "LUXURY & E-COMMERCE").length },
    { label: "HOSPITALITY & DINING", count: LIVE_WEBSITE_PROJECTS.filter(p => p.categoryFilter === "HOSPITALITY & DINING").length },
    { label: "CREATIVE STUDIOS", count: LIVE_WEBSITE_PROJECTS.filter(p => p.categoryFilter === "CREATIVE STUDIOS").length },
    { label: "3D & WEB TECH", count: LIVE_WEBSITE_PROJECTS.filter(p => p.categoryFilter === "3D & WEB TECH").length },
    { label: "AUTOMOTIVE", count: LIVE_WEBSITE_PROJECTS.filter(p => p.categoryFilter === "AUTOMOTIVE").length },
  ];

  const filteredProjects = activeCategory === "ALL"
    ? LIVE_WEBSITE_PROJECTS
    : LIVE_WEBSITE_PROJECTS.filter(p => p.categoryFilter === activeCategory);

  // GSAP animation for filter changes
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.live-project-card',
        { opacity: 0, y: 22, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set('.live-project-card', { clearProps: 'opacity,y,scale' });
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory, layoutMode]);

  return (
    <section
      ref={sectionRef}
      id="live-websites"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
        backgroundColor: 'var(--color-near-black)',
        paddingTop: 'clamp(7.5rem, 15vh, 10rem)',
        paddingBottom: 'clamp(4rem, 9vh, 7rem)',
        borderBottom: '1px solid var(--color-border-gray)'
      }}
    >
      <div className="site-container">

        {/* Section Header */}
        <div className="live-section-header" style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
            <CornerstoneMotif size={18} variant="bracket" />
            <span className="micro-label-lime">
              SECTION 01 // PRODUCTION DEPLOYMENTS • 7 LIVE WEBSITES
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '1.5rem',
              borderBottom: '1px solid var(--color-border-gray)',
              paddingBottom: '1.75rem'
            }}
          >
            <div>
              <h2
                className="display-mega"
                style={{
                  margin: '0 0 0.75rem 0',
                  fontSize: 'clamp(2.1rem, 4.2vw, 3.8rem)',
                  maxWidth: '24ch'
                }}
              >
                DEPLOYED DIGITAL{' '}
                <span style={{ color: 'var(--color-accent-lime)', WebkitTextFillColor: 'initial' }}>
                  FLAGSHIPS.
                </span>
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
                  lineHeight: 1.55,
                  color: 'var(--color-muted-gray)',
                  maxWidth: '54ch',
                  margin: 0
                }}
              >
                Every project below is a live, production-deployed website engineered with bespoke visual identity, tailored typography, and real-time interaction.
              </p>
            </div>

            {/* Quick Live Telemetry Pills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(184, 255, 61, 0.08)',
                  border: '1px solid rgba(184, 255, 61, 0.25)',
                  padding: '6px 12px',
                  borderRadius: '2px'
                }}
              >
                <span className="lime-dot" style={{ width: '6px', height: '6px' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-accent-lime)', fontWeight: 600 }}>
                  7 OF 7 WEBSITES VERIFIED ONLINE
                </span>
              </div>
              <span className="micro-label" style={{ fontSize: '0.62rem', color: 'var(--color-muted-gray)' }}>
                TESTED ACROSS DESKTOP, TABLET &amp; MOBILE VIEWPORTS
              </span>
            </div>
          </div>
        </div>

        {/* Filter Bar & Layout Switcher */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: 'clamp(2rem, 3.5vw, 3rem)',
            backgroundColor: '#0F0F0F',
            border: '1px solid var(--color-border-gray)',
            padding: '0.75rem 1.25rem'
          }}
        >
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <Filter size={13} color="#9B9A96" style={{ marginRight: '4px' }} />
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  style={{
                    background: isSelected ? 'var(--color-accent-lime)' : 'transparent',
                    color: isSelected ? '#0A0A0A' : 'var(--color-muted-gray)',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--color-accent-lime)' : 'rgba(255, 255, 255, 0.08)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    fontWeight: isSelected ? 700 : 500,
                    letterSpacing: '0.06em',
                    padding: '5px 11px',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease'
                  }}
                >
                  {cat.label} <span style={{ opacity: isSelected ? 0.8 : 0.5 }}>({cat.count})</span>
                </button>
              );
            })}
          </div>

          {/* Layout Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="micro-label" style={{ fontSize: '0.65rem' }}>
              LAYOUT:
            </span>
            <div style={{ display: 'flex', border: '1px solid var(--color-border-gray)' }}>
              <button
                onClick={() => setLayoutMode('bento')}
                style={{
                  background: layoutMode === 'bento' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                  border: 'none',
                  color: layoutMode === 'bento' ? 'var(--color-accent-lime)' : 'var(--color-muted-gray)',
                  padding: '6px 10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem'
                }}
                title="Bento Editorial View"
              >
                <LayoutGrid size={13} />
                <span>BENTO</span>
              </button>
              <button
                onClick={() => setLayoutMode('grid')}
                style={{
                  background: layoutMode === 'grid' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                  border: 'none',
                  borderLeft: '1px solid var(--color-border-gray)',
                  color: layoutMode === 'grid' ? 'var(--color-accent-lime)' : 'var(--color-muted-gray)',
                  padding: '6px 10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem'
                }}
                title="Uniform Grid View"
              >
                <Grid3X3 size={13} />
                <span>GRID</span>
              </button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div
          className={layoutMode === 'bento' ? 'live-projects-bento' : 'live-projects-uniform'}
        >
          {filteredProjects.map((project) => (
            <LiveProjectCard
              key={project.id}
              project={project}
              onSelectProject={onSelectProject}
              onOpenZoom={(p) => setZoomedProject(p)}
              layoutMode={layoutMode}
            />
          ))}
        </div>

        {/* Empty state if ever filtered out */}
        {filteredProjects.length === 0 && (
          <div
            style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              backgroundColor: 'var(--color-charcoal)',
              border: '1px solid var(--color-border-gray)'
            }}
          >
            <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted-gray)' }}>
              No projects match this category.
            </p>
            <button
              onClick={() => setActiveCategory("ALL")}
              className="btn-cornerstone"
              style={{ marginTop: '1rem', fontSize: '0.75rem' }}
            >
              RESET FILTER
            </button>
          </div>
        )}

        {/* Bottom Agency Verification Banner */}
        <div
          style={{
            marginTop: 'clamp(3rem, 6vw, 4.5rem)',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            backgroundColor: '#0E0E0E',
            border: '1px solid var(--color-border-gray)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}
        >
          <div className="corner-bracket-tl" />
          <div className="corner-bracket-br" />

          <div>
            <span className="micro-label-lime" style={{ display: 'block', marginBottom: '0.5rem' }}>
              AGENCY CAPABILITY PROOF
            </span>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                fontWeight: 700,
                color: 'var(--color-warm-white)',
                margin: '0 0 0.35rem 0'
              }}
            >
              Every Website Engineered For Its Distinct Market
            </h4>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                color: 'var(--color-muted-gray)',
                margin: 0,
                maxWidth: '60ch'
              }}
            >
              From botanical e-commerce estates and Parisian haute joaillerie to real-time 3D motion applications and automotive telemetry, each architecture is built around the client's business model.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {onStartProject && (
              <button
                onClick={onStartProject}
                className="btn-cornerstone"
              >
                <span>COMMISSION A DIGITAL FLAGSHIP</span>
                <Sparkles size={14} />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Lightbox / Zoom Modal */}
      {zoomedProject && (
        <PreviewLightboxModal
          project={zoomedProject}
          onClose={() => setZoomedProject(null)}
        />
      )}
    </section>
  );
};

export default LiveWebsitesSection;
