import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CornerstoneMotif from './CornerstoneMotif';
import { Globe, Cpu, Film, Sparkles, Layers, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CAPABILITY_ITEMS = [
  {
    number: "01",
    code: "WEB_EXPERIENCES",
    title: "Website Experiences",
    icon: Globe,
    headline: "High-converting digital flagships & campaign landing pages.",
    description: "Bespoke business platforms engineered with sub-second performance, editorial typography, seamless enquiry forms, and integrated calendar booking widgets.",
    deliverables: ["Custom Web Architecture", "Conversion Landing Pages", "Calendar Schedulers", "SEO & Core Web Vitals 99+"]
  },
  {
    number: "02",
    code: "INTERACTIVE_INTERFACES",
    title: "Interactive Digital Interfaces",
    icon: Layers,
    headline: "WebGL 3D objects, tactile micro-interactions & digital tools.",
    description: "Browser-native 3D brand experiences, dynamic diurnal time shifts, interactive audio-visual feedback, and responsive product customization interfaces.",
    deliverables: ["Three.js / WebGL Engines", "Tactile Micro-Interactions", "Custom Case Study Portals", "Responsive Motion Systems"]
  },
  {
    number: "03",
    code: "AI_AUTOMATION_PIPELINES",
    title: "AI-Assisted Workflow Automation",
    icon: Cpu,
    headline: "Autonomous voice receptionists & instant WhatsApp replies.",
    description: "24/7 AI phone receptionists that handle incoming calls, answer complex FAQs, qualify client requirements, and route bookings into your CRM without delay.",
    deliverables: ["24/7 Voice AI Receptionists", "WhatsApp Cloud Workflows", "Automated Booking Sync", "Frictionless Lead Capture"]
  },
  {
    number: "04",
    code: "CREATIVE_EXPERIENCES",
    title: "Creative Digital Experiences",
    icon: Film,
    headline: "Commercial AI photography & multi-format video assets.",
    description: "Studio-grade AI product photography, virtual model fashion shoots, scripted UGC-style video ads, and coordinated multi-placement digital campaign designs.",
    deliverables: ["AI Product Visuals", "Virtual Model Shoots", "9:16 Vertical Video Reels", "Multi-Ratio Ad Creative"]
  },
  {
    number: "05",
    code: "BRAND_SYSTEMS",
    title: "Brand-Focused Digital Presentations",
    icon: Sparkles,
    headline: "Editorial typography & identity systems commanding authority.",
    description: "Distinctive digital aesthetics that reject generic templates in favor of bespoke typography hierarchy, cohesive brand tokens, and lasting market prestige.",
    deliverables: ["Design System Architecture", "Editorial Typography Scale", "Motion Language Specs", "Digital Brand Guidelines"]
  }
];

export const HomeCapabilitiesSection = ({ onNavigate }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set('.home-cap-reveal, .home-cap-card', {
          opacity: 1,
          y: 0,
          clearProps: 'all'
        });
        return;
      }

      gsap.fromTo(
        '.home-cap-reveal',
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
        '.home-cap-card',
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: '.home-cap-grid',
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
      id="home-capabilities"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#090909',
        borderBottom: '1px solid var(--color-border-gray)',
        paddingTop: 'clamp(5.5rem, 10vw, 8.5rem)',
        paddingBottom: 'clamp(5.5rem, 10vw, 8.5rem)',
        overflow: 'hidden'
      }}
    >
      <div className="site-container">
        {/* Header Eyebrow */}
        <div
          className="home-cap-reveal"
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
              CAPABILITIES // WHAT WE CAN BUILD
            </span>
          </div>
          <span className="micro-label" style={{ color: 'var(--color-muted-gray)' }}>
            END-TO-END DIGITAL DELIVERABLES
          </span>
        </div>

        {/* Section Headline */}
        <div
          className="home-cap-reveal"
          style={{
            maxWidth: '48ch',
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
            PRECISION DIGITAL DELIVERABLES ENGINEERED TO SCALE.
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
            From high-converting web applications to autonomous 24/7 AI call answering, we deliver battle-tested production systems built on modern software architecture.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div
          className="home-cap-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(1.5rem, 2.5vw, 2rem)'
          }}
        >
          {CAPABILITY_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.number}
                className="home-cap-card group"
                style={{
                  backgroundColor: '#0E0E0E',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '4px',
                  padding: 'clamp(1.75rem, 2.8vw, 2.25rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.5rem',
                  position: 'relative',
                  transition: 'border-color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-lime)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 16px 35px -10px rgba(0, 0, 0, 0.8), 0 0 20px -8px rgba(184, 255, 61, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          color: 'var(--color-lime)'
                        }}
                      >
                        {item.number}
                      </span>
                      <span style={{ color: 'var(--color-border-gray)' }}>/</span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.62rem',
                          letterSpacing: '0.08em',
                          color: 'var(--color-muted-gray)'
                        }}
                      >
                        {item.code}
                      </span>
                    </div>
                    <Icon size={18} color="var(--color-warm-white)" />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.2rem, 1.6vw, 1.4rem)',
                      fontWeight: 700,
                      color: 'var(--color-warm-white)',
                      margin: '0 0 0.5rem 0',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.86rem',
                      fontStyle: 'italic',
                      color: 'rgba(244, 243, 239, 0.75)',
                      margin: '0 0 0.75rem 0'
                    }}
                  >
                    "{item.headline}"
                  </p>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.86rem',
                      lineHeight: 1.6,
                      color: 'var(--color-muted-gray)',
                      margin: 0
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                <div
                  style={{
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px'
                  }}
                >
                  {item.deliverables.map((deliv) => (
                    <span
                      key={deliv}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        padding: '3px 7px',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#DDD',
                        borderRadius: '2px'
                      }}
                    >
                      {deliv}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Link to Services */}
        {onNavigate && (
          <div
            className="home-cap-reveal"
            style={{
              marginTop: 'clamp(2.5rem, 5vw, 4rem)',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <button
              onClick={() => onNavigate('/services')}
              className="btn-cornerstone-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.85rem 1.65rem'
              }}
            >
              <span>VIEW COMPLETE SERVICE BLUEPRINTS</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeCapabilitiesSection;
