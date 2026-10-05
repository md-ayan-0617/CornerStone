import React, { useState, useEffect } from 'react';
import { JOURNEY_STAGES } from '../data/siteContent';
import { Play, Pause, ChevronRight, MessageSquare, PhoneCall, Calendar, Activity, Sparkles, Globe } from 'lucide-react';
import CornerstoneMotif from './CornerstoneMotif';

export const ScrollJourneyVideo = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-progress through the 6 stages if in play mode
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % JOURNEY_STAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const currentStage = JOURNEY_STAGES[activeStep];

  // Render realistic UI mockups corresponding to each stage
  const renderStageVisual = (index) => {
    switch (index) {
      case 0: // ATTRACT - Paid Acquisition Hook
        return (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1.5rem', background: '#0F0F0F' }}>
            <div style={{ width: '100%', maxWidth: '320px', backgroundColor: '#1A1A1A', border: '1px solid #333', padding: '1rem', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '22px', height: '22px', backgroundColor: '#B8FF3D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '10px', color: '#0A0A0A', fontWeight: 800 }}>C</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#FFF' }}>SPONSORED CAMPAIGN</span>
                </div>
                <span className="micro-label" style={{ fontSize: '0.6rem' }}>0.00s HOOK</span>
              </div>
              
              <div style={{ height: '170px', backgroundColor: '#111', border: '1px solid #282828', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '10px', right: '10px', padding: '3px 6px', background: 'rgba(0,0,0,0.7)', border: '1px solid #B8FF3D' }}>
                  <span style={{ fontSize: '9px', fontFamily: 'monospace', color: '#B8FF3D' }}>STOP SCROLL 94%</span>
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: '#FFF', lineHeight: 1.15 }}>
                  MODULAR ARCHITECTURE FOR SCALE.
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#9B9A96', marginTop: '4px' }}>
                  Targeted intent acquisition pipeline.
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid #282828' }}>
                <span className="micro-label" style={{ fontSize: '0.62rem', color: '#B8FF3D' }}>DIRECT INTENT SIGNAL</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#FFF' }}>SWIPE UP →</span>
              </div>
            </div>
          </div>
        );

      case 1: // ENGAGE - Editorial Flagship Web
        return (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#0A0A0A', padding: '1rem', justifyContent: 'center' }}>
            <div style={{ width: '100%', border: '1px solid #292929', backgroundColor: '#141414', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #292929', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#444' }} />
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#444' }} />
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#444' }} />
                </div>
                <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#9B9A96' }}>https://platform.client.com</span>
                <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#B8FF3D' }}>LCP: 320ms</span>
              </div>
              <div style={{ padding: '0.5rem 0' }}>
                <span className="micro-label" style={{ color: '#B8FF3D' }}>ARCHITECTURAL PRESENCE</span>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: '#F4F3EF', margin: '4px 0 8px 0' }}>
                  FOUNDATIONAL CLARITY
                </h4>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#9B9A96', margin: 0 }}>
                  High-conversion editorial digital experience. Zero clutter, sub-second load times.
                </p>
              </div>
            </div>
          </div>
        );

      case 2: // RESPOND - WhatsApp Instant Response
        return (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: '#0D0D0D' }}>
            <div style={{ width: '100%', maxWidth: '340px', backgroundColor: '#121B14', border: '1px solid #203525', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', borderBottom: '1px solid #203525', paddingBottom: '0.5rem' }}>
                <MessageSquare size={16} color="#B8FF3D" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#F4F3EF', fontWeight: 600 }}>WhatsApp Business Gateway</span>
                <span className="lime-dot" style={{ marginLeft: 'auto', width: '5px', height: '5px' }} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div style={{ alignSelf: 'flex-start', background: '#1C2920', padding: '8px 12px', borderRadius: '6px', maxWidth: '85%' }}>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#F4F3EF', fontFamily: 'var(--font-body)' }}>
                    "Hi, looking for information on your infrastructure rollout."
                  </p>
                  <span style={{ fontSize: '9px', color: '#9B9A96', fontFamily: 'monospace', display: 'block', marginTop: '2px' }}>10:42 AM</span>
                </div>

                <div style={{ alignSelf: 'flex-end', background: '#005C4B', padding: '8px 12px', borderRadius: '6px', maxWidth: '90%' }}>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#FFF', fontFamily: 'var(--font-body)' }}>
                    "Welcome to Cornerstone. I can provide the syllabus or connect you with a director. Which deployment timeline fits?"
                  </p>
                  <span style={{ fontSize: '9px', color: '#B8FF3D', fontFamily: 'monospace', display: 'block', marginTop: '2px', textAlign: 'right' }}>
                    Response: 0.42s • Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 3: // QUALIFY - AI Voice Agent Triage
        return (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: '#0A0A0A' }}>
            <div style={{ width: '100%', maxWidth: '340px', backgroundColor: '#161616', border: '1px solid #333', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PhoneCall size={16} color="#B8FF3D" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#FFF' }}>VOICE AGENT CALL</span>
                </div>
                <span className="micro-label-lime" style={{ fontSize: '0.65rem' }}>00:48 • ACTIVE</span>
              </div>

              {/* Dynamic waveform visualization */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', height: '45px', margin: '1rem 0' }}>
                {[30, 65, 85, 45, 95, 60, 40, 80, 50, 70, 35, 90, 45].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      width: '4px',
                      height: `${h}%`,
                      backgroundColor: i % 2 === 0 ? '#B8FF3D' : '#F4F3EF',
                      transition: 'height 0.2s ease'
                    }}
                  />
                ))}
              </div>

              <div style={{ background: '#0D0D0D', padding: '8px 10px', borderLeft: '2px solid #B8FF3D' }}>
                <span className="micro-label" style={{ fontSize: '0.6rem' }}>TRANSCRIPTION & QUALIFICATION:</span>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.72rem', color: '#F4F3EF', fontFamily: 'monospace' }}>
                  "Budget: Tier 2 verified. Requirement: Automated clinic triage. Routing to calendar."
                </p>
              </div>
            </div>
          </div>
        );

      case 4: // CONVERT - Booking & CRM Sync
        return (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: '#0A0A0A' }}>
            <div style={{ width: '100%', maxWidth: '340px', backgroundColor: '#141414', border: '1px solid #292929', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                <Calendar size={16} color="#B8FF3D" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#FFF' }}>AUTOMATED CALENDAR COMMIT</span>
              </div>

              <div style={{ backgroundColor: '#1A1A1A', border: '1px solid #333', padding: '0.85rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#B8FF3D' }}>OCTOBER 24 • 14:00 GMT</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#9B9A96' }}>SYNCED</span>
                </div>
                <h5 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: '#FFF', margin: '0 0 4px 0' }}>
                  Executive Strategy Briefing
                </h5>
                <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#9B9A96' }}>
                  Assigned: Founder & Technical Director
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="micro-label" style={{ fontSize: '0.62rem' }}>CRM STATUS</span>
                <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#B8FF3D' }}>STAGE: QUALIFIED_OPPORTUNITY</span>
              </div>
            </div>
          </div>
        );

      case 5: // GROW - Telemetry & Analytics
        return (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: '#0A0A0A' }}>
            <div style={{ width: '100%', maxWidth: '340px', backgroundColor: '#141414', border: '1px solid #292929', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity size={16} color="#B8FF3D" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#FFF' }}>GROWTH TELEMETRY</span>
                </div>
                <span className="micro-label-lime" style={{ fontSize: '0.62rem' }}>LOOP CLOSED</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '1rem' }}>
                <div style={{ backgroundColor: '#1A1A1A', padding: '8px', border: '1px solid #282828' }}>
                  <span className="micro-label" style={{ fontSize: '9px' }}>CONV. RATE</span>
                  <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: '#B8FF3D', fontWeight: 700 }}>+42.8%</p>
                </div>
                <div style={{ backgroundColor: '#1A1A1A', padding: '8px', border: '1px solid #282828' }}>
                  <span className="micro-label" style={{ fontSize: '9px' }}>DROPPED LEADS</span>
                  <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: '#F4F3EF', fontWeight: 700 }}>0.00%</p>
                </div>
              </div>

              <span className="micro-label" style={{ fontSize: '0.6rem', color: '#9B9A96' }}>
                CONTINUOUS ITERATIVE TELEMETRY • LIVE SYNC
              </span>
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
        backgroundColor: 'var(--color-near-black)',
        paddingTop: 'clamp(5rem, 11vw, 9rem)',
        paddingBottom: 'clamp(5rem, 11vw, 9rem)',
        borderBottom: '1px solid var(--color-border-gray)'
      }}
    >
      <div className="site-container">
        
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: 'clamp(2rem, 4vw, 3.5rem)', borderBottom: '1px solid var(--color-border-gray)', paddingBottom: '1rem' }}>
          <div>
            <span className="micro-label-lime">04 / THE SIGNATURE JOURNEY</span>
            <h2
              className="display-large"
              style={{
                color: 'var(--color-warm-white)',
                marginTop: '0.5rem',
                margin: 0
              }}
            >
              FROM FIRST CLICK<br />
              TO FINAL CONVERSATION.
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: 'var(--color-charcoal)',
                border: '1px solid var(--color-border-gray)',
                color: 'var(--color-warm-white)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              <span>{isPlaying ? 'PAUSE JOURNEY' : 'AUTOPLAY'}</span>
            </button>
          </div>
        </div>

        {/* Step Progression Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
            gap: '1px',
            backgroundColor: 'var(--color-border-gray)',
            border: '1px solid var(--color-border-gray)',
            marginBottom: '2rem'
          }}
        >
          {JOURNEY_STAGES.map((st, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <button
                key={st.step}
                onClick={() => {
                  setActiveStep(idx);
                  setIsPlaying(false);
                }}
                style={{
                  background: isCurrent ? 'var(--color-charcoal)' : 'var(--color-near-black)',
                  border: 'none',
                  padding: '1rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background-color 0.2s ease'
                }}
              >
                {isCurrent && (
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', backgroundColor: 'var(--color-accent-lime)' }} />
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span className="micro-label" style={{ color: isCurrent ? 'var(--color-accent-lime)' : 'var(--color-muted-gray)' }}>
                    {st.step}
                  </span>
                  {isCurrent && <span className="lime-dot" style={{ width: '4px', height: '4px' }} />}
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: isCurrent ? 'var(--color-warm-white)' : 'var(--color-muted-gray)',
                    display: 'block'
                  }}
                >
                  {st.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cinematic Journey Stage Visualizer */}
        <div
          style={{
            position: 'relative',
            backgroundColor: 'var(--color-charcoal)',
            border: '1px solid var(--color-border-gray)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.15fr)',
            minHeight: '440px',
            alignItems: 'stretch'
          }}
        >
          {/* Corner brackets */}
          <div className="corner-bracket-tl" />
          <div className="corner-bracket-br" />

          {/* Left: Stage Description & Strategy */}
          <div
            style={{
              padding: 'clamp(2rem, 4vw, 3.5rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRight: '1px solid var(--color-border-gray)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                <span className="micro-label-lime">{currentStage.step} / 06</span>
                <span className="micro-label">{currentStage.channel}</span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 2.8vw, 2.5rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: 'var(--color-warm-white)',
                  lineHeight: 1.1,
                  marginBottom: '1rem'
                }}
              >
                {currentStage.headline}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.05rem',
                  color: 'var(--color-muted-gray)',
                  lineHeight: 1.55,
                  margin: 0
                }}
              >
                {currentStage.description}
              </p>
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border-gray)' }}>
              <span className="micro-label" style={{ display: 'block', marginBottom: '4px' }}>
                SYSTEM FUNCTION:
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--color-accent-lime)' }}>
                {currentStage.systemRole}
              </span>
            </div>
          </div>

          {/* Right: Realistic Commercial Mockup Simulator */}
          <div style={{ position: 'relative', minHeight: '340px' }}>
            {renderStageVisual(activeStep)}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 820px) {
          .display-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ScrollJourneyVideo;
