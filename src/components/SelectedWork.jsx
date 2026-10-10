import React, { useState } from 'react';
import { FEATURED_PROJECTS, LIVE_WEBSITE_PROJECTS } from '../data/siteContent';
import { ArrowUpRight, Phone, MessageSquare, Laptop, Layers, Eye, Code, Globe } from 'lucide-react';
import TypewriterText from './TypewriterText';
import PreviewLightboxModal from './PreviewLightboxModal';
import WebsitePreviewFrame from './WebsitePreviewFrame';

export const SelectedWork = ({ onSelectProject }) => {
  const [activeTab, setActiveTab] = useState('live'); // 'live' | 'concepts'
  const [hoveredProject, setHoveredProject] = useState(null);
  const [viewModes, setViewModes] = useState({});
  const [zoomedProject, setZoomedProject] = useState(null);

  const toggleViewMode = (e, projectId) => {
    e.stopPropagation();
    setViewModes((prev) => ({
      ...prev,
      [projectId]: prev[projectId] === 'code' ? 'visual' : 'code'
    }));
  };

  // Realistic UI Mockup renderer for concept projects
  const renderProjectVisual = (project) => {
    switch (project.id) {
      case "proj-01": // AI Receptionist - Healthcare
        return (
          <div style={{ width: '100%', height: '100%', minHeight: '320px', backgroundColor: '#0D1117', border: '1px solid #21262D', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #21262D', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} color="#B8FF3D" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#F4F3EF' }}>CLINICAL VOICE DISPATCH AGENT</span>
              </div>
              <span className="micro-label-lime" style={{ fontSize: '0.62rem' }}>HIPAA READY</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: 'auto 0' }}>
              <div style={{ backgroundColor: '#161B22', padding: '1rem', borderLeft: '3px solid #B8FF3D' }}>
                <span className="micro-label" style={{ fontSize: '0.6rem' }}>VOICE TRIAGE INTERACTION:</span>
                <p style={{ margin: '4px 0 0 0', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#F4F3EF' }}>
                  "Hello, Dr. Vane's practice. I can schedule your orthopaedic evaluation or check MRI availability today."
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '36px' }}>
                {[40, 80, 50, 95, 60, 30, 75, 45, 90, 70, 40, 85, 30, 60, 100, 50].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${h}%`,
                      backgroundColor: i % 3 === 0 ? '#B8FF3D' : '#30363D'
                    }}
                  />
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #21262D' }}>
              <span className="micro-label" style={{ fontSize: '0.62rem' }}>LATENCY: 540MS</span>
              <span className="micro-label" style={{ fontSize: '0.62rem', color: '#B8FF3D' }}>DIRECT EHR INTEGRATION</span>
            </div>
          </div>
        );

      case "proj-02": // WhatsApp Lead System - Education
        return (
          <div style={{ width: '100%', height: '100%', minHeight: '320px', backgroundColor: '#0B141A', border: '1px solid #1F2C34', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1F2C34', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'center', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={16} color="#B8FF3D" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#E9EDEF' }}>EXECUTIVE ADMISSIONS BOT</span>
              </div>
              <span className="micro-label" style={{ color: '#25D366' }}>WHATSAPP VERIFIED</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: 'auto 0' }}>
              <div style={{ alignSelf: 'flex-start', backgroundColor: '#202C33', padding: '8px 12px', borderRadius: '4px', maxWidth: '85%' }}>
                <span style={{ fontSize: '0.75rem', color: '#E9EDEF', fontFamily: 'var(--font-body)' }}>
                  "Which specialization aligns with your career target: FinTech or AI Architecture?"
                </span>
              </div>
              <div style={{ alignSelf: 'flex-end', backgroundColor: '#005C4B', padding: '8px 12px', borderRadius: '4px', maxWidth: '85%' }}>
                <span style={{ fontSize: '0.75rem', color: '#FFF', fontFamily: 'var(--font-body)' }}>
                  "AI Architecture. Please send the curriculum PDF and faculty roster."
                </span>
              </div>
              <div style={{ alignSelf: 'flex-start', backgroundColor: '#202C33', padding: '8px 12px', borderRadius: '4px', maxWidth: '85%' }}>
                <span style={{ fontSize: '0.75rem', color: '#B8FF3D', fontFamily: 'monospace' }}>
                  ✓ [PDF Generated: 2026_Executive_AI.pdf]
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #1F2C34' }}>
              <span className="micro-label" style={{ fontSize: '0.62rem' }}>AUTOMATED HUBSPOT ROUTING</span>
              <span className="micro-label" style={{ fontSize: '0.62rem', color: '#B8FF3D' }}>ZERO LATENCY</span>
            </div>
          </div>
        );

      case "proj-03": // Digital Experience - Hospitality
        return (
          <div style={{ width: '100%', height: '100%', minHeight: '320px', backgroundColor: '#121212', border: '1px solid #282828', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #282828', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Laptop size={16} color="#B8FF3D" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#F4F3EF' }}>BOUTIQUE RESIDENCE FLAGSHIP</span>
              </div>
              <span className="micro-label" style={{ color: '#B8FF3D' }}>DIRECT BOOKING</span>
            </div>

            <div style={{ margin: 'auto 0', border: '1px solid #333', padding: '1rem', backgroundColor: '#181818' }}>
              <span className="micro-label" style={{ color: '#9B9A96' }}>PRIVATE SANCTUARY</span>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: '#F4F3EF', margin: '4px 0 8px 0' }}>
                THE ALPINE SUITE
              </h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #282828', paddingTop: '0.5rem' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#F4F3EF' }}>€1,250 / NIGHT</span>
                <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#B8FF3D' }}>DIRECT STRIPE CHECKOUT</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #282828' }}>
              <span className="micro-label" style={{ fontSize: '0.62rem' }}>ZERO OTA COMMISSION</span>
              <span className="micro-label" style={{ fontSize: '0.62rem' }}>380MS FIRST CONTENTFUL PAINT</span>
            </div>
          </div>
        );

      case "proj-04": // Modular AI Creative - Consumer Brand
        return (
          <div style={{ width: '100%', height: '100%', minHeight: '320px', backgroundColor: '#121212', border: '1px solid #282828', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #282828', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={16} color="#B8FF3D" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#F4F3EF' }}>MODULAR CREATIVE PIPELINE</span>
              </div>
              <span className="micro-label-lime" style={{ fontSize: '0.62rem' }}>10X ASSET VELOCITY</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', margin: 'auto 0' }}>
              <div style={{ backgroundColor: '#1A1A1A', border: '1px solid #333', padding: '0.75rem' }}>
                <span className="micro-label" style={{ fontSize: '8px', color: '#B8FF3D' }}>HOOK A: 9:16 REEL</span>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem', color: '#F4F3EF', fontWeight: 600 }}>
                  "Stop wasting 4 hours on scheduling."
                </p>
              </div>
              <div style={{ backgroundColor: '#1A1A1A', border: '1px solid #333', padding: '0.75rem' }}>
                <span className="micro-label" style={{ fontSize: '8px', color: '#B8FF3D' }}>HOOK B: 1:1 SQUARE</span>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem', color: '#F4F3EF', fontWeight: 600 }}>
                  "The operational layer modern brands need."
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #282828' }}>
              <span className="micro-label" style={{ fontSize: '0.62rem' }}>AI UGC &amp; STATIC RENDERING</span>
              <span className="micro-label" style={{ fontSize: '0.62rem', color: '#B8FF3D' }}>BRAND GUARDRAILS ENFORCED</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden',
        backgroundColor: 'var(--color-charcoal)',
        paddingTop: 'clamp(5rem, 11vw, 9rem)',
        paddingBottom: 'clamp(5rem, 11vw, 9rem)',
        borderBottom: '1px solid var(--color-border-gray)'
      }}
    >
      <div className="site-container">
        
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'clamp(2rem, 4vw, 3rem)', borderBottom: '1px solid var(--color-border-gray)', paddingBottom: '1.25rem', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div>
            <span className="micro-label-lime">05 / SELECTED WORK</span>
            <h2
              className="display-large"
              style={{
                marginTop: '0.5rem',
                margin: 0
              }}
            >
              THINGS WE'VE{' '}
              <TypewriterText words={["DEPLOYED.", "BUILT.", "ENGINEERED.", "SCALED."]} />
            </h2>
          </div>

          {/* Section View Tabs: Live Websites vs Concept Blueprints */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#0A0A0A', border: '1px solid var(--color-border-gray)', padding: '4px' }}>
            <button
              onClick={() => setActiveTab('live')}
              style={{
                background: activeTab === 'live' ? 'var(--color-accent-lime)' : 'transparent',
                color: activeTab === 'live' ? '#0A0A0A' : 'var(--color-muted-gray)',
                border: 'none',
                padding: '7px 14px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Globe size={13} />
              <span>7 LIVE WEBSITES</span>
            </button>
            <button
              onClick={() => setActiveTab('concepts')}
              style={{
                background: activeTab === 'concepts' ? 'var(--color-accent-lime)' : 'transparent',
                color: activeTab === 'concepts' ? '#0A0A0A' : 'var(--color-muted-gray)',
                border: 'none',
                padding: '7px 14px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
            >
              <span>4 CONCEPT BLUEPRINTS</span>
            </button>
          </div>
        </div>

        {/* TAB 1: 7 LIVE WEBSITES */}
        {activeTab === 'live' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {LIVE_WEBSITE_PROJECTS.map((project) => {
              const isHovered = hoveredProject === project.id;

              return (
                <div
                  key={project.id}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    if (onSelectProject) onSelectProject(project);
                  }}
                  className="arch-box"
                  style={{
                    padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                    cursor: 'pointer',
                    position: 'relative',
                    backgroundColor: 'var(--color-near-black)',
                    borderColor: isHovered ? project.accentColor : 'var(--color-border-gray)',
                    transition: 'all 0.3s ease'
                  }}
                  data-cursor="CASE STUDY"
                >
                  <div className="corner-bracket-tl" style={{ borderColor: isHovered ? project.accentColor : 'var(--color-accent-lime)' }} />
                  <div className="corner-bracket-br" style={{ borderColor: isHovered ? project.accentColor : 'var(--color-accent-lime)' }} />

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
                      gap: 'clamp(1.5rem, 4vw, 3rem)',
                      alignItems: 'center'
                    }}
                  >
                    {/* Left: Info */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: project.accentColor }}>
                          {project.number} / 07
                        </span>
                        <span className="micro-label" style={{ border: '1px solid var(--color-border-gray)', padding: '2px 8px' }}>
                          {project.badge}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                          LIVE
                        </span>
                      </div>

                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)',
                          fontWeight: 800,
                          letterSpacing: '-0.03em',
                          color: 'var(--color-warm-white)',
                          lineHeight: 1.15,
                          marginBottom: '0.35rem'
                        }}
                      >
                        {project.title}
                      </h3>

                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.85rem',
                          fontStyle: 'italic',
                          color: 'var(--color-muted-gray)',
                          display: 'block',
                          marginBottom: '1rem'
                        }}
                      >
                        "{project.tagline}"
                      </span>

                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.92rem',
                          lineHeight: 1.6,
                          color: 'var(--color-muted-gray)',
                          marginBottom: '1.25rem',
                          maxWidth: '48ch'
                        }}
                      >
                        {project.shortDescription}
                      </p>

                      {/* Tech Chips */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.75rem' }}>
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.04)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              padding: '2px 8px',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.62rem',
                              color: 'var(--color-warm-white)'
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '7px',
                            padding: '9px 16px',
                            backgroundColor: project.accentColor,
                            color: '#0A0A0A',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            transition: 'transform 0.15s ease'
                          }}
                        >
                          <span>VIEW LIVE DEMO</span>
                          <ArrowUpRight size={14} />
                        </a>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onSelectProject) onSelectProject(project);
                          }}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--color-warm-white)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            letterSpacing: '0.08em',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 0',
                            textDecoration: 'underline'
                          }}
                        >
                          <span>INSPECT SYSTEM ARCHITECTURE</span>
                          <ArrowUpRight size={13} color="var(--color-accent-lime)" />
                        </button>
                      </div>
                    </div>

                    {/* Right: Authentic Interactive Live Website Preview */}
                    <div
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        width: '100%',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <WebsitePreviewFrame
                        project={project}
                        height="410px"
                        minHeight="380px"
                        onOpenFullscreen={(p) => setZoomedProject(p)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: 4 CONCEPT BENCHMARKS */}
        {activeTab === 'concepts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {FEATURED_PROJECTS.map((project) => {
              const isHovered = hoveredProject === project.id;
              const currentMode = viewModes[project.id] || 'visual';

              return (
                <div
                  key={project.id}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    if (onSelectProject) onSelectProject(project);
                  }}
                  className="arch-box"
                  style={{
                    padding: 'clamp(1.75rem, 3.5vw, 3rem)',
                    cursor: 'pointer',
                    position: 'relative',
                    backgroundColor: 'var(--color-near-black)',
                    borderColor: isHovered ? 'var(--color-accent-lime)' : 'var(--color-border-gray)'
                  }}
                  data-cursor="CASE STUDY"
                >
                  <div className="corner-bracket-tl" />
                  <div className="corner-bracket-br" />

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                      gap: 'clamp(1.5rem, 4vw, 3.5rem)',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
                        <span className="micro-label-lime">{project.number}</span>
                        <span className="micro-label" style={{ border: '1px solid var(--color-border-gray)', padding: '2px 8px' }}>
                          {project.badge}
                        </span>
                        <span className="micro-label" style={{ color: 'var(--color-muted-gray)' }}>
                          {project.category}
                        </span>
                      </div>

                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)',
                          fontWeight: 800,
                          letterSpacing: '-0.03em',
                          color: 'var(--color-warm-white)',
                          lineHeight: 1.15,
                          marginBottom: '0.5rem'
                        }}
                      >
                        {project.title}
                      </h3>

                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem',
                          color: 'var(--color-accent-lime)',
                          display: 'block',
                          marginBottom: '1.25rem'
                        }}
                      >
                        {project.industry}
                      </span>

                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.95rem',
                          lineHeight: 1.6,
                          color: 'var(--color-muted-gray)',
                          marginBottom: '1.5rem',
                          maxWidth: '48ch'
                        }}
                      >
                        {project.shortDescription}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="micro-label" style={{ color: 'var(--color-warm-white)', textDecoration: 'underline' }}>
                          INSPECT COMPLETE ARCHITECTURE
                        </span>
                        <ArrowUpRight size={14} color="#B8FF3D" />
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span className="micro-label" style={{ color: 'var(--color-muted-gray)', fontSize: '0.65rem' }}>
                          LIVE DEPLOYMENT DEMONSTRATION
                        </span>
                        <button
                          onClick={(e) => toggleViewMode(e, project.id)}
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--color-border-gray)',
                            color: 'var(--color-warm-white)',
                            padding: '3px 8px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.62rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {currentMode === 'visual' ? (
                            <>
                              <Code size={11} color="var(--color-accent-lime)" />
                              <span>VIEW SCHEMATIC</span>
                            </>
                          ) : (
                            <>
                              <Eye size={11} color="var(--color-accent-lime)" />
                              <span>VIEW PREVIEW</span>
                            </>
                          )}
                        </button>
                      </div>

                      {currentMode === 'visual' ? (
                        <div
                          className="img-hover-frame"
                          style={{
                            height: '320px',
                            width: '100%',
                            position: 'relative'
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

                          <div
                            style={{
                              position: 'absolute',
                              top: '12px',
                              left: '12px',
                              background: 'rgba(10, 10, 10, 0.85)',
                              padding: '3px 8px',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                              backdropFilter: 'blur(6px)',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.62rem',
                              color: 'var(--color-warm-white)'
                            }}
                          >
                            {project.badge}
                          </div>

                          <div className="img-overlay-badge">
                            <span className="lime-dot" style={{ width: '5px', height: '5px' }} />
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-accent-lime)' }}>
                              {project.metricsHighlight}
                            </span>
                          </div>
                        </div>
                      ) : (
                        renderProjectVisual(project)
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

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

export default SelectedWork;
