import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LOCAL_ADS_IMAGES } from '../data/adsProjects';
import CornerstoneMotif from './CornerstoneMotif';
import { Maximize2, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const HomeHorizontalGallery = ({ onSelectImage, onNavigate }) => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressBarRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    // =========================================================================
    // Desktop & Tablet (>= 769px): GSAP ScrollTrigger Pinned Horizontal Scroll
    // Vertical scrolling drives horizontal movement smoothly from right to left
    // =========================================================================
    mm.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
      // Calculate scroll distance: track total width minus viewport width + generous buffer
      const getDistance = () => {
        if (!track) return 0;
        return Math.max(0, track.scrollWidth - window.innerWidth + 120);
      };

      const scrollTween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.85,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Update subtle progress indicator
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${Math.round(self.progress * 100)}%`;
            }
            const activeIdx = Math.min(
              LOCAL_ADS_IMAGES.length - 1,
              Math.floor(self.progress * LOCAL_ADS_IMAGES.length)
            );
            setActiveCardIndex(activeIdx);
          }
        }
      });

      // Staggered reveal of header
      gsap.fromTo(
        '.home-gallery-header-reveal',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      return () => {
        scrollTween.scrollTrigger?.kill();
        scrollTween.kill();
      };
    });

    // =========================================================================
    // Mobile (< 769px) or Reduced Motion: Fluid Native Touch-Swipe Gallery
    // Does not hijack vertical scrolling; provides intuitive touch gestures
    // =========================================================================
    mm.add('(max-width: 768px), (prefers-reduced-motion: reduce)', () => {
      // Ensure track transform is reset on mobile/reduced-motion
      gsap.set(track, { clearProps: 'x,transform' });

      const handleMobileScroll = () => {
        if (!track) return;
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (maxScroll <= 0) return;
        const progress = track.scrollLeft / maxScroll;
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${Math.round(progress * 100)}%`;
        }
        const activeIdx = Math.min(
          LOCAL_ADS_IMAGES.length - 1,
          Math.floor(progress * LOCAL_ADS_IMAGES.length)
        );
        setActiveCardIndex(activeIdx);
      };

      track.addEventListener('scroll', handleMobileScroll, { passive: true });

      return () => {
        track.removeEventListener('scroll', handleMobileScroll);
      };
    });

    // Refresh ScrollTrigger after images decode to guarantee pixel-accurate track width
    const refreshTimer1 = setTimeout(() => ScrollTrigger.refresh(), 250);
    const refreshTimer2 = setTimeout(() => ScrollTrigger.refresh(), 900);

    return () => {
      clearTimeout(refreshTimer1);
      clearTimeout(refreshTimer2);
      mm.revert();
    };
  }, []);

  // Keyboard and button stepper for mobile swipe
  const scrollTrackBy = (direction) => {
    if (!trackRef.current) return;
    const scrollAmount = window.innerWidth * 0.75 * direction;
    trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section
      id="home-campaigns-gallery"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#070707',
        borderBottom: '1px solid var(--color-border-gray)',
        overflow: 'hidden',
        // In pinned mode on desktop, height will be 100vh
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 'clamp(3rem, 6vh, 4.5rem)',
        paddingBottom: 'clamp(2rem, 4vh, 3rem)'
      }}
    >
      {/* =====================================================================
          1. MINIMAL SECTION HEADER (STRICTLY LESS TEXT, 1-LINE HEADLINE)
          ===================================================================== */}
      <div
        className="site-container home-gallery-header-reveal"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)',
          zIndex: 10
        }}
      >
        <div>
          {/* Label as explicitly requested: CAMPAIGNS / 001—010 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.45rem' }}>
            <CornerstoneMotif size={13} variant="mark" />
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
              CAMPAIGNS / 001—010
            </span>
          </div>

          {/* Single-line punchy headline */}
          <h2
            className="display-large"
            style={{
              margin: 0,
              fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)',
              letterSpacing: '-0.03em',
              whiteSpace: 'nowrap'
            }}
          >
            DIRECTED TO RETAIN DESIRE.
          </h2>
        </div>

        {/* Counter and Full Archive Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--color-muted-gray)',
              letterSpacing: '0.14em'
            }}
          >
            STILL <span style={{ color: 'var(--color-lime)', fontWeight: 600 }}>0{activeCardIndex + 1}</span> / 010
          </div>

          {onNavigate && (
            <button
              onClick={() => onNavigate('/ads')}
              className="btn-cornerstone-ghost"
              style={{
                padding: '0.55rem 1.1rem',
                fontSize: '0.72rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="View Complete Advertising Portfolio"
            >
              <span>EXPLORE ALL ADS</span>
              <ArrowUpRight size={13} />
            </button>
          )}
        </div>
      </div>

      {/* =====================================================================
          2. GSAP HORIZONTAL SCROLL TRACK (ALL 10 VERIFIED LOCAL IMAGES)
          ===================================================================== */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          overflowX: 'hidden',
          display: 'flex',
          alignItems: 'center',
          flex: 1
        }}
      >
        <div
          ref={trackRef}
          className="home-horizontal-track"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(1.5rem, 2.8vw, 2.5rem)',
            width: 'max-content',
            paddingLeft: 'clamp(1.5rem, 4.5vw, 5rem)',
            paddingRight: 'clamp(4rem, 8vw, 10rem)',
            willChange: 'transform',
            touchAction: 'pan-x'
          }}
        >
          {LOCAL_ADS_IMAGES.map((img, index) => {
            // Dynamic editorial aspect ratio sizing:
            // Image 01 is 9:16 portrait; images 02-10 are 4:5 portrait
            // Featured items have slightly larger dimensions for premium editorial rhythm
            const isPortrait916 = img.aspectRatio === '9:16' || index === 0;
            const isFeatured = index === 2 || index === 6 || index === 8; // Dior, Solitaire, Gucci

            // Responsive card dimensions
            const cardHeight = 'clamp(420px, 58vh, 600px)';
            const cardWidth = isPortrait916
              ? 'clamp(250px, 33vh, 340px)'
              : isFeatured
              ? 'clamp(380px, 50vh, 500px)'
              : 'clamp(330px, 46vh, 460px)';

            return (
              <div
                key={img.id}
                onClick={() => onSelectImage && onSelectImage(img)}
                role="button"
                tabIndex={0}
                aria-label={`View ${img.title} high resolution campaign`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectImage && onSelectImage(img);
                  }
                }}
                className="home-gallery-card group"
                style={{
                  position: 'relative',
                  height: cardHeight,
                  width: cardWidth,
                  flexShrink: 0,
                  backgroundColor: '#0E0E0E',
                  borderRadius: 'clamp(18px, 2.2vw, 24px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'border-color 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.65)'
                }}
              >
                {/* Visual Image Element with gentle hover zoom */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={img.imageUrl}
                    alt={img.title}
                    loading={index < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block',
                      transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    className="card-media-img"
                  />
                  {/* Subtle Cinematic Vignette Gradient */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0.1) 60%, rgba(0, 0, 0, 0.85) 100%)',
                      pointerEvents: 'none'
                    }}
                  />
                </div>

                {/* Top Bar: Minimal Badge + Expand Icon */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    right: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    zIndex: 2,
                    pointerEvents: 'none'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      color: 'var(--color-lime)',
                      backgroundColor: 'rgba(10, 10, 10, 0.72)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      padding: '0.28rem 0.65rem',
                      borderRadius: '999px',
                      border: '1px solid rgba(184, 255, 61, 0.25)',
                      letterSpacing: '0.12em',
                      fontWeight: 600
                    }}
                  >
                    {img.number} // {img.category}
                  </span>

                  <div
                    className="card-expand-btn"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(10, 10, 10, 0.75)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-warm-white)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Maximize2 size={13} />
                  </div>
                </div>

                {/* Bottom Bar: Minimal Client & Single-line Title (No long paragraphs) */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1.15rem',
                    right: '1.15rem',
                    zIndex: 2,
                    pointerEvents: 'none'
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      color: 'rgba(255, 255, 255, 0.6)',
                      letterSpacing: '0.12em',
                      marginBottom: '0.2rem'
                    }}
                  >
                    {img.client?.toUpperCase()}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(0.92rem, 1.3vw, 1.15rem)',
                      fontWeight: 500,
                      color: 'var(--color-warm-white)',
                      margin: 0,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {img.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          3. BOTTOM BAR: SCROLL PROGRESS INDICATOR & NAVIGATION HINTS
          ===================================================================== */}
      <div
        className="site-container"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'clamp(1rem, 2vh, 1.75rem)',
          zIndex: 10
        }}
      >
        {/* Horizontal Progress Track */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, maxWidth: '420px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              color: 'var(--color-muted-gray)',
              letterSpacing: '0.12em'
            }}
          >
            001
          </span>
          <div
            style={{
              flex: 1,
              height: '2px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '2px',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <div
              ref={progressBarRef}
              style={{
                width: '10%',
                height: '100%',
                backgroundColor: 'var(--color-lime)',
                borderRadius: '2px',
                transition: 'width 0.1s linear'
              }}
            />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              color: 'var(--color-muted-gray)',
              letterSpacing: '0.12em'
            }}
          >
            010
          </span>
        </div>

        {/* Scroll Instruction Hint & Mobile Navigation Steppers */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            className="home-gallery-desktop-hint"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.64rem',
              color: 'var(--color-muted-gray)',
              letterSpacing: '0.12em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span className="lime-dot" style={{ width: '4px', height: '4px' }} />
            <span>SCROLL VERTICALLY TO SCRUB HORIZONTALLY</span>
          </span>

          {/* Stepper buttons (especially helpful for tablet/mobile) */}
          <div className="home-gallery-mobile-stepper" style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => scrollTrackBy(-1)}
              aria-label="Previous image"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#141414',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: 'var(--color-warm-white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={() => scrollTrackBy(1)}
              aria-label="Next image"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#141414',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: 'var(--color-warm-white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Scoped CSS Micro-Interactions */}
      <style>{`
        .home-gallery-card:hover {
          border-color: rgba(184, 255, 61, 0.35) !important;
          transform: translateY(-4px);
        }
        .home-gallery-card:hover .card-media-img {
          transform: scale(1.035);
        }
        .home-gallery-card:hover .card-expand-btn {
          background-color: var(--color-lime) !important;
          color: #000 !important;
          border-color: var(--color-lime) !important;
          transform: scale(1.1);
        }
        @media (max-width: 768px) {
          #home-campaigns-gallery {
            min-height: auto !important;
            padding-top: 3.5rem !important;
            padding-bottom: 3rem !important;
          }
          .home-horizontal-track {
            overflow-x: auto !important;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            padding-right: 2rem !important;
          }
          .home-horizontal-track::-webkit-scrollbar {
            display: none;
          }
          .home-gallery-card {
            scroll-snap-align: start;
            height: clamp(380px, 54vh, 460px) !important;
            width: clamp(280px, 78vw, 340px) !important;
          }
          .home-gallery-desktop-hint {
            display: none !important;
          }
        }
        @media (min-width: 769px) {
          .home-gallery-mobile-stepper {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HomeHorizontalGallery;
