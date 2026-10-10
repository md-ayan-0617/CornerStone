import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FEATURED_PROJECTS } from '../data/siteContent';
import LiveWebsitesSection from '../components/LiveWebsitesSection';
import ProjectModal from '../components/ProjectModal';
import FinalCTA from '../components/FinalCTA';
import CornerstoneMotif from '../components/CornerstoneMotif';
import { ArrowUpRight, Filter, Globe, Sparkles } from 'lucide-react';

export const WorkPage = ({ onNavigate }) => {
  const [filter, setFilter] = useState("ALL");
  const [activeProject, setActiveProject] = useState(null);

  const heroRef = useRef(null);
  const progressRef = useRef(null);

  const categories = ["ALL", "AI + AUTOMATION", "DIGITAL", "CREATIVE", "GROWTH"];

  const filteredProjects = filter === "ALL" 
    ? FEATURED_PROJECTS 
    : FEATURED_PROJECTS.filter(p => p.category === filter);

  // GSAP ScrollTrigger Animations & Hero Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Global Scroll Progress Bar
      if (progressRef.current) {
        gsap.fromTo(progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: document.body,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.3
            }
          }
        );
      }

      // Section 02 Concept Cards Reveal on Scroll
      gsap.fromTo('.concept-card-item',
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#concept-systems-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const elem = document.querySelector(targetId);
    if (!elem) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(elem, { offset: -70 });
    } else {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={heroRef} style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      
      {/* GSAP Global Scroll Progress Bar */}
      <div ref={progressRef} className="gsap-scroll-progress-line" />


      {/* 2. Top of Work Page: 7 Live Website Projects */}
      <LiveWebsitesSection
        onSelectProject={(project) => setActiveProject(project)}
        onStartProject={() => onNavigate('/contact')}
      />

      {/* 3. Transition Divider to Concept Demonstrators */}
      <section
        id="concept-systems"
        style={{
          paddingTop: 'clamp(4rem, 8vh, 6.5rem)',
          paddingBottom: 'clamp(2rem, 4vh, 3.5rem)',
          backgroundColor: '#0C0C0C',
          borderBottom: '1px solid var(--color-border-gray)',
        }}
      >
        <div className="site-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
            <CornerstoneMotif size={14} variant="mark" />
            <span className="micro-label" style={{ color: 'var(--color-muted-gray)' }}>
              SECTION 02 // RESEARCH &amp; CONCEPTS
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2
                className="display-large"
                style={{
                  margin: '0 0 0.5rem 0',
                  fontSize: 'clamp(1.75rem, 3.2vw, 2.6rem)'
                }}
              >
                SYSTEM SPECIFICATIONS &amp; BENCHMARKS
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  lineHeight: 1.55,
                  color: 'var(--color-muted-gray)',
                  maxWidth: '52ch',
                  margin: 0
                }}
              >
                Production blueprints, AI voice dispatch pipelines, and high-velocity asset generators engineered as benchmark reference systems.
              </p>
            </div>

            <span className="micro-label" style={{ border: '1px solid var(--color-border-gray)', padding: '4px 10px' }}>
              4 CONCEPT BENCHMARKS
            </span>
          </div>
        </div>
      </section>

      {/* Concept Systems Filter Bar */}
      <section
        style={{
          backgroundColor: 'var(--color-charcoal)',
          borderBottom: '1px solid var(--color-border-gray)',
          paddingTop: '0.85rem',
          paddingBottom: '0.85rem',
          position: 'sticky',
          top: '76px',
          zIndex: 400,
          backdropFilter: 'blur(12px)'
        }}
      >
        <div className="site-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Filter size={14} color="#9B9A96" style={{ marginRight: '6px' }} />
            {categories.map((cat) => {
              const isSelected = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    background: isSelected ? 'var(--color-accent-lime)' : 'transparent',
                    color: isSelected ? 'var(--color-near-black)' : 'var(--color-muted-gray)',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--color-accent-lime)' : 'var(--color-border-gray)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <span className="micro-label">
            SHOWING {filteredProjects.length} OF {FEATURED_PROJECTS.length} SYSTEMS
          </span>
        </div>
      </section>

      {/* Concept Systems Grid */}
      <section
        style={{
          paddingTop: 'clamp(3.5rem, 8vw, 5.5rem)',
          paddingBottom: 'clamp(5rem, 10vw, 8rem)',
          backgroundColor: 'var(--color-near-black)'
        }}
      >
        <div className="site-container">
          <div
            id="concept-systems-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: 'clamp(1.5rem, 3vw, 2.5rem)'
            }}
          >
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setActiveProject(project)}
                className="arch-box concept-card-item"
                style={{
                  padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '440px',
                  backgroundColor: 'var(--color-charcoal)'
                }}
                data-cursor="INSPECT"
              >
                {/* Corner highlight */}
                <div className="corner-bracket-tl" />
                <div className="corner-bracket-br" />

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span className="micro-label-lime">{project.number} / 04</span>
                    <span className="micro-label" style={{ border: '1px solid var(--color-border-gray)', padding: '2px 8px' }}>
                      {project.badge}
                    </span>
                  </div>

                  <span className="micro-label" style={{ color: 'var(--color-muted-gray)', display: 'block', marginBottom: '0.75rem' }}>
                    {project.category} • {project.industry}
                  </span>

                  {/* Project Image Showcase with Hover Effect */}
                  <div
                    className="img-hover-frame"
                    style={{
                      height: '210px',
                      width: '100%',
                      marginBottom: '1.25rem'
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="img-hover-zoom"
                      loading="lazy"
                    />
                    <div className="corner-bracket-tl" />
                    <div className="corner-bracket-br" />
                    <div className="img-overlay-badge">
                      <span className="lime-dot" style={{ width: '5px', height: '5px' }} />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--color-accent-lime)' }}>
                        BENCHMARK BLUEPRINT
                      </span>
                    </div>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.025em',
                      color: 'var(--color-warm-white)',
                      lineHeight: 1.15,
                      marginBottom: '1rem'
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      lineHeight: 1.55,
                      color: 'var(--color-muted-gray)',
                      margin: 0
                    }}
                  >
                    {project.shortDescription}
                  </p>
                </div>

                <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border-gray)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="micro-label" style={{ fontSize: '0.65rem', color: 'var(--color-accent-lime)' }}>
                      {project.metricsHighlight}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="micro-label" style={{ color: 'var(--color-warm-white)' }}>SPECS</span>
                      <ArrowUpRight size={14} color="#B8FF3D" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Footer CTA */}
      <FinalCTA onStartProject={() => onNavigate('/contact')} />

      {/* Case Study Modal (Handles both Live Websites & Concept Systems) */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onStartProject={() => {
            setActiveProject(null);
            onNavigate('/contact');
          }}
        />
      )}

    </div>
  );
};

export default WorkPage;
