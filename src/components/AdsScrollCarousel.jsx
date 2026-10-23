import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CornerstoneMotif from './CornerstoneMotif';
import { Eye, Maximize2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const AdsScrollCarousel = ({ images = [], onSelectImage }) => {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const progressLineRef = useRef(null);
  const counterRef = useRef(null);
  const titleRef = useRef(null);
  const categoryRef = useRef(null);
  const taglineRef = useRef(null);
  const badgeRef = useRef(null);
  const dotsRef = useRef([]);
  const cardsRef = useRef([]);
  const currentActiveIndexRef = useRef(0);

  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Jump to specific slide by calculating target scroll offset
  const jumpToSlide = (targetIndex) => {
    const clamped = Math.max(0, Math.min(images.length - 1, targetIndex));
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const totalScrollableHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetY = scrollTop + (clamped / (images.length - 1)) * totalScrollableHeight;

    if (window.__lenis) {
      window.__lenis.scrollTo(targetY, { immediate: false, duration: 1.1 });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    jumpToSlide(currentActiveIndexRef.current - 1);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    jumpToSlide(currentActiveIndexRef.current + 1);
  };

  const handleOpenLightbox = () => {
    const activeItem = images[currentActiveIndexRef.current] || images[0];
    if (onSelectImage && activeItem) {
      onSelectImage({ ...activeItem, mediaType: 'image' });
    }
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReducedMotion(prefersReducedMotion);

    if (prefersReducedMotion || !containerRef.current || !stageRef.current || images.length === 0) {
      return;
    }

    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    // Direct DOM telemetry updater — Zero React re-renders on scroll
    const updateTelemetry = (activeIdx, progress) => {
      currentActiveIndexRef.current = activeIdx;
      const currentItem = images[activeIdx] || images[0];

      if (progressLineRef.current) {
        progressLineRef.current.style.transform = `scaleX(${progress})`;
      }

      if (counterRef.current) {
        counterRef.current.textContent = `[${String(activeIdx + 1).padStart(2, '0')} // ${String(images.length).padStart(2, '0')}]`;
      }

      if (titleRef.current && currentItem) {
        titleRef.current.textContent = currentItem.title;
      }

      if (categoryRef.current && currentItem) {
        categoryRef.current.textContent = `${currentItem.category} // ${currentItem.client}`;
      }

      if (taglineRef.current && currentItem) {
        taglineRef.current.textContent = `"${currentItem.tagline}"`;
      }

      if (badgeRef.current && currentItem) {
        badgeRef.current.textContent = currentItem.badge;
      }

      // Update dot indicators
      dotsRef.current.forEach((dot, dotIdx) => {
        if (!dot) return;
        const isActive = dotIdx === activeIdx;
        dot.style.width = isActive ? '28px' : '8px';
        dot.style.backgroundColor = isActive ? 'var(--color-accent-lime)' : 'rgba(255, 255, 255, 0.18)';
        dot.style.boxShadow = isActive ? '0 0 10px rgba(184, 255, 61, 0.65)' : 'none';
      });
    };

    const ctx = gsap.context(() => {
      // 1. Initial State Setup: Slide 0 active, all others stacked beneath and hidden
      cards.forEach((card, idx) => {
        if (idx === 0) {
          gsap.set(card, {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            zIndex: 10,
            pointerEvents: 'auto'
          });
        } else {
          gsap.set(card, {
            opacity: 0,
            scale: 0.96,
            y: 20,
            filter: 'blur(4px)',
            zIndex: 5,
            pointerEvents: 'none'
          });
        }
      });

      // 2. Timeline synchronized to scroll progress through the container
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'ads-carousel-trigger',
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          onUpdate: (self) => {
            const rawProgress = Math.max(0, Math.min(1, self.progress));
            const activeIdx = Math.min(
              images.length - 1,
              Math.floor(rawProgress * images.length)
            );
            updateTelemetry(activeIdx, rawProgress);
          }
        }
      });

      // 3. Layered sequential transition sequence — no edge clipping
      for (let i = 0; i < images.length - 1; i++) {
        const outCard = cards[i];
        const inCard = cards[i + 1];

        // Outgoing card smoothly fades and settles slightly down to 0.96 (never cropped)
        tl.to(
          outCard,
          {
            opacity: 0,
            scale: 0.96,
            y: -20,
            filter: 'blur(4px)',
            duration: 1,
            ease: 'power2.inOut',
            onStart: () => {
              outCard.style.pointerEvents = 'none';
            },
            onReverseComplete: () => {
              outCard.style.pointerEvents = 'auto';
            }
          },
          i
        );

        // Incoming card scales smoothly from 0.96 to 1.0 (never exceeds 1.0)
        tl.fromTo(
          inCard,
          {
            opacity: 0,
            scale: 0.96,
            y: 20,
            filter: 'blur(4px)',
            zIndex: 10 + i + 1
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power2.inOut',
            immediateRender: false,
            onStart: () => {
              inCard.style.pointerEvents = 'auto';
            },
            onReverseComplete: () => {
              inCard.style.pointerEvents = 'none';
            }
          },
          i
        );
      }
    }, containerRef);

    // Refresh ScrollTrigger to recalculate exact offsets after layout settle
    const refreshTimer1 = setTimeout(() => ScrollTrigger.refresh(), 100);
    const refreshTimer2 = setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      clearTimeout(refreshTimer1);
      clearTimeout(refreshTimer2);
      ctx.revert();
    };
  }, [images]);

  if (!images || images.length === 0) return null;

  const firstItem = images[0];

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
            {images.map((item) => (
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
                  style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#070707' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    insetInline: 0,
                    padding: '1rem',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)'
                  }}
                >
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

  // Calculate container height: 100vh for stage + 75vh per transition
  const totalTrackHeight = `${100 + (images.length - 1) * 75}vh`;

  return (
    <div
      ref={containerRef}
      id="creative-stills-gallery"
      style={{
        position: 'relative',
        width: '100%',
        height: totalTrackHeight,
        backgroundColor: '#070707',
        borderBottom: '1px solid var(--color-border-gray)'
      }}
    >
      {/* Sticky Stage Window — Anchors seamlessly at top of viewport during the scroll sequence */}
      <div
        ref={stageRef}
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          height: '100svh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingTop: 'clamp(4.2rem, 6.5vh, 4.8rem)',
          paddingBottom: 'clamp(1rem, 2vh, 1.8rem)',
          boxSizing: 'border-box',
          zIndex: 10
        }}
      >
        {/* Top Scroll Scrub Progress Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '2.5px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            zIndex: 35
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
              boxShadow: '0 0 12px rgba(184, 255, 61, 0.7)'
            }}
          />
        </div>

        {/* Ambient Atmospheric Backdrop Glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1,
            background: 'radial-gradient(circle at 50% 50%, rgba(184, 255, 61, 0.035) 0%, rgba(10, 10, 10, 0.85) 60%, #070707 100%)'
          }}
        />

        {/* Top Header Bar */}
        <div className="site-container" style={{ position: 'relative', zIndex: 20, width: '100%' }}>
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
                ref={counterRef}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  color: 'var(--color-warm-white)',
                  letterSpacing: '0.12em',
                  fontWeight: 700
                }}
              >
                [01 // {String(images.length).padStart(2, '0')}]
              </span>

              {/* Prev / Next Quick Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <button
                  onClick={handlePrev}
                  aria-label="Previous image"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '3px',
                    width: '26px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#AAA',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#B8FF3D';
                    e.currentTarget.style.borderColor = '#B8FF3D';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#AAA';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  }}
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next image"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '3px',
                    width: '26px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#AAA',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#B8FF3D';
                    e.currentTarget.style.borderColor = '#B8FF3D';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#AAA';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  }}
                >
                  <ChevronRight size={14} />
                </button>
              </div>

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
            zIndex: 20,
            flex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 0
          }}
        >
          {/* Natural 4:5 Portrait Frame Sizing — Accommodates complete original photographs without cropping */}
          <style>{`
            .ads-carousel-stage-container {
              position: relative;
              width: 100%;
              margin: 0 auto;
              height: clamp(380px, 68vh, 660px);
              max-height: calc(100vh - 150px);
              aspect-ratio: 4 / 5;
              max-width: min(90vw, calc((100vh - 150px) * 0.8));
              display: flex;
              align-items: center;
              justify-content: center;
            }
          `}</style>

          <div className="ads-carousel-stage-container">
            {images.map((item, index) => {
              const isFirst = index === 0;

              return (
                <div
                  key={item.id}
                  ref={(el) => (cardsRef.current[index] = el)}
                  onClick={handleOpenLightbox}
                  className="ads-carousel-slide"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                    willChange: 'transform, opacity, filter',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {/* Card Container with Architectural Accents */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#070707',
                      borderRadius: 'clamp(14px, 1.8vw, 20px)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      overflow: 'hidden',
                      boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 35px -10px rgba(0, 0, 0, 0.8)',
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-accent-lime)';
                      e.currentTarget.style.boxShadow = '0 30px 70px -15px rgba(0, 0, 0, 0.98), 0 0 30px -10px rgba(184, 255, 61, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                      e.currentTarget.style.boxShadow = '0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 35px -10px rgba(0, 0, 0, 0.8)';
                    }}
                  >
                    {/* Architectural Corner Accents */}
                    <div className="corner-bracket-tl" style={{ borderColor: 'var(--color-accent-lime)' }} />
                    <div className="corner-bracket-br" style={{ borderColor: 'var(--color-accent-lime)' }} />

                    {/* Ambient Blurred Lighting Layer (Fills frame with natural mood without cropping subject) */}
                    <img
                      src={item.imageUrl}
                      alt=""
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'blur(30px) brightness(0.32)',
                        opacity: 0.35,
                        pointerEvents: 'none',
                        transform: 'scale(1.15)'
                      }}
                    />

                    {/* Complete Original Photograph — 100% Uncropped with object-fit: contain */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading={index < 3 ? 'eager' : 'lazy'}
                      style={{
                        position: 'relative',
                        zIndex: 1,
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        objectPosition: 'center',
                        display: 'block'
                      }}
                    />

                    {/* Top Floating Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '0.85rem',
                        left: '0.85rem',
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
                        zIndex: 3
                      }}
                    >
                      <span className="lime-dot" style={{ width: '4px', height: '4px' }} />
                      <span>{item.badge}</span>
                    </div>

                    {/* Top Right Expand Trigger Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectImage) {
                          onSelectImage({ ...item, mediaType: 'image' });
                        }
                      }}
                      title="Expand Fullscreen Lightbox"
                      style={{
                        position: 'absolute',
                        top: '0.85rem',
                        right: '0.85rem',
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
                        zIndex: 3,
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

                    {/* Bottom Metadata Overlay — Compact & Non-Obtrusive */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: 'clamp(0.75rem, 1.6vw, 1.15rem)',
                        background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 35%, rgba(0,0,0,0.85) 100%)',
                        zIndex: 3,
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        gap: '0.85rem'
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <span
                          className="micro-label"
                          style={{
                            color: 'var(--color-accent-lime)',
                            fontSize: '0.62rem',
                            display: 'block',
                            marginBottom: '3px',
                            letterSpacing: '0.1em'
                          }}
                        >
                          {item.category} // {item.client}
                        </span>
                        <h3
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(0.95rem, 1.4vw, 1.25rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.02em',
                            color: '#FFF',
                            margin: 0,
                            lineHeight: 1.2,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {item.title}
                        </h3>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'clamp(0.72rem, 0.85vw, 0.82rem)',
                            fontStyle: 'italic',
                            color: 'rgba(244, 243, 239, 0.8)',
                            margin: '3px 0 0 0',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          "{item.tagline}"
                        </p>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          color: 'var(--color-accent-lime)',
                          fontSize: '0.65rem',
                          fontFamily: 'var(--font-mono)',
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                          backgroundColor: 'rgba(10, 10, 10, 0.75)',
                          backdropFilter: 'blur(8px)',
                          padding: '5px 10px',
                          borderRadius: '3px',
                          border: '1px solid rgba(184, 255, 61, 0.35)',
                          letterSpacing: '0.08em'
                        }}
                      >
                        <span>INSPECT</span>
                        <Eye size={12} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Interactive Thumbnail Track & Telemetry */}
        <div className="site-container" style={{ position: 'relative', zIndex: 20, width: '100%' }}>
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
                ref={categoryRef}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: 'var(--color-muted-gray)',
                  letterSpacing: '0.08em',
                  display: 'block'
                }}
              >
                {firstItem.category} // {firstItem.client}
              </span>
              <span
                ref={titleRef}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: 'var(--color-warm-white)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'block'
                }}
              >
                {firstItem.title}
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
                const isActive = i === 0;

                return (
                  <button
                    key={img.id}
                    ref={(el) => (dotsRef.current[i] = el)}
                    onClick={(e) => {
                      e.stopPropagation();
                      jumpToSlide(i);
                    }}
                    title={`${img.title} (${i + 1}/${images.length})`}
                    style={{
                      height: '6px',
                      width: isActive ? '28px' : '8px',
                      borderRadius: '3px',
                      backgroundColor: isActive ? 'var(--color-accent-lime)' : 'rgba(255, 255, 255, 0.18)',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: isActive ? '0 0 10px rgba(184, 255, 61, 0.65)' : 'none'
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
