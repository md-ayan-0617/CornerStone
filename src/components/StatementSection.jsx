import React, { useState } from 'react';
import CornerstoneMotif from './CornerstoneMotif';
import TypewriterText from './TypewriterText';
import { Zap, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';

export const StatementSection = () => {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    { title: "AI", detail: "Self-training agents that triage, converse, and understand intent with sub-second latency." },
    { title: "AUTOMATION", detail: "Invisible pipes connecting WhatsApp, voice synthesis, CRMs, and real-time scheduling." },
    { title: "DIGITAL", detail: "Architectural, fast, bespoke web platforms that signal uncompromising credibility." },
    { title: "CREATIVE", detail: "Cinematic commercial hooks and modular UGC that convert attention into transaction." }
  ];

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden',
        backgroundColor: 'var(--color-charcoal)',
        paddingTop: 'clamp(4.5rem, 9vw, 8rem)',
        paddingBottom: 'clamp(4.5rem, 9vw, 8rem)',
        borderBottom: '1px solid var(--color-border-gray)'
      }}
    >
      <div className="site-container">
        {/* Section Index & Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'clamp(2rem, 4vw, 3rem)', borderBottom: '1px solid var(--color-border-gray)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="micro-label-lime">01 / THE PHILOSOPHY</span>
          </div>
          <span className="micro-label">FOUNDATIONAL THESIS</span>
        </div>

        {/* The Big Statement Header with Right-Side Architectural Telemetry */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'center',
            marginBottom: 'clamp(3rem, 6vw, 5rem)'
          }}
        >
          {/* Left Column: Heading + Typewriter + Philosophy Subtext */}
          <div>
            <h2
              className="display-large"
              style={{
                margin: '0 0 1.25rem 0',
                lineHeight: 1.12
              }}
            >
              TECHNOLOGY SHOULD MAKE BUSINESS{' '}
              <TypewriterText words={["SIMPLER.", "AUTONOMOUS.", "SCALABLE.", "FRICTIONLESS."]} />
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                lineHeight: 1.6,
                color: 'var(--color-muted-gray)',
                maxWidth: '48ch',
                margin: 0
              }}
            >
              Siloed SaaS stacks, manual data entry, and slow response times waste customer attention. We engineer cohesive digital pipelines that unite autonomous capture, AI triage, and bespoke web platforms into a continuous revenue engine.
            </p>
          </div>

          {/* Right Column: Architectural Telemetry Card */}
          <div
            className="arch-box"
            style={{
              position: 'relative',
              backgroundColor: 'rgba(10, 10, 10, 0.75)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid var(--color-border-gray)',
              padding: 'clamp(1.5rem, 3vw, 2.25rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}
          >
            <div className="corner-bracket-tl" />
            <div className="corner-bracket-tr" />
            <div className="corner-bracket-bl" />
            <div className="corner-bracket-br" />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="lime-dot" />
                <span className="micro-label" style={{ color: 'var(--color-warm-white)', fontWeight: 600 }}>
                  SYSTEM BENCHMARK MATRIX
                </span>
              </div>
              <span className="micro-label-lime">AUTONOMOUS</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0.85rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="micro-label" style={{ color: 'var(--color-muted-gray)' }}>LEAD RESPONSE LATENCY</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-accent-lime)', fontWeight: 700 }}>&lt; 800MS (REAL-TIME)</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0.85rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="micro-label" style={{ color: 'var(--color-muted-gray)' }}>CONVERSION CHANNEL</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-warm-white)', fontWeight: 600 }}>WHATSAPP + VOICE + WEB</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0.85rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="micro-label" style={{ color: 'var(--color-muted-gray)' }}>COMMUNICATION COVERAGE</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-warm-white)', fontWeight: 600 }}>24/7/365 ZERO-DROP</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem' }}>
              <span className="micro-label" style={{ fontSize: '0.68rem', color: 'var(--color-muted-gray)' }}>
                ARCHITECTURAL SPECIFICATION V2.6
              </span>
              <CornerstoneMotif size={18} variant="bracket" />
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid: AI, AUTOMATION, DIGITAL, CREATIVE */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '1px',
            backgroundColor: 'var(--color-border-gray)',
            border: '1px solid var(--color-border-gray)',
            marginBottom: 'clamp(3rem, 6vw, 5rem)'
          }}
        >
          {pillars.map((pillar, index) => {
            const isSelected = activePillar === index;
            return (
              <div
                key={pillar.title}
                onClick={() => setActivePillar(index)}
                onMouseEnter={() => setActivePillar(index)}
                style={{
                  position: 'relative',
                  backgroundColor: isSelected ? 'var(--color-near-black)' : 'var(--color-charcoal)',
                  padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                  cursor: 'pointer',
                  transition: 'background-color 0.28s cubic-bezier(0.16, 1, 0.3, 1), transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isSelected ? 'translateY(-2px)' : 'none',
                  boxShadow: isSelected ? '0 14px 30px rgba(0, 0, 0, 0.5)' : 'none',
                  zIndex: isSelected ? 2 : 1,
                  minHeight: '220px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                {/* Corner highlight on selected */}
                {isSelected && (
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', backgroundColor: 'var(--color-accent-lime)', boxShadow: '0 0 10px rgba(184, 255, 61, 0.6)' }} />
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span className="micro-label" style={{ color: isSelected ? 'var(--color-accent-lime)' : 'var(--color-muted-gray)' }}>
                    0{index + 1}
                  </span>
                  {isSelected && <span className="lime-dot" style={{ width: '5px', height: '5px' }} />}
                </div>

                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      color: isSelected ? 'var(--color-warm-white)' : 'var(--color-muted-gray)',
                      marginBottom: '0.75rem',
                      transition: 'color 0.2s ease'
                    }}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      lineHeight: 1.5,
                      color: isSelected ? 'var(--color-warm-white)' : 'var(--color-muted-gray)',
                      margin: 0
                    }}
                  >
                    {pillar.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final Resolved Statement */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--color-border-gray)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <CornerstoneMotif size={24} variant="foundation" />
            <span
              className="display-sub"
              style={{
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'var(--color-warm-white)'
              }}
            >
              ONE CONNECTED EXPERIENCE.
            </span>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--color-muted-gray)',
              maxWidth: '38ch',
              margin: 0
            }}
          >
            Not isolated fragments. We link top-of-funnel attention directly to autonomous conversion and revenue ops.
          </p>
        </div>

      </div>
    </section>
  );
};

export default StatementSection;
