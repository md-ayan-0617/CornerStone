import React, { useState, useRef, useEffect } from 'react';
import { CAPABILITIES } from '../data/siteContent';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import CornerstoneMotif from './CornerstoneMotif';

export const HorizontalServices = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 960);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % CAPABILITIES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + CAPABILITIES.length) % CAPABILITIES.length);
  };

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden',
        backgroundColor: 'var(--color-charcoal)',
        paddingTop: 'clamp(5rem, 10vw, 8rem)',
        paddingBottom: 'clamp(5rem, 10vw, 8rem)',
        borderBottom: '1px solid var(--color-border-gray)'
      }}
    >
      <div className="site-container">
        
        {/* Section Top Header with Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: 'clamp(2rem, 4vw, 3.5rem)', borderBottom: '1px solid var(--color-border-gray)', paddingBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.25rem' }}>
              <span className="micro-label-lime">03 / CAPABILITY WORLDS</span>
              <span className="lime-dot" style={{ width: '4px', height: '4px' }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)', fontWeight: 800, color: 'var(--color-warm-white)', margin: 0, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
              DEEP DIVE BY DOMAIN
            </h2>
          </div>

          {/* Desktop Navigation Step Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="micro-label" style={{ marginRight: '0.5rem' }}>
              {`0${activeIndex + 1} / 0${CAPABILITIES.length}`}
            </span>
            <button
              onClick={handlePrev}
              style={{
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--color-near-black)',
                border: '1px solid var(--color-border-gray)',
                color: 'var(--color-warm-white)',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease'
              }}
              aria-label="Previous capability"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              style={{
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--color-near-black)',
                border: '1px solid var(--color-border-gray)',
                color: 'var(--color-warm-white)',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease'
              }}
              aria-label="Next capability"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Desktop Interactive Panorama / Mobile Stack */}
        <div style={{ width: '100%' }}>
          {isMobile ? (
            /* Mobile: Responsive Clean Vertical Stack */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {CAPABILITIES.map((cap) => (
                <div
                  key={cap.id}
                  style={{
                    backgroundColor: 'var(--color-near-black)',
                    border: '1px solid var(--color-border-gray)',
                    padding: '1.75rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                    <span className="micro-label-lime">{cap.id} / 04</span>
                    <span className="micro-label">{cap.code}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-warm-white)', marginBottom: '0.5rem' }}>
                    {cap.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-muted-gray)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    {cap.subtitle}
                  </p>
                  <div style={{ borderTop: '1px solid var(--color-border-gray)', paddingTop: '1rem' }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {cap.services.map((s) => (
                        <li key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-warm-white)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ width: '4px', height: '4px', backgroundColor: '#B8FF3D' }} />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Desktop: Large Architectural Showcase Card */
            <div
              style={{
                position: 'relative',
                backgroundColor: 'var(--color-near-black)',
                border: '1px solid var(--color-border-gray)',
                padding: 'clamp(2rem, 5vw, 4rem)',
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
                gap: 'clamp(2rem, 4vw, 4rem)',
                alignItems: 'center',
                minHeight: '480px'
              }}
            >
              {/* Corner brackets */}
              <div className="corner-bracket-tl" />
              <div className="corner-bracket-br" />

              {/* Left Column: Massive Editorial Info */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '3rem',
                      fontWeight: 800,
                      color: 'var(--color-accent-lime)',
                      lineHeight: 1
                    }}
                  >
                    {CAPABILITIES[activeIndex].id}
                  </span>
                  <div style={{ height: '36px', width: '1px', backgroundColor: 'var(--color-border-gray)' }} />
                  <div>
                    <span className="micro-label" style={{ display: 'block' }}>CAPABILITY DOMAIN</span>
                    <span className="micro-label-lime">{CAPABILITIES[activeIndex].code}</span>
                  </div>
                </div>

                <h3
                  className="display-medium"
                  style={{
                    color: 'var(--color-warm-white)',
                    marginBottom: '1rem'
                  }}
                >
                  {CAPABILITIES[activeIndex].title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.15rem',
                    color: 'var(--color-warm-white)',
                    lineHeight: 1.45,
                    marginBottom: '1rem',
                    maxWidth: '40ch'
                  }}
                >
                  {CAPABILITIES[activeIndex].subtitle}
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.92rem',
                    color: 'var(--color-muted-gray)',
                    lineHeight: 1.6,
                    marginBottom: '2rem',
                    maxWidth: '44ch'
                  }}
                >
                  {CAPABILITIES[activeIndex].description}
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {CAPABILITIES.map((cap, idx) => (
                    <button
                      key={cap.id}
                      onClick={() => setActiveIndex(idx)}
                      style={{
                        padding: '6px 14px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        border: '1px solid',
                        borderColor: activeIndex === idx ? 'var(--color-accent-lime)' : 'var(--color-border-gray)',
                        backgroundColor: activeIndex === idx ? 'rgba(184, 255, 61, 0.08)' : 'transparent',
                        color: activeIndex === idx ? 'var(--color-warm-white)' : 'var(--color-muted-gray)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {cap.id} {cap.title.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Architectural Schematic & Service Matrix */}
              <div
                style={{
                  backgroundColor: 'var(--color-charcoal)',
                  border: '1px solid var(--color-border-gray)',
                  padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '360px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border-gray)', paddingBottom: '0.75rem' }}>
                    <span className="micro-label">SYSTEM SPECIFICATION</span>
                    <CornerstoneMotif size={16} variant="crosshair" />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {CAPABILITIES[activeIndex].services.map((srv, i) => (
                      <div
                        key={srv}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          backgroundColor: 'rgba(10, 10, 10, 0.6)',
                          border: '1px solid rgba(255, 255, 255, 0.04)'
                        }}
                      >
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--color-warm-white)' }}>
                          {srv}
                        </span>
                        <span className="micro-label" style={{ fontSize: '0.62rem', color: 'var(--color-accent-lime)' }}>
                          DEPLOYED
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border-gray)' }}>
                  <span className="micro-label" style={{ display: 'block', marginBottom: '0.25rem' }}>
                    STANDARD METRIC:
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--color-warm-white)', fontWeight: 600 }}>
                    {CAPABILITIES[activeIndex].metrics}
                  </span>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default HorizontalServices;
