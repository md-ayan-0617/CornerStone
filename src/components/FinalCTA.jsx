import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ShieldCheck, Clock, Layers } from 'lucide-react';
import CornerstoneMotif from './CornerstoneMotif';
import TypewriterText from './TypewriterText';

export const FinalCTA = ({ onStartProject }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.final-cta-left',
        { opacity: 0, x: -30 },
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

      gsap.fromTo('.final-cta-card',
        { opacity: 0, x: 35, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
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
        backgroundColor: 'var(--color-near-black)',
        paddingTop: 'clamp(5rem, 11vw, 8.5rem)',
        paddingBottom: 'clamp(5rem, 11vw, 8.5rem)',
        borderBottom: '1px solid var(--color-border-gray)'
      }}
    >
      <div className="site-container" style={{ position: 'relative' }}>
        
        {/* Subtle geometric motif background */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            bottom: '10%',
            opacity: 0.04,
            pointerEvents: 'none'
          }}
        >
          <CornerstoneMotif size={240} variant="mark" />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: 'clamp(2.5rem, 6vw, 5rem)',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Heading + Typing Animation + Primary CTA */}
          <div className="final-cta-left">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
              <CornerstoneMotif size={16} variant="bracket" />
              <span className="micro-label" style={{ letterSpacing: '0.18em', color: 'var(--color-warm-white)' }}>
                CORNERSTONE / THE INVITATION
              </span>
            </div>

            <div style={{ maxWidth: '24ch', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
              <h2
                className="display-large"
                style={{
                  margin: 0
                }}
              >
                HAVE SOMETHING <br />
                <TypewriterText words={["WORTH BUILDING?", "READY TO SCALE?", "BUILT TO LAST?"]} />
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <button
                  onClick={onStartProject}
                  className="btn-cornerstone"
                  style={{ padding: '1.15rem 2.25rem', fontSize: '0.9rem' }}
                  data-cursor="LET'S TALK"
                >
                  <span>DISCUSS YOUR PROJECT</span>
                  <ArrowUpRight size={18} />
                </button>
              </div>

              <span className="micro-label" style={{ color: 'var(--color-muted-gray)', fontSize: '0.68rem' }}>
                DIRECT PROJECT CONSULTATION • NO OBLIGATION
              </span>
            </div>
          </div>

          {/* Right Column: Architectural Advisory Dossier Card */}
          <div className="final-cta-card">
            <div
              className="arch-box"
              style={{
                padding: 'clamp(1.75rem, 3.2vw, 2.5rem)',
                backgroundColor: 'var(--color-charcoal)',
                cursor: 'pointer',
                position: 'relative'
              }}
              onClick={onStartProject}
              data-cursor="CONNECT"
            >
              <div className="corner-bracket-tl" />
              <div className="corner-bracket-br" />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border-gray)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="lime-dot" style={{ width: '6px', height: '6px' }} />
                  <span className="micro-label-lime">INTAKE PROTOCOL</span>
                </div>
                <span className="micro-label" style={{ fontSize: '0.65rem', border: '1px solid var(--color-border-gray)', padding: '2px 8px' }}>
                  PROJECT INTAKE
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <Clock size={16} color="var(--color-accent-lime)" style={{ marginTop: '3px', flexShrink: 0 }} />
                  <div>
                    <span className="micro-label" style={{ display: 'block', fontSize: '0.65rem' }}>INQUIRY REVIEW</span>
                    <p style={{ margin: '2px 0 0 0', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-warm-white)' }}>
                      Detailed Project Scope &amp; Technical Evaluation
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <Layers size={16} color="var(--color-accent-lime)" style={{ marginTop: '3px', flexShrink: 0 }} />
                  <div>
                    <span className="micro-label" style={{ display: 'block', fontSize: '0.65rem' }}>PROJECT AVAILABILITY</span>
                    <p style={{ margin: '2px 0 0 0', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-warm-white)' }}>
                      Open for New Client Projects &amp; Commissions
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <ShieldCheck size={16} color="var(--color-accent-lime)" style={{ marginTop: '3px', flexShrink: 0 }} />
                  <div>
                    <span className="micro-label" style={{ display: 'block', fontSize: '0.65rem' }}>DELIVERABLE OWNERSHIP</span>
                    <p style={{ margin: '2px 0 0 0', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-warm-white)' }}>
                      Full Code &amp; Asset Ownership Upon Delivery
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--color-border-gray)' }}>
                <span className="micro-label" style={{ color: 'var(--color-warm-white)' }}>
                  START A PROJECT INQUIRY
                </span>
                <ArrowUpRight size={14} color="var(--color-accent-lime)" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FinalCTA;
