import React from 'react';
import CornerstoneMotif from '../components/CornerstoneMotif';
import FinalCTA from '../components/FinalCTA';
import { ArrowUpRight, Cpu, Layout, Sparkles, Network, Eye } from 'lucide-react';
import TypewriterText from '../components/TypewriterText';

export const ServicesPage = ({ onNavigate }) => {
  const serviceWorlds = [
    {
      id: "01",
      code: "AI_AUTOMATION",
      title: "AI + AUTOMATION",
      headline: "Make your business respond.",
      description: "We build low-latency voice receptionists, autonomous conversational channels, and intelligent booking pipelines that eliminate waiting for your customers.",
      icon: Cpu,
      image: "/images/proj-ai-receptionist.jpg",
      imageTag: "AUTONOMOUS VOICE & CONVERSATIONAL ENGINE",
      metrics: "< 600ms Latency • 24/7 Triage Availability",
      services: [
        { name: "AI Receptionist", detail: "24/7 clinical, legal, and commercial phone dispatch with zero wait times." },
        { name: "AI Voice Agents", detail: "Context-aware conversational telephony capable of complex triage and scheduling." },
        { name: "WhatsApp Automation", detail: "Official Cloud API workflows for instant prospect engagement and dynamic docs." },
        { name: "Lead Qualification", detail: "Automated scoring of intent, budget, and project scope before human handoff." },
        { name: "Booking Automation", detail: "Direct calendar synchronizations with multi-timezone conflict resolution." },
        { name: "Follow-up Automation", detail: "Persistent, respectful closed-loop sequences across SMS, email, and messaging." },
        { name: "CRM / Workflow Integrations", detail: "Seamless two-way data pipelines into HubSpot, Salesforce, and custom DBs." }
      ],
      deliverableSummary: "Deployed voice & chat infrastructure, prompt guardrails, and enterprise webhooks."
    },
    {
      id: "02",
      code: "DIGITAL",
      title: "DIGITAL",
      headline: "Make your business look the part.",
      description: "We engineer architectural digital flagships, high-conversion acquisition landing pages, and responsive web platforms that convey absolute market authority.",
      icon: Layout,
      image: "/images/service-digital.jpg",
      imageTag: "BESPOKE EDITORIAL WEB PLATFORM & ARCHITECTURAL GRID",
      metrics: "99+ Core Web Vitals • Sub-second First Contentful Paint",
      services: [
        { name: "Websites & Flagships", detail: "Bespoke digital architecture built on modern React/Vite frameworks." },
        { name: "Landing Pages", detail: "Precision-engineered single-intent conversion pages with sub-second speeds." },
        { name: "Website Redesign", detail: "Transforming legacy web presences into modern, authoritative digital experiences." },
        { name: "Digital Experiences", detail: "Interactive spatial tours, bespoke config tools, and responsive motion." },
        { name: "Conversion-focused Interfaces", detail: "Friction-free UX with tested typography, contrast, and micro-interactions." }
      ],
      deliverableSummary: "Custom codebase, responsive breakpoints (320px–4K), 99+ Core Web Vitals, and CMS integration."
    },
    {
      id: "03",
      code: "CREATIVE",
      title: "CREATIVE",
      headline: "Make people stop.",
      description: "We formulate commercial visual identities, synthetic UGC production pipelines, and high-performing ad creatives designed to cut through saturated feeds.",
      icon: Sparkles,
      image: "/images/proj-creative-pipeline.jpg",
      imageTag: "MODULAR SYNTHETIC & MOTION PRODUCTION PIPELINE",
      metrics: "10x Production Velocity • Multi-Aspect (9:16, 1:1, 16:9)",
      services: [
        { name: "AI UGC & Synthetic Production", detail: "High-velocity production of authentic customer testimonial styles." },
        { name: "Ad Creatives (Static & Motion)", detail: "Multi-hook creative assets built for Meta, TikTok, and Google Ads." },
        { name: "Social Creatives", detail: "Consistent, architectural brand assets tailored for high organic engagement." },
        { name: "Graphic Design & Art Direction", detail: "Editorial layout, publication design, and visual hierarchy formulation." },
        { name: "Brand Identity Systems", detail: "Comprehensive typography systems, palette rules, and asset guidelines." },
        { name: "Campaign Assets", detail: "Modular suites of launch creative ready for rapid multi-channel deployment." }
      ],
      deliverableSummary: "Production-ready video files, figma brand tokens, aspect-ratio suites (9:16, 1:1, 16:9)."
    },
    {
      id: "04",
      code: "GROWTH_SYSTEMS",
      title: "GROWTH SYSTEMS",
      headline: "Make everything connect.",
      description: "The architectural bridge between attention and revenue. We architect the telemetry, routing, and synchronization that converts visitors into confirmed appointments.",
      icon: Network,
      image: "/images/service-growth.jpg",
      imageTag: "ENTERPRISE GROWTH & OPERATIONAL TELEMETRY STACK",
      metrics: "Zero Dropped Leads • Real-Time Synchronization",
      services: [
        { name: "Lead Capture", detail: "Instant zero-friction capture mechanics embedded natively into the experience." },
        { name: "Lead Routing", detail: "Algorithmic distribution of qualified opportunities to specialized reps." },
        { name: "Customer Communication", detail: "Unified omnichannel inbox infrastructure connecting voice, web, and chat." },
        { name: "Automation Infrastructure", detail: "Resilient serverless automations that scale with transaction volume." },
        { name: "Growth Telemetry Stack", detail: "Real-time funnel visibility measuring drop-off, speed-to-lead, and conversions." }
      ],
      deliverableSummary: "Full telemetry dashboard, real-time alerting, and automated revenue workflow rules."
    }
  ];

  return (
    <div style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      
      {/* Services Header with Right-Side Taxonomy Matrix & Typing Heading */}
      <section
        style={{
          paddingTop: 'clamp(7rem, 15vh, 10rem)',
          paddingBottom: 'clamp(4rem, 8vh, 6rem)',
          backgroundColor: 'var(--color-near-black)',
          borderBottom: '1px solid var(--color-border-gray)'
        }}
      >
        <div className="site-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              gap: 'clamp(2rem, 5vw, 4.5rem)',
              alignItems: 'center'
            }}
          >
            {/* Left: Heading + Typing Animation + Copy */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                <CornerstoneMotif size={16} variant="bracket" />
                <span className="micro-label-lime">CAPABILITIES CATALOG</span>
              </div>

              <h1
                className="display-mega"
                style={{
                  margin: '0 0 1.25rem 0',
                  maxWidth: '18ch'
                }}
              >
                WHAT WE <TypewriterText words={["BUILD.", "ARCHITECT.", "AUTOMATE.", "SCALE."]} />
              </h1>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1.05rem, 1.6vw, 1.35rem)',
                  lineHeight: 1.55,
                  color: 'var(--color-muted-gray)',
                  maxWidth: '44ch',
                  margin: 0
                }}
              >
                Four foundational disciplines. One connected system designed around how modern businesses actually capture, convert, and scale.
              </p>
            </div>

            {/* Right: Architectural Discipline Telemetry Matrix Card */}
            <div>
              <div
                className="arch-box"
                style={{
                  padding: 'clamp(1.5rem, 2.8vw, 2.25rem)',
                  backgroundColor: 'var(--color-charcoal)',
                  position: 'relative',
                  borderRadius: '6px'
                }}
              >
                <div className="corner-bracket-tl" />
                <div className="corner-bracket-br" />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border-gray)', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="lime-dot" style={{ width: '6px', height: '6px' }} />
                    <span className="micro-label-lime" style={{ fontSize: '0.68rem' }}>SYSTEM TAXONOMY</span>
                  </div>
                  <span className="micro-label" style={{ fontSize: '0.62rem' }}>4 ACTIVE MODULES</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {serviceWorlds.map((world) => {
                    const Icon = world.icon;
                    return (
                      <div
                        key={world.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          backgroundColor: 'rgba(10, 10, 10, 0.6)',
                          border: '1px solid var(--color-border-gray)',
                          borderRadius: '4px',
                          transition: 'border-color 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(184, 255, 61, 0.5)';
                          e.currentTarget.style.transform = 'translateX(4px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--color-border-gray)';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-accent-lime)' }}>
                            {world.id}
                          </span>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-warm-white)' }}>
                            {world.title}
                          </span>
                        </div>
                        <Icon size={14} color="var(--color-muted-gray)" />
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid var(--color-border-gray)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="micro-label" style={{ fontSize: '0.62rem' }}>STATUS: PRODUCTION READY</span>
                  <span className="micro-label-lime" style={{ fontSize: '0.62rem' }}>ZERO LATENCY PIPELINES</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Major Service Worlds with Alternating Warm White Background for World 02 */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {serviceWorlds.map((world, idx) => {
          const isLight = idx === 1; // Alternating warm white section restored per user preference
          const IconComp = world.icon;

          return (
            <section
              key={world.id}
              className={isLight ? "section-light" : ""}
              style={{
                paddingTop: 'clamp(5rem, 10vw, 8rem)',
                paddingBottom: 'clamp(5rem, 10vw, 8rem)',
                backgroundColor: isLight ? 'var(--color-warm-white)' : 'var(--color-charcoal)',
                color: isLight ? 'var(--color-near-black)' : 'var(--color-warm-white)',
                borderBottom: '1px solid',
                borderColor: isLight ? '#D6D4CC' : 'var(--color-border-gray)',
                position: 'relative'
              }}
            >
              <div className="site-container">
                
                {/* World Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'clamp(2rem, 4vw, 3.5rem)', borderBottom: '1px solid', borderColor: isLight ? '#D6D4CC' : 'var(--color-border-gray)', paddingBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="micro-label" style={{ color: isLight ? '#6A6965' : 'var(--color-accent-lime)', fontWeight: 700 }}>
                      WORLD {world.id} / 04
                    </span>
                    <span className="micro-label" style={{ color: isLight ? '#888' : 'var(--color-muted-gray)' }}>
                      • {world.code}
                    </span>
                  </div>
                  <IconComp size={20} color={isLight ? '#0A0A0A' : 'var(--color-accent-lime)'} />
                </div>

                {/* World Title & Headline */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 'clamp(2rem, 5vw, 4rem)', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
                  <div>
                    <h2
                      className="display-large"
                      style={{
                        margin: '0 0 1rem 0',
                        color: isLight ? 'var(--color-near-black)' : 'var(--color-warm-white)'
                      }}
                    >
                      {world.title}
                    </h2>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)',
                        fontWeight: 600,
                        color: isLight ? '#333' : 'var(--color-accent-lime)',
                        margin: '0 0 1rem 0'
                      }}
                    >
                      {world.headline}
                    </h3>
                  </div>

                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1.05rem',
                        lineHeight: 1.6,
                        color: isLight ? '#444' : 'var(--color-muted-gray)',
                        marginBottom: '1.5rem'
                      }}
                    >
                      {world.description}
                    </p>
                    <div style={{ padding: '1rem', border: '1px solid', borderColor: isLight ? '#D6D4CC' : 'var(--color-border-gray)', backgroundColor: isLight ? '#EAE8E2' : 'var(--color-near-black)', borderRadius: '4px' }}>
                      <span className="micro-label" style={{ display: 'block', marginBottom: '4px', color: isLight ? '#666' : 'var(--color-muted-gray)' }}>
                        DELIVERABLE SPECIFICATION:
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: isLight ? '#0A0A0A' : 'var(--color-warm-white)' }}>
                        {world.deliverableSummary}
                      </span>
                    </div>
                  </div>
                </div>

                {/* World Visual Showcase with Smooth Hover Effect */}
                <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
                  <div
                    className="img-hover-frame"
                    style={{
                      height: 'clamp(260px, 45vh, 480px)',
                      width: '100%',
                      cursor: 'pointer',
                      borderRadius: '6px'
                    }}
                    data-cursor="EXPAND"
                  >
                    <img
                      src={world.image}
                      alt={world.title}
                      className="img-hover-zoom"
                      loading="lazy"
                    />

                    {/* Corner architectural accents */}
                    <div className="corner-bracket-tl" />
                    <div className="corner-bracket-br" />

                    {/* Image Top Bar */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        right: '16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        zIndex: 3,
                        pointerEvents: 'none'
                      }}
                    >
                      <span
                        className="micro-label"
                        style={{
                          background: 'rgba(10, 10, 10, 0.88)',
                          padding: '4px 10px',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '4px',
                          backdropFilter: 'blur(8px)',
                          color: '#FFFFFF'
                        }}
                      >
                        {world.imageTag}
                      </span>
                      <div
                        style={{
                          background: 'rgba(10, 10, 10, 0.88)',
                          padding: '4px 10px',
                          border: '1px solid rgba(184, 255, 61, 0.3)',
                          borderRadius: '4px',
                          backdropFilter: 'blur(8px)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span className="lime-dot" style={{ width: '6px', height: '6px' }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-accent-lime)' }}>
                          DEPLOYMENT READY
                        </span>
                      </div>
                    </div>

                    {/* Image Bottom Specs Badge */}
                    <div className="img-overlay-badge" style={{ borderRadius: '4px' }}>
                      <Eye size={12} color="var(--color-accent-lime)" />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#FFFFFF' }}>
                        {world.metrics}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Services Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                    gap: '1px',
                    backgroundColor: isLight ? '#D6D4CC' : 'var(--color-border-gray)',
                    border: '1px solid',
                    borderColor: isLight ? '#D6D4CC' : 'var(--color-border-gray)',
                    marginBottom: '2.5rem',
                    borderRadius: '6px',
                    overflow: 'hidden'
                  }}
                >
                  {world.services.map((srv, sIdx) => (
                    <div
                      key={srv.name}
                      style={{
                        padding: '1.5rem',
                        backgroundColor: isLight ? '#FAF9F6' : 'var(--color-near-black)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minHeight: '160px',
                        transition: 'background-color 0.25s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = isLight ? '#F0EEE6' : '#181818')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = isLight ? '#FAF9F6' : 'var(--color-near-black)')}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                          <span className="micro-label" style={{ color: isLight ? '#666' : 'var(--color-accent-lime)' }}>
                            {world.id}.{sIdx + 1}
                          </span>
                          <span style={{ width: '4px', height: '4px', backgroundColor: isLight ? '#0A0A0A' : '#B8FF3D' }} />
                        </div>
                        <h4
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.15rem',
                            fontWeight: 700,
                            color: isLight ? '#0A0A0A' : '#F4F3EF',
                            marginBottom: '0.5rem'
                          }}
                        >
                          {srv.name}
                        </h4>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.84rem',
                            color: isLight ? '#555' : 'var(--color-muted-gray)',
                            lineHeight: 1.5,
                            margin: 0
                          }}
                        >
                          {srv.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* World Action CTA */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => onNavigate('/contact')}
                    className="btn-cornerstone"
                    style={{
                      backgroundColor: isLight ? 'var(--color-near-black)' : 'var(--color-warm-white)',
                      color: isLight ? 'var(--color-warm-white)' : 'var(--color-near-black)',
                      borderRadius: '4px'
                    }}
                  >
                    <span>COMMISSION {world.title}</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>

              </div>
            </section>
          );
        })}
      </div>

      {/* Pre-Footer CTA */}
      <FinalCTA onStartProject={() => onNavigate('/contact')} />

    </div>
  );
};

export default ServicesPage;
