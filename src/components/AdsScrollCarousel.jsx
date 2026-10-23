import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CornerstoneMotif from './CornerstoneMotif';
import { Eye, Maximize2, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const AdsScrollCarousel = ({ images = [], onSelectImage }) => {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const progressLineRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReducedMotion(prefersReducedMotion);

    if (prefersReducedMotion || !containerRef.current || !stageRef.current || images.length === 0) {
      return;
    }

    const isMobile = window.innerWidth < 768;
    const scrollDistanceMultiplier = isMobile ? 0.45 : 0.75;
    const totalScrollDistance = (images.length - 1) * window.innerHeight * scrollDistanceMultiplier;

    const ctx = gsap.context(() => {
      // 1. Master Timeline driven by ScrollTrigger Pin & Scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalScrollDistance}`,
          pin: stageRef.current,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const rawProgress = self.progress;
            const idx = Math.min(
              images.length - 1,
              Math.floor(rawProgress * images.length)
            );
            setCurrentIndex(idx);

            if (progressLineRef.current) {
              progressLineRef.current.style.transform = `scaleX(${rawProgress})`;
            }
          }
        }
      });

      // 2. Sequential Transitions between slides (Codrops-inspired layered scale & fade)
      images.forEach((_, i) => {
        if (i < images.length - 1) {
          // Slide i transitions out: subtle scale up, gentle upward drift and fade
          tl.to(`.carousel-card-${i}`, {
            opacity: 0,
            scale: 0.94,
            y: -30,
            filter: 'blur(4px)',
            duration: 1,
            ease: 'power2.inOut'
          }, i);

          // Slide i+1 transitions in: smooth scale-down from 1.06 to 1.0 and fade in
          tl.fromTo(`.carousel-card-${i + 1}`,
            {
              opacity: 0,
              scale: 1.06,
              y: 35,
              filter: 'blur(4px)'
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 1,
              ease: 'power2.inOut'
            },
            i
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [images]);

  if (!images || images.length === 0) return null;

  const activeImage = images[currentIndex] || images[0];

  // Accessible fallback for users with reduced motion preferences
  if (isReducedMotion) {
    return (
      <section
        id="creative-stills-gallery"
        style={{
          padding: 'clamp(4rem, 8vw, 6rem) 0',
          backgroundColor: '#070707',
          borderBottom: '1px solid var(--color-border-gray)'
        }}
      >
        <div className="site-container">
          <div style={{ marginBottom: '2rem' }}>
            <span className="micro-label" style={{ color: 'var(--color-accent-lime)' }}>
              02 // SELECTED CREATIVE WORK • ARCHIVE
            </span>
            <h2 className="display-large" style={{ fontSize: '2rem', margin: '0.5rem 0 0 0' }}>
              EDITORIAL STILLS &amp; CAMPAIGNS
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '1.5rem'
            }}
          >
            {images.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => onSelectImage && onSelectImage({ ...item, mediaType: 'image' })}
                style={{
                  position: 'relative',
                  aspectRatio: '4 / 5',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#0E0E0E',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer'
                }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', bottom: 0, insetInline: 0, padding: '1rem', background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}>
                  <h4 style={{ color: '#FFF', margin: 0, fontSize: '1rem' }}>{item.title}</h4>
                  <span style={{ color: '#AAA', fontSize: '0.7rem' }}>{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      ref={containerRef}
      id="creative-stills-gallery"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#070707',
        borderBottom: '1px solid var(--color-border-gray)'
      }}
    >
      {/* Pinned Stage Window (Height: 100vh) */}
      <div
        ref={stageRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          minHeight: '100svh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingTop: 'clamp(4.5rem, 8vh, 5.5rem)',
          paddingBottom: 'clamp(1.5rem, 3vh, 2.5rem)',
          boxSizing: 'border-box'
        }}
      >
        {/* Top Scroll Scrub Progress Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '2px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            zIndex: 30
          }}
        >
          <div
            ref={progressLineRef}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'var(--color-accent-lime)',
              transformOrigin: 'left center',
              transform: 'scaleX(0)',
              boxShadow: '0 0 10px rgba(184, 255, 61, 0.6)'
            }}
          />
        </div>

        {/* Ambient Atmospheric Backdrop Glow (Tuned to active mood) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1,
            background: 'radial-gradient(circle at 50% 50%, rgba(184, 255, 61, 0.035) 0%, rgba(10, 10, 10, 0.8) 60%, #070707 100%)',
            transition: 'opacity 0.6s ease'
          }}
        />

        {/* Top Header Bar */}
        <div className="site-container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              paddingBottom: '0.85rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CornerstoneMotif size={14} variant="mark" />
              <span
                className="micro-label"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--color-accent-lime)',
                  letterSpacing: '0.14em',
                  fontWeight: 600
                }}
              >
                02 // SELECTED CREATIVE WORK • SCROLL-DRIVEN SHOWCASE
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--color-warm-white)',
                  letterSpacing: '0.12em',
                  fontWeight: 700
                }}
              >
                [{String(currentIndex + 1).padStart(2, '0')} // {String(images.length).padStart(2, '0')}]
              </span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '3px 8px',
                  borderRadius: '2px'
                }}
              >
                <span className="lime-dot" style={{ width: '4px', height: '4px' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    color: 'var(--color-muted-gray)',
                    letterSpacing: '0.08em'
                  }}
                >
                  SCROLL DOWN TO PROGRESS
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Stage: Stack of 10 Cinematic Cards */}
        <div
          className="site-container"
          style={{
            position: 'relative',
            zIndex: 10,
            flex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 0
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 'clamp(320px, 42vw, 540px)',
              height: 'clamp(340px, 56vh, 520px)',
              margin: '0 auto'
            }}
          >
            {images.map((item, index) => {
              const isFirst = index === 0;

              return (
                <div
                  key={item.id}
                  className={`carousel-card-${index}`}
                  onClick={() => onSelectImage && onSelectImage({ ...item, mediaType: 'image' })}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    opacity: isFirst ? 1 : 0,
                    transform: isFirst ? 'scale(1) translateY(0)' : 'scale(1.06) translateY(35px)',
                    pointerEvents: index === currentIndex ? 'auto' : 'none',
                    cursor: 'pointer',
                    willChange: 'transform, opacity, filter'
                  }}
                >
                  {/* Card Container with Architectural Accents */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#0E0E0E',
                      borderRadius: 'clamp(14px, 1.8vw, 20px)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      overflow: 'hidden',
                      boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px -10px rgba(0, 0, 0, 0.8)',
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-accent-lime)';
                      e.currentTarget.style.boxShadow = '0 30px 70px -15px rgba(0, 0, 0, 0.95), 0 0 30px -10px rgba(184, 255, 61, 0.25)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                      e.currentTarget.style.boxShadow = '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px -10px rgba(0, 0, 0, 0.8)';
                    }}
                  >
                    {/* Architectural Corner Accents */}
                    <div className="corner-bracket-tl" style={{ borderColor: 'var(--color-accent-lime)' }} />
                    <div className="corner-bracket-br" style={{ borderColor: 'var(--color-accent-lime)' }} />

                    {/* Image Element */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading={index < 3 ? 'eager' : 'lazy'}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />

                    {/* Subtle Top & Bottom Gradient Shadows */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.85) 100%)',
                        pointerEvents: 'none'
                      }}
                    />

                    {/* Top Floating Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        padding: '4px 10px',
                        backgroundColor: 'rgba(10, 10, 10, 0.85)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        borderRadius: '3px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: 'var(--color-accent-lime)',
                        border: '1px solid rgba(255, 255, 255, 0.14)',
                        letterSpacing: '0.08em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        zIndex: 2
                      }}
                    >
                      <span className="lime-dot" style={{ width: '4px', height: '4px' }} />
                      <span>{item.badge}</span>
                    </div>

                    {/* Top Right Expand Trigger Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectImage && onSelectImage({ ...item, mediaType: 'image' });
                      }}
                      title="Expand Fullscreen Lightbox"
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(10, 10, 10, 0.85)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.16)',
                        color: 'var(--color-warm-white)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 2,
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--color-accent-lime)';
                        e.currentTarget.style.borderColor = 'var(--color-accent-lime)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--color-warm-white)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)';
                      }}
                    >
                      <Maximize2 size={13} />
                    </button>

                    {/* Bottom Metadata Overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: 'clamp(1rem, 2vw, 1.5rem)',
                        zIndex: 2,
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        gap: '1rem'
                      }}
                    >
                      <div>
                        <span
                          className="micro-label"
                          style={{
                            color: 'var(--color-accent-lime)',
                            fontSize: '0.62rem',
                            display: 'block',
                            marginBottom: '4px',
                            letterSpacing: '0.1em'
                          }}
                        >
                          {item.category} // {item.client}
                        </span>
                        <h3
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(1.15rem, 1.8vw, 1.55rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.02em',
                            color: '#FFF',
                            margin: 0,
                            lineHeight: 1.2
                          }}
                        >
                          {item.title}
                        </h3>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.8rem',
                            fontStyle: 'italic',
                            color: 'rgba(244, 243, 239, 0.78)',
                            margin: '4px 0 0 0'
                          }}
                        >
                          "{item.tagline}"
                        </p>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: 'var(--color-accent-lime)',
                          fontSize: '0.68rem',
                          fontFamily: 'var(--font-mono)',
                          whiteSpace: 'nowrap',
                          flexShrink: 0
                        }}
                      >
                        <span>INSPECT</span>
                        <Eye size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Interactive Thumbnail Track & Telemetry */}
        <div className="site-container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            {/* Active Item Title & Client Telemetry */}
            <div style={{ minWidth: 0, overflow: 'hidden' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: 'var(--color-muted-gray)',
                  letterSpacing: '0.08em',
                  display: 'block'
                }}
              >
                FEATURED ARTIFACT:
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: 'var(--color-warm-white)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'block'
                }}
              >
                {activeImage.title}
              </span>
            </div>

            {/* 10 Track Dots / Thumbnail Indicators */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexShrink: 0
              }}
            >
              {images.map((img, i) => {
                const isActive = i === currentIndex;

                return (
                  <button
                    key={img.id}
                    onClick={() => {
                      // Smooth scroll into proportional position
                      if (containerRef.current) {
                        const rect = containerRef.current.getBoundingClientRect();
                        const scrollTop = window.scrollY + rect.top;
                        const isMobile = window.innerWidth < 768;
                        const scrollDistanceMultiplier = isMobile ? 0.45 : 0.75;
                        const totalScrollDistance = (images.length - 1) * window.innerHeight * scrollDistanceMultiplier;
                        const targetScroll = scrollTop + (i / (images.length - 1)) * totalScrollDistance;
                        
                        if (window.__lenis) {
                          window.__lenis.scrollTo(targetScroll, { immediate: false });
                        } else {
                          window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                        }
                      }
                    }}
                    title={`${img.title} (${i + 1}/${images.length})`}
                    style={{
                      height: '6px',
                      width: isActive ? '24px' : '8px',
                      borderRadius: '3px',
                      backgroundColor: isActive ? 'var(--color-accent-lime)' : 'rgba(255, 255, 255, 0.18)',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: isActive ? '0 0 8px rgba(184, 255, 61, 0.6)' : 'none'
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsScrollCarousel;
