import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  VISUAL_CAMPAIGNS,
  FEATURED_CAMPAIGNS,
  CAMPAIGN_CATEGORIES,
  CAROUSEL_COLLECTIONS
} from '../data/visualCampaigns';
import CampaignLightboxModal from '../components/CampaignLightboxModal';
import CampaignCarousel from '../components/CampaignCarousel';
import CornerstoneMotif from '../components/CornerstoneMotif';
import {
  Play,
  ArrowUpRight,
  Filter,
  Eye,
  Film,
  Camera,
  Sparkles,
  Layers,
  ChevronDown,
  Volume2,
  ExternalLink
} from 'lucide-react';

export const VisualCampaignsPage = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeModalProject, setActiveModalProject] = useState(null);
  const pageRef = useRef(null);

  const filteredCampaigns = activeCategory === "All"
    ? VISUAL_CAMPAIGNS
    : VISUAL_CAMPAIGNS.filter((c) => c.categoryFilter === activeCategory);

  // GSAP scroll-triggered reveals and hero entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero headline cinematic reveal
      gsap.fromTo('.vc-hero-reveal',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out'
        }
      );

      // Featured campaigns entrance
      gsap.fromTo('.vc-featured-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#featured-campaigns',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Gallery cards stagger
      gsap.fromTo('.vc-gallery-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#campaign-gallery-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [activeCategory]);

  const handleScrollDown = () => {
    const el = document.querySelector('#campaign-gallery');
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -70 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div ref={pageRef} style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>

      {/* =========================================================================
          1. CINEMATIC HERO SECTION — Generous Editorial Spacing
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 'clamp(8rem, 16vh, 12rem)',
          paddingBottom: 'clamp(5rem, 10vh, 8rem)',
          backgroundColor: 'var(--color-near-black)',
          borderBottom: '1px solid var(--color-border-gray)',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Architectural Grid Lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            pointerEvents: 'none'
          }}
        />

        {/* Ambient Radial Spotlight */}
        <div
          style={{
            position: 'absolute',
            top: '25%',
            right: '15%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(184, 255, 61, 0.04) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        <div className="site-container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Section Micro Header */}
          <div className="vc-hero-reveal" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.75rem' }}>
            <CornerstoneMotif size={18} variant="bracket" />
            <span className="micro-label-lime">
              VISUAL CAMPAIGNS // ADVERTISING • CINEMATIC FILMS • AI DIRECTION
            </span>
          </div>

          {/* Hero Main Headline */}
          <h1
            className="display-mega vc-hero-reveal"
            style={{
              margin: '0 0 clamp(1.5rem, 3vw, 2.5rem) 0',
              fontSize: 'clamp(2.4rem, 5.8vw, 5.4rem)',
              lineHeight: 1.04,
              letterSpacing: '-0.035em',
              maxWidth: '22ch'
            }}
          >
            IDEAS THAT MOVE.{' '}
            <span style={{ color: 'var(--color-warm-white)', WebkitTextFillColor: 'initial', display: 'block' }}>
              VISUALS THAT STAY.
            </span>
          </h1>

          {/* Supporting Statement + Call to Action Cluster */}
          <div
            className="vc-hero-reveal"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: 'clamp(2rem, 4vw, 4rem)',
              maxWidth: '1100px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '2rem'
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)',
                lineHeight: 1.55,
                color: 'var(--color-muted-gray)',
                maxWidth: '52ch',
                margin: 0
              }}
            >
              Advertising films, campaign visuals, and creative experiences designed to make brands impossible to ignore.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={handleScrollDown}
                className="btn-cornerstone"
                style={{ padding: '0.85rem 1.6rem', fontSize: '0.78rem' }}
              >
                <span>EXPLORE CAMPAIGNS</span>
                <ChevronDown size={14} />
              </button>

              <button
                onClick={() => onNavigate && onNavigate('/contact')}
                className="btn-cornerstone-secondary"
                style={{ padding: '0.85rem 1.6rem', fontSize: '0.78rem' }}
              >
                <span>START A PRODUCTION</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Scroll Indicator Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--color-muted-gray)',
            letterSpacing: '0.12em'
          }}
        >
          <span className="lime-dot" style={{ width: '4px', height: '4px' }} />
          <span>SCROLL TO VIEW REEL</span>
        </div>
      </section>

      {/* =========================================================================
          2. FEATURED CAMPAIGNS — Large Editorial Split-Screen Compositions
          ========================================================================= */}
      <section
        id="featured-campaigns"
        style={{
          paddingTop: 'clamp(5rem, 10vw, 8rem)',
          paddingBottom: 'clamp(5rem, 10vw, 8rem)',
          backgroundColor: '#0A0A0A',
          borderBottom: '1px solid var(--color-border-gray)'
        }}
      >
        <div className="site-container">
          {/* Section Header with Generous Space */}
          <div style={{ marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.85rem' }}>
              <CornerstoneMotif size={14} variant="mark" />
              <span className="micro-label" style={{ color: 'var(--color-muted-gray)' }}>
                SECTION 01 // GLOBAL COMMERCIAL KEYWORKS
              </span>
            </div>
            <h2
              className="display-large"
              style={{
                margin: '0 0 0.75rem 0',
                fontSize: 'clamp(1.9rem, 3.6vw, 2.8rem)'
              }}
            >
              FEATURED COMMERCIAL PRODUCTIONS
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.98rem',
                color: 'var(--color-muted-gray)',
                maxWidth: '60ch',
                margin: 0
              }}
            >
              Cinematic brand films and luxury product campaigns engineered for television, digital flagships, and high-conversion paid media.
            </p>
          </div>

          {/* Featured Campaigns Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4rem, 8vw, 7rem)' }}>
            {FEATURED_CAMPAIGNS.map((feat, idx) => (
              <div
                key={feat.id}
                className="vc-featured-card arch-box"
                style={{
                  display: 'grid',
                  gridTemplateColumns: idx % 2 === 0 ? 'minmax(0, 1.35fr) minmax(320px, 1fr)' : 'minmax(320px, 1fr) minmax(0, 1.35fr)',
                  backgroundColor: '#0D0D0D',
                  overflow: 'hidden'
                }}
              >
                {/* Media Column */}
                <div
                  onClick={() => setActiveModalProject(feat)}
                  style={{
                    order: idx % 2 === 0 ? 1 : 2,
                    position: 'relative',
                    minHeight: 'clamp(340px, 50vh, 520px)',
                    backgroundColor: '#050505',
                    cursor: 'pointer',
                    overflow: 'hidden'
                  }}
                  className="vc-featured-media-wrap"
                >
                  <img
                    src={feat.thumbnailUrl}
                    alt={feat.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onError={(e) => {
                      e.currentTarget.src = '/images/services/service-ad-creative-design.jpg';
                    }}
                  />

                  {/* Play Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background-color 0.25s ease'
                    }}
                    className="vc-play-overlay"
                  >
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(184, 255, 61, 0.95)',
                        color: '#0A0A0A',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 30px rgba(184, 255, 61, 0.5)',
                        transition: 'transform 0.25s ease'
                      }}
                      className="vc-play-icon"
                    >
                      {feat.mediaType === 'video' ? <Play size={24} fill="#0A0A0A" /> : <Eye size={24} />}
                    </div>
                  </div>

                  {/* Corner Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '1.25rem',
                      left: '1.25rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      backgroundColor: 'rgba(10, 10, 10, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--color-accent-lime)',
                      border: '1px solid var(--color-border-gray)',
                      padding: '4px 10px',
                      letterSpacing: '0.1em'
                    }}
                  >
                    {feat.badge}
                  </div>
                </div>

                {/* Details Column */}
                <div
                  style={{
                    order: idx % 2 === 0 ? 2 : 1,
                    padding: 'clamp(2rem, 4vw, 3.5rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderLeft: idx % 2 === 0 ? '1px solid var(--color-border-gray)' : 'none',
                    borderRight: idx % 2 === 0 ? 'none' : '1px solid var(--color-border-gray)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                      <span className="micro-label" style={{ color: 'var(--color-muted-gray)' }}>
                        {feat.client.toUpperCase()}
                      </span>
                      <span style={{ color: '#444' }}>•</span>
                      <span className="micro-label-lime">{feat.category.toUpperCase()}</span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)',
                        fontWeight: 800,
                        color: 'var(--color-warm-white)',
                        margin: '0 0 0.75rem 0',
                        lineHeight: 1.15
                      }}
                    >
                      {feat.title}
                    </h3>

                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.85rem',
                        color: 'var(--color-accent-lime)',
                        margin: '0 0 1.25rem 0'
                      }}
                    >
                      {feat.tagline}
                    </p>

                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.94rem',
                        lineHeight: 1.65,
                        color: 'var(--color-muted-gray)',
                        margin: '0 0 2rem 0'
                      }}
                    >
                      {feat.description}
                    </p>

                    {/* Deliverables Chips */}
                    <div style={{ marginBottom: '2rem' }}>
                      <span className="micro-label" style={{ display: 'block', marginBottom: '0.75rem' }}>
                        DELIVERABLES &amp; SUITE
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {feat.deliverables.map((item, i) => (
                          <span
                            key={i}
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.74rem',
                              padding: '5px 10px',
                              backgroundColor: '#161616',
                              border: '1px solid var(--color-border-gray)',
                              color: 'var(--color-warm-white)'
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                      onClick={() => setActiveModalProject(feat)}
                      className="btn-cornerstone"
                      style={{ padding: '0.75rem 1.4rem', fontSize: '0.75rem' }}
                    >
                      <span>{feat.mediaType === 'video' ? 'PLAY CAMPAIGN FILM' : 'INSPECT HIGH-RES STILL'}</span>
                      {feat.mediaType === 'video' ? <Play size={13} fill="currentColor" /> : <Eye size={13} />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. CATEGORY FILTER BAR & EDITORIAL GALLERY — Generous Spacing
          ========================================================================= */}
      <section
        id="campaign-gallery"
        style={{
          backgroundColor: 'var(--color-charcoal)',
          borderBottom: '1px solid var(--color-border-gray)',
          position: 'sticky',
          top: '68px',
          zIndex: 400,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          paddingTop: '0.85rem',
          paddingBottom: '0.85rem'
        }}
      >
        <div className="site-container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              paddingBottom: '4px',
              scrollbarWidth: 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: '0.5rem' }}>
              <Filter size={13} color="var(--color-accent-lime)" />
              <span className="micro-label" style={{ fontSize: '0.68rem', color: 'var(--color-warm-white)' }}>
                FILTER:
              </span>
            </div>

            {CAMPAIGN_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const count = cat === "All"
                ? VISUAL_CAMPAIGNS.length
                : VISUAL_CAMPAIGNS.filter((c) => c.categoryFilter === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    padding: '6px 12px',
                    borderRadius: 0,
                    backgroundColor: isActive ? 'var(--color-accent-lime)' : 'transparent',
                    color: isActive ? 'var(--color-near-black)' : 'var(--color-muted-gray)',
                    border: isActive ? '1px solid var(--color-accent-lime)' : '1px solid var(--color-border-gray)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>{cat.toUpperCase()}</span>
                  <span
                    style={{
                      fontSize: '0.62rem',
                      opacity: isActive ? 0.9 : 0.6
                    }}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Campaign Grid */}
      <section
        style={{
          paddingTop: 'clamp(4rem, 8vw, 6.5rem)',
          paddingBottom: 'clamp(5rem, 10vw, 8rem)',
          backgroundColor: 'var(--color-near-black)',
          borderBottom: '1px solid var(--color-border-gray)'
        }}
      >
        <div className="site-container">
          {/* Gallery Header Info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
            <div>
              <span className="micro-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                SHOWING {filteredCampaigns.length} CURATED VISUALS
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
                  fontWeight: 800,
                  color: 'var(--color-warm-white)',
                  margin: 0
                }}
              >
                {activeCategory === "All" ? "COMPLETE COMMERCIAL REEL & STILL ARCHIVE" : `${activeCategory.toUpperCase()} ARCHIVE`}
              </h3>
            </div>

            <span className="micro-label" style={{ border: '1px solid var(--color-border-gray)', padding: '4px 10px' }}>
              CLICK ANY WORK TO EXPAND
            </span>
          </div>

          {/* Varied Editorial Grid: Landscape, Portrait, Square */}
          <div
            id="campaign-gallery-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
              gap: 'clamp(1.75rem, 3.5vw, 2.75rem)'
            }}
          >
            {filteredCampaigns.map((camp) => {
              const isVideo = camp.mediaType === 'video';

              return (
                <div
                  key={camp.id}
                  onClick={() => setActiveModalProject(camp)}
                  className="vc-gallery-item arch-box"
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#0F0F0F',
                    overflow: 'hidden'
                  }}
                >
                  <div className="corner-bracket-tl" />

                  {/* Media Frame */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      paddingTop: camp.aspectRatio === '9:16' ? '140%' : camp.aspectRatio === '1:1' ? '100%' : '60%',
                      backgroundColor: '#070707',
                      overflow: 'hidden'
                    }}
                    className="vc-card-media"
                  >
                    <img
                      src={camp.thumbnailUrl}
                      alt={camp.title}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                      onError={(e) => {
                        e.currentTarget.src = '/images/services/service-ai-photography.jpg';
                      }}
                    />

                    {/* Media Type Overlay Pill */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '3px 8px',
                        backgroundColor: 'rgba(10, 10, 10, 0.85)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid var(--color-border-gray)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: isVideo ? 'var(--color-accent-lime)' : 'var(--color-warm-white)'
                      }}
                    >
                      {isVideo ? <Film size={12} /> : <Camera size={12} />}
                      <span>{camp.categoryFilter?.toUpperCase()}</span>
                    </div>

                    {camp.duration && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '12px',
                          right: '12px',
                          padding: '2px 6px',
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.62rem',
                          color: '#FFF'
                        }}
                      >
                        {camp.duration}
                      </div>
                    )}

                    {/* Hover Inspect Indicator */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.45)',
                        opacity: 0,
                        transition: 'opacity 0.25s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        color: 'var(--color-accent-lime)'
                      }}
                      className="vc-card-hover-overlay"
                    >
                      {isVideo ? <Play size={20} fill="#B8FF3D" /> : <Eye size={20} />}
                      <span>{isVideo ? 'WATCH REEL' : 'EXPAND STILL'}</span>
                    </div>
                  </div>

                  {/* Card Metadata */}
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                        <span className="micro-label" style={{ fontSize: '0.65rem' }}>
                          {camp.client}
                        </span>
                        <span style={{ color: '#444' }}>•</span>
                        <span className="micro-label" style={{ fontSize: '0.65rem', color: '#777' }}>
                          {camp.year}
                        </span>
                      </div>

                      <h4
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.15rem',
                          fontWeight: 700,
                          color: 'var(--color-warm-white)',
                          margin: '0 0 0.5rem 0',
                          lineHeight: 1.25
                        }}
                      >
                        {camp.title}
                      </h4>

                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.85rem',
                          lineHeight: 1.5,
                          color: 'var(--color-muted-gray)',
                          margin: 0
                        }}
                      >
                        {camp.tagline}
                      </p>
                    </div>

                    <div
                      style={{
                        marginTop: '1rem',
                        paddingTop: '0.75rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span className="micro-label" style={{ fontSize: '0.65rem', color: 'var(--color-accent-lime)' }}>
                        VERIFIED PRODUCTION
                      </span>
                      <ArrowUpRight size={14} color="var(--color-muted-gray)" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. IMAGE CAROUSELS SECTION — Curated Fashion & Product Series
          ========================================================================= */}
      <section
        style={{
          paddingTop: 'clamp(5rem, 10vw, 8rem)',
          paddingBottom: 'clamp(5rem, 10vw, 8rem)',
          backgroundColor: '#070707',
          borderBottom: '1px solid var(--color-border-gray)'
        }}
      >
        <div className="site-container">
          <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
              <CornerstoneMotif size={14} variant="mark" />
              <span className="micro-label" style={{ color: 'var(--color-muted-gray)' }}>
                SECTION 03 // EDITORIAL CAROUSEL SPOTLIGHTS
              </span>
            </div>
            <h2
              className="display-large"
              style={{
                margin: '0 0 0.5rem 0',
                fontSize: 'clamp(1.9rem, 3.4vw, 2.7rem)'
              }}
            >
              CURATED CAMPAIGN CAROUSELS
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--color-muted-gray)',
                maxWidth: '58ch',
                margin: 0
              }}
            >
              Swipeable multi-look collections designed for high-end fashion lines, AI model lookbooks, and luxury e-commerce catalogues.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {CAROUSEL_COLLECTIONS.map((collection) => (
              <CampaignCarousel
                key={collection.id}
                collection={collection}
                onSelectImage={(item) => setActiveModalProject(item)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. CALL TO ACTION SECTION — Exactly as Specified in Prompt
          ========================================================================= */}
      <section
        style={{
          paddingTop: 'clamp(6rem, 12vw, 10rem)',
          paddingBottom: 'clamp(6rem, 12vw, 10rem)',
          backgroundColor: 'var(--color-near-black)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="site-container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
            <CornerstoneMotif size={18} variant="bracket" />
            <span className="micro-label-lime">LET'S BUILD YOUR VISUAL IDENTITY</span>
          </div>

          <h2
            className="display-mega"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4.4rem)',
              margin: '0 auto 1.5rem auto',
              maxWidth: '20ch',
              lineHeight: 1.08
            }}
          >
            HAVE A BRAND TO MAKE UNFORGETTABLE?
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              lineHeight: 1.6,
              color: 'var(--color-muted-gray)',
              maxWidth: '54ch',
              margin: '0 auto clamp(2rem, 4vw, 3rem) auto'
            }}
          >
            Let's create advertising that captures attention and gives your brand a distinctive visual identity.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate && onNavigate('/contact')}
              className="btn-cornerstone"
              style={{
                padding: '1rem 2.2rem',
                fontSize: '0.85rem'
              }}
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Accessible Lightbox Modal */}
      {activeModalProject && (
        <CampaignLightboxModal
          project={activeModalProject}
          allProjects={filteredCampaigns}
          onClose={() => setActiveModalProject(null)}
          onSelectProject={(proj) => setActiveModalProject(proj)}
          onNavigate={onNavigate}
        />
      )}

      {/* Component Specific CSS Transitions */}
      <style>{`
        .vc-featured-media-wrap:hover img {
          transform: scale(1.03);
        }
        .vc-featured-media-wrap:hover .vc-play-icon {
          transform: scale(1.1);
        }
        .vc-gallery-item:hover .vc-card-media img {
          transform: scale(1.04);
        }
        .vc-gallery-item:hover .vc-card-hover-overlay {
          opacity: 1 !important;
        }
        @media (max-width: 900px) {
          .vc-featured-card {
            grid-template-columns: 1fr !important;
          }
          .vc-featured-media-wrap {
            order: 1 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default VisualCampaignsPage;
