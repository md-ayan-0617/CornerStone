import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FEATURED_SHORTS,
  ADS_CATEGORIES,
  ADS_PHOTOGRAPHY,
  ADS_CAROUSELS,
  getYouTubeEmbedUrl
} from '../data/adsProjects';
import CampaignLightboxModal from '../components/CampaignLightboxModal';
import CornerstoneMotif from '../components/CornerstoneMotif';
import {
  Volume2,
  VolumeX,
  Maximize2,
  ArrowUpRight,
  Filter,
  Eye,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Film,
  Camera,
  Sparkles
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const AdsPage = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [activePlayingVideoId, setActivePlayingVideoId] = useState(null);
  const [mutedStates, setMutedStates] = useState({
    "short-01": true,
    "short-02": true,
    "short-03": true
  });
  
  // Carousel active slide index
  const [carouselIndex, setCarouselIndex] = useState({
    "carousel-fashion": 0,
    "carousel-product": 0
  });

  const pageRef = useRef(null);
  const videoCardsRef = useRef({});
  const iframeRefs = useRef({});
  const activePlayingRef = useRef(null);

  // Filtered photography items
  const filteredPhotography = activeCategory === "All"
    ? ADS_PHOTOGRAPHY
    : ADS_PHOTOGRAPHY.filter(
        (item) => item.categoryFilter === activeCategory || item.category === activeCategory
      );

  // =========================================================================
  // 1. INTERSECTION OBSERVER FOR AUTOMATIC MUTED PLAYBACK ON SCROLL
  // "Scroll to a video → it automatically plays muted → scroll away → it pauses."
  // =========================================================================
  useEffect(() => {
    // Collect all card container elements
    const elements = Object.values(videoCardsRef.current).filter(Boolean);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoId = entry.target.getAttribute('data-video-id');
          const iframe = iframeRefs.current[videoId];
          if (!iframe || !iframe.contentWindow) return;

          // When video becomes at least 60% visible in the viewport:
          if (entry.isIntersecting && entry.intersectionRatio >= 0.58) {
            // Stop any other currently playing video to conserve bandwidth
            if (activePlayingRef.current && activePlayingRef.current !== videoId) {
              const prevIframe = iframeRefs.current[activePlayingRef.current];
              try {
                prevIframe?.contentWindow?.postMessage(
                  JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
                  '*'
                );
              } catch (_) {}
            }

            // Start playing current video (muted by default)
            try {
              iframe.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
                '*'
              );
              activePlayingRef.current = videoId;
              setActivePlayingVideoId(videoId);
            } catch (_) {}
          } else if (entry.intersectionRatio < 0.45 && activePlayingRef.current === videoId) {
            // When video leaves viewport (< 45% visible), pause playback
            try {
              iframe.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
                '*'
              );
              if (activePlayingRef.current === videoId) {
                activePlayingRef.current = null;
                setActivePlayingVideoId(null);
              }
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
      // Ensure all videos pause when component unmounts
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
  // 2. SOPHISTICATED GSAP SCROLLTRIGGER ANIMATIONS
  // =========================================================================
  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set('.ads-hero-reveal, .ads-video-card, .ads-photo-card, .ads-carousel-box', {
          opacity: 1,
          y: 0,
          scale: 1,
          clearProps: 'all'
        });
        return;
      }

      // Hero Entrance
      gsap.fromTo('.ads-hero-reveal',
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

      // Featured 9:16 Portrait Video Cards Staggered Entrance
      gsap.fromTo('.ads-video-card',
        { opacity: 0, y: 45, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.18,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: '#featured-video-gallery',
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Photography Cards Stagger
      gsap.fromTo('.ads-photo-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: '#ads-photo-grid',
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
          SECTION 1: HERO SECTION — Architectural Negative Space & Typography
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '84vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 'clamp(7.5rem, 15vh, 11rem)',
          paddingBottom: 'clamp(4.5rem, 9vh, 7rem)',
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
          <div className="ads-hero-reveal" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
            <CornerstoneMotif size={18} variant="bracket" />
            <span className="micro-label-lime">
              CORNERSTONE / CREATIVE STUDIO
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className="display-mega ads-hero-reveal"
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
            className="ads-hero-reveal"
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
                <span>EXPLORE AD REEL</span>
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

        {/* Scroll Indicator */}
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
          <span>SCROLL FOR 9:16 VERTICAL COMMERCIAL REEL</span>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: FEATURED ADVERTISEMENT VIDEOS — 9:16 VERTICAL SHORTS GALLERY
          "Use these three actual YouTube Shorts as the first video entries in the ADS portfolio."
          "No large custom play icon over the automatically playing video. No duplicate play overlay."
          "Scroll to a video → it automatically plays muted → scroll away → it pauses."
          ========================================================================= */}
      <section
        id="featured-video-gallery"
        style={{
          paddingTop: 'clamp(5rem, 10vw, 8rem)',
          paddingBottom: 'clamp(5rem, 10vw, 8rem)',
          backgroundColor: '#0A0A0A',
          borderBottom: '1px solid var(--color-border-gray)'
        }}
      >
        <div className="site-container">
          {/* Section Header */}
          <div style={{ marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.85rem' }}>
              <CornerstoneMotif size={14} variant="mark" />
              <span className="micro-label" style={{ color: 'var(--color-muted-gray)' }}>
                SECTION 01 // 9:16 VERTICAL COMMERCIAL CAMPAIGNS
              </span>
            </div>
            <h2
              className="display-large"
              style={{
                margin: '0 0 0.75rem 0',
                fontSize: 'clamp(1.9rem, 3.6vw, 2.8rem)'
              }}
            >
              FEATURED SHORT-FORM COMMERCIAL ADS
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.98rem',
                color: 'var(--color-muted-gray)',
                maxWidth: '65ch',
                margin: 0
              }}
            >
              Native 9:16 portrait advertising films engineered for high-velocity feeds and immersive mobile viewing. Scroll into view to watch automatically.
            </p>
          </div>

          {/* 3-Column Responsive Portrait Video Gallery */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: 'clamp(2rem, 4vw, 3rem)',
              justifyContent: 'center',
              alignItems: 'start'
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
                    borderRadius: 'clamp(20px, 2.4vw, 26px)',
                    padding: 'clamp(1rem, 2vw, 1.25rem)',
                    boxShadow: isPlaying
                      ? '0 25px 55px rgba(0, 0, 0, 0.8), 0 0 40px -10px rgba(184, 255, 61, 0.15)'
                      : '0 20px 45px rgba(0, 0, 0, 0.6)',
                    borderColor: isPlaying ? 'rgba(184, 255, 61, 0.35)' : 'rgba(255, 255, 255, 0.08)',
                    transition: 'border-color 0.35s ease, box-shadow 0.35s ease'
                  }}
                >
                  {/* Portrait 9:16 Video Frame with Rounded Corners & Hardware-Accelerated Clipping */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '9 / 16',
                      borderRadius: 'clamp(18px, 2.2vw, 22px)',
                      overflow: 'hidden',
                      isolation: 'isolate',
                      WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                      transform: 'translateZ(0)',
                      backgroundColor: '#050505',
                      border: '1px solid rgba(255, 255, 255, 0.12)'
                    }}
                  >
                    {/* YouTube IFrame: Embedded with enablejsapi=1, controls=0, mute=1 */}
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

                    {/* Unobtrusive Floating Overlay Controls (NO oversized play button overlay) */}
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
                      {/* Status indicator pill */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 10px',
                          backgroundColor: 'rgba(10, 10, 10, 0.85)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '4px',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.65rem',
                          color: isPlaying ? 'var(--color-accent-lime)' : 'var(--color-warm-white)',
                          pointerEvents: 'auto'
                        }}
                      >
                        <span
                          className="lime-dot"
                          style={{
                            width: '5px',
                            height: '5px',
                            backgroundColor: isPlaying ? 'var(--color-accent-lime)' : '#666'
                          }}
                        />
                        <span>{isPlaying ? 'ACTIVE AUTOPLAY' : `SHORT 0${idx + 1}`}</span>
                      </div>

                      {/* Interactive Controls Pill: Audio & Lightbox */}
                      <div style={{ display: 'flex', gap: '6px', pointerEvents: 'auto' }}>
                        <button
                          onClick={() => toggleMute(short.id)}
                          title={isMuted ? "Unmute Sound" : "Mute Sound"}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(10, 10, 10, 0.85)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            color: isMuted ? 'var(--color-muted-gray)' : 'var(--color-accent-lime)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                        </button>

                        <button
                          onClick={() =>
                            setActiveModalItem({
                              id: short.id,
                              title: short.title,
                              client: short.client,
                              year: short.year,
                              category: short.category,
                              mediaType: 'video',
                              mediaUrl: short.videoUrl,
                              thumbnailUrl: short.thumbnailUrl,
                              description: short.description,
                              deliverables: short.deliverables
                            })
                          }
                          title="Open Fullscreen Lightbox"
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(10, 10, 10, 0.85)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            color: 'var(--color-warm-white)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <Maximize2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Minimal Metadata Below Video */}
                  <div style={{ paddingTop: '1.25rem', paddingBottom: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className="micro-label-lime" style={{ fontSize: '0.65rem' }}>
                        {short.category}
                      </span>
                      <span className="micro-label" style={{ fontSize: '0.65rem', color: '#666' }}>
                        {short.year}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.2rem, 1.8vw, 1.45rem)',
                        fontWeight: 800,
                        color: 'var(--color-warm-white)',
                        margin: 0,
                        lineHeight: 1.2
                      }}
                    >
                      {short.title}
                    </h3>

                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.86rem',
                        lineHeight: 1.5,
                        color: 'var(--color-muted-gray)',
                        margin: 0
                      }}
                    >
                      {short.subtitle}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '0.5rem' }}>
                      {short.deliverables.map((del, dIdx) => (
                        <span
                          key={dIdx}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.68rem',
                            padding: '3px 8px',
                            backgroundColor: '#161616',
                            border: '1px solid var(--color-border-gray)',
                            color: 'var(--color-warm-white)'
                          }}
                        >
                          {del}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: ADVERTISING PHOTOGRAPHY & AI MODELS
          Art-directed editorial grid mixing portrait, landscape, and square visuals.
          ========================================================================= */}
      <section
        id="photography-gallery"
        style={{
          paddingTop: 'clamp(5rem, 10vw, 8rem)',
          paddingBottom: 'clamp(5rem, 10vw, 8rem)',
          backgroundColor: '#070707',
          borderBottom: '1px solid var(--color-border-gray)'
        }}
      >
        <div className="site-container">
          {/* Header & Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                <CornerstoneMotif size={14} variant="mark" />
                <span className="micro-label" style={{ color: 'var(--color-muted-gray)' }}>
                  SECTION 02 // ADVERTISING PHOTOGRAPHY & AI MODELS
                </span>
              </div>
              <h2
                className="display-large"
                style={{
                  margin: 0,
                  fontSize: 'clamp(1.9rem, 3.4vw, 2.7rem)'
                }}
              >
                CAMPAIGN STILLS &amp; MODEL SERIES
              </h2>
            </div>

            {/* Filter Tabs */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                paddingBottom: '4px'
              }}
            >
              {ADS_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      padding: '6px 12px',
                      backgroundColor: isActive ? 'var(--color-accent-lime)' : 'transparent',
                      color: isActive ? '#0A0A0A' : 'var(--color-muted-gray)',
                      border: isActive ? '1px solid var(--color-accent-lime)' : '1px solid var(--color-border-gray)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {cat.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Photography Editorial Grid */}
          <div
            id="ads-photo-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
              gap: 'clamp(1.75rem, 3.5vw, 2.75rem)'
            }}
          >
            {filteredPhotography.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  setActiveModalItem({
                    id: item.id,
                    title: item.title,
                    client: item.client,
                    year: item.year,
                    category: item.category,
                    mediaType: 'image',
                    mediaUrl: item.imageUrl,
                    thumbnailUrl: item.thumbnailUrl,
                    description: item.description,
                    deliverables: item.deliverables
                  })
                }
                className="ads-photo-card arch-box"
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#0F0F0F',
                  overflow: 'hidden',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                {/* Media Container with Dynamic Aspect Ratio */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: item.aspectRatio === '9:16' ? '135%' : item.aspectRatio === '1:1' ? '100%' : '60%',
                    backgroundColor: '#050505',
                    overflow: 'hidden'
                  }}
                  className="ads-photo-media"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
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
                      e.currentTarget.src = '/images/services/service-ad-creative-design.jpg';
                    }}
                  />

                  {/* Category Pill Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      padding: '3px 8px',
                      backgroundColor: 'rgba(10, 10, 10, 0.85)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid var(--color-border-gray)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--color-warm-white)'
                    }}
                  >
                    {item.category.toUpperCase()}
                  </div>

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
                    className="ads-photo-hover-overlay"
                  >
                    <Eye size={20} />
                    <span>EXPAND HIGH-RES STILL</span>
                  </div>
                </div>

                {/* Metadata */}
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                      <span className="micro-label" style={{ fontSize: '0.65rem' }}>
                        {item.client}
                      </span>
                      <span style={{ color: '#444' }}>•</span>
                      <span className="micro-label" style={{ fontSize: '0.65rem', color: '#777' }}>
                        {item.year}
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
                      {item.title}
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
                      {item.tagline}
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
                    <span className="micro-label-lime" style={{ fontSize: '0.65rem' }}>
                      INSPECT STILL
                    </span>
                    <ArrowUpRight size={14} color="var(--color-muted-gray)" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: IMAGE CAROUSELS — Fashion & Product Lookbooks
          ========================================================================= */}
      <section
        style={{
          paddingTop: 'clamp(5rem, 10vw, 8rem)',
          paddingBottom: 'clamp(5rem, 10vw, 8rem)',
          backgroundColor: '#0A0A0A',
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
              Swipeable and clickable multi-look collections designed for AI model lookbooks, high-fashion lines, and luxury e-commerce catalogues.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {ADS_CAROUSELS.map((carousel) => {
              const currentSlideIdx = carouselIndex[carousel.id] || 0;
              const activeSlide = carousel.slides[currentSlideIdx];

              const handlePrevSlide = () => {
                setCarouselIndex((prev) => ({
                  ...prev,
                  [carousel.id]: (currentSlideIdx - 1 + carousel.slides.length) % carousel.slides.length
                }));
              };

              const handleNextSlide = () => {
                setCarouselIndex((prev) => ({
                  ...prev,
                  [carousel.id]: (currentSlideIdx + 1) % carousel.slides.length
                }));
              };

              return (
                <div
                  key={carousel.id}
                  className="ads-carousel-box"
                  style={{
                    backgroundColor: '#0E0E0E',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '24px',
                    padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                    gap: '2.5rem',
                    alignItems: 'center'
                  }}
                >
                  {/* Left Column: Visual Slide */}
                  <div
                    onClick={() =>
                      setActiveModalItem({
                        id: activeSlide.id,
                        title: activeSlide.title,
                        client: carousel.title,
                        year: "2026",
                        category: carousel.category,
                        mediaType: 'image',
                        mediaUrl: activeSlide.imageUrl,
                        thumbnailUrl: activeSlide.imageUrl,
                        description: carousel.description,
                        deliverables: ["Key Visuals", "Carousel Look", "Digital Master"]
                      })
                    }
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: activeSlide.aspectRatio === '9:16' ? '9/14' : '1/1',
                      borderRadius: '18px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: '1px solid rgba(255, 255, 255, 0.12)'
                    }}
                  >
                    <img
                      src={activeSlide.imageUrl}
                      alt={activeSlide.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.4s ease'
                      }}
                    />

                    {/* Hover indicator */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        opacity: 0,
                        transition: 'opacity 0.25s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        color: 'var(--color-accent-lime)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem'
                      }}
                      className="ads-photo-hover-overlay"
                    >
                      <Eye size={18} />
                      <span>EXPAND SLIDE</span>
                    </div>
                  </div>

                  {/* Right Column: Carousel Information & Controls */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <span className="micro-label-lime" style={{ display: 'block', marginBottom: '0.75rem' }}>
                        {carousel.category} • SLIDE {currentSlideIdx + 1} OF {carousel.slides.length}
                      </span>

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
                        {carousel.title}
                      </h3>

                      <p
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.86rem',
                          color: 'var(--color-accent-lime)',
                          margin: '0 0 1rem 0'
                        }}
                      >
                        {activeSlide.title} // {activeSlide.subtitle}
                      </p>

                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.94rem',
                          lineHeight: 1.65,
                          color: 'var(--color-muted-gray)',
                          margin: '0 0 2rem 0',
                          maxWidth: '52ch'
                        }}
                      >
                        {carousel.description}
                      </p>
                    </div>

                    {/* Pagination Indicators & Next/Prev Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {carousel.slides.map((_, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() =>
                              setCarouselIndex((prev) => ({
                                ...prev,
                                [carousel.id]: sIdx
                              }))
                            }
                            style={{
                              width: sIdx === currentSlideIdx ? '28px' : '8px',
                              height: '4px',
                              borderRadius: '2px',
                              backgroundColor: sIdx === currentSlideIdx ? 'var(--color-accent-lime)' : 'rgba(255, 255, 255, 0.2)',
                              border: 'none',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease'
                            }}
                          />
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
                        <button
                          onClick={handlePrevSlide}
                          aria-label="Previous Slide"
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#161616',
                            border: '1px solid var(--color-border-gray)',
                            color: 'var(--color-warm-white)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <ChevronLeft size={18} />
                        </button>

                        <button
                          onClick={handleNextSlide}
                          aria-label="Next Slide"
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#161616',
                            border: '1px solid var(--color-border-gray)',
                            color: 'var(--color-warm-white)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: FINAL ADS CONTACT SECTION
          Headline: HAVE A BRAND TO MAKE UNFORGETTABLE?
          Supporting text: Let's create advertising that captures attention and gives your brand a distinctive visual identity.
          Button: START A PROJECT
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
      {activeModalItem && (
        <CampaignLightboxModal
          project={activeModalItem}
          allProjects={[...FEATURED_SHORTS, ...ADS_PHOTOGRAPHY]}
          onClose={() => setActiveModalItem(null)}
          onSelectProject={(item) => setActiveModalItem(item)}
          onNavigate={onNavigate}
        />
      )}

      {/* Component Styles & Micro-Interactions */}
      <style>{`
        .ads-video-card:hover {
          transform: translateY(-4px);
        }
        .ads-photo-card:hover .ads-photo-media img {
          transform: scale(1.04);
        }
        .ads-photo-card:hover .ads-photo-hover-overlay {
          opacity: 1 !important;
        }
        .ads-carousel-box:hover img {
          transform: scale(1.02);
        }
        .ads-carousel-box:hover .ads-photo-hover-overlay {
          opacity: 1 !important;
        }
        @media (max-width: 768px) {
          .ads-video-card {
            padding: 0.85rem !important;
            border-radius: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdsPage;
