import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  VISUAL_CAMPAIGNS,
  FEATURED_CAMPAIGNS,
  CAMPAIGN_CATEGORIES,
  CAROUSEL_COLLECTIONS,
  getEmbedUrl
} from '../data/visualCampaigns';
import CampaignLightboxModal from '../components/CampaignLightboxModal';
import CampaignCarousel from '../components/CampaignCarousel';
import CornerstoneMotif from '../components/CornerstoneMotif';
import {
  Play,
  Pause,
  ArrowUpRight,
  Filter,
  Eye,
  Film,
  Camera,
  ChevronDown,
  Maximize2,
  X
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const VisualCampaignsPage = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [playingInlineId, setPlayingInlineId] = useState(null);
  const pageRef = useRef(null);

  const filteredCampaigns = activeCategory === "All"
    ? VISUAL_CAMPAIGNS
    : VISUAL_CAMPAIGNS.filter((c) => c.categoryFilter === activeCategory);

  // =========================================================================
  // GSAP ScrollTrigger Animations & Responsive MatchMedia Implementation
  // =========================================================================
  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Accessibility: Respect prefers-reduced-motion
      if (prefersReducedMotion) {
        gsap.set('.vc-hero-reveal, .vc-featured-card, .vc-video-frame, .vc-feat-cat, .vc-feat-heading, .vc-feat-tagline, .vc-feat-desc, .vc-chip, .vc-cta-group, .vc-gallery-item', {
          opacity: 1,
          y: 0,
          scale: 1,
          clearProps: 'all'
        });
        return;
      }

      // Hero headline cinematic entrance
      gsap.fromTo('.vc-hero-reveal',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          clearProps: 'opacity,transform'
        }
      );

      const mm = gsap.matchMedia();

      // DESKTOP & TABLET: Sophisticated editorial timeline & scroll effects
      mm.add('(min-width: 769px)', () => {
        const cards = document.querySelectorAll('.vc-featured-card');
        cards.forEach((card) => {
          const videoFrame = card.querySelector('.vc-video-frame');
          const catLabel = card.querySelector('.vc-feat-cat');
          const heading = card.querySelector('.vc-feat-heading');
          const tagline = card.querySelector('.vc-feat-tagline');
          const desc = card.querySelector('.vc-feat-desc');
          const chips = card.querySelectorAll('.vc-chip');
          const cta = card.querySelector('.vc-cta-group');
          const thumbImg = card.querySelector('.vc-video-thumb-img');

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
              toggleActions: 'play none none none'
            }
          });

          // A. Video reveal: Subtle vertical offset, gentle scale, and clip-path
          if (videoFrame) {
            tl.fromTo(videoFrame,
              {
                opacity: 0,
                y: 35,
                scale: 0.96,
                clipPath: 'polygon(0% 12%, 100% 12%, 100% 100%, 0% 100%)'
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                duration: 0.85,
                ease: 'power3.out',
                clearProps: 'clipPath,transform'
              }
            );
          }

          // B. Staggered text sequence: Category first, Heading, Tagline, Description, Chips, CTA last
          if (catLabel) {
            tl.fromTo(catLabel,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'opacity,transform' },
              '-=0.55'
            );
          }

          if (heading) {
            tl.fromTo(heading,
              { opacity: 0, y: 22 },
              { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', clearProps: 'opacity,transform' },
              '-=0.35'
            );
          }

          if (tagline) {
            tl.fromTo(tagline,
              { opacity: 0, y: 14 },
              { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', clearProps: 'opacity,transform' },
              '-=0.3'
            );
          }

          if (desc) {
            tl.fromTo(desc,
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'opacity,transform' },
              '-=0.25'
            );
          }

          if (chips && chips.length > 0) {
            tl.fromTo(chips,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out', clearProps: 'opacity,transform' },
              '-=0.2'
            );
          }

          if (cta) {
            tl.fromTo(cta,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'opacity,transform' },
              '-=0.15'
            );
          }

          // C. Tasteful scroll parallax on video thumbnail
          if (thumbImg) {
            gsap.to(thumbImg, {
              yPercent: 5,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2
              }
            });
          }
        });
      });

      // MOBILE: Single-column, clearProps guarantee so content is NEVER hidden
      mm.add('(max-width: 768px)', () => {
        const cards = document.querySelectorAll('.vc-featured-card');
        cards.forEach((card) => {
          gsap.fromTo(card,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: 'power2.out',
              clearProps: 'all',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none'
              }
            }
          );
        });
      });

      // Gallery cards entrance
      gsap.fromTo('.vc-gallery-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: '#campaign-gallery-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      ScrollTrigger.refresh();
    }, pageRef);

    return () => ctx.revert();
  }, [activeCategory]);

  const handleScrollDown = () => {
    const el = document.querySelector('#featured-campaigns');
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
          1. CINEMATIC HERO SECTION — Editorial Negative Space & Typography
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
          2. FEATURED CAMPAIGNS — Premium 2-Column Desktop / 1-Column Mobile Layout
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
          {/* Section Header with Generous Negative Space */}
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

          {/* Featured Campaigns Stack: Always Visual on Left, Details on Right (Desktop) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4rem, 8vw, 6.5rem)' }}>
            {FEATURED_CAMPAIGNS.map((feat) => {
              const isPlaying = playingInlineId === feat.id;

              return (
                <article
                  key={feat.id}
                  className="vc-featured-card"
                  aria-label={feat.title}
                >
                  {/* LEFT COLUMN (Desktop) / TOP COLUMN (Mobile): Video Container */}
                  <div className="vc-featured-media-col">
                    <div className="vc-video-frame">
                      {isPlaying ? (
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                          <iframe
                            src={`${getEmbedUrl(feat.mediaUrl)}&autoplay=1&enablejsapi=1`}
                            title={feat.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{
                              width: '100%',
                              height: '100%',
                              border: 'none',
                              display: 'block'
                            }}
                          />
                          {/* Playing Overlay Controls */}
                          <div
                            style={{
                              position: 'absolute',
                              top: '12px',
                              right: '12px',
                              display: 'flex',
                              gap: '8px',
                              zIndex: 10
                            }}
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveModalProject(feat);
                              }}
                              title="Expand to Fullscreen Lightbox"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                backgroundColor: 'rgba(10, 10, 10, 0.88)',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                color: 'var(--color-warm-white)',
                                padding: '6px 10px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.68rem',
                                transition: 'background-color 0.2s ease'
                              }}
                            >
                              <Maximize2 size={12} />
                              <span>EXPAND</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setPlayingInlineId(null);
                              }}
                              title="Pause / Close player"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                backgroundColor: 'rgba(184, 255, 61, 0.95)',
                                border: 'none',
                                color: '#0A0A0A',
                                padding: '6px 10px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.68rem',
                                fontWeight: 700,
                                transition: 'opacity 0.2s ease'
                              }}
                            >
                              <X size={12} />
                              <span>CLOSE</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => setPlayingInlineId(feat.id)}
                          className="vc-thumbnail-wrap"
                          style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            cursor: 'pointer'
                          }}
                        >
                          <img
                            src={feat.thumbnailUrl}
                            alt={feat.title}
                            className="vc-video-thumb-img"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              display: 'block'
                            }}
                            onError={(e) => {
                              e.currentTarget.src = '/images/services/service-ad-creative-design.jpg';
                            }}
                          />

                          {/* Cinematic Gradient Vignette */}
                          <div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.65) 100%)',
                              pointerEvents: 'none'
                            }}
                          />

                          {/* Clean Play-Button Overlay */}
                          <div className="vc-play-button-overlay">
                            <div className="vc-play-circle" aria-label="Play video">
                              <Play size={24} fill="#0A0A0A" style={{ marginLeft: '3px' }} />
                            </div>
                          </div>

                          {/* Corner Badge */}
                          <div
                            style={{
                              position: 'absolute',
                              top: '1rem',
                              left: '1rem',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.68rem',
                              backgroundColor: 'rgba(10, 10, 10, 0.85)',
                              backdropFilter: 'blur(8px)',
                              WebkitBackdropFilter: 'blur(8px)',
                              color: 'var(--color-accent-lime)',
                              border: '1px solid rgba(255, 255, 255, 0.12)',
                              padding: '4px 10px',
                              letterSpacing: '0.08em',
                              borderRadius: '4px'
                            }}
                          >
                            {feat.badge || 'FEATURED PRODUCTION'}
                          </div>

                          {/* Format Tag */}
                          <div
                            style={{
                              position: 'absolute',
                              bottom: '1rem',
                              right: '1rem',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.65rem',
                              backgroundColor: 'rgba(10, 10, 10, 0.85)',
                              backdropFilter: 'blur(8px)',
                              WebkitBackdropFilter: 'blur(8px)',
                              color: 'var(--color-warm-white)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              padding: '3px 8px',
                              letterSpacing: '0.06em',
                              borderRadius: '4px'
                            }}
                          >
                            4K MASTER • YOUTUBE REEL
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* RIGHT COLUMN (Desktop) / BELOW VIDEO (Mobile): Campaign Editorial Information */}
                  <div className="vc-featured-info-col">
                    <div>
                      {/* Category & Client Label */}
                      <div className="vc-feat-cat" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
                        <span className="micro-label" style={{ color: 'var(--color-muted-gray)' }}>
                          {feat.client.toUpperCase()}
                        </span>
                        <span style={{ color: '#444' }}>•</span>
                        <span className="micro-label-lime">{feat.category.toUpperCase()}</span>
                        <span style={{ color: '#444' }}>•</span>
                        <span className="micro-label" style={{ color: '#666' }}>{feat.year}</span>
                      </div>

                      {/* Large Campaign Heading */}
                      <h3
                        className="vc-feat-heading"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(1.5rem, 2.5vw, 2.3rem)',
                          fontWeight: 800,
                          color: 'var(--color-warm-white)',
                          margin: '0 0 0.75rem 0',
                          lineHeight: 1.15,
                          letterSpacing: '-0.02em',
                          textTransform: 'uppercase'
                        }}
                      >
                        {feat.title}
                      </h3>

                      {/* Supporting Tagline */}
                      <p
                        className="vc-feat-tagline"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'clamp(0.78rem, 1.1vw, 0.88rem)',
                          color: 'var(--color-accent-lime)',
                          margin: '0 0 1.25rem 0',
                          letterSpacing: '0.03em'
                        }}
                      >
                        {feat.tagline}
                      </p>

                      {/* Campaign Description */}
                      <p
                        className="vc-feat-desc"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'clamp(0.92rem, 1.2vw, 1rem)',
                          lineHeight: 1.65,
                          color: 'var(--color-muted-gray)',
                          margin: '0 0 1.75rem 0',
                          maxWidth: '54ch'
                        }}
                      >
                        {feat.description}
                      </p>

                      {/* Deliverables Suite */}
                      <div className="vc-deliverables-group" style={{ marginBottom: 'clamp(1.75rem, 2.5vw, 2.25rem)' }}>
                        <span className="micro-label" style={{ display: 'block', marginBottom: '0.65rem', color: '#888' }}>
                          DELIVERABLES &amp; SUITE
                        </span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {feat.deliverables.map((item, i) => (
                            <span
                              key={i}
                              className="vc-chip"
                              style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.72rem',
                                padding: '6px 12px',
                                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid var(--color-border-gray)',
                                color: 'var(--color-warm-white)',
                                borderRadius: '4px'
                              }}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons: Primary Play & Secondary Lightbox */}
                    <div className="vc-cta-group">
                      <button
                        onClick={() => setPlayingInlineId(isPlaying ? null : feat.id)}
                        className="btn-cornerstone"
                        style={{
                          minHeight: '46px',
                          padding: '0.85rem 1.6rem',
                          fontSize: '0.78rem'
                        }}
                      >
                        <span>{isPlaying ? 'PAUSE FILM' : 'PLAY CAMPAIGN FILM'}</span>
                        {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                      </button>

                      <button
                        onClick={() => setActiveModalProject(feat)}
                        className="btn-cornerstone-secondary"
                        style={{
                          minHeight: '46px',
                          padding: '0.85rem 1.4rem',
                          fontSize: '0.78rem'
                        }}
                      >
                        <span>FULLSCREEN REEL</span>
                        <Maximize2 size={13} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. CATEGORY FILTER BAR & EDITORIAL GALLERY — Clean Spacing & Cards
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)', flexWrap: 'wrap', gap: '1rem' }}>
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

            <span className="micro-label" style={{ border: '1px solid var(--color-border-gray)', padding: '6px 12px' }}>
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
          5. CALL TO ACTION SECTION
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

      {/* =========================================================================
          COMPONENT-SPECIFIC RESPONSIVE CSS & PREMIUM HOVER INTERACTIONS
          ========================================================================= */}
      <style>{`
        /* Featured Card Container */
        .vc-featured-card {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
          gap: clamp(2rem, 4vw, 4rem);
          align-items: center;
          background-color: #0E0E0E;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: clamp(20px, 2.5vw, 28px);
          padding: clamp(1.75rem, 3vw, 3rem);
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
          transition: border-color 0.35s ease, box-shadow 0.35s ease;
        }

        .vc-featured-card:hover {
          border-color: rgba(184, 255, 61, 0.25);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.75), 0 0 40px -15px rgba(184, 255, 61, 0.06);
        }

        .vc-featured-media-col {
          width: 100%;
          order: 1;
        }

        .vc-featured-info-col {
          width: 100%;
          order: 2;
          display: flex;
          flex-direction: column;
          justifyContent: center;
        }

        /* Video Frame with Premium Border Radius & Clipping */
        .vc-video-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: clamp(18px, 2.2vw, 24px);
          overflow: hidden;
          isolation: isolate;
          -webkit-mask-image: -webkit-radial-gradient(white, black);
          transform: translateZ(0);
          background-color: #070707;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 20px 45px -12px rgba(0, 0, 0, 0.8), 0 0 35px -10px rgba(184, 255, 61, 0.08);
          transition: border-color 0.35s ease, box-shadow 0.35s ease;
        }

        .vc-video-frame:hover {
          border-color: rgba(184, 255, 61, 0.35);
          box-shadow: 0 25px 55px -10px rgba(0, 0, 0, 0.9), 0 0 45px -10px rgba(184, 255, 61, 0.2);
        }

        /* Play Button Overlay */
        .vc-play-button-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justifyContent: center;
          transition: background-color 0.3s ease;
        }

        .vc-play-circle {
          width: clamp(58px, 7vw, 74px);
          height: clamp(58px, 7vw, 74px);
          border-radius: 50%;
          background-color: rgba(184, 255, 61, 0.96);
          color: #0A0A0A;
          display: flex;
          align-items: center;
          justifyContent: center;
          box-shadow: 0 0 35px rgba(184, 255, 61, 0.45), 0 8px 24px rgba(0, 0, 0, 0.5);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }

        .vc-thumbnail-wrap:hover .vc-video-thumb-img {
          transform: scale(1.035);
        }

        .vc-thumbnail-wrap:hover .vc-play-circle {
          transform: scale(1.1);
          box-shadow: 0 0 45px rgba(184, 255, 61, 0.7), 0 8px 30px rgba(0, 0, 0, 0.6);
        }

        /* Deliverable Chips */
        .vc-chip {
          cursor: default;
          transition: all 0.25s ease;
        }

        .vc-chip:hover {
          background-color: rgba(184, 255, 61, 0.12) !important;
          border-color: var(--color-accent-lime) !important;
          color: var(--color-accent-lime) !important;
        }

        /* CTA Group */
        .vc-cta-group {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* Gallery Item Hover */
        .vc-gallery-item:hover .vc-card-media img {
          transform: scale(1.04);
        }

        .vc-gallery-item:hover .vc-card-hover-overlay {
          opacity: 1 !important;
        }

        /* Tablet Responsive Breakpoint */
        @media (min-width: 769px) and (max-width: 1024px) {
          .vc-featured-card {
            grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
            gap: 2rem;
            padding: 1.75rem;
          }
        }

        /* Mobile Responsive Breakpoint (Highest Priority: Single-Column Stack, No Clipping) */
        @media (max-width: 768px) {
          .vc-featured-card {
            display: flex !important;
            flex-direction: column !important;
            width: 100% !important;
            gap: 1.5rem !important;
            padding: 1.25rem 1rem !important;
            border-radius: 20px !important;
          }

          .vc-featured-media-col {
            width: 100% !important;
            order: 1 !important;
          }

          .vc-featured-info-col {
            width: 100% !important;
            order: 2 !important;
            padding: 0 !important;
          }

          .vc-video-frame {
            border-radius: 16px !important;
          }

          .vc-cta-group {
            width: 100% !important;
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 10px !important;
          }

          .vc-cta-group button {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
};

export default VisualCampaignsPage;
