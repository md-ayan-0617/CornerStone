import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CornerstoneMotif from './CornerstoneMotif';
import { Search, Compass, Cpu, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STAGES = [
  {
    step: "01",
    name: "DISCOVER",
    icon: Search,
    headline: "Understand requirements & audit workflows.",
    description: "We audit how your business currently captures enquiries, handles calls, and presents its brand online. We identify friction, missed inquiries, outdated templates, and creative bottlenecks in your customer flow.",
    deliverable: "Service Audit & Systems Matrix"
  },
  {
    step: "02",
    name: "PLAN",
    icon: Compass,
    headline: "Define the scope, blueprints & creative direction.",
    description: "We design the complete solution: website architecture, enquiry and booking flows, AI voice prompts, WhatsApp automation trees, and commercial ad creative styles.",
    deliverable: "Architecture Blueprints & Scope Specs"
  },
  {
    step: "03",
    name: "CREATE",
    icon: Cpu,
    headline: "Precision design & engineering.",
    description: "We build the web platforms, deploy the AI receptionist and voice assistants, configure WhatsApp automation, and produce high-resolution AI imagery and video ads.",
    deliverable: "Production-Ready Deliverables"
  },
  {
    step: "04",
    name: "DELIVER",
    icon: CheckCircle2,
    headline: "Test, launch & hand over completed systems.",
    description: "We rigorously test cross-browser performance, launch the live services across your channels, and hand over full operational control with comprehensive documentation.",
    deliverable: "Live Launch & Ongoing Reliability"
  }
];

export const HomeProcessSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set('.home-proc-reveal, .home-proc-card', {
          opacity: 1,
          y: 0,
          clearProps: 'all'
        });
        return;
      }

      gsap.fromTo(
        '.home-proc-reveal',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        '.home-proc-card',
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.14,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: '.home-proc-grid',
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
      id="home-process"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#070707',
        borderBottom: '1px solid var(--color-border-gray)',
        paddingTop: 'clamp(5.5rem, 10vw, 8.5rem)',
        paddingBottom: 'clamp(5.5rem, 10vw, 8.5rem)',
        overflow: 'hidden'
      }}
    >
      <div className="site-container">
        {/* Header Eyebrow */}
        <div
          className="home-proc-reveal"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingBottom: '1.25rem',
            borderBottom: '1px solid var(--color-border-gray)',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CornerstoneMotif size={14} variant="bracket" />
            <span
              className="micro-label"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--color-lime)',
                letterSpacing: '0.14em',
                fontWeight: 600
              }}
            >
              PROCESS // HOW WE WORK
            </span>
          </div>
          <span className="micro-label" style={{ color: 'var(--color-muted-gray)' }}>
            FOUR DISCIPLINED STAGES
          </span>
        </div>

        {/* Section Headline */}
        <div
          className="home-proc-reveal"
          style={{
            maxWidth: '46ch',
            marginBottom: 'clamp(3rem, 6vw, 4.5rem)'
          }}
        >
          <h2
            className="display-large"
            style={{
              margin: '0 0 1rem 0',
              fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              lineHeight: 1.15,
              color: 'var(--color-warm-white)'
            }}
          >
            A STRUCTURED PROCESS FROM AUDIT TO LIVE DEPLOYMENT.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.98rem',
              lineHeight: 1.65,
              color: 'var(--color-muted-gray)',
              margin: 0
            }}
          >
            We eliminate ambiguity with clear milestones, rapid iterations, and verified benchmarks at every stage of execution.
          </p>
        </div>

        {/* 4 Process Cards Grid */}
        <div
          className="home-proc-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '1px',
            backgroundColor: 'var(--color-border-gray)',
            border: '1px solid var(--color-border-gray)'
          }}
        >
          {PROCESS_STAGES.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.step}
                className="home-proc-card group"
                style={{
                  backgroundColor: '#0C0C0C',
                  padding: 'clamp(1.75rem, 2.5vw, 2.25rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.5rem',
                  position: 'relative',
                  transition: 'background-color 0.3s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        color: 'var(--color-lime)',
                        letterSpacing: '0.08em'
                      }}
                    >
                      {stage.step}
                    </span>
                    <Icon size={18} color="var(--color-muted-gray)" />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.15rem, 1.5vw, 1.35rem)',
                      fontWeight: 700,
                      color: 'var(--color-warm-white)',
                      margin: '0 0 0.5rem 0',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {stage.name}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      fontStyle: 'italic',
                      color: 'rgba(244, 243, 239, 0.75)',
                      margin: '0 0 0.75rem 0'
                    }}
                  >
                    "{stage.headline}"
                  </p>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      lineHeight: 1.6,
                      color: 'var(--color-muted-gray)',
                      margin: 0
                    }}
                  >
                    {stage.description}
                  </p>
                </div>

                <div
                  style={{
                    paddingTop: '0.85rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      color: 'var(--color-lime)',
                      letterSpacing: '0.06em',
                      display: 'block'
                    }}
                  >
                    OUTPUT // {stage.deliverable}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeProcessSection;
