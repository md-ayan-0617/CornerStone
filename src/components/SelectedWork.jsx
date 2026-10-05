import React, { useState } from 'react';
import { FEATURED_PROJECTS } from '../data/siteContent';
import { ArrowUpRight, Phone, MessageSquare, Laptop, Layers } from 'lucide-react';
import CornerstoneMotif from './CornerstoneMotif';

export const SelectedWork = ({ onSelectProject }) => {
  const [hoveredProject, setHoveredProject] = useState(null);

  // Realistic UI Mockup renderer for projects
  const renderProjectVisual = (project) => {
    switch (project.id) {
      case "proj-01": // AI Receptionist - Healthcare
        return (
          <div style={{ width: '100%', height: '100%', minHeight: '300px', backgroundColor: '#0D1117', border: '1px solid #21262D', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #21262D', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} color="#B8FF3D" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#F4F3EF' }}>CLINICAL VOICE DISPATCH AGENT</span>
              </div>
              <span className="micro-label-lime" style={{ fontSize: '0.62rem' }}>HIPAA READY</span>
            </div>

            {/* Audio Waveform & Status */}
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
          <div style={{ width: '100%', height: '100%', minHeight: '300px', backgroundColor: '#0B141A', border: '1px solid #1F2C34', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1F2C34', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
          <div style={{ width: '100%', height: '100%', minHeight: '300px', backgroundColor: '#121212', border: '1px solid #282828', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
          <div style={{ width: '100%', height: '100%', minHeight: '300px', backgroundColor: '#121212', border: '1px solid #282828', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'clamp(2rem, 4vw, 3.5rem)', borderBottom: '1px solid var(--color-border-gray)', paddingBottom: '1rem' }}>
          <div>
            <span className="micro-label-lime">05 / SELECTED WORK</span>
            <h2
              className="display-large"
              style={{
                color: 'var(--color-warm-white)',
                marginTop: '0.5rem',
                margin: 0
              }}
            >
              THINGS<br />
              WE'VE BUILT.
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="micro-label" style={{ color: 'var(--color-muted-gray)' }}>
              SYSTEM ARCHIVE • 4 FEATURED
            </span>
            <span className="lime-dot" style={{ width: '5px', height: '5px' }} />
          </div>
        </div>

        {/* Projects Matrix */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {FEATURED_PROJECTS.map((project, index) => {
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
                  padding: 'clamp(1.75rem, 3.5vw, 3rem)',
                  cursor: 'pointer',
                  position: 'relative',
                  backgroundColor: 'var(--color-near-black)'
                }}
                data-cursor="CASE STUDY"
              >
                {/* Architectural corner highlights */}
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
                  {/* Left: Project Details */}
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

                  {/* Right: Realistic UI Architecture Mockup */}
                  <div>
                    {renderProjectVisual(project)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SelectedWork;
