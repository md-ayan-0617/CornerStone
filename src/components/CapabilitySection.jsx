import React, { useState } from 'react';
import { CAPABILITIES } from '../data/siteContent';
import { ArrowUpRight, CheckSquare } from 'lucide-react';

export const CapabilitySection = ({ onSelectCapability }) => {
  const [activeId, setActiveId] = useState("01");

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden',
        backgroundColor: 'var(--color-near-black)',
        paddingTop: 'clamp(5rem, 11vw, 9rem)',
        paddingBottom: 'clamp(5rem, 11vw, 9rem)',
        borderBottom: '1px solid var(--color-border-gray)'
      }}
    >
      <div className="site-container">
        
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)', borderBottom: '1px solid var(--color-border-gray)', paddingBottom: '1rem' }}>
          <span className="micro-label-lime">02 / CORE CAPABILITIES</span>
          <span className="micro-label">SYSTEM ARCHITECTURE</span>
        </div>

        <div style={{ marginBottom: 'clamp(2rem, 4vw, 3.5rem)', maxWidth: '36ch' }}>
          <h2
            className="display-large"
            style={{
              margin: 0
            }}
          >
            WE BUILD THE SYSTEM<br />BEHIND THE BUSINESS.
          </h2>
        </div>

        {/* 4 Interactive Capability Panels */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1px',
            backgroundColor: 'var(--color-border-gray)',
            border: '1px solid var(--color-border-gray)'
          }}
        >
          {CAPABILITIES.map((cap) => {
            const isActive = activeId === cap.id;
            return (
              <div
                key={cap.id}
                onMouseEnter={() => setActiveId(cap.id)}
                onClick={() => {
                  setActiveId(cap.id);
                  if (onSelectCapability) onSelectCapability(cap);
                }}
                className="capability-card"
                style={{
                  position: 'relative',
                  backgroundColor: isActive ? '#141414' : '#0E0E0E',
                  padding: 'clamp(1.75rem, 3.2vw, 3rem)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '440px',
                  transition: 'background-color 0.25s ease, transform 0.25s ease'
                }}
                data-cursor="EXPAND"
              >
                {/* Active Top Edge Accent */}
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '3px',
                      backgroundColor: 'var(--color-accent-lime)'
                    }}
                  />
                )}

                {/* Card Header: Number + Indicator */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: isActive ? 'var(--color-accent-lime)' : 'var(--color-muted-gray)',
                        letterSpacing: '0.08em',
                        transition: 'color 0.2s ease'
                      }}
                    >
                      {cap.id}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="micro-label" style={{ fontSize: '0.62rem' }}>
                        {cap.code}
                      </span>
                      {isActive && <span className="lime-dot" style={{ width: '6px', height: '6px' }} />}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.03em',
                      color: isActive ? 'var(--color-warm-white)' : 'rgba(244, 243, 239, 0.75)',
                      lineHeight: 1.1,
                      marginBottom: '0.75rem',
                      transition: 'color 0.2s ease'
                    }}
                  >
                    {cap.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.88rem',
                      color: 'var(--color-muted-gray)',
                      lineHeight: 1.5,
                      marginBottom: '1.5rem'
                    }}
                  >
                    {cap.description}
                  </p>
                </div>

                {/* Services List inside card */}
                <div>
                  <div style={{ borderTop: '1px solid var(--color-border-gray)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
                    <span className="micro-label" style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.65rem' }}>
                      DELIVERABLES:
                    </span>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                      {cap.services.map((item) => (
                        <li
                          key={item}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.74rem',
                            color: isActive ? 'var(--color-warm-white)' : 'var(--color-muted-gray)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <span style={{ width: '4px', height: '4px', backgroundColor: isActive ? 'var(--color-accent-lime)' : 'var(--color-border-gray)', display: 'inline-block' }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Technical Pill */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <span className="micro-label" style={{ fontSize: '0.62rem', color: isActive ? 'var(--color-accent-lime)' : 'var(--color-muted-gray)' }}>
                      {cap.metrics}
                    </span>
                    <ArrowUpRight size={14} color={isActive ? '#B8FF3D' : '#6A6965'} />
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

export default CapabilitySection;
