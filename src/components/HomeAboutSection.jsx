import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CornerstoneMotif from './CornerstoneMotif';
import { Sparkles, Terminal, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const HomeAboutSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set('.home-about-reveal, .home-about-pillar', {
          opacity: 1,
          y: 0,
          clearProps: 'all'
        });
        return;
      }

      // Staggered text & header reveals
      gsap.fromTo(
        '.home-about-reveal',
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

      // Staggered 3 pillar cards
      gsap.fromTo(
        '.home-about-pillar',
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
            trigger: '.home-about-pillars-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Subtle parallax scrub on the visual monolith image
      gsap.fromTo(
        '.about-studio-img',
        { scale: 1.08, y: -20 },
        {
          scale: 1.0,
          y: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-studio-frame',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      number: "01",
      title: "CREATIVE THINKING",
      icon: Sparkles,
      desc: "Compelling visual concepts, commercial photography, and video ads that capture customer attention across digital channels."
    },
    {
      number: "02",
      title: "MODERN TECHNOLOGY",
      icon: Terminal,
      desc: "Fast, responsive web platforms and automated 24/7 AI call answering systems that handle inquiries without delay."
    },
    {
      number: "03",
      title: "PRECISION EXECUTION",
      icon: Layers,
      desc: "Reliable builds, clean responsive layouts, and disciplined delivery engineered to support your business as it scales."
    }
  ];

  return (
    <section
      id="home-about"
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
        {/* Section Coordinate Eyebrow */}
        <div
          className="home-about-reveal"
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
              ABOUT // THE CORNERSTONE PRINCIPLE
            </span>
          </div>
          <span className="micro-label" style={{ color: 'var(--color-muted-gray)' }}>
            STUDIO APPROACH • THREE PILLARS
          </span>
        </div>

        {/* Editorial Headline & Statement */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: 'clamp(2rem, 5vw, 4.5rem)',
            alignItems: 'start',
            marginBottom: 'clamp(3.5rem, 7vw, 5.5rem)'
          }}
        >
          <div className="home-about-reveal">
            <h2
              className="display-large"
              style={{
                margin: 0,
                fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: 'var(--color-warm-white)'
              }}
            >
              WE UNITE CREATIVE THINKING, MODERN TECHNOLOGY, AND PRECISION EXECUTION.
            </h2>
          </div>

          <div className="home-about-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
                lineHeight: 1.6,
                color: 'var(--color-warm-white)',
                margin: 0,
                fontWeight: 500
              }}
            >
              A cornerstone is the foundational element that supports everything built on top of it.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                color: 'var(--color-muted-gray)',
                margin: 0
              }}
            >
              We help businesses solve common growth bottlenecks: websites that fail to convert, customer inquiries lost to voicemail after hours, and ad creative that loses impact quickly. By combining automated call handling, high-performing websites, and commercial creative production, we give your business a reliable digital foundation to grow.
            </p>
          </div>
        </div>

        {/* 3 Connected Approach Pillars */}
        <div
          className="home-about-pillars-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '1px',
            backgroundColor: 'var(--color-border-gray)',
            border: '1px solid var(--color-border-gray)',
            marginBottom: 'clamp(3.5rem, 7vw, 5.5rem)'
          }}
        >
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.number}
                className="home-about-pillar group"
                style={{
                  backgroundColor: '#0C0C0C',
                  padding: 'clamp(2rem, 3vw, 2.75rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'background-color 0.3s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--color-lime)',
                        letterSpacing: '0.1em'
                      }}
                    >
                      {item.number} // PILLAR
                    </span>
                    <Icon size={18} color="var(--color-muted-gray)" />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.2rem, 1.8vw, 1.45rem)',
                      fontWeight: 700,
                      color: 'var(--color-warm-white)',
                      margin: '0 0 0.85rem 0',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.88rem',
                      lineHeight: 1.6,
                      color: 'var(--color-muted-gray)',
                      margin: 0
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Architectural Studio Showcase Frame */}
        <div
          className="about-studio-frame home-about-reveal"
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(240px, 40vh, 420px)',
            overflow: 'hidden',
            borderRadius: '4px',
            border: '1px solid var(--color-border-gray)',
            backgroundColor: '#050505'
          }}
        >
          <img
            src="/images/about-monolith.jpg"
            alt="CornerStone Studio Architecture"
            className="about-studio-img"
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: 'grayscale(25%) contrast(1.08)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(7, 7, 7, 0.2) 0%, rgba(7, 7, 7, 0.7) 100%)',
              pointerEvents: 'none'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '1.25rem',
              left: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(10, 10, 10, 0.85)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              padding: '6px 12px',
              borderRadius: '2px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <span className="lime-dot" style={{ width: '6px', height: '6px' }} />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--color-warm-white)',
                letterSpacing: '0.1em'
              }}
            >
              CORNERSTONE STUDIO // ARCHITECTURAL FOUNDATION
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAboutSection;
