import React, { useState } from 'react';
import CornerstoneMotif from './CornerstoneMotif';

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
        paddingTop: 'clamp(5rem, 11vw, 9rem)',
        paddingBottom: 'clamp(5rem, 11vw, 9rem)',
        borderBottom: '1px solid var(--color-border-gray)'
      }}
    >
      <div className="site-container">
        {/* Section Index & Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'clamp(2rem, 5vw, 4rem)', borderBottom: '1px solid var(--color-border-gray)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="micro-label-lime">01 / THE PHILOSOPHY</span>
          </div>
          <span className="micro-label">FOUNDATIONAL THESIS</span>
        </div>

        {/* The Big Statement */}
        <div style={{ maxWidth: '28ch', marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
          <h2
            className="display-large"
            style={{
              margin: 0
            }}
          >
            TECHNOLOGY SHOULD MAKE<br />BUSINESS SIMPLER.
          </h2>
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
                  transition: 'background-color 0.25s ease',
                  minHeight: '220px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                {/* Corner highlight on selected */}
                {isSelected && (
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', backgroundColor: 'var(--color-accent-lime)' }} />
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
