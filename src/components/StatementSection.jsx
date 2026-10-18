import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CornerstoneMotif from './CornerstoneMotif';
import TypewriterText from './TypewriterText';
import { Zap, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';

export const StatementSection = () => {
  const [activePillar, setActivePillar] = useState(0);
  const sectionRef = useRef(null);

  const pillars = [
    {
      title: "AI AUTOMATION",
      subtitle: "AI Receptionist & WhatsApp",
      detail: "Answer incoming calls, handle FAQs, capture enquiries, book appointments, route calls and automate replies 24/7."
    },
    {
      title: "WEBSITES",
      subtitle: "Business Websites & Landing Pages",
      detail: "Professional websites with enquiry forms and booking integrations, plus focused high-converting landing pages."
    },
    {
      title: "CREATIVE PRODUCTION",
      subtitle: "AI Photography, Video Ads & Design",
      detail: "AI product & model photography, scripted UGC-style video ads, static ads, and multi-placement campaign creatives."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading & text reveal
      gsap.fromTo('.statement-heading-elem',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Telemetry Card reveal
      gsap.fromTo('.statement-telemetry-card',
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 3 Pillar cards staggered reveal
      gsap.fromTo('.statement-pillar-card',
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.statement-pillars-grid',
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
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
        <div className="statement-heading-elem" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'clamp(2rem, 4vw, 3rem)', borderBottom: '1px solid var(--color-border-gray)', paddingBottom: '1rem' }}>
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
              className="display-large statement-heading-elem"
              style={{
                margin: '0 0 1.25rem 0',
                lineHeight: 1.12
              }}
            >
              TECHNOLOGY SHOULD MAKE BUSINESS{' '}
              <TypewriterText words={["SIMPLER.", "AUTONOMOUS.", "SCALABLE.", "FRICTIONLESS."]} />
            </h2>
            <p
              className="statement-heading-elem"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                lineHeight: 1.6,
                color: 'var(--color-muted-gray)',
                maxWidth: '48ch',
                margin: 0
              }}
            >
              Siloed systems, missed phone calls, and slow response times lose customers. We deliver three cohesive disciplines—24/7 AI automation, modern business websites, and commercial creative production—designed around how modern businesses attract, convert, and scale.
            </p>
          </div>

          {/* Right Column: Architectural Telemetry Card */}
          <div
            className="arch-box statement-telemetry-card"
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
            <div className="corner-bracket-br" />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border-gray)', paddingBottom: '0.75rem' }}>
              <span className="micro-label" style={{ color: 'var(--color-accent-lime)' }}>FOUNDATIONAL METRIC MATRIX</span>
              <span className="micro-label">TELEMETRY LIVE</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div style={{ borderLeft: '2px solid var(--color-accent-lime)', paddingLeft: '10px' }}>
                <span className="micro-label" style={{ fontSize: '0.62rem' }}>LATENCY REDUCTION</span>
                <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-warm-white)' }}>
                  &lt; 600ms
                </span>
                <span style={{ fontSize: '0.65rem', color: 'var(--color-muted-gray)', fontFamily: 'var(--font-mono)' }}>Instant Voice Triage</span>
              </div>
              <div style={{ borderLeft: '2px solid var(--color-accent-lime)', paddingLeft: '10px' }}>
                <span className="micro-label" style={{ fontSize: '0.62rem' }}>COVERAGE WINDOW</span>
                <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-warm-white)' }}>
                  24/7/365
                </span>
                <span style={{ fontSize: '0.65rem', color: 'var(--color-muted-gray)', fontFamily: 'var(--font-mono)' }}>Zero Missed Calls</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '0.5rem', borderTop: '1px solid var(--color-border-gray)' }}>
              <ShieldCheck size={14} color="var(--color-accent-lime)" />
              <span className="micro-label" style={{ fontSize: '0.65rem' }}>PRODUCTION SLA • DIRECT DISPATCH PROTOCOL</span>
            </div>
          </div>
        </div>

        {/* 3 Pillars Grid with Micro-Animations & Staggered Reveal */}
        <div
          className="statement-pillars-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
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
                className="statement-pillar-card"
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
