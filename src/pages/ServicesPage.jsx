import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CornerstoneMotif from '../components/CornerstoneMotif';
import FinalCTA from '../components/FinalCTA';
import { ArrowUpRight, Cpu, Layout, Sparkles, Eye, Check, Users } from 'lucide-react';
import TypewriterText from '../components/TypewriterText';

export const ServicesPage = ({ onNavigate }) => {
  const [activeImageKey, setActiveImageKey] = useState({});
  const pageRef = useRef(null);

  const serviceWorlds = [
    {
      id: "01",
      code: "AI_AUTOMATION",
      categoryTag: "SERVICE 01 — AI AUTOMATION",
      title: "AI AUTOMATION",
      headline: "Answer incoming calls, handle FAQs, capture enquiries, book appointments and route calls.",
      description: "We deploy automated voice assistants, AI receptionists, and WhatsApp messaging workflows that answer questions, capture inquiries, and schedule appointments 24/7.",
      targetAudience: "Salons, clinics, restaurants, real estate and service businesses.",
      icon: Cpu,
      primaryImage: "/images/services/service-ai-receptionist.jpg",
      primaryImageTag: "AI RECEPTIONIST & VOICE ASSISTANT",
      metrics: "24/7 Call Answering • Automated Appointment Booking",
      deliverableSummary: "Configured voice assistant, telephony setup, FAQ integration, WhatsApp Cloud API workflows, and calendar synchronization.",
      services: [
        {
          id: "01.1",
          name: "AI Receptionist & Voice Assistant",
          detail: "Answer incoming calls, handle FAQs, capture enquiries, book appointments and route calls.",
          image: "/images/services/service-ai-receptionist.jpg",
          imageTag: "VOICE INTERFACE & CALL DISPATCH",
          features: [
            "24/7 inbound phone call answering for inquiries and appointment requests",
            "Natural voice conversation trained on your business FAQs and service information",
            "Direct calendar integration for instant appointment booking and rescheduling",
            "Enquiry capture, caller notification, and call routing to your team when required"
          ]
        },
        {
          id: "01.2",
          name: "WhatsApp Automation",
          detail: "Automated replies, lead collection, booking updates and order enquiries.",
          image: "/images/services/service-whatsapp-automation.jpg",
          imageTag: "WHATSAPP CONVERSATIONAL GATEWAY",
          features: [
            "Official WhatsApp Cloud API automated customer messaging workflows",
            "Instant enquiry replies and automated lead contact collection",
            "Real-time booking confirmations, reminders, and schedule updates",
            "Automated order enquiry routing and customer support resolution"
          ]
        }
      ]
    },
    {
      id: "02",
      code: "WEBSITES",
      categoryTag: "SERVICE 02 — WEBSITES",
      title: "WEBSITES",
      headline: "Professional business websites with enquiry forms and booking integrations.",
      description: "We build modern business websites and focused campaign landing pages engineered to present your business clearly, load quickly, and convert visitors into clients.",
      targetAudience: "New businesses and companies with outdated websites.",
      icon: Layout,
      primaryImage: "/images/services/service-business-websites.jpg",
      primaryImageTag: "BUSINESS WEBSITE ARCHITECTURE",
      metrics: "High Performance • Fast Mobile Loading & Clear Conversion",
      deliverableSummary: "Custom codebase, fully responsive design, integrated inquiry & booking forms, performance optimization, and search engine structure.",
      services: [
        {
          id: "02.1",
          name: "Business Websites",
          detail: "Professional websites with enquiry forms and booking integrations.",
          image: "/images/services/service-business-websites.jpg",
          imageTag: "EXECUTIVE BUSINESS PLATFORMS",
          features: [
            "Custom corporate architecture engineered for performance and credibility",
            "Integrated enquiry capture forms and seamless appointment booking systems",
            "Complete technical SEO optimization, Open Graph tags, and schema metadata",
            "Full mobile, tablet, and ultra-wide display responsiveness without layout shift"
          ]
        },
        {
          id: "02.2",
          name: "Landing Pages",
          detail: "Focused pages for specific products, services and campaigns.",
          image: "/images/services/service-landing-pages.jpg",
          imageTag: "CAMPAIGN CONVERSION PLATFORMS",
          features: [
            "Single-objective conversion layouts engineered specifically for paid traffic",
            "High-contrast visual hierarchy, concise messaging, and prominent CTAs",
            "Fast page loading designed to keep visitor attention and reduce bounce rates",
            "Integrated analytics, event telemetry, and conversion tracking pipelines"
          ]
        }
      ]
    },
    {
      id: "03",
      code: "CREATIVE_PRODUCTION",
      categoryTag: "SERVICE 03 — CREATIVE PRODUCTION",
      title: "CREATIVE PRODUCTION",
      headline: "Product visuals, virtual model shoots, jewellery and fashion campaigns, and lifestyle imagery.",
      description: "We produce commercial visual assets—including high-detail product visuals, virtual model imagery, scripted UGC-style spokesperson video ads, and multi-placement digital ad suites.",
      targetAudience: "Jewellery, fashion, beauty and ecommerce brands, and businesses running digital ads.",
      icon: Sparkles,
      primaryImage: "/images/services/service-ai-photography.jpg",
      primaryImageTag: "AI PRODUCT & MODEL CAMPAIGN",
      metrics: "High-Resolution Output • Multi-Format Campaign Assets",
      deliverableSummary: "High-resolution commercial photography, scripted vertical UGC-style video ads, multi-format social ad suites, and creative direction.",
      services: [
        {
          id: "03.1",
          name: "AI Product & Model Photography",
          detail: "Product visuals, virtual model shoots, jewellery and fashion campaigns, and lifestyle imagery.",
          image: "/images/services/service-ai-photography.jpg",
          imageTag: "LUXURY JEWELLERY & VIRTUAL MODEL",
          features: [
            "Photorealistic virtual model photography tailored to diverse brand demographics",
            "Luxury jewellery, cosmetics, apparel, and industrial product composition",
            "Bespoke studio lighting, refined reflections, and flawless material textures",
            "Editorial lifestyle imagery matching your brand identity and art direction"
          ]
        },
        {
          id: "03.2",
          name: "AI UGC-Style Video Ads",
          detail: "Scripted product demos, AI spokesperson videos and short promotional videos.",
          image: "/images/services/service-ugc-video-ads.jpg",
          imageTag: "VERTICAL UGC SPOKESPERSON AD",
          features: [
            "Natural-looking AI spokespersons delivering persuasive, scripted product demonstrations",
            "Hook-optimized vertical video ads built specifically for TikTok, Reels, and Shorts",
            "Dynamic captioning, b-roll composition, sound design, and narrative pacing",
            "Fast production cycles allowing continuous weekly creative testing and iteration"
          ]
        },
        {
          id: "03.3",
          name: "Ad Creative Design",
          detail: "Static ads, carousels, campaign concepts and versions sized for different placements.",
          image: "/images/services/service-ad-creative-design.jpg",
          imageTag: "COORDINATED MULTI-PLACEMENT AD SUITE",
          features: [
            "Polished static ads, multi-slide carousels, and high-impact digital campaign concepts",
            "Coordinated asset versions sized for all ad placements (1:1, 9:16, 16:9, banner)",
            "Editorial typography, high-contrast visual hierarchy, and brand-consistent styling",
            "Iterative multi-hook variations engineered to combat ad fatigue in paid channels"
          ]
        }
      ]
    }
  ];

  // GSAP ScrollTrigger Animations & Parallax Scrubs
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Entrance Reveal
      gsap.fromTo('.services-hero-elem',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out'
        }
      );

      // 2. Category Sections Scroll Reveals
      const sections = document.querySelectorAll('.service-category-section');
      sections.forEach((section) => {
        const headerElems = section.querySelectorAll('.service-cat-reveal');
        const imgFrame = section.querySelector('.img-hover-frame');
        const img = section.querySelector('.service-showcase-img');
        const cards = section.querySelectorAll('.sub-service-card');
        const ctaBar = section.querySelector('.service-cat-cta');

        // Header & info reveal
        if (headerElems.length > 0) {
          gsap.fromTo(headerElems,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none none'
              }
            }
          );
        }

        // Showcase image scroll parallax scrub
        if (imgFrame && img) {
          gsap.fromTo(img,
            { scale: 1.08, y: -20 },
            {
              scale: 1.0,
              y: 20,
              ease: 'none',
              scrollTrigger: {
                trigger: imgFrame,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6
              }
            }
          );
        }

        // Sub-service cards staggered entrance
        if (cards.length > 0) {
          gsap.fromTo(cards,
            { opacity: 0, y: 40, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: cards[0],
                start: 'top 88%',
                toggleActions: 'play none none none'
              }
            }
          );
        }

        // Bottom CTA reveal
        if (ctaBar) {
          gsap.fromTo(ctaBar,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: ctaBar,
                start: 'top 92%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      
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
              <div className="services-hero-elem" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                <CornerstoneMotif size={16} variant="bracket" />
                <span className="micro-label-lime">SERVICES &amp; CAPABILITIES</span>
              </div>

              <h1
                className="display-mega services-hero-elem"
                style={{
                  margin: '0 0 1.75rem 0',
                  maxWidth: '20ch'
                }}
              >
                SERVICES BUILT FOR{' '}
                <TypewriterText words={["MODERN BUSINESS.", "BETTER ENGAGEMENT.", "PRACTICAL RESULTS."]} />
              </h1>

              <div className="services-hero-elem" style={{ borderTop: '1px solid var(--color-border-gray)', paddingTop: '1.75rem', maxWidth: '48ch', marginBottom: '2.5rem' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
                    lineHeight: 1.6,
                    color: 'var(--color-warm-white)',
                    margin: 0
                  }}
                >
                  CornerStone delivers three integrated disciplines designed to help businesses operate efficiently and present themselves clearly: 24/7 AI Automation to capture inquiries, responsive Websites to engage clients, and Creative Production for compelling marketing visuals.
                </p>
              </div>

              <div className="services-hero-elem" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="btn-cornerstone"
                  data-cursor="CONTACT"
                >
                  <span>DISCUSS YOUR PROJECT</span>
                  <ArrowUpRight size={16} />
                </button>
                <a
                  href="#service-ai_automation"
                  className="btn-cornerstone-secondary"
                  data-cursor="EXPLORE"
                >
                  <span>EXPLORE DISCIPLINES ↓</span>
                </a>
              </div>
            </div>

            {/* Right: Architectural Capabilities Taxonomy Matrix Card */}
            <div
              className="arch-box services-hero-elem"
              style={{
                backgroundColor: 'var(--color-charcoal)',
                padding: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                position: 'relative'
              }}
            >
              <div className="corner-bracket-tl" />
              <div className="corner-bracket-br" />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border-gray)', paddingBottom: '0.85rem' }}>
                <span className="micro-label-lime">CORE DISCIPLINES</span>
                <span className="micro-label">3 CAPABILITIES</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {serviceWorlds.map((w) => (
                  <a
                    key={w.id}
                    href={`#service-${w.code.toLowerCase()}`}
                    style={{
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1rem',
                      backgroundColor: 'var(--color-near-black)',
                      border: '1px solid var(--color-border-gray)',
                      borderRadius: '4px',
                      transition: 'border-color 0.2s ease, transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-accent-lime)';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border-gray)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="micro-label" style={{ color: 'var(--color-accent-lime)' }}>{w.id}</span>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-warm-white)' }}>
                          {w.title}
                        </span>
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--color-muted-gray)', display: 'block', marginTop: '3px' }}>
                        {w.services.map(s => s.name).join(' • ')}
                      </span>
                    </div>
                    <ArrowUpRight size={14} color="var(--color-accent-lime)" />
                  </a>
                ))}
              </div>

              <div style={{ marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid var(--color-border-gray)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="micro-label" style={{ fontSize: '0.62rem' }}>STATUS: PRODUCTION READY</span>
                <span className="micro-label-lime" style={{ fontSize: '0.62rem' }}>7 TOTAL SERVICES</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3 Major Service Categories - All Pure Sleek Architectural Dark Theme */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {serviceWorlds.map((world, idx) => {
          const IconComp = world.icon;
          const currentImg = activeImageKey[world.id] || world.primaryImage;
          const currentImgTag = activeImageKey[`${world.id}_tag`] || world.primaryImageTag;
          const bgCol = idx % 2 === 0 ? 'var(--color-near-black)' : 'var(--color-charcoal)';

          return (
            <section
              key={world.id}
              id={`service-${world.code.toLowerCase()}`}
              className="service-category-section"
              style={{
                paddingTop: 'clamp(5rem, 10vw, 8rem)',
                paddingBottom: 'clamp(5rem, 10vw, 8rem)',
                backgroundColor: bgCol,
                color: 'var(--color-warm-white)',
                borderBottom: '1px solid var(--color-border-gray)',
                position: 'relative'
              }}
            >
              <div className="site-container">
                
                {/* Category Header Bar */}
                <div className="service-cat-reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'clamp(2rem, 4vw, 3.5rem)', borderBottom: '1px solid var(--color-border-gray)', paddingBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="micro-label-lime" style={{ fontWeight: 700 }}>
                      CATEGORY {world.id} / 03
                    </span>
                    <span className="micro-label" style={{ color: 'var(--color-muted-gray)' }}>
                      • {world.categoryTag}
                    </span>
                  </div>
                  <IconComp size={22} color="var(--color-accent-lime)" />
                </div>

                {/* Category Title, Headline & Target Audience */}
                <div className="service-cat-reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 'clamp(2rem, 5vw, 4rem)', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
                  <div>
                    <h2
                      className="display-large"
                      style={{
                        margin: '0 0 1rem 0',
                        color: 'var(--color-warm-white)'
                      }}
                    >
                      {world.title}
                    </h2>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                        fontWeight: 600,
                        color: 'var(--color-accent-lime)',
                        lineHeight: 1.35,
                        margin: '0 0 1.25rem 0'
                      }}
                    >
                      {world.headline}
                    </h3>

                    {/* Target Audience Badge */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 14px',
                        backgroundColor: 'rgba(184, 255, 61, 0.08)',
                        border: '1px solid rgba(184, 255, 61, 0.28)',
                        borderRadius: '4px',
                        marginTop: '0.25rem'
                      }}
                    >
                      <Users size={14} color="var(--color-accent-lime)" />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--color-warm-white)', fontWeight: 600 }}>
                        TARGET AUDIENCE: {world.targetAudience}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1.05rem',
                        lineHeight: 1.6,
                        color: 'var(--color-muted-gray)',
                        marginBottom: '1.5rem'
                      }}
                    >
                      {world.description}
                    </p>
                    <div style={{ padding: '1.1rem', border: '1px solid var(--color-border-gray)', backgroundColor: '#0B0B0B', borderRadius: '4px' }}>
                      <span className="micro-label" style={{ display: 'block', marginBottom: '6px', color: 'var(--color-muted-gray)' }}>
                        DELIVERABLE SPECIFICATION:
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-warm-white)', lineHeight: 1.5, display: 'block' }}>
                        {world.deliverableSummary}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Category Visual Showcase Frame with Dynamic Sub-Service Image Switcher & Parallax Scrub */}
                <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
                  <div
                    className="img-hover-frame"
                    style={{
                      height: 'clamp(300px, 50vh, 540px)',
                      width: '100%',
                      cursor: 'pointer',
                      borderRadius: '6px',
                      overflow: 'hidden'
                    }}
                    data-cursor="EXPAND"
                  >
                    <img
                      src={currentImg}
                      alt={currentImgTag}
                      className="img-hover-zoom service-showcase-img"
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
                          padding: '5px 12px',
                          border: '1px solid rgba(255, 255, 255, 0.18)',
                          borderRadius: '4px',
                          backdropFilter: 'blur(8px)',
                          color: '#FFFFFF'
                        }}
                      >
                        {currentImgTag}
                      </span>
                      <div
                        style={{
                          background: 'rgba(10, 10, 10, 0.88)',
                          padding: '5px 12px',
                          border: '1px solid rgba(184, 255, 61, 0.35)',
                          borderRadius: '4px',
                          backdropFilter: 'blur(8px)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span className="lime-dot" style={{ width: '6px', height: '6px' }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-accent-lime)' }}>
                          AI POWERED ASSET
                        </span>
                      </div>
                    </div>

                    {/* Image Bottom Specs Badge */}
                    <div className="img-overlay-badge" style={{ borderRadius: '4px' }}>
                      <Eye size={13} color="var(--color-accent-lime)" />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#FFFFFF' }}>
                        {world.metrics}
                      </span>
                    </div>
                  </div>

                  {/* Multi-Image Switcher Tabs */}
                  {world.services.length > 1 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px', alignItems: 'center' }}>
                      <span className="micro-label" style={{ color: 'var(--color-muted-gray)', marginRight: '6px' }}>
                        SERVICE PREVIEWS:
                      </span>
                      {world.services.map((srv) => {
                        const isSelected = (activeImageKey[world.id] || world.primaryImage) === srv.image;
                        return (
                          <button
                            key={srv.name}
                            onClick={() => {
                              setActiveImageKey(prev => ({
                                ...prev,
                                [world.id]: srv.image,
                                [`${world.id}_tag`]: srv.imageTag || srv.name
                              }));
                            }}
                            style={{
                              padding: '6px 14px',
                              backgroundColor: isSelected ? 'var(--color-accent-lime)' : '#141414',
                              color: isSelected ? '#0A0A0A' : '#9B9A96',
                              border: '1px solid',
                              borderColor: isSelected ? 'var(--color-accent-lime)' : 'var(--color-border-gray)',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              borderRadius: '4px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <span style={{ width: '4px', height: '4px', backgroundColor: isSelected ? '#0A0A0A' : '#777' }} />
                            {srv.name}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Sub-Services Detailed Cards Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${world.services.length === 2 ? '360px' : '300px'}), 1fr))`,
                    gap: '1.25rem',
                    marginBottom: '2.5rem'
                  }}
                >
                  {world.services.map((srv) => (
                    <div
                      key={srv.name}
                      className="sub-service-card arch-box"
                      style={{
                        padding: 'clamp(1.5rem, 2.8vw, 2rem)',
                        backgroundColor: '#111111',
                        border: '1px solid var(--color-border-gray)',
                        borderRadius: '6px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'border-color 0.25s ease, transform 0.25s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-accent-lime)';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-border-gray)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div>
                        {/* Service Card Top: Number & Indicator */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                          <span className="micro-label-lime" style={{ fontWeight: 700 }}>
                            {srv.id}
                          </span>
                          <span style={{ width: '6px', height: '6px', backgroundColor: '#B8FF3D' }} />
                        </div>

                        {/* Service Title */}
                        <h4
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(1.2rem, 1.8vw, 1.4rem)',
                            fontWeight: 700,
                            color: '#F4F3EF',
                            marginBottom: '0.65rem'
                          }}
                        >
                          {srv.name}
                        </h4>

                        {/* Service Exact Official Description */}
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.92rem',
                            color: 'var(--color-warm-white)',
                            lineHeight: 1.55,
                            marginBottom: '1.25rem',
                            fontWeight: 500
                          }}
                        >
                          {srv.detail}
                        </p>

                        {/* Service Bullets List */}
                        <div style={{ borderTop: '1px solid var(--color-border-gray)', paddingTop: '1rem' }}>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {srv.features.map((feat, fIdx) => (
                              <li
                                key={fIdx}
                                style={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: '8px',
                                  fontFamily: 'var(--font-body)',
                                  fontSize: '0.84rem',
                                  color: 'var(--color-muted-gray)',
                                  lineHeight: 1.45
                                }}
                              >
                                <Check size={14} color="var(--color-accent-lime)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Card Bottom CTA */}
                      <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border-gray)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="micro-label" style={{ color: 'var(--color-muted-gray)' }}>
                          COMMISSION SPEC
                        </span>
                        <button
                          onClick={() => onNavigate('/contact')}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            color: 'var(--color-accent-lime)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <span>ENQUIRE</span>
                          <ArrowUpRight size={13} />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

                {/* World Action CTA */}
                <div className="service-cat-cta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CornerstoneMotif size={14} variant="bracket" />
                    <span className="micro-label" style={{ color: 'var(--color-muted-gray)' }}>
                      {world.code === "AI_AUTOMATION" && "TIMELINE: SCOPE-DEPENDENT • TYPICALLY 1–3 WEEKS BASED ON WORKFLOWS & INTEGRATIONS"}
                      {world.code === "WEBSITES" && "TIMELINE: SCOPE-DEPENDENT • TYPICALLY 2–4 WEEKS BASED ON ARCHITECTURE & CONTENT READINESS"}
                      {world.code === "CREATIVE_PRODUCTION" && "TIMELINE: SCOPE-DEPENDENT • TYPICALLY 1–2 WEEKS BASED ON ASSET VOLUME & VARIATIONS"}
                    </span>
                  </div>

                  <button
                    onClick={() => onNavigate('/contact')}
                    className="btn-cornerstone"
                    style={{
                      borderRadius: '4px'
                    }}
                  >
                    <span>DISCUSS YOUR {world.title} PROJECT</span>
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
