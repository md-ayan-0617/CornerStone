import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FEATURED_SHORTS,
  LOCAL_ADS_IMAGES,
  getYouTubeEmbedUrl
} from '../data/adsProjects';
import CampaignLightboxModal from '../components/CampaignLightboxModal';
import CornerstoneMotif from '../components/CornerstoneMotif';
import {
  Volume2,
  VolumeX,
  Maximize2,
  ArrowUpRight,
  Eye,
  ChevronDown
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const AdsPage = ({ onNavigate }) => {
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [activePlayingVideoId, setActivePlayingVideoId] = useState(null);
  const [mutedStates, setMutedStates] = useState({
    "short-01": true,
    "short-02": true,
    "short-03": true
  });

  const pageRef = useRef(null);
  const videoCardsRef = useRef({});
  const iframeRefs = useRef({});
  const activePlayingRef = useRef(null);

  // Combined project items for lightbox pagination (3 Shorts + 10 Images = 13 items)
  const allLightboxItems = [
    ...FEATURED_SHORTS.map((s) => ({
      id: s.id,
      title: s.title,
      client: "CornerStone Commercial",
      year: "2026",
      category: s.category,
      mediaType: 'video',
      mediaUrl: s.videoUrl,
      thumbnailUrl: s.thumbnailUrl,
      badge: s.badge
    })),
    ...LOCAL_ADS_IMAGES.map((img) => ({
      id: img.id,
      title: img.title,
      client: img.client,
      year: "2026",
      category: img.category,
      mediaType: 'image',
      imageUrl: img.imageUrl,
      thumbnailUrl: img.thumbnailUrl,
      tagline: img.tagline,
      badge: img.badge
    }))
  ];

  // =========================================================================
  // 1. INTERSECTION OBSERVER FOR VISIBILITY-AWARE MUTED AUTOPLAY
  // "Scroll to a video → it automatically plays muted → scroll away → it pauses."
  // =========================================================================
  useEffect(() => {
    const elements = Object.values(videoCardsRef.current).filter(Boolean);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoId = entry.target.getAttribute('data-video-id');
          const iframe = iframeRefs.current[videoId];
          if (!iframe || !iframe.contentWindow) return;

          // When video becomes at least 58% visible in viewport
          if (entry.isIntersecting && entry.intersectionRatio >= 0.58) {
            // Stop any other currently playing video
            if (activePlayingRef.current && activePlayingRef.current !== videoId) {
              const prevIframe = iframeRefs.current[activePlayingRef.current];
              try {
                prevIframe?.contentWindow?.postMessage(
                  JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
                  '*'
                );
              } catch (_) {}
            }

            // Start playing current video (muted)
            try {
              iframe.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
                '*'
              );
              activePlayingRef.current = videoId;
              setActivePlayingVideoId(videoId);
            } catch (_) {}
          } else if (entry.intersectionRatio < 0.45 && activePlayingRef.current === videoId) {
            // Pause playback when scrolled away
            try {
              iframe.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
                '*'
              );
              activePlayingRef.current = null;
              setActivePlayingVideoId(null);
            } catch (_) {}
          }
        });
      },
      {
        threshold: [0.2, 0.58, 0.85],
        rootMargin: '0px'
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      Object.values(iframeRefs.current).forEach((iframe) => {
        try {
          iframe?.contentWindow?.postMessage(
            JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
            '*'
          );
        } catch (_) {}
      });
    };
  }, []);

  // Audio mute/unmute toggle per video
  const toggleMute = (shortId) => {
    const isMuted = mutedStates[shortId];
    const iframe = iframeRefs.current[shortId];
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: isMuted ? 'unMute' : 'mute',
            args: []
          }),
          '*'
        );
        setMutedStates((prev) => ({ ...prev, [shortId]: !isMuted }));
      } catch (_) {}
    }
  };

  // =========================================================================
  // 2. SOPHISTICATED GSAP SCROLL ANIMATIONS
  // Staggered entrances, subtle parallax, and clean unmount cleanup
  // =========================================================================
  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set('.ads-hero-reveal, .ads-video-card, .ads-gallery-item', {
          opacity: 1,
          y: 0,
          scale: 1,
          clearProps: 'all'
        });
        return;
      }

      // Hero Headline Reveal
      gsap.fromTo('.ads-hero-reveal',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'opacity,transform'
        }
      );

      // 9:16 Video Cards Staggered Entrance
      gsap.fromTo('.ads-video-card',
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: '#featured-video-gallery',
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Local 10 Images Staggered Reveal
      gsap.fromTo('.ads-gallery-item',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: '#creative-stills-gallery',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      ScrollTrigger.refresh();
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    const el = document.querySelector('#featured-video-gallery');
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
          HERO SECTION — Minimal Text, Maximum Visual Space
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '75vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 'clamp(7rem, 14vh, 10rem)',
          paddingBottom: 'clamp(4rem, 8vh, 6rem)',
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
          {/* Micro Label */}
          <div className="ads-hero-reveal" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
            <CornerstoneMotif size={18} variant="bracket" />
            <span className="micro-label-lime">
              VISUAL CAMPAIGNS // SELECTED CREATIVE WORK
            </span>
          </div>

          {/* Single-Line Main Heading */}
          <h1
            className="display-mega ads-hero-reveal"
            style={{
              margin: '0 0 1.25rem 0',
              fontSize: 'clamp(2.4rem, 5.6vw, 5.2rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.035em',
              maxWidth: '22ch'
            }}
          >
            IDEAS THAT MOVE.{' '}
            <span style={{ color: 'var(--color-warm-white)', WebkitTextFillColor: 'initial', display: 'block' }}>
              VISUALS THAT STAY.
            </span>
          </h1>

          {/* Single-Line Supporting Statement + CTAs */}
          <div
            className="ads-hero-reveal"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.5rem',
              maxWidth: '1100px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '1.75rem'
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
                lineHeight: 1.4,
                color: 'var(--color-muted-gray)',
                margin: 0
              }}
            >
              High-impact commercial films, luxury advertising, and AI editorial direction.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={handleScrollDown}
                className="btn-cornerstone"
                style={{ padding: '0.85rem 1.6rem', fontSize: '0.78rem' }}
              >
                <span>EXPLORE WORK</span>
                <ChevronDown size={14} />
              </button>

              <button
                onClick={() => onNavigate && onNavigate('/contact')}
                className="btn-cornerstone-secondary"
                style={{ padding: '0.85rem 1.6rem', fontSize: '0.78rem' }}
              >
                <span>START A PROJECT</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '1.25rem',
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
          <span>SCROLL FOR REELS &amp; STILLS</span>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: THE 3 FEATURED YOUTUBE SHORTS (9:16 Portrait Aspect Ratio)
          "Scroll to a video → it automatically plays muted → scroll away → it pauses."
          "No large custom play icon over the automatically playing video."
          ========================================================================= */}
      <section
        id="featured-video-gallery"
        style={{
          paddingTop: 'clamp(4.5rem, 9vw, 7.5rem)',
          paddingBottom: 'clamp(4.5rem, 9vw, 7.5rem)',
          backgroundColor: '#0A0A0A',
          borderBottom: '1px solid var(--color-border-gray)'
        }}
      >
        <div className="site-container">
          {/* Minimal Single-Line Section Header */}
          <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.65rem' }}>
              <CornerstoneMotif size={14} variant="mark" />
              <span className="micro-label" style={{ color: 'var(--color-muted-gray)' }}>
                01 // COMMERCIAL FILMS
              </span>
            </div>
            <h2
              className="display-large"
              style={{
                margin: '0 0 0.5rem 0',
                fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)'
              }}
            >
              FEATURED 9:16 VERTICAL REELS
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.92rem',
                color: 'var(--color-muted-gray)',
                margin: 0
              }}
            >
              Three native portrait commercial ads engineered for high-velocity feeds.
            </p>
          </div>

          {/* 3-Column Responsive Portrait Gallery */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              justifyContent: 'center'
            }}
          >
            {FEATURED_SHORTS.map((short, idx) => {
              const isPlaying = activePlayingVideoId === short.id;
              const isMuted = mutedStates[short.id] ?? true;

              return (
                <div
                  key={short.id}
                  ref={(el) => (videoCardsRef.current[short.id] = el)}
                  data-video-id={short.id}
                  className="ads-video-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#0E0E0E',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 'clamp(18px, 2.2vw, 24px)',
                    padding: 'clamp(0.85rem, 1.5vw, 1.15rem)',
                    boxShadow: isPlaying
                      ? '0 25px 55px rgba(0, 0, 0, 0.8), 0 0 40px -10px rgba(184, 255, 61, 0.15)'
                      : '0 20px 45px rgba(0, 0, 0, 0.6)',
                    borderColor: isPlaying ? 'rgba(184, 255, 61, 0.35)' : 'rgba(255, 255, 255, 0.08)',
                    transition: 'border-color 0.35s ease, box-shadow 0.35s ease'
                  }}
                >
                  {/* Portrait 9:16 Video Frame with Hardware-Accelerated Clipping */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '9 / 16',
                      borderRadius: 'clamp(16px, 2vw, 20px)',
                      overflow: 'hidden',
                      isolation: 'isolate',
                      WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                      transform: 'translateZ(0)',
                      backgroundColor: '#050505',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {/* YouTube IFrame: enablejsapi=1, controls=0, mute=1 */}
                    <iframe
                      ref={(el) => (iframeRefs.current[short.id] = el)}
                      src={getYouTubeEmbedUrl(short.videoId, { autoplay: 0, mute: 1, controls: 0, loop: 1 })}
                      title={short.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        display: 'block'
                      }}
                    />

                    {/* Unobtrusive Floating Controls (NO big overlay blocking playback) */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        right: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        pointerEvents: 'none',
                        zIndex: 10
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 8px',
                          backgroundColor: 'rgba(10, 10, 10, 0.85)',
                          backdropFilter: 'blur(8px)',
                          borderRadius: '4px',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.62rem',
                          color: isPlaying ? 'var(--color-accent-lime)' : 'var(--color-warm-white)',
                          pointerEvents: 'auto'
                        }}
                      >
                        <span
                          className="lime-dot"
                          style={{
                            width: '4px',
                            height: '4px',
                            backgroundColor: isPlaying ? 'var(--color-accent-lime)' : '#666'
                          }}
                        />
                        <span>{isPlaying ? 'PLAYING MUTED' : `SHORT 0${idx + 1}`}</span>
                      </div>

                      <div style={{ display: 'flex', gap: '6px', pointerEvents: 'auto' }}>
                        <button
                          onClick={() => toggleMute(short.id)}
                          title={isMuted ? "Unmute Audio" : "Mute Audio"}
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(10, 10, 10, 0.85)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            color: isMuted ? 'var(--color-muted-gray)' : 'var(--color-accent-lime)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                        </button>

                        <button
                          onClick={() =>
                            setActiveModalItem({
                              id: short.id,
                              title: short.title,
                              client: "CornerStone Commercial",
                              year: "2026",
                              category: short.category,
                              mediaType: 'video',
                              mediaUrl: short.videoUrl,
                              thumbnailUrl: short.thumbnailUrl
                            })
                          }
                          title="Expand Fullscreen Lightbox"
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(10, 10, 10, 0.85)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            color: 'var(--color-warm-white)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <Maximize2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Single-Line Metadata */}
                  <div style={{ paddingTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <span className="micro-label-lime" style={{ fontSize: '0.62rem', display: 'block', marginBottom: '2px' }}>
                        {short.category}
                      </span>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.05rem',
                          fontWeight: 700,
                          color: 'var(--color-warm-white)',
                          margin: 0
                        }}
                      >
                        {short.title}
                      </h3>
                    </div>

                    <span className="micro-label" style={{ color: '#666', fontSize: '0.65rem' }}>
                      9:16 REEL
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: EDITORIAL STILLS & CAMPAIGNS (THE 10 LOCAL DEMO IMAGES)
          Asymmetric visual placement, large featured images, minimal single-line labels.
          ========================================================================= */}
      <section
        id="creative-stills-gallery"
        style={{
          paddingTop: 'clamp(5rem, 10vw, 8rem)',
          paddingBottom: 'clamp(5rem, 10vw, 8rem)',
          backgroundColor: '#070707',
          borderBottom: '1px solid var(--color-border-gray)'
        }}
      >
        <div className="site-container">
          {/* Minimal Section Header */}
          <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.65rem' }}>
              <CornerstoneMotif size={14} variant="mark" />
              <span className="micro-label" style={{ color: 'var(--color-muted-gray)' }}>
                02 // SELECTED CREATIVE WORK
              </span>
            </div>
            <h2
              className="display-large"
              style={{
                margin: '0 0 0.5rem 0',
                fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)'
              }}
            >
              EDITORIAL STILLS &amp; CAMPAIGNS
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.92rem',
                color: 'var(--color-muted-gray)',
                margin: 0
              }}
            >
              Luxury brand campaigns, haute couture editorials, and commercial visuals.
            </p>
          </div>

          {/* ===================================================================
              GALLERY GROUP A: ASYMMETRIC SPLIT (Images 1, 2, 3)
              Left: Large 9:16 Tall Hero (/images/1.png - Lumière)
              Right: Stack of 2 (/images/2.png - Dot & Key, /images/3.png - Dior)
              =================================================================== */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
              gap: 'clamp(1.75rem, 3vw, 2.5rem)',
              marginBottom: 'clamp(3rem, 6vw, 5rem)'
            }}
          >
            {/* Image 1: Lumière Eau De Parfum (Prominent Hero) */}
            <div
              onClick={() =>
                setActiveModalItem({
                  ...LOCAL_ADS_IMAGES[0],
                  mediaType: 'image'
                })
              }
              className="ads-gallery-item"
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '9 / 14',
                borderRadius: 'clamp(18px, 2.2vw, 24px)',
                overflow: 'hidden',
                backgroundColor: '#0E0E0E',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer'
              }}
            >
              <img
                src={LOCAL_ADS_IMAGES[0].imageUrl}
                alt={LOCAL_ADS_IMAGES[0].title}
                loading="eager"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
              {/* Frosted Top Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  padding: '4px 10px',
                  backgroundColor: 'rgba(10, 10, 10, 0.85)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--color-accent-lime)',
                  border: '1px solid rgba(255, 255, 255, 0.12)'
                }}
              >
                {LOCAL_ADS_IMAGES[0].badge}
              </div>

              {/* Minimal Single-Line Bottom Bar */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.25rem',
                  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, transparent 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: '#FFF', margin: 0 }}>
                    {LOCAL_ADS_IMAGES[0].title}
                  </h4>
                  <span className="micro-label" style={{ color: 'var(--color-muted-gray)', fontSize: '0.65rem' }}>
                    {LOCAL_ADS_IMAGES[0].category}
                  </span>
                </div>
                <Eye size={18} color="var(--color-accent-lime)" />
              </div>
            </div>

            {/* Right Stack: Image 2 & Image 3 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
              {/* Image 2: Dot & Key Watermelon Cooling Sunscreen */}
              <div
                onClick={() =>
                  setActiveModalItem({
                    ...LOCAL_ADS_IMAGES[1],
                    mediaType: 'image'
                  })
                }
                className="ads-gallery-item"
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4 / 3.4',
                  borderRadius: 'clamp(18px, 2.2vw, 24px)',
                  overflow: 'hidden',
                  backgroundColor: '#0E0E0E',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer'
                }}
              >
                <img
                  src={LOCAL_ADS_IMAGES[1].imageUrl}
                  alt={LOCAL_ADS_IMAGES[1].title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    padding: '4px 10px',
                    backgroundColor: 'rgba(10, 10, 10, 0.85)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--color-accent-lime)',
                    border: '1px solid rgba(255, 255, 255, 0.12)'
                  }}
                >
                  {LOCAL_ADS_IMAGES[1].badge}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1rem 1.25rem',
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, transparent 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 800, color: '#FFF', margin: 0 }}>
                    {LOCAL_ADS_IMAGES[1].title}
                  </h4>
                  <Eye size={16} color="var(--color-accent-lime)" />
                </div>
              </div>

              {/* Image 3: Miss Dior Eau De Parfum */}
              <div
                onClick={() =>
                  setActiveModalItem({
                    ...LOCAL_ADS_IMAGES[2],
                    mediaType: 'image'
                  })
                }
                className="ads-gallery-item"
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4 / 3.4',
                  borderRadius: 'clamp(18px, 2.2vw, 24px)',
                  overflow: 'hidden',
                  backgroundColor: '#0E0E0E',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer'
                }}
              >
                <img
                  src={LOCAL_ADS_IMAGES[2].imageUrl}
                  alt={LOCAL_ADS_IMAGES[2].title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    padding: '4px 10px',
                    backgroundColor: 'rgba(10, 10, 10, 0.85)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--color-accent-lime)',
                    border: '1px solid rgba(255, 255, 255, 0.12)'
                  }}
                >
                  {LOCAL_ADS_IMAGES[2].badge}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1rem 1.25rem',
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, transparent 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 800, color: '#FFF', margin: 0 }}>
                    {LOCAL_ADS_IMAGES[2].title}
                  </h4>
                  <Eye size={16} color="var(--color-accent-lime)" />
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================================
              GALLERY GROUP B: HAUTE COUTURE PANORAMIC DUO (Images 6 & 9)
              Image 6: Solitaire Haute Joaillerie
              Image 9: Gucci: The Poetry of Movement
              =================================================================== */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
              gap: 'clamp(1.75rem, 3vw, 2.5rem)',
              marginBottom: 'clamp(3rem, 6vw, 5rem)'
            }}
          >
            {/* Image 6: Solitaire Haute Joaillerie */}
            <div
              onClick={() =>
                setActiveModalItem({
                  ...LOCAL_ADS_IMAGES[5],
                  mediaType: 'image'
                })
              }
              className="ads-gallery-item"
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4 / 5',
                borderRadius: 'clamp(18px, 2.2vw, 24px)',
                overflow: 'hidden',
                backgroundColor: '#0E0E0E',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer'
              }}
            >
              <img
                src={LOCAL_ADS_IMAGES[5].imageUrl}
                alt={LOCAL_ADS_IMAGES[5].title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  padding: '4px 10px',
                  backgroundColor: 'rgba(10, 10, 10, 0.85)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--color-accent-lime)',
                  border: '1px solid rgba(255, 255, 255, 0.12)'
                }}
              >
                {LOCAL_ADS_IMAGES[5].badge}
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.25rem',
                  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, transparent 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, color: '#FFF', margin: 0 }}>
                    {LOCAL_ADS_IMAGES[5].title}
                  </h4>
                  <span className="micro-label" style={{ color: 'var(--color-muted-gray)', fontSize: '0.65rem' }}>
                    {LOCAL_ADS_IMAGES[5].category}
                  </span>
                </div>
                <Eye size={18} color="var(--color-accent-lime)" />
              </div>
            </div>

            {/* Image 9: Gucci Burgundy Silk Monograph */}
            <div
              onClick={() =>
                setActiveModalItem({
                  ...LOCAL_ADS_IMAGES[8],
                  mediaType: 'image'
                })
              }
              className="ads-gallery-item"
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4 / 5',
                borderRadius: 'clamp(18px, 2.2vw, 24px)',
                overflow: 'hidden',
                backgroundColor: '#0E0E0E',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer'
              }}
            >
              <img
                src={LOCAL_ADS_IMAGES[8].imageUrl}
                alt={LOCAL_ADS_IMAGES[8].title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  padding: '4px 10px',
                  backgroundColor: 'rgba(10, 10, 10, 0.85)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--color-accent-lime)',
                  border: '1px solid rgba(255, 255, 255, 0.12)'
                }}
              >
                {LOCAL_ADS_IMAGES[8].badge}
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.25rem',
                  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, transparent 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, color: '#FFF', margin: 0 }}>
                    {LOCAL_ADS_IMAGES[8].title}
                  </h4>
                  <span className="micro-label" style={{ color: 'var(--color-muted-gray)', fontSize: '0.65rem' }}>
                    {LOCAL_ADS_IMAGES[8].category}
                  </span>
                </div>
                <Eye size={18} color="var(--color-accent-lime)" />
              </div>
            </div>
          </div>

          {/* ===================================================================
              GALLERY GROUP C: EDITORIAL TRIPTYCH (Images 4, 5, 7)
              Image 4: Aurora Fine Jewelry
              Image 5: Minimalist Vitamin C Serum
              Image 7: Fashion Week: The New Mood (Aisha)
              =================================================================== */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 310px), 1fr))',
              gap: 'clamp(1.5rem, 2.5vw, 2.25rem)',
              marginBottom: 'clamp(3rem, 6vw, 5rem)'
            }}
          >
            {[LOCAL_ADS_IMAGES[3], LOCAL_ADS_IMAGES[4], LOCAL_ADS_IMAGES[6]].map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  setActiveModalItem({
                    ...item,
                    mediaType: 'image'
                  })
                }
                className="ads-gallery-item"
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4 / 5',
                  borderRadius: 'clamp(16px, 2vw, 22px)',
                  overflow: 'hidden',
                  backgroundColor: '#0E0E0E',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer'
                }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    padding: '3px 8px',
                    backgroundColor: 'rgba(10, 10, 10, 0.85)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--color-accent-lime)',
                    border: '1px solid rgba(255, 255, 255, 0.12)'
                  }}
                >
                  {item.badge}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1rem',
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, transparent 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: '#FFF', margin: 0 }}>
                    {item.title}
                  </h4>
                  <Eye size={15} color="var(--color-accent-lime)" />
                </div>
              </div>
            ))}
          </div>

          {/* ===================================================================
              GALLERY GROUP D: SUMMER & VINTAGE CRUISE DUO (Images 8 & 10)
              Image 8: House of Quirk: Sip Personality
              Image 10: Crumbl: Take the Scenic Sip
              =================================================================== */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
              gap: 'clamp(1.75rem, 3vw, 2.5rem)'
            }}
          >
            {/* Image 8: House of Quirk */}
            <div
              onClick={() =>
                setActiveModalItem({
                  ...LOCAL_ADS_IMAGES[7],
                  mediaType: 'image'
                })
              }
              className="ads-gallery-item"
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4 / 4.6',
                borderRadius: 'clamp(18px, 2.2vw, 24px)',
                overflow: 'hidden',
                backgroundColor: '#0E0E0E',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer'
              }}
            >
              <img
                src={LOCAL_ADS_IMAGES[7].imageUrl}
                alt={LOCAL_ADS_IMAGES[7].title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  padding: '4px 10px',
                  backgroundColor: 'rgba(10, 10, 10, 0.85)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--color-accent-lime)',
                  border: '1px solid rgba(255, 255, 255, 0.12)'
                }}
              >
                {LOCAL_ADS_IMAGES[7].badge}
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.25rem',
                  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, transparent 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, color: '#FFF', margin: 0 }}>
                    {LOCAL_ADS_IMAGES[7].title}
                  </h4>
                  <span className="micro-label" style={{ color: 'var(--color-muted-gray)', fontSize: '0.65rem' }}>
                    {LOCAL_ADS_IMAGES[7].category}
                  </span>
                </div>
                <Eye size={18} color="var(--color-accent-lime)" />
              </div>
            </div>

            {/* Image 10: Crumbl */}
            <div
              onClick={() =>
                setActiveModalItem({
                  ...LOCAL_ADS_IMAGES[9],
                  mediaType: 'image'
                })
              }
              className="ads-gallery-item"
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4 / 4.6',
                borderRadius: 'clamp(18px, 2.2vw, 24px)',
                overflow: 'hidden',
                backgroundColor: '#0E0E0E',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer'
              }}
            >
              <img
                src={LOCAL_ADS_IMAGES[9].imageUrl}
                alt={LOCAL_ADS_IMAGES[9].title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  padding: '4px 10px',
                  backgroundColor: 'rgba(10, 10, 10, 0.85)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--color-accent-lime)',
                  border: '1px solid rgba(255, 255, 255, 0.12)'
                }}
              >
                {LOCAL_ADS_IMAGES[9].badge}
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.25rem',
                  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, transparent 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, color: '#FFF', margin: 0 }}>
                    {LOCAL_ADS_IMAGES[9].title}
                  </h4>
                  <span className="micro-label" style={{ color: 'var(--color-muted-gray)', fontSize: '0.65rem' }}>
                    {LOCAL_ADS_IMAGES[9].category}
                  </span>
                </div>
                <Eye size={18} color="var(--color-accent-lime)" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FINAL ADS CONTACT SECTION — Single-Line Minimal Focus
          Headline: HAVE A BRAND TO MAKE UNFORGETTABLE?
          Supporting text: Let's create visual advertising that commands attention.
          Button: START A PROJECT
          ========================================================================= */}
      <section
        style={{
          paddingTop: 'clamp(5rem, 10vw, 8rem)',
          paddingBottom: 'clamp(5rem, 10vw, 8rem)',
          backgroundColor: 'var(--color-near-black)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="site-container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
            <CornerstoneMotif size={16} variant="bracket" />
            <span className="micro-label-lime">LET'S BUILD YOUR VISUAL IDENTITY</span>
          </div>

          <h2
            className="display-mega"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4.4rem)',
              margin: '0 auto 1.25rem auto',
              maxWidth: '22ch',
              lineHeight: 1.08
            }}
          >
            HAVE A BRAND TO MAKE UNFORGETTABLE?
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
              lineHeight: 1.5,
              color: 'var(--color-muted-gray)',
              maxWidth: '54ch',
              margin: '0 auto clamp(2rem, 4vw, 3rem) auto'
            }}
          >
            Let's create visual advertising that commands attention.
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

      {/* Fullscreen Accessible Lightbox Modal (Supports all 13 items) */}
      {activeModalItem && (
        <CampaignLightboxModal
          project={activeModalItem}
          allProjects={allLightboxItems}
          onClose={() => setActiveModalItem(null)}
          onSelectProject={(item) => setActiveModalItem(item)}
          onNavigate={onNavigate}
        />
      )}

      {/* CSS Micro-Interactions */}
      <style>{`
        .ads-video-card:hover {
          transform: translateY(-4px);
        }
        .ads-gallery-item:hover img {
          transform: scale(1.03);
        }
        .ads-gallery-item:hover {
          border-color: rgba(184, 255, 61, 0.3) !important;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.8), 0 0 35px -10px rgba(184, 255, 61, 0.1);
        }
        @media (max-width: 768px) {
          .ads-video-card {
            padding: 0.85rem !important;
            border-radius: 18px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdsPage;
